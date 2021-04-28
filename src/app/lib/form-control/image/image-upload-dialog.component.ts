/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from '../common/constants';
import { Dimensions, ImageCroppedEvent, ImageTransform } from './../../image-crop/interfaces';

@Component({
  selector: 'asw-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html'
})
export class AswImageUploadDialogComponent implements OnInit {

    constants: any = Constants;
    aswImageCropForm: FormGroup;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    isImageLoaded = true;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};

    constructor(private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AswImageUploadDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public control: any) { }

    fileChangeEvent(event: any): void {
        this.isImageLoaded = false;
        this.imageChangedEvent = event;
    }

    removeImage(): void {
        this.isImageLoaded = true;
        this.imageChangedEvent = null;
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event.base64;
    }

    imageLoaded(): void {
        this.showCropper = true;
        console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions): void {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed(): void {
        console.log('Load failed');
    }

    rotateLeft(): void {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight(): void {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate(): void {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }


    flipHorizontal(): void {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical(): void {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage(): void {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut(): void {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn(): void {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio(): void {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation(): void {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    validateFormBuilder(): void {
        this.aswImageCropForm = this.formBuilder.group({
            file: [null]
        });
    }

    ngOnInit(): void {
        this.validateFormBuilder();
        this.editProperty(this.control);
        this.croppedImage = this.control.imageUrl;
        this.imageChangedEvent = this.control.event;
    }

    editProperty(control: any): void {
        if (control.event) { this.isImageLoaded = false; }
        this.aswImageCropForm.setValue({
            file: control.imageUrl
        });
    }

    onSubmit(): void {
        if (this.aswImageCropForm.invalid){
            return;
        }
        this.aswImageCropForm.value.displayName = this.control.displayName;
        this.aswImageCropForm.value.controlType = this.control.controlType;
        this.aswImageCropForm.value.label = this.control.label;
        this.aswImageCropForm.value.imageUrl = this.croppedImage;
        this.aswImageCropForm.value.event = this.imageChangedEvent;
        this.dialogRef.close(this.aswImageCropForm.value);
    }
}
