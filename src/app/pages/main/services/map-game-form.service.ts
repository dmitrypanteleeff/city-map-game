import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { latinCyrillicValidator, noWhitespaceValidator } from '../validators';
import { Store } from '@ngxs/store';
import { GameState } from '../state/game.state';

@Injectable({
  providedIn: 'root',
})
export class MapGameFormsService {
  private readonly _store = inject(Store);

  createMapForm(): FormGroup {
    const form = new FormGroup({
      city: new FormControl(null, Validators.required),
    });
    return form;
  }

  createScoreForm(): FormGroup {
    const lang = this._store.selectSnapshot(GameState.language$);

    const form = new FormGroup({
      user: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        noWhitespaceValidator,
        latinCyrillicValidator(lang),
      ]),
    });
    return form;
  }
}
