import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MapGameComponent } from './containers/map-game/map-game.component';
import { TuiBreakpointService } from '@taiga-ui/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TuiLet } from '@taiga-ui/cdk';
import { DestroyService } from '../../shared/services/destroy.service';
import { UsedCitiesListComponent } from './components/used-cities-list/used-cities-list.component';

@Component({
  selector: 'app-main-page',
  imports: [
    MapGameComponent,
    UsedCitiesListComponent,
    AsyncPipe,
    TuiLet,
    CommonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MainPageComponent {
  readonly _breakpoint$ = inject(TuiBreakpointService);
}
