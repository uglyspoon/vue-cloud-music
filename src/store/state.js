import { playMode } from "@/utils/config";
import { loadSearch, loadPlay, loadFavorite } from "@/utils/cache";

const state = {
  musicList: {},
  singer: {},
  // 播放
  playing: false,
  // 全屏
  fullScreen: false,
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
};

export default state;
