import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-options-page',
  imports: [RouterModule, TuiButton],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.less',
})
export class OptionsPageComponent {}
