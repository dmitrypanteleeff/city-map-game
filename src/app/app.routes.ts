import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start/start-page.component';
import { MainPageComponent } from './pages/main/main-page.component';

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
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];
