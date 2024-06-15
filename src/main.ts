// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './app/Account/login/login.component';
import { LoginService } from './app/services/account/login.service';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  // const imports = [
  //   CommonModule,
  //   ReactiveFormsModule,
  //   HttpClientModule // Include HttpClientModule here
  // ];
  
  // const providers = [
  //   LoginService
  // ];
  // platformBrowserDynamic(imports, providers).bootstrapModule(LoginComponent)
  // .catch(err => console.error(err));
