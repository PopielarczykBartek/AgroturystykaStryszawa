import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { RoomsComponent } from './rooms/rooms.component';
import { FarmComponent } from './farm/farm.component';
import { ContactComponent } from './contact/contact.component';
import { Price_listComponent } from './price_list/price_list.component';
import { CommentsComponent } from './comments/comments.component';
import { GardenComponent } from './garden/garden.component';
import { appRoutes } from './routes';

@NgModule({
  declarations: [						
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      RoomsComponent,
      FarmComponent,
      ContactComponent,
      Price_listComponent,
      CommentsComponent,
      GardenComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
