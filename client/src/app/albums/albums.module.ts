import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumComponent } from './album/album.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        AlbumComponent
    ],
    imports: [
        CommonModule,
        AlbumsRoutingModule,
        SharedModule
    ]
})
export class AlbumsModule { }
