import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CreateNewCategoryComponent } from './pages/create-new-category/create-new-category.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceInterceptor } from './interceptors/service.interceptor';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { PresupuestosComponent } from './pages/presupuestos/presupuestos.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    CreateNewCategoryComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    CategoriasComponent,
    TransaccionesComponent,
    PresupuestosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
