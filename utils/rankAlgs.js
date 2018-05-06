const gravity = 2.2
const trendingGravity = 1.5
/*
*Similar to HackNews ranking algorith. The gravity is there to give proirity
to new posts.
*Notice we use the author's total reading hours like HN uses a posts' likes.
This means the author's past success in attracting readers has a significant
impact on exposure, incentivizing identity building.
*/
const ownTimelineRank = (dateSent, readingHours) => {
  const timeDiff = Math.abs(new Date - dateSent)
  const ranking = readingHours/(timeDiff - 2)**gravity
  return ranking
}

// Less emphasis on time, more on author's popularity
 const trendingRank = (dateSent, readingHours) => {
   const timeDiff = Math.abs(new Date - dateSent)
   const ranking = readingHours/(timeDiff - 2)**trendingGravity
   return ranking
 }


  module.exports = {
     ownTimelineRank,
     trendingRank

   }
