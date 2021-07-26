import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  private _isTrue = 'Yes';
  private _isFalse = 'No';

  transform(value: Boolean, isTrue: string, isFalse: string): string {
    if (!!value){
      return isTrue || this._isTrue;
    }
    return isFalse || this._isFalse;
  }

}
