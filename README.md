# ribbit

An original social network in react/node. Uses reading hours, purchased credits, and "ribbits" to compete for users' attention.

## In Detail
* An author's total reading hours affect the visibility of his posts in his followers' timeline positively.
* Age of a post affects a post negatively.
* Credits are earned per reading hours, or per dollar as purchased using stripe.
* You can spend credits to Ribbit posts, which lowers their visibility.
* Ribbits are essentially dislikes that have a negative impact on a user's competition, and must be earned or bought.
* Credits can be transfered from user to user.

## Visit App

[Ribbit](https://dashboard.heroku.com/apps/cryptic-chamber-20731)

This is using heroku's free tier, so the dyno may be asleep. Give it 10 seconds to startup if you don't see anything.

## Demonstrates
* Understanding of user behavior in social networks.
* React, redux, react-router.
* OAuth is used for authentication, and email data from google is used to send emails when a user comments on your post.
* Implementation of stripe's test app to purchase usable in-app currency.
