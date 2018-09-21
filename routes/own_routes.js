const User = require('../models/User');
const Blog = require('../models/Blog');
const _ = require('lodash');
const { ownTimelineRank, trendingRank } = require('../utils/rankAlgs');
const wrapAsync = require('../middlewares/asyncWrapper');

module.exports = app => {
  app.get(
    '/api/own/follow',
    wrapAsync(async (req, res) => {
      const ownUser = await User.findById(req.user.id);
      const ownFollowsObject = {
        followers: ownUser.followers,
        following: ownUser.following
      };
      res.send(ownFollowsObject);
    })
  );

  /*
  * Retrieves all the posts of the users requester is following, ranks them
  in such a way that both time since posted and author's popularity are considered
  */
  // app.get(
  //   "/api/own/timeline",
  //   wrapAsync(async (req, res) => {
  //     // Get user ids of those you are following
  //     const { following } = await User.findById(req.user.id).select("following")
  //     // Retreive their 20 most recent blogs, reading hours in parallel
  //     const followBlogsArr = await Promise.all(
  //       following.map(async follow => {
  //         const user = await User.findById(follow._user).select("readingHours")
  //         const followBlogs = await Blog.find({ _user: follow._user })
  //           .sort("-dateSent")
  //           .limit(20)
  //         // Add rank property to each of a user's blogs by using user's reading time
  //         const blogsWithHours = followBlogs.map(blog => ({
  //           ...blog._doc,
  //           ranking: ownTimelineRank(blog.dateSent, user.readingHours)
  //         }))
  //         return blogsWithHours
  //       })
  //     )
  //     // Flatten the array of arrays of blogs, sort by rank
  //     const flatSortedBlogs = followBlogsArr
  //       .reduce((a, b) => a.concat(b), [])
  //       .sort((a, b) => b.ranking - a.ranking)
  //     res.send(flatSortedBlogs)
  //   })
  // )

  // app.get(
  //   '/api/own/timeline',
  //   wrapAsync(async (req, res) => {
  //     // Get user ids of those you are following
  //     const { following } = await User.findById(req.user.id).select(
  //       'following'
  //     );
  //     // Retreive their 20 most recent blogs, reading hours in parallel
  //     const followBlogsArr = await Promise.all(
  //       following.map(async follow => {
  //         const user = await User.findById(follow._user).select('readingHours');
  //         const followBlogs = await Blog.find({ _user: follow._user })
  //           .sort('-dateSent')
  //           .limit(20);
  //         // Add rank property to each of a user's blogs by using user's reading time
  //         const blogsWithHours = followBlogs.map(blog => ({
  //           ...blog._doc,
  //           ranking: ownTimelineRank(
  //             blog.dateSent,
  //             user.readingHours,
  //             blog.ribs
  //           )
  //         }));
  //         return blogsWithHours;
  //       })
  //     );
  //     // Flatten the array of arrays of blogs, sort by rank
  //     const flatSortedBlogs = followBlogsArr
  //       .reduce((a, b) => a.concat(b), [])
  //       .sort((a, b) => b.ranking - a.ranking);
  //     res.send(flatSortedBlogs);
  //   })
  // );
  app.get(
    '/api/own/timeline',
    wrapAsync(async (req, res) => {
      // Get user ids of those you are following
      const { following } = await User.findById(req.user.id).select(
        'following'
      );
      // Retreive their 20 most recent blogs, reading hours in parallel
      const followBlogsArr = await Promise.all(
        following.map(async follow => {
          const user = await User.findById(follow._user).select('readingHours');
          const followBlogs = await Blog.find({ _user: follow._user })
            .sort('-dateSent')
            .limit(20);
          // Add user's reading hours to each blog
          const blogsWithHours = followBlogs.map(blog => ({
            ...blog._doc,
            userReadingHours: user.readingHours
          }));
          // console.log('blogsWithHours', blogsWithHours);
          return blogsWithHours;
        })
      );
      // Flatten the array of arrays of blogs, sort by rank
      const flatBlogs = followBlogsArr.reduce((a, b) => a.concat(b), []);
      // // console.log('flatBlogs', flatBlogs);

      res.send(flatBlogs);
    })
  );

  /*
  *Finds the last 50 blogs written into database.
  *Makes parallel queries for the authors of the blogs' reading hours.
  *Adds the reading hours to each blog so that a ranking alg can determine
  their sort order.
   */

  app.get(
    '/api/own/trending',
    wrapAsync(async (req, res) => {
      // Convoluted parts have to do with minimizing queries to per authors
      // Instead of per blog
      const trendingBlogs = await Blog.find({})
        .sort('-dateSent')
        .limit(50);
      // Get array of author ids
      const trendingAuthors = trendingBlogs.map(blog => blog._user.toString());
      // Get list of unique author ids to find their readingHours
      const uniqAuthors = [...new Set(trendingAuthors)];
      // Get their readinghours in parallel, return array of objects
      // to make handling data later easier
      const authorHours = await Promise.all(
        uniqAuthors.map(async author => {
          const user = await User.findById(author).select('readingHours');
          return { readingHours: user.readingHours, _user: author };
        })
      );
      // Reduces list of oject that have an author and reading hours property
      // To one object with name of author's ID and it's value author's reading hours
      const handler = authorHours.reduce((acc, next) => {
        acc[next._user] = next.readingHours;
        return acc;
      }, {});
      // Use handler object to retreive reading hours by id, create ranking property,
      // sort list by ranking
      const rankedTrending = trendingBlogs
        .map(blog => {
          return Object.assign({}, blog._doc, {
            ranking: trendingRank(blog.dateSent, handler[blog._user])
          });
        })
        .sort((a, b) => b.ranking - a.ranking);
      res.send(rankedTrending);
    })
  );
};
