import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { DestroyService } from '../../../../shared/services/destroy.service';
import { GameState } from '../../state/game.state';
import { BehaviorSubject, delay, map, Observable, takeUntil, tap } from 'rxjs';
import { TuiSkeleton } from '@taiga-ui/kit';
import { AsyncPipe, CommonModule } from '@angular/common';
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
import { getContentByLanguage, showSendRecordBtn } from '../../utils';
import { LanguageTypeName } from '../../../../shared/models';
import * as contentConfig from './map-dialog.config';

@Component({
  selector: 'app-map-dialog',
  imports: [
    AsyncPipe,
    RouterModule,
    TuiButton,
    CommonModule,
    TuiTable,
    TuiLet,
    FunctionPipe,
    TuiSkeleton,
  ],
  templateUrl: './map-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MapDialogComponent implements OnInit {
  private readonly _destroy$ = inject(DestroyService);
  private readonly _actions = inject(Actions);
  private readonly _store = inject(Store);
  private readonly _apiFirebase = inject(RecordsApiService);

  readonly score$: Observable<number> = this._store.select(GameState.score$);
  readonly language$: Observable<LanguageTypeName> = this._store.select(
    GameState.language$
  );

  readonly showBtn$$ = new BehaviorSubject<boolean>(true);
  records$!: Observable<RecordModel[]>;
  readonly loading = signal(true);

  get score(): number {
    return this._store.selectSnapshot(GameState.score$);
  }

  public readonly context =
    injectContext<TuiDialogContext<IDialogModel, IDialogModel>>();

  private readonly dialog = tuiDialog(ScoreFormComponent, {
    dismissible: false,
    size: 'l',
    closeable: true,
  });

  readonly showSendRecordBtn = showSendRecordBtn;
  readonly getContentByLanguage = getContentByLanguage;

  readonly contentConfig = contentConfig;

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
        delay(3000),
        map((arr) =>
          arr.sort((a, b) => b.score - a.score).filter((_, index) => index < 10)
        ),
        tap(() => this.loading.set(false))
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
      .pipe(takeUntil(this._destroy$))
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
