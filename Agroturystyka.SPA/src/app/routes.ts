import { Routes } from "@angular/router";
import { CommentsComponent } from "./comments/comments.component";
import { ContactComponent } from "./contact/contact.component";
import { FarmComponent } from "./farm/farm.component";
import { GardenComponent } from "./garden/garden.component";
import { HomeComponent } from "./home/home.component";
import { Price_listComponent } from "./price_list/price_list.component";
import { RoomsComponent } from "./rooms/rooms.component";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'pokoje', component: RoomsComponent },
    { path: 'ogród', component: GardenComponent },
    { path: 'hodowla', component: FarmComponent},
    { path: 'opinie', component: CommentsComponent },
    { path: 'kontakt', component: ContactComponent },
    { path: 'cennik', component: Price_listComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];