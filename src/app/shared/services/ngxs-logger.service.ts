import {
  makeEnvironmentProviders,
  InjectionToken,
  Injectable,
  Inject,
} from '@angular/core';
import { withNgxsPlugin } from '@ngxs/store';
import { NgxsPlugin, NgxsNextPluginFn } from '@ngxs/store/plugins';
import { tap } from 'rxjs';

export const NGXS_LOGGER_PLUGIN_OPTIONS = new InjectionToken(
  'NGXS_LOGGER_PLUGIN_OPTIONS'
);

/* Кастомный логер */
@Injectable()
export class LoggerPlugin implements NgxsPlugin {
  constructor(@Inject(NGXS_LOGGER_PLUGIN_OPTIONS) private options: any) {}

  handle(state: any, action: any, next: NgxsNextPluginFn) {
    console.info('Action started!', state);
    return next(state, action).pipe(
      tap((result) => {
        console.info('Action happened!', result);
      })
    );
  }
}

export function withNgxsLoggerPlugin(options?: any) {
  return makeEnvironmentProviders([
    withNgxsPlugin(LoggerPlugin),
    {
      provide: NGXS_LOGGER_PLUGIN_OPTIONS,
      useValue: options,
    },
  ]);
}
