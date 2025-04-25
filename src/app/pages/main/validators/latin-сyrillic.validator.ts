import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LanguageTypeName } from '../../../shared/models';

/** Валидатор работающий только с латиницей и с кириллицей */
export function latinCyrillicValidator(lang: LanguageTypeName): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control?.value as string;
    let message;

    switch (lang) {
      case 'eng':
        message = 'Only Cyrillic or Latin characters and a hyphen are allowed';
        break;
      default:
        message = 'Допустимы только символы кириллицы или латиницы и дефис';
    }

    if (!value) {
      return null;
    }

    const fullRegexp = /^[A-Za-zа-яА-ЯёЁ\-\'\ ]+$/;

    if (!fullRegexp.test(value)) {
      return {
        message,
      };
    }

    return null;
  };
}
