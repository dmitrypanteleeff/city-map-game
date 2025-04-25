import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MapGameComponent } from './containers/map-game/map-game.component';
import { TuiBreakpointService, TuiScrollbar } from '@taiga-ui/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FunctionPipe } from '../../shared/pipes';
import { TuiLet } from '@taiga-ui/cdk';
import { DestroyService } from '../../shared/services/destroy.service';
import { UsedCitiesListComponent } from './components/used-cities-list/used-cities-list.component';

@Component({
  selector: 'app-main-page',
  imports: [
    MapGameComponent,
    UsedCitiesListComponent,
    AsyncPipe,
    FunctionPipe,
    TuiLet,
    CommonModule,
    TuiScrollbar,
  ],
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MainPageComponent {
  readonly _breakpoint$ = inject(TuiBreakpointService);
}
