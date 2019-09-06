import instance from "@/utils/request";

export function getBanner() {
  return instance.get("/banner");
}

export function getRecommendList() {
  return instance.get("/personalized");
}

export function getRecommendMusic() {
  return instance.get("/personalized/newsong");
}

export function getRecommendListDetail(id) {
  return instance.get(`/playlist/detail?id=${id}`);
}
