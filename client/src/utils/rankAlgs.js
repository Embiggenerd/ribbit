const gravity = 2.2;
const trendingGravity = 1.5;
const ribMultiplier = 0.5;
const timeDiffMultiplier = 1 / 100000000;
/*
*Similar to HackNews ranking algorith. The gravity is there to give proirity
to new posts.
*Notice we use the author's total reading hours like HN uses a posts' likes.
This means the author's past success in attracting readers has a significant
impact on exposure, incentivizing identity building.
*/
export const ownTimelineRank = (dateSent, readingHours, ribs) => {
  const ribz = ribs * ribMultiplier;
  const timeDiff = Math.abs(new Date() - new Date(dateSent));

  const ranking =
    readingHours - ribz / (timeDiff * timeDiffMultiplier) ** gravity;
  return ranking;
};

// Less emphasis on time, more on author's popularity
export const trendingRank = (dateSent, readingHours) => {
  const timeDiff = Math.abs(new Date() - dateSent);
  const ranking = readingHours / (timeDiff - 2) ** trendingGravity;
  return ranking;
};
