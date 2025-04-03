import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { TuiButton } from '@taiga-ui/core';
import { GameAction } from '../main/state/game.actions';

@Component({
  selector: 'app-start-page',
  imports: [RouterModule, TuiButton],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.less',
})
export class StartPageComponent {
  private readonly _store = inject(Store);

  resetGame(): void {
    this._store.dispatch(new GameAction.ResetGame());
  }
}
