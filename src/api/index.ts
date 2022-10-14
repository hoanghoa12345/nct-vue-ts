import request from "@/helpers/request";

export function fetchCarousels() {
  return request({
    url: "slideshows?limit=7&sort=_created&dir=-1",
  });
}

export function fetchAllCollections() {
  return request({
    url: "collections",
  });
}
