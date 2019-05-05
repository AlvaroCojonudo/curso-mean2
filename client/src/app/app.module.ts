import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DahsboardComponent } from './components/dahsboard/dahsboard.component';
import { ErrorComponent } from './components/error/error.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ReproductorComponent } from './components/reproductor/reproductor.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    DahsboardComponent,
    ErrorComponent,
    ArtistListComponent,
    ReproductorComponent,
    ArtistAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
