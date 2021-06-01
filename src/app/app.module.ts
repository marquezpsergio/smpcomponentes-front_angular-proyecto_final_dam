import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import es from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
// Components
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ConfiguratorComponent} from './core/components/configurator/configurator.component';
import {HomeComponent} from './core/components/home/home.component';
import {ComponentesComponent} from './core/components/componentes/componentes.component';
import {ComponentesCategoriaComponent} from './core/components/componentes-categoria/componentes-categoria.component';
import {ComponentesFabricanteComponent} from './core/components/componentes-fabricante/componentes-fabricante.component';
import {FormComponent} from './core/components/componentes/form.component';
import {OrdenadoresComponent} from './core/components/ordenadores/ordenadores.component';
import {OrdenadorDetalleComponent} from './core/components/ordenadores/ordenador-detalle.component';
import {LoginComponent} from './core/auth/login/login.component';
import {RegistroComponent} from './core/auth/registro/registro.component';
import {OrdenadoresUsuarioComponent} from './core/components/ordenadores-usuario/ordenadores-usuario.component';
// Services
import {ComponenteService} from './core/services/componente.service';
import {FormsModule} from '@angular/forms';
import {interceptorProvider} from './core/interceptors/interceptor.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'configurador', component: ConfiguratorComponent},
  {path: 'componentes', component: ComponentesComponent},
  {path: 'ordenadores', component: OrdenadoresComponent},
  {path: 'ordenadores-detalles/:id', component: OrdenadorDetalleComponent},
  {path: 'mis-configuraciones', component: OrdenadoresUsuarioComponent},
  {path: 'componentes/categoria/:id', component: ComponentesCategoriaComponent},
  {path: 'componentes/fabricante/:id', component: ComponentesFabricanteComponent},
  {path: 'componentes/form', component: FormComponent},
  {path: 'componentes/form/:id', component: FormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ConfiguratorComponent,
    HomeComponent,
    ComponentesComponent,
    ComponentesCategoriaComponent,
    ComponentesFabricanteComponent,
    FormComponent,
    OrdenadoresComponent,
    OrdenadorDetalleComponent,
    LoginComponent,
    RegistroComponent,
    OrdenadoresUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ComponenteService, interceptorProvider, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
