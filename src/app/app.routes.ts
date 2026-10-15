import { Routes } from '@angular/router';
// Quitamos el ".component" de la ruta
import { ListaComponent } from './pages/lista/lista.component'; 
import { DetalleComponent } from './pages/detalle/detalle.component';

export const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'detalle/:nombre', component: DetalleComponent },
  { path: '**', redirectTo: '' }
];