import { TypeDialog } from './type-dialog.model';

/* Тип модального окна */
export interface IDialogModel {
  type: TypeDialog;
  header: string;
  content?: string;
}
