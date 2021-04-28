/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    isDevMode,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
  } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { CropperPosition, Dimensions, ImageCroppedEvent, ImageTransform, MoveStart, LoadedImage } from './interfaces';
import { OutputFormat } from './interfaces/cropper-options.interface';
import { CropperSettings } from './interfaces/cropper.settings';
import { MoveTypes } from './interfaces/move-start.interface';
import { CropService } from './services/crop.service';
import { CropperPositionService } from './services/cropper-position.service';
import { LoadImageService } from './services/load-image.service';
import { HammerStatic } from './utils/hammer.utils';
import { getEventForKey, getInvertedPositionForKey, getPositionForKey } from './utils/keyboard.utils';

@Component({
  selector: 'asw-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImageCropComponent implements OnChanges, OnInit {
    private Hammer: HammerStatic = typeof window !== 'undefined'
      ? (window as any).Hammer as HammerStatic
      : null;
    private settings = new CropperSettings();
    private setImageMaxSizeRetries = 0;
    private moveStart: MoveStart;
    private loadedImage: LoadedImage;

    safeImgDataUrl: SafeUrl | string;
    safeTransformStyle: SafeStyle | string;
    marginLeft: SafeStyle | string = '0px';
    maxSize: Dimensions;
    moveTypes = MoveTypes;
    imageVisible = false;

    @ViewChild('wrapper', {static: true}) wrapper: ElementRef<HTMLDivElement>;
    @ViewChild('sourceImage', {static: false}) sourceImage: ElementRef<HTMLDivElement>;

    @Input() imageChangedEvent: any;
    @Input() imageURL: string;
    @Input() imageBase64: string;
    @Input() imageFile: File;

    @Input() format: OutputFormat = this.settings.format;
    @Input() transform: ImageTransform = {};
    @Input() maintainAspectRatio = this.settings.maintainAspectRatio;
    @Input() aspectRatio = this.settings.aspectRatio;
    @Input() resizeToWidth = this.settings.resizeToWidth;
    @Input() resizeToHeight = this.settings.resizeToHeight;
    @Input() cropperMinWidth = this.settings.cropperMinWidth;
    @Input() cropperMinHeight = this.settings.cropperMinHeight;
    @Input() cropperMaxHeight = this.settings.cropperMaxHeight;
    @Input() cropperMaxWidth = this.settings.cropperMaxWidth;
    @Input() cropperStaticWidth = this.settings.cropperStaticWidth;
    @Input() cropperStaticHeight = this.settings.cropperStaticHeight;
    @Input() canvasRotation = this.settings.canvasRotation;
    @Input() initialStepSize = this.settings.initialStepSize;
    @Input() roundCropper = this.settings.roundCropper;
    @Input() onlyScaleDown = this.settings.onlyScaleDown;
    @Input() imageQuality = this.settings.imageQuality;
    @Input() autoCrop = this.settings.autoCrop;
    @Input() backgroundColor = this.settings.backgroundColor;
    @Input() containWithinAspectRatio = this.settings.containWithinAspectRatio;
    @Input() hideResizeSquares = this.settings.hideResizeSquares;
    @Input() cropper: CropperPosition = {
      x1: -100,
      y1: -100,
      x2: 10000,
      y2: 10000
    };
    @HostBinding('style.text-align')
    @Input() alignImage: 'left' | 'center' = this.settings.alignImage;
    @HostBinding('class.disabled')
    @Input() disabled = false;

    @Output() imageCropped = new EventEmitter<ImageCroppedEvent>();
    @Output() startCropImage = new EventEmitter<void>();
    @Output() imageLoaded = new EventEmitter<LoadedImage>();
    @Output() cropperReady = new EventEmitter<Dimensions>();
    @Output() loadImageFailed = new EventEmitter<void>();

    constructor(
      private cropService: CropService,
      private cropperPositionService: CropperPositionService,
      private loadImageService: LoadImageService,
      private sanitizer: DomSanitizer,
      private cd: ChangeDetectorRef
    ) {
      this.reset();
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.onChangesUpdateSettings(changes);
      this.onChangesInputImage(changes);

      if (this.loadedImage && this.loadedImage.original.image.complete
        && (changes.containWithinAspectRatio || changes.canvasRotation)) {
        this.loadImageService
          .transformLoadedImage(this.loadedImage, this.settings)
          .then((res) => this.setLoadedImage(res))
          .catch((err) => this.loadImageError(err));
      }
      if (changes.cropper) {
        this.setMaxSize();
        this.setCropperScaledMinSize();
        this.setCropperScaledMaxSize();
        this.checkCropperPosition(false);
        this.doAutoCrop();
        this.cd.markForCheck();
      }
      if (changes.aspectRatio && this.imageVisible) {
        this.resetCropperPosition();
      }
      if (changes.transform) {
        this.transform = this.transform || {};
        this.setCssTransform();
        this.doAutoCrop();
      }
    }

    private onChangesUpdateSettings(changes: SimpleChanges): void {
      this.settings.setOptionsFromChanges(changes);

      if (this.settings.cropperStaticHeight && this.settings.cropperStaticWidth) {
        this.settings.setOptions({
          hideResizeSquares: true,
          cropperMinWidth: this.settings.cropperStaticWidth,
          cropperMinHeight: this.settings.cropperStaticHeight,
          cropperMaxHeight: this.settings.cropperStaticHeight,
          cropperMaxWidth: this.settings.cropperStaticWidth,
          maintainAspectRatio: false
        });
      }
    }

    private onChangesInputImage(changes: SimpleChanges): void {
      if (changes.imageChangedEvent || changes.imageURL || changes.imageBase64 || changes.imageFile) {
        this.reset();
      }
      if (changes.imageChangedEvent && this.isValidImageChangedEvent()) {
        this.loadImageFile(this.imageChangedEvent.target.files[0]);
      }
      if (changes.imageURL && this.imageURL) {
        this.loadImageFromURL(this.imageURL);
      }
      if (changes.imageBase64 && this.imageBase64) {
        this.loadBase64Image(this.imageBase64);
      }
      if (changes.imageFile && this.imageFile) {
        this.loadImageFile(this.imageFile);
      }
    }

    private isValidImageChangedEvent(): boolean {
      return this.imageChangedEvent
        && this.imageChangedEvent.target
        && this.imageChangedEvent.target.files
        && this.imageChangedEvent.target.files.length > 0;
    }

    private setCssTransform(): void {
      this.safeTransformStyle = this.sanitizer.bypassSecurityTrustStyle(
        'scaleX(' + (this.transform.scale || 1) * (this.transform.flipH ? -1 : 1) + ')' +
        'scaleY(' + (this.transform.scale || 1) * (this.transform.flipV ? -1 : 1) + ')' +
        'rotate(' + (this.transform.rotate || 0) + 'deg)'
      );
    }

    ngOnInit(): void {
      this.settings.stepSize = this.initialStepSize;
      this.activatePinchGesture();
    }

    private reset(): void {
      this.imageVisible = false;
      this.loadedImage = null;
      this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg'
        + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU'
        + 'AAarVyFEAAAAASUVORK5CYII=';
      this.moveStart = {
        active: false,
        type: null,
        position: null,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        clientX: 0,
        clientY: 0
      };
      this.maxSize = {
        width: 0,
        height: 0
      };
      this.cropper.x1 = -100;
      this.cropper.y1 = -100;
      this.cropper.x2 = 10000;
      this.cropper.y2 = 10000;
    }

    private loadImageFile(file: File): void {
      this.loadImageService
        .loadImageFile(file, this.settings)
        .then((res) => this.setLoadedImage(res))
        .catch((err) => this.loadImageError(err));
    }

    private loadBase64Image(imageBase64: string): void {
      this.loadImageService
        .loadBase64Image(imageBase64, this.settings)
        .then((res) => this.setLoadedImage(res))
        .catch((err) => this.loadImageError(err));
    }

    private loadImageFromURL(url: string): void {
      this.loadImageService
        .loadImageFromURL(url, this.settings)
        .then((res) => this.setLoadedImage(res))
        .catch((err) => this.loadImageError(err));
    }

    private setLoadedImage(loadedImage: LoadedImage): void {
      this.loadedImage = loadedImage;
      this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loadedImage.transformed.base64);
      this.cd.markForCheck();
    }

    private loadImageError(error: any): void {
      console.error(error);
      this.loadImageFailed.emit();
    }

    imageLoadedInView(): void {
      if (this.loadedImage != null) {
        this.imageLoaded.emit(this.loadedImage);
        this.setImageMaxSizeRetries = 0;
        setTimeout(() => this.checkImageMaxSizeRecursively());
      }
    }

    private checkImageMaxSizeRecursively(): void {
      if (this.setImageMaxSizeRetries > 40) {
        this.loadImageFailed.emit();
      } else if (this.sourceImageLoaded()) {
        this.setMaxSize();
        this.setCropperScaledMinSize();
        this.setCropperScaledMaxSize();
        this.resetCropperPosition();
        this.cropperReady.emit({...this.maxSize});
        this.cd.markForCheck();
      } else {
        this.setImageMaxSizeRetries++;
        setTimeout(() => this.checkImageMaxSizeRecursively(), 50);
      }
    }

    private sourceImageLoaded(): boolean {
      return this.sourceImage && this.sourceImage.nativeElement && this.sourceImage.nativeElement.offsetWidth > 0;
    }

    @HostListener('window:resize')
    onResize(): void {
      if (!this.loadedImage) {
        return;
      }
      this.resizeCropperPosition();
      this.setMaxSize();
      this.setCropperScaledMinSize();
      this.setCropperScaledMaxSize();
    }

    private activatePinchGesture(): void {
      if (this.Hammer) {
        const hammer = new this.Hammer(this.wrapper.nativeElement);
        hammer.get('pinch').set({enable: true});
        hammer.on('pinchmove', this.onPinch.bind(this));
        hammer.on('pinchend', this.pinchStop.bind(this));
        hammer.on('pinchstart', this.startPinch.bind(this));
      } else if (isDevMode()) {
        console.warn('[asw-image-crop] Could not find HammerJS - Pinch Gesture won\'t work');
      }
    }

    private resizeCropperPosition(): void {
      const sourceImageElement = this.sourceImage.nativeElement;
      if (this.maxSize.width !== sourceImageElement.offsetWidth || this.maxSize.height !== sourceImageElement.offsetHeight) {
        this.cropper.x1 = this.cropper.x1 * sourceImageElement.offsetWidth / this.maxSize.width;
        this.cropper.x2 = this.cropper.x2 * sourceImageElement.offsetWidth / this.maxSize.width;
        this.cropper.y1 = this.cropper.y1 * sourceImageElement.offsetHeight / this.maxSize.height;
        this.cropper.y2 = this.cropper.y2 * sourceImageElement.offsetHeight / this.maxSize.height;
      }
    }

    resetCropperPosition(): void {
      this.cropperPositionService.resetCropperPosition(this.sourceImage, this.cropper, this.settings);
      this.doAutoCrop();
      this.imageVisible = true;
    }

    keyboardAccess(event: any): void {
      this.changeKeyboardStepSize(event);
      this.keyboardMoveCropper(event);
    }

    private changeKeyboardStepSize(event: any): void {
      if (event.key >= '1' && event.key <= '9') {
        this.settings.stepSize = +event.key;
        return;
      }
    }

    private keyboardMoveCropper(event): void {
      const keyboardWhiteList: string[] = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
      if (!(keyboardWhiteList.includes(event.key))) {
        return;
      }
      const moveType = event.shiftKey ? MoveTypes.Resize : MoveTypes.Move;
      const position = event.altKey ? getInvertedPositionForKey(event.key) : getPositionForKey(event.key);
      const moveEvent = getEventForKey(event.key, this.settings.stepSize);
      event.preventDefault();
      event.stopPropagation();
      this.startMove({clientX: 0, clientY: 0}, moveType, position);
      this.moveImg(moveEvent);
      this.moveStop();
    }

    startMove(event: any, moveType: MoveTypes, position: string | null = null): void {
      if (this.moveStart && this.moveStart.active && this.moveStart.type === MoveTypes.Pinch) {
        return;
      }
      if (event.preventDefault) {
        event.preventDefault();
      }
      this.moveStart = {
        active: true,
        type: moveType,
        position,
        clientX: this.cropperPositionService.getClientX(event),
        clientY: this.cropperPositionService.getClientY(event),
        ...this.cropper
      };
    }

    startPinch(event: any): void {
      if (!this.safeImgDataUrl) {
        return;
      }
      if (event.preventDefault) {
        event.preventDefault();
      }
      this.moveStart = {
        active: true,
        type: MoveTypes.Pinch,
        position: 'center',
        clientX: this.cropper.x1 + (this.cropper.x2 - this.cropper.x1) / 2,
        clientY: this.cropper.y1 + (this.cropper.y2 - this.cropper.y1) / 2,
        ...this.cropper
      };
    }

    @HostListener('document:mousemove', ['$event'])
    @HostListener('document:touchmove', ['$event'])
    moveImg(event: any): void {
      if (this.moveStart.active) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (this.moveStart.type === MoveTypes.Move) {
          this.cropperPositionService.move(event, this.moveStart, this.cropper);
          this.checkCropperPosition(true);
        } else if (this.moveStart.type === MoveTypes.Resize) {
          if (!this.cropperStaticWidth && !this.cropperStaticHeight) {
            this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
          }
          this.checkCropperPosition(false);
        }
        this.cd.detectChanges();
      }
    }

    onPinch(event: any): void {
      if (this.moveStart.active) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (this.moveStart.type === MoveTypes.Pinch) {
          this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
          this.checkCropperPosition(false);
        }
        this.cd.detectChanges();
      }
    }

    private setMaxSize(): void {
      if (this.sourceImage) {
        const sourceImageElement = this.sourceImage.nativeElement;
        this.maxSize.width = sourceImageElement.offsetWidth;
        this.maxSize.height = sourceImageElement.offsetHeight;
        this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
      }
    }

    private setCropperScaledMinSize(): void {
      if (this.loadedImage && this.loadedImage.transformed && this.loadedImage.transformed.image) {
        this.setCropperScaledMinWidth();
        this.setCropperScaledMinHeight();
      } else {
        this.settings.cropperScaledMinWidth = 20;
        this.settings.cropperScaledMinHeight = 20;
      }
    }

    private setCropperScaledMinWidth(): void {
      this.settings.cropperScaledMinWidth = this.cropperMinWidth > 0
        ? Math.max(20, this.cropperMinWidth / this.loadedImage.transformed.image.width * this.maxSize.width)
        : 20;
    }

    private setCropperScaledMinHeight(): void {
      if (this.maintainAspectRatio) {
        this.settings.cropperScaledMinHeight = Math.max(20, this.settings.cropperScaledMinWidth / this.aspectRatio);
      } else if (this.cropperMinHeight > 0) {
        this.settings.cropperScaledMinHeight = Math.max(
          20,
          this.cropperMinHeight / this.loadedImage.transformed.image.height * this.maxSize.height
        );
      } else {
        this.settings.cropperScaledMinHeight = 20;
      }
    }

    private setCropperScaledMaxSize(): void {
      if (this.loadedImage && this.loadedImage.transformed && this.loadedImage.transformed.image) {
        const ratio = this.loadedImage.transformed.size.width / this.maxSize.width;
        this.settings.cropperScaledMaxWidth = this.cropperMaxWidth > 20 ? this.cropperMaxWidth / ratio : this.maxSize.width;
        this.settings.cropperScaledMaxHeight = this.cropperMaxHeight > 20 ? this.cropperMaxHeight / ratio : this.maxSize.height;
        if (this.maintainAspectRatio) {
          if (this.settings.cropperScaledMaxWidth > this.settings.cropperScaledMaxHeight * this.aspectRatio) {
            this.settings.cropperScaledMaxWidth = this.settings.cropperScaledMaxHeight * this.aspectRatio;
          } else if (this.settings.cropperScaledMaxWidth < this.settings.cropperScaledMaxHeight * this.aspectRatio) {
            this.settings.cropperScaledMaxHeight = this.settings.cropperScaledMaxWidth / this.aspectRatio;
          }
        }
      } else {
        this.settings.cropperScaledMaxWidth = this.maxSize.width;
        this.settings.cropperScaledMaxHeight = this.maxSize.height;
      }
    }

    private checkCropperPosition(maintainSize = false): void {
      if (this.cropper.x1 < 0) {
        this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
        this.cropper.x1 = 0;
      }
      if (this.cropper.y1 < 0) {
        this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
        this.cropper.y1 = 0;
      }
      if (this.cropper.x2 > this.maxSize.width) {
        this.cropper.x1 -= maintainSize ? (this.cropper.x2 - this.maxSize.width) : 0;
        this.cropper.x2 = this.maxSize.width;
      }
      if (this.cropper.y2 > this.maxSize.height) {
        this.cropper.y1 -= maintainSize ? (this.cropper.y2 - this.maxSize.height) : 0;
        this.cropper.y2 = this.maxSize.height;
      }
    }

    @HostListener('document:mouseup')
    @HostListener('document:touchend')
    moveStop(): void {
      if (this.moveStart.active) {
        this.moveStart.active = false;
        this.doAutoCrop();
      }
    }

    pinchStop(): void {
      if (this.moveStart.active) {
        this.moveStart.active = false;
        this.doAutoCrop();
      }
    }

    private doAutoCrop(): void {
      if (this.autoCrop) {
        this.crop();
      }
    }

    crop(): ImageCroppedEvent | null {
      if (this.sourceImage && this.sourceImage.nativeElement && this.loadedImage.transformed.image != null) {
        this.startCropImage.emit();
        const output = this.cropService.crop(this.sourceImage, this.loadedImage, this.cropper, this.settings);
        if (output != null) {
          this.imageCropped.emit(output);
        }
        return output;
      }
      return null;
    }
  }
