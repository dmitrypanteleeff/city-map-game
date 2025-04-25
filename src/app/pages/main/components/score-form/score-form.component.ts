import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MapGameFormsService } from '../../services/map-game-form.service';
import { injectContext } from '@taiga-ui/polymorpheus';
import * as content from './score-form.config';
import {
  TuiBreakpointService,
  TuiButton,
  TuiDialogContext,
  TuiError,
  TuiTextfield,
} from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { getContentByLanguage, resizeElements } from '../../utils';
import { TuiLet } from '@taiga-ui/cdk';
import { AsyncPipe } from '@angular/common';
import { FunctionPipe } from '../../../../shared/pipes';
import { DestroyService } from '../../../../shared/services/destroy.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { isNullOrUndefined } from '../../../../shared/utils';
import { RecordsApiService } from '../../services/records-api.services';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { LanguageTypeName } from '../../../../shared/models';
import { GameState } from '../../state/game.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-score-form',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiLet,
    AsyncPipe,
    FunctionPipe,
    TuiButton,
    TuiError,
    TuiFieldErrorPipe,
  ],
  templateUrl: './score-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyService,
    tuiValidationErrorsProvider({
      required: 'Обязательное поле',
      maxlength: ({ requiredLength }: { requiredLength: string }) =>
        `Максимальная длина символов — ${requiredLength}`,
    }),
  ],
})
export class ScoreFormComponent implements OnInit {
  private readonly _form = inject(MapGameFormsService);
  private readonly _store = inject(Store);

  readonly _breakpoint$ = inject(TuiBreakpointService);
  private readonly _destroy$ = inject(DestroyService);
  private readonly _apiFirebase = inject(RecordsApiService);

  readonly sendData$ = new Subject<boolean>();

  readonly language$: Observable<LanguageTypeName> = this._store.select(
    GameState.language$
  );

  public readonly context = injectContext<TuiDialogContext<number, number>>();
  readonly form = this._form.createScoreForm();
  readonly content = content;

  protected get data(): number {
    return this.context.data;
  }

  get userFormCtrl(): FormControl {
    return this.form.get('user') as FormControl;
  }

  readonly resizeElements = resizeElements;
  readonly getContentByLanguage = getContentByLanguage;

  sendData(): void {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  constructor() {
    this.form.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(() => {
        this.form.markAsTouched();
      });
  }

  private initSubscriptions() {
    this.sendData$
      .pipe(
        filter(
          (value) =>
            !isNullOrUndefined(this.userFormCtrl.value) && Boolean(value)
        ),
        debounceTime(300),
        switchMap(() =>
          this._apiFirebase.addRecord(this.userFormCtrl.value, this.data)
        ),

        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.userFormCtrl.reset();
        this.userFormCtrl.updateValueAndValidity();
        this.context.completeWith(123);
      });
  }
}
