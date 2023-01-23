import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginGuard } from './guards/login.guard';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { PresupuestosComponent } from './pages/presupuestos/presupuestos.component';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'presupuestos',
    component: PresupuestosComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
