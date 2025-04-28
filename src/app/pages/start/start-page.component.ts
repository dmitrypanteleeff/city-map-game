import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { TuiButton } from '@taiga-ui/core';
import { GameAction } from '../main/state/game.actions';
import { getContentByLanguage } from '../main/utils';
import { AsyncPipe } from '@angular/common';
import { FunctionPipe } from '../../shared/pipes';
import { TuiLet } from '@taiga-ui/cdk';
import { GameState } from '../main/state/game.state';
import { Observable } from 'rxjs';
import { LanguageTypeName } from '../../shared/models';
import * as content from './start-page.config';

@Component({
  selector: 'app-start-page',
  imports: [RouterModule, TuiButton, AsyncPipe, FunctionPipe, TuiLet],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent {
  private readonly _store = inject(Store);

  readonly language$: Observable<LanguageTypeName> = this._store.select(
    GameState.language$
  );

  readonly getContentByLanguage = getContentByLanguage;

  resetGame(): void {
    this._store.dispatch(new GameAction.ResetGame());
  }

  changeLanguage(): void {
    this._store.dispatch(new GameAction.ChangeLanguage());
  }

  readonly content = content;
}
