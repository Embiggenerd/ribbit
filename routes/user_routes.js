const _ = require('lodash');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const User = require('../models/User');
const mongoose = require('mongoose');
const follower = mongoose.model('followers');
const following = mongoose.model('following');
const wrapAsync = require('../middlewares/asyncWrapper');

module.exports = app => {
  app.get(
    '/api/users/:_id/following',
    wrapAsync(async (req, res) => {
      const user = await User.findById(req.params._id);
      res.send(user.following);
    })
  );

  app.get(
    '/api/users/:_id/followers',
    wrapAsync(async (req, res) => {
      const user = await User.findById(req.params._id);
      res.send(user.followers);
    })
  );

  /*
  * Adds user to requester's following list, adds requester to user's following list
  */
  app.post(
    '/api/users/:_id/followers',
    wrapAsync(async (req, res) => {
      const user = await User.findOne({ _id: req.params._id });

      const newFollower = new follower({
        displayName: req.user.displayName,
        _user: req.user.id
      });
      user.followers.push(newFollower);
      await user.save();
      const newFollow = new following({
        _user: user._id,
        displayName: user.displayName
      });
      req.user.following.push(newFollow);
      await req.user.save();
      res.send({
        follower: newFollower.toObject(),
        followed: newFollow.toObject()
      });
    })
  );

  /*
  Find user requester wants to unfollow, change user's followers, reqester's following
  */

  app.post(
    '/api/users/:_id/unfollow',
    wrapAsync(async (req, res) => {
      const unfollowed = await User.findOne({ _id: req.params._id });

      const newFollowers = unfollowed.followers.filter(follower => {
        return !follower._user.equals(req.user.id);
      });

      unfollowed.followers = newFollowers;

      unfollowed.save();
      const unfollower = req.user;
      const newFollowing = unfollower.following.filter(follow => {
        return !follow._user.equals(unfollowed._id);
      });
      unfollower.following = newFollowing;
      unfollower.save();
      res.send({
        unfollower: unfollower.toObject(),
        unfollowed: unfollowed.toObject()
      });
    })
  );

  /**
   * Update a user's credits based on reading hours
   */
  app.post(
    '/api/users/:_id/hours',
    wrapAsync(async (req, res) => {
      let {
        body: { hours },
        params: { _id }
      } = req;

      let user = await User.findOne({ _id });
      const updatedHours = user.readingHours + hours;
      const updatedCounter = user.hoursCounter + hours;
      user.readingHours = _.round(updatedHours, 4);
      user.hoursCounter = _.round(updatedCounter, 4);
      if (user.hoursCounter >= 1) {
        user.credits += 1;
        user.hoursCounter = _.round(user.readingHours % 1, 4);
      }
      user = await user.save();
      res.send(user);
    })
  );

  /*
  * Take credit away from requester, add credit to user
  */
  app.post(
    '/api/users/:_id/putOver',
    requireLogin,
    requireCredits,
    wrapAsync(async (req, res) => {
      const {
        params: { _id }
      } = req;

      const user = await User.findById(_id).select('credits displayName');
      user.credits += 1;
      const own = req.user;
      own.credits -= 1;
      const updatedOwn = await own.save();
      const updatedUser = await user.save();
      res.send({ credits: updatedOwn.credits });
    })
  );
};
