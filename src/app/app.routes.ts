import { Routes } from '@angular/router';
import { AutorComponent } from './autor/autor.component';

export const routes: Routes = [
    {
        path: '',
        component: AutorComponent,
        title: 'Autor'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
