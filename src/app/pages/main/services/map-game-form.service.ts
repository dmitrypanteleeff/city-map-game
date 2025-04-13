import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { latinCyrillicValidator, noWhitespaceValidator } from '../validators';

@Injectable({
  providedIn: 'root',
})
export class MapGameFormsService {
  createMapForm(): FormGroup {
    const form = new FormGroup({
      city: new FormControl(null, Validators.required),
    });
    return form;
  }

  createScoreForm(): FormGroup {
    const form = new FormGroup({
      user: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        noWhitespaceValidator,
        latinCyrillicValidator,
      ]),
    });
    return form;
  }
}
