import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start/start-page.component';
import { MainPageComponent } from './pages/main/main-page.component';
import { OptionsPageComponent } from './pages/options/options-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    component: StartPageComponent,
  },
  {
    path: 'options',
    component: OptionsPageComponent,
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];
