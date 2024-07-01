import { Album } from "./album.interface";

export interface AlbumList {
  albums: {
    items: Album[];
    limit: number;
    offset: number;
    total: number;
  };
}
