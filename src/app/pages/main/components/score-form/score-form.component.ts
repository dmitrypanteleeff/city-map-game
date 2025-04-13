import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MapGameFormsService } from '../../services/map-game-form.service';
import { injectContext } from '@taiga-ui/polymorpheus';
import {
  TuiBreakpointService,
  TuiButton,
  TuiDialogContext,
  TuiError,
  TuiTextfield,
} from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { resizeElements } from '../../utils';
import { TuiLet } from '@taiga-ui/cdk';
import { AsyncPipe } from '@angular/common';
import { FunctionPipe } from '../../../../shared/pipes';
import { DestroyService } from '../../../../shared/services/destroy.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { isNullOrUndefined } from '../../../../shared/utils';
import { RecordsApiService } from '../../services/records-api.services';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';

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

  readonly _breakpoint$ = inject(TuiBreakpointService);
  private readonly _destroy$ = inject(DestroyService);
  private readonly _apiFirebase = inject(RecordsApiService);

  readonly sendData$ = new Subject<boolean>();

  public readonly context = injectContext<TuiDialogContext<number, number>>();
  readonly form = this._form.createScoreForm();

  protected get data(): number {
    return this.context.data;
  }

  get userFormCtrl(): FormControl {
    return this.form.get('user') as FormControl;
  }

  readonly resizeElements = resizeElements;

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
    this.userFormCtrl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((val) => console.log(111111, 'val', this.userFormCtrl));

    this.sendData$
      .pipe(
        filter(
          (value) =>
            !isNullOrUndefined(this.userFormCtrl.value) && Boolean(value)
        ),
        debounceTime(300),
        tap((val) => console.log('send')),
        switchMap(() =>
          this._apiFirebase.addRecord(this.userFormCtrl.value, this.data)
        ),

        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.userFormCtrl.reset();
        this.userFormCtrl.updateValueAndValidity();
        console.log('Отправил');
        this.context.completeWith(123);
      });
  }
}
