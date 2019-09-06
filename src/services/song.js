import instance from "@/utils/request";

export function getSong(id) {
  return instance.get(`/song/url?id=${id}`);
}

export function getLyric(id) {
  return instance.get(`/lyric?id=${id}`);
}
