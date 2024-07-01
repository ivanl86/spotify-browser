import { Image } from './image.interface';

export interface Artist {
  external_urls: { spotify: string };
  id: string;
  name: string;
  type: string;
  genres: string[];
  images: Image[];
  popularity: number;
}
