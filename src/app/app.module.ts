import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import{ FormsModule,NgForm} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { PersonalLoanComponent } from './personal-loan/personal-loan.component'
import { HttpClientModule } from '@angular/common/http';
import { DisplayCompComponent } from './display-comp/display-comp.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PersonalLoanComponent,
    DisplayCompComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: PersonalLoanComponent },
      {path:'displayComp',component:DisplayCompComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
