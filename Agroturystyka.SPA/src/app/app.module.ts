import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyGalleryModule } from 'angular-gallery';
import { UserService } from './_services/user.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FarmComponent } from './farm/farm.component';
import { ContactComponent } from './contact/contact.component';
import { Price_listComponent } from './price_list/price_list.component';
import { CommentsComponent } from './comments/comments.component';
import { GardenComponent } from './garden/garden.component';
import { appRoutes } from './routes';
import { PhotosComponent } from './photos/photos.component';
import { PhotoService } from './_services/photo.service';

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
      GardenComponent,
      PhotosComponent
   ],
  imports: [
    BrowserModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    IvyGalleryModule,
    HttpClientModule,
    NgxGalleryModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    UserService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
