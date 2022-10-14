import { ComputedRef, WritableComputedRef } from "@vue/reactivity";
import Player from "./helpers/player";
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
  tracks: Track[];
}

export interface CarouselItem {
  _id: string;
  image: string;
  playlist_id: number;
  id: number;
  _created: Date;
}

export interface Track {
  _id: string;
  name: string;
  artists: string;
  artwork: string;
  mp3_link: string;
  duration: string;
}
export interface UsePlayer {
  [key: string]: any;
  currentSong: ComputedRef<Track>;
  currentSongId: ComputedRef<string>;
  currentPlaylist: ComputedRef<Playlist>;
  currentPlaylistId: ComputedRef<string>;
  repeat: ComputedRef<string>;
  volume: WritableComputedRef<number>;
  isMuted: WritableComputedRef<boolean>;
  isShowKaraoke: WritableComputedRef<boolean>;
  isPlaying: any;
  isShowQueuePlaylist: any;
  isShuffle: any;
  progress: any;
  Player: Player;
  playSong(song?: Track, playlist?: Playlist, isShuffle?: boolean): void;
  playPlaylist(playlist?: Playlist, isShuffle?: boolean): void;
  togglePlay(): void;
  toggleShuffle(): void;
}
