import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UsersHandlerService} from './components/Services/users-handler.service';
import { LoginComponent } from './components/login/login.component';
import {PointsHandlerService} from './components/Services/points-handler.service';
import {TableComponent} from './components/table/table.component';
import {UserGuard} from './user.guard';
import {GraphicComponent} from './components/graphic/graphic.component';
import { NpeComponent } from './components/npe/npe.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';

const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [UserGuard]},
  {path: 'clear', component: MainPageComponent, canActivate: [UserGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UserGuard]},
  {path: 'register', component: AuthorizationComponent, canActivate: [UserGuard]},
  {path: 'npe', component: NpeComponent},
  {path: '**', redirectTo: '/login'}
];
export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AuthorizationComponent,
    LoginComponent,
    TableComponent,
    GraphicComponent,
    NpeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    UsersHandlerService,
    PointsHandlerService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
