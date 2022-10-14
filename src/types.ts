export interface Collection {
  _id: string;
  title: string;
  playlists: Playlist[];
}

export interface Playlist {
  _id: string;
  name: string;
  description: string;
  _created: Date;
  _changed: Date;
  image: string;
  tracks: string[];
}

export interface CarouselItem {
  _id: string;
  image: string;
  playlist_id: number;
  id: number;
  _created: Date;
}
