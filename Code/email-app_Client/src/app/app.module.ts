import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailComposeComponent } from './email-compose/email-compose.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  // Define routes for navigation
  {path: '',component: EmailComposeComponent}, // Route to EmailComposeComponent for home page
  {path:'reset', component: ResetPasswordComponent} // Route to ResetPasswordComponent for reset page
]

@NgModule({
  declarations: [
    AppComponent,
    EmailComposeComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
