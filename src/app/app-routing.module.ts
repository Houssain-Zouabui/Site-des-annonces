import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AddsComponent } from './adds/adds.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ClientsComponent } from './clients/clients.component';
import { AnnonceCardComponent } from './annonce-card/annonce-card.component';
import { FashionComponent } from './fashion/fashion.component';
import { PosterAnnonceComponent } from './poster-annonce/poster-annonce.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PopupNumeroComponent } from './popup-numero/popup-numero.component';
import { SearchComponent } from './search/search.component';
import { TableauAnnonceComponent } from './tableau-annonce/tableau-annonce.component';



const routes: Routes = [
  {path:"",component:SignUpComponent},
  {path:"accueil",component:AccueilComponent},
  {path:"adds",component:AddsComponent},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"clients",component:ClientsComponent},
  {path:"annonces/:idCategorie",component:AnnonceCardComponent},
  {path:"fashion",component:FashionComponent},

  { path: 'annonce/:id', component: DetailCardComponent },
  {path:"sign-in",component:SignInComponent},
  {path:"popup",component:PopupNumeroComponent},
  {path:"poster",component:PosterAnnonceComponent},
  {path:"search",component:SearchComponent},
  {path:"mes-annonce",component:TableauAnnonceComponent},














  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
