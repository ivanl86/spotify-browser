import { Track } from "./track.interface";

export interface TrackList {
  tracks: {
    items: Track[];
    limit: number;
    offset: number;
    total: number;
  }
}
