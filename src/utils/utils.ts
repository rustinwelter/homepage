import type { CollectionEntry } from "astro:content";

export const sortByDate = (
  a: CollectionEntry<"blog">,
  b: CollectionEntry<"blog">
) => {
  if (
    a.data.lastUpdateDate !== undefined &&
    b.data.lastUpdateDate !== undefined
  ) {
    return b.data.lastUpdateDate.getTime() - a.data.lastUpdateDate.getTime();
  } else if (a.data.lastUpdateDate !== undefined) {
    return b.data.postDate.getTime() - a.data.lastUpdateDate.getTime();
  } else if (b.data.lastUpdateDate !== undefined) {
    return b.data.lastUpdateDate.getTime() - a.data.postDate.getTime();
  } else {
    return b.data.postDate.getTime() - a.data.postDate.getTime();
  }
};
