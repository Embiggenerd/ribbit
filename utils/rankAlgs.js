const gravity = 2.2
/*
*Similar to HackNews ranking algorith. The gravity is there to give proirity
to new posts.
*Notice we use the author's total reading hours like HN uses a posts' likes.
This means the author's past success in attracting readers has a significant
impact on exposure, incentivizing identity building.
*/
const ownTimelineRank = (blog, readingHours) => {
  const timeDiff = Math.abs(new Date - blog.dateSent)
  const ranking = readingHours/(timeDiff - 2)**gravity
  return Object.assign(blog._doc, {ranking})
}

module.exports = {
   ownTimelineRank
 }
