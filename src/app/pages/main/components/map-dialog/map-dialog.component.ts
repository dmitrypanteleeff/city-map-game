import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { DestroyService } from '../../../../shared/services/destroy.service';
import { GameState } from '../../state/game.state';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiButton, tuiDialog, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { GameAction } from '../../state/game.actions';
import { RecordsApiService } from '../../services/records-api.services';
import { IDialogModel, RecordModel, TypeDialog } from '../../models';
import { TuiTable } from '@taiga-ui/addon-table';
import { ScoreFormComponent } from '../score-form/score-form.component';
import { TuiLet } from '@taiga-ui/cdk';
import { FunctionPipe } from '../../../../shared/pipes';
import { showSendRecordBtn } from '../../utils';

@Component({
  selector: 'app-map-dialog',
  imports: [
    AsyncPipe,
    RouterModule,
    TuiButton,
    JsonPipe,
    CommonModule,
    TuiTable,
    TuiLet,
    FunctionPipe,
  ],
  templateUrl: './map-dialog.component.html',
  styleUrl: './map-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MapDialogComponent implements OnInit {
  private readonly _destroy$ = inject(DestroyService);
  private readonly _actions = inject(Actions);
  private readonly _store = inject(Store);
  private readonly _apiFirebase = inject(RecordsApiService);

  readonly score$: Observable<number> = this._store.select(GameState.score$);
  readonly showBtn$$ = new BehaviorSubject<boolean>(true);

  get score(): number {
    return this._store.selectSnapshot(GameState.score$);
  }

  records$!: Observable<RecordModel[]>;

  public readonly context =
    injectContext<TuiDialogContext<IDialogModel, IDialogModel>>();

  private readonly dialog = tuiDialog(ScoreFormComponent, {
    dismissible: false,
    size: 'l',
    closeable: true,
  });

  readonly showSendRecordBtn = showSendRecordBtn;

  resetGame(): void {
    this.context.completeWith({ type: 'fullscreen', header: '' });
    this._store.dispatch(new GameAction.ResetGame());
  }

  protected get header(): string {
    return this.context.data.header;
  }

  protected get content(): string | undefined {
    return this.context.data.content;
  }

  protected get typeDialog(): TypeDialog {
    return this.context.data.type;
  }

  ngOnInit(): void {
    if (this.typeDialog === 'fullscreen') {
      this.records$ = this._apiFirebase.getRecords().pipe(
        //take(1),
        tap((val) => console.log(111111, 'val', val)),
        map((arr) =>
          arr.sort((a, b) => b.score - a.score).filter((_, index) => index < 10)
        )
      );
    }

    this.initSubscription();
  }

  private initSubscription(): void {
    this._actions
      .pipe(ofActionSuccessful(GameAction.ResetGame), takeUntil(this._destroy$))
      .subscribe(() =>
        this.context.completeWith({ type: 'fullscreen', header: '' })
      );
  }

  showDialog(): void {
    this.dialog(this.score)
      //.pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          //console.info(`Dialog emitted data = ${data}`);
          this.showBtn$$.next(false);
        },
        complete: () => {
          //console.info('Dialog closed');
        },
      });
  }
}
