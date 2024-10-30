import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
    HttpEvent, HttpHandlerFn,
    HttpRequest, HttpResponse,
    provideHttpClient,
    withInterceptors,
    withInterceptorsFromDi
} from "@angular/common/http";
import { provideServiceWorker } from '@angular/service-worker';
import {Observable} from "rxjs";

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(withInterceptors([inspectionDataInterceptor$]), withInterceptorsFromDi()),
      provideServiceWorker('ngsw-worker.js', {
            enabled: true,
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};

export function inspectionDataInterceptor$(
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> | Observable<HttpResponse<undefined>> {
    console.log('request', request);
    return next(request);
}