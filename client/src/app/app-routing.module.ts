import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'albums', loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule) },
  { path: 'artists', loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule) },
  { path: 'tracks', loadChildren: () => import('./tracks/tracks.module').then(m => m.TracksModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
