import { breakpointModel } from '../../../shared/models';

/**
 * Изменение размеров элементов в зависимости от разрешения экрана
 * @param breakpoint - Разрешения экрана
 * @returns
 */
export function resizeElements(breakpoint: breakpointModel): string {
  switch (breakpoint) {
    case 'mobile':
      return 's';
    case 'desktopSmall':
      return 'm';
    default:
      return 'l';
  }
}
