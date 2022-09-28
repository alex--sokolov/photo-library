import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './photo-gallery/pages/main/main.component';
import { FavoritesComponent } from './photo-gallery/pages/favorites/favorites.component';
import { SinglePhotoComponent } from './photo-gallery/pages/single-photo/single-photo.component';
import { GalleryHeaderComponent } from './photo-gallery/components/gallery-header/gallery-header.component';
import { PhotoGalleryModule } from './photo-gallery/photo-gallery.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FavoritesComponent,
    SinglePhotoComponent,
    GalleryHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    PhotoGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
