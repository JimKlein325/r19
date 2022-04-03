import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { ProjectDashboardModule } from '@r19/project-dashboard';
import { SharedMaterialModule } from '@r19/shared/material';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      // {
      //   path: 'books',
      //   loadChildren: () =>
      //     import('@book-co/books-page').then((m) => m.BooksPageModule),
      // },
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'books',
      // },
    ]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    ProjectDashboardModule,
    SharedMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
