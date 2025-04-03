import { Component, inject, OnInit } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { DestroyService } from '../../../../shared/services/destroy.service';
import { GameState } from '../../state/game.state';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { GameAction } from '../../state/game.actions';

@Component({
  selector: 'app-map-dialog',
  imports: [AsyncPipe, RouterModule, TuiButton, JsonPipe],
  templateUrl: './map-dialog.component.html',
  styleUrl: './map-dialog.component.less',
})
export class MapDialogComponent implements OnInit {
  private readonly _destroy$ = inject(DestroyService);
  private readonly _actions = inject(Actions);
  private readonly _store = inject(Store);

  readonly score$: Observable<number> = this._store.select(GameState.score$);

  public readonly context = injectContext<TuiDialogContext<string, string>>();

  resetGame(): void {
    this.context.completeWith('');
    this._store.dispatch(new GameAction.ResetGame());
  }

  protected get data(): string {
    return this.context.data;
  }

  ngOnInit(): void {
    console.log(1111111, this.context);
  }
}
