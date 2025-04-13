import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

/** Валидатор работающий только с латиницей и с кириллицей */
export function latinCyrillicValidator(
  control: AbstractControl
): Validators | null {
  const value = control?.value as string;

  if (!value) {
    return null;
  }

  const fullRegexp = /^[A-Za-zа-яА-ЯёЁ\-\'\ ]+$/;

  if (!fullRegexp.test(value)) {
    return {
      message: 'Допустимы только символы кириллицы или латиницы и дефис',
    };
  }

  return null;
}
