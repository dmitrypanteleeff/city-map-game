import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
}
