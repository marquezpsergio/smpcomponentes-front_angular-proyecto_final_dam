import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
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
// Services
import {ComponenteService} from './core/services/componente.service';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'configurador', component: ConfiguratorComponent},
  {path: 'componentes', component: ComponentesComponent},
  {path: 'ordenadores', component: OrdenadoresComponent},
  {path: 'ordenadores-detalles/:id', component: OrdenadorDetalleComponent},
  {path: 'componentes/categoria/:id', component: ComponentesCategoriaComponent},
  {path: 'componentes/fabricante/:id', component: ComponentesFabricanteComponent},
  {path: 'componentes/form', component: FormComponent},
  {path: 'componentes/form/:id', component: FormComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

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
    OrdenadorDetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ComponenteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
