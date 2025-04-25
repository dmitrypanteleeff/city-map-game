import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { getContentByLanguage } from '../main/utils';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LanguageTypeName } from '../../shared/models';
import { GameState } from '../main/state/game.state';
import * as content from './options-page.config';
import { FunctionPipe } from '../../shared/pipes';
import { TuiLet } from '@taiga-ui/cdk';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-options-page',
  imports: [
    RouterModule,
    TuiButton,
    FunctionPipe,
    TuiLet,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './options-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsPageComponent {
  private readonly _store = inject(Store);

  readonly language$: Observable<LanguageTypeName> = this._store.select(
    GameState.language$
  );

  readonly getContentByLanguage = getContentByLanguage;
  readonly content = content;
}
