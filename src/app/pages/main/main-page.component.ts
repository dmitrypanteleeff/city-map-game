import { Component, inject } from '@angular/core';
import { MapGameComponent } from './containers/map-game/map-game.component';
import { TuiBreakpointService } from '@taiga-ui/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FunctionPipe } from '../../shared/pipes';
import { TuiLet } from '@taiga-ui/cdk';

@Component({
  selector: 'app-main-page',
  imports: [MapGameComponent, AsyncPipe, FunctionPipe, TuiLet, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.less',
})
export class MainPageComponent {
  readonly _breakpoint$ = inject(TuiBreakpointService);
}
