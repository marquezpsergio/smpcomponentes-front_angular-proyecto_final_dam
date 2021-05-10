import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http"
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ConfiguratorComponent } from './core/components/configurator/configurator.component';
import { HomeComponent } from './core/components/home/home.component';
import { ComponentesComponent } from './core/components/componentes/componentes.component';
// Services
import { ComponenteService } from './core/services/componente.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ConfiguratorComponent,
    HomeComponent,
    ComponentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ComponenteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
