import { fetchPlaylist } from "@/api";
import { Playlist, Track } from "@/types";
import { Howl, Howler } from "howler";
import { cloneDeep, head, shuffle } from "lodash-es";
import { computed, reactive, ref, watch, WritableComputedRef } from "vue";
import { getObject, saveObject } from "./storage";

const QUALITY = "128";

enum Repeat {
  None = "none",
  One = "one",
  All = "all",
}

class Player {
  public _howler: Howl | undefined;
  private _volumeBeforeMuted: number = 0;
  private _isMuted: boolean = false;
  private _state = reactive({
    volume: 50,
    currentSong: {} as Track,
    currentPlaylist: {} as Playlist,
    queueItems: [] as Track[],
    recentItems: [] as Track[],
    isShuffle: false,
    repeat: Repeat.None,
  });

  private _reactivity = reactive({
    isPlaying: false,
    isShowKaraoke: false,
  });

  public currentSongId: string = "";
  public currentPlaylistId: string = "";
  public duration: number = 0;
  public isProgressBusy: boolean = false;

  // Vue Reactivity
  public isShowQueuePlaylist = ref(false);
  public progress = ref(0);

  constructor() {
    this.volume = 50;
    const obj = getObject("Player");
    if (obj) {
      this._state = reactive(obj);
    }
    this._subscribe();
    this.looper();
    this.initMediaSession();
  }
  looper() {
    if (this._howler && this.isPlaying && !this.isProgressBusy) {
      try {
        const current = this._howler.seek() || 0;
        const total = this._howler.duration() || 0;
        this.progress.value = current && total ? (+current / total) * 100 : 0;
      } catch {}
    }
    setTimeout(() => {
      this.looper();
    }, 500);
  }
  _subscribe() {
    watch(this._state, (val) => {
      saveObject("Player", val);
    });
  }
  writableComputed<T extends keyof Omit<Player, "currentPlaylistItems">>(
    key: T
  ): WritableComputedRef<Player[T]> {
    return computed({
      get: () => {
        return this[key];
      },
      set: (val: any) => {
        this[key] = val;
      },
    });
  }

  get queues(): Track[] {
    return this._state.queueItems;
  }

  set queues(val: Track[]) {
    this._state.queueItems = val;
  }

  get volume(): number {
    return this._state.volume;
  }

  set volume(val: number) {
    if (val !== 0) {
      this._volumeBeforeMuted = val;
    }
    this._state.volume = val;
    if (this._howler) {
      this._howler.volume(val / 100);
    }
  }

  get isMuted(): boolean {
    return this._isMuted;
  }

  set isMuted(val: boolean) {
    if (val) {
      this.volume = 0;
    } else {
      this.volume = this._volumeBeforeMuted;
    }
    this._isMuted = val;
  }

  get currentPlaylistItems(): Track[] {
    if (this.currentPlaylist && Array.isArray(this.currentPlaylist.tracks)) {
      const ids = this.recentItems.map((item) => item._id);
      return this.currentPlaylist.tracks.filter(
        (item) => !ids.includes(item._id)
      );
    }
    return [];
  }

  get recentItems(): Track[] {
    return this._state.recentItems;
  }

  set recentItems(val: Track[]) {
    this._state.recentItems = val;
  }

  get currentSong(): Track {
    return this._state.currentSong;
  }

  set currentSong(song: Track) {
    this.currentSongId = song._id;
    let index = this.queues.findIndex((item) => item._id === song._id);
    if (index >= 0) {
      this.queues.splice(index, 1);
    }
    index = this.recentItems.findIndex((item) => item._id === song._id);
    if (index >= 0) {
      this.recentItems.splice(index, 1);
    }
    this.recentItems.push(song);
    this._state.currentSong = song;
  }

  get currentPlaylist(): Playlist {
    return this._state.currentPlaylist;
  }

  set currentPlaylist(playlist: Playlist) {
    if (playlist) {
      this._state.currentPlaylist = cloneDeep(playlist);
      this.currentPlaylistId = playlist._id;
      this.recentItems = [];
      if (this.currentSongId && Array.isArray(this.currentPlaylist.tracks)) {
        const index = this.currentPlaylist.tracks.findIndex(
          (song) => song._id === this.currentSongId
        );
        this.currentPlaylist.tracks.splice(-1, index);
      }
      this.queues = this.currentPlaylistItems;
    }
  }

  get isPlaying(): boolean {
    return this._reactivity.isPlaying;
  }

  set isPlaying(val: boolean) {
    this._reactivity.isPlaying = val;
    if (this._howler) {
      if (val) {
        this._howler.play();
      } else {
        this._howler.pause();
      }
    } else if (this.currentSong) {
      this.loadSong(true);
    }
  }

  get isShuffle(): boolean {
    return this._state.isShuffle;
  }

  set isShuffle(val: boolean) {
    this._state.isShuffle = val;
    if (val && this.currentPlaylistId) {
      this.queues = shuffle(this.currentPlaylistItems);
    } else {
      this.queues = this.currentPlaylistItems;
    }
  }

  get repeat(): Repeat {
    return this._state.repeat;
  }

  set repeat(val: Repeat) {
    this._state.repeat = val;
  }

  get nextSong(): Track | undefined {
    return head(this.queues);
  }

  get isShowKaraoke(): boolean {
    return this._reactivity.isShowKaraoke;
  }

  set isShowKaraoke(val: boolean) {
    this._reactivity.isShowKaraoke = val;
  }

  handleOnend(): void {
    this.isPlaying = false;
    if (this.repeat === Repeat.One) {
      setTimeout(() => {
        this.isPlaying = true;
      }, 500);
      return;
    }
    this.handleNextSong();
  }

  initMediaSession() {
    const navigator: any = window.navigator;
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        this.isPlaying = true;
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        this.isPlaying = false;
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        console.log("previoustrack");
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        this.handleNextSong();
      });
      navigator.mediaSession.setActionHandler("stop", () => {
        this.isPlaying = false;
      });
    }
  }

  _updateMediaSessionMetaData() {
    const navigator: any = window.navigator;
    const MediaMetadata: any = (<any>window).MediaMetadata;
    if ("mediaSession" in navigator === false) {
      return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: this.currentSong.name,
      artist: this.currentSong.artists,
      album: "Zing MP3",
      artwork: [
        {
          src: this.currentSong.artwork,
          type: "image/jpg",
          sizes: "512x512",
        },
      ],
    });
  }

  async loadSong(autoPlay?: boolean, song?: Track) {
    Howler.unload();
    const _song = song ? song : this.currentSong;
    const source = _song.mp3_link;
    this._howler = new Howl({
      src: [source],
      html5: true,
      format: ["mp3"],
      onend: this.handleOnend.bind(this),
    });
    this._updateMediaSessionMetaData();

    if (autoPlay) {
      this.isPlaying = true;
      document.title = `${this.currentSong.name} - ${this.currentSong.artists} | NCT`;
    }
  }
  seek(percent?: number): number | void {
    if (this._howler) {
      if (percent) {
        this._howler.seek((percent / 100) * this._howler.duration());
      } else {
        try {
          return this._howler.seek() as number;
        } catch {
          return 0;
        }
      }
    }
  }
  calculateDuration(percent: number) {
    if (this._howler) {
      return (percent / 100) * this._howler.duration() || 0;
    }
    return 0;
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  toggleShuffle(): void {
    this.isShuffle = !this.isShuffle;
  }

  toggleRepeat(): void {
    switch (this.repeat) {
      case Repeat.None:
      case undefined:
        this.repeat = Repeat.One;
        break;
      case Repeat.One:
        this.repeat = Repeat.All;
        break;
      case Repeat.All:
        this.repeat = Repeat.None;
        break;
    }
  }
  async playSong(song?: Track, playlist?: Playlist, isShuffle = false) {
    if (this.currentSongId === song?._id) {
      this.togglePlay();
      return;
    }

    if (playlist && this.currentPlaylistId !== playlist._id) {
      this.currentPlaylist = playlist;
      if (isShuffle) {
        this.isShuffle = true;
      }
    }

    if (song) this.currentSong = song;

    this.loadSong(true);
  }

  handleNextSong() {
    if (this.nextSong) this.currentSong = this.nextSong;
    this.loadSong(true);
  }

  playPlaylist(playlist = <Playlist>{}, isShuffle = false) {
    if (playlist._id === this.currentPlaylistId) {
      return this.togglePlay();
    }
    if (playlist.tracks && Array.isArray(playlist.tracks)) {
      const firstSong = playlist.tracks[0];
      if (firstSong) {
        this.playSong(firstSong, playlist, isShuffle);
      }
    } else {
      this.loadPlaylist(playlist);
    }
  }

  async loadPlaylist(playlist: Playlist) {
    const result: any = await fetchPlaylist(playlist._id).catch(() => false);

    if (result && result.name) {
      this.playPlaylist(result);
    }
  }
}

export default Player;
