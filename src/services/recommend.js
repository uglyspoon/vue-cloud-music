import instance from "@/utils/request";

export function getBanner() {
  const url = "/banner";
  return instance.get(url);
}

export function getRecommendList() {
  const url = "/personalized";
  return instance.get(url);
}

export function getRecommendMusic() {
  const url = "/personalized/newsong";
  return instance.get(url);
}

export function getRecommendListDetail(id) {
  const url = `/playlist/detail?id=${id}`;
  return instance.get(url);
}
