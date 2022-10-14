import { reactive } from "vue";

class Player {
  public _state = reactive({
    volume: 50,
    currentSong: {},
    currentPlaylist: {},
    queueItems: [],
    recentItems: [],
    repeat: "none",
  });

  constructor() {
    this._state.volume = 50;
  }
}

export default Player;
