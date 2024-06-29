import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, withInterceptors } from '@angular/common/http';
import { environment } from '../environment';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './core/interceptor/token.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),provideHttpClient(withInterceptors([tokenInterceptor])), provideAnimations(),
    { provide: 'BASE_URL', useValue: environment.baseUrl}, provideAnimationsAsync(), provideCharts(withDefaultRegisterables())
  ],
};
