import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { FavoritesComponent } from './photo-gallery/pages/favorites/favorites.component';
import { MainComponent } from './photo-gallery/pages/main/main.component';

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'photos',
    loadChildren: () => import('./photo-gallery/photo-gallery.module').then(m => m.PhotoGalleryModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

