import { AbstractControl, Validators } from '@angular/forms';

export function noWhitespaceValidator(
  control: AbstractControl
): Validators | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;

  return isValid ? null : { message: 'Введите текст' };
}
