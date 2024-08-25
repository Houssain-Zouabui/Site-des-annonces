import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AccueilComponent } from './accueil/accueil.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AddsComponent } from './adds/adds.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ClientsComponent } from './clients/clients.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AnnonceCardComponent } from './annonce-card/annonce-card.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { FashionComponent } from './fashion/fashion.component';
import { PetsComponent } from './pets/pets.component';
import { SportComponent } from './sport/sport.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobsComponent } from './jobs/jobs.component';
import { PosterAnnonceComponent } from './poster-annonce/poster-annonce.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { environment } from '../environnement';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PopupNumeroComponent } from './popup-numero/popup-numero.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { TableauAnnonceComponent } from './tableau-annonce/tableau-annonce.component';
import { ModifierAnnonceComponent } from './modifier-annonce/modifier-annonce.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    ConnexionComponent,
    AccueilComponent,
    NavBarComponent,
    FooterComponent,
    AddsComponent,
    AboutComponent,
    ContactComponent,
    ClientsComponent,
    SignInComponent,
    AnnonceCardComponent,
    FashionComponent,
    PetsComponent,
    SportComponent,

    JobsComponent,
      PosterAnnonceComponent,
      DetailCardComponent,
      PopupNumeroComponent,
      SearchComponent,
      TableauAnnonceComponent,
      ModifierAnnonceComponent,
    
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule 
    
 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
