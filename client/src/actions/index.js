import axios from "axios"
import { wrapAsync } from "../middleware"
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_BLOGS,
  FETCH_BLOG_DETAIL,
  FETCH_COMMENTS,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  DELETE_BLOG,
  FETCH_FOLLOWING,
  FETCH_FOLLOWERS,
  TO_FOLLOW,
  TO_UNFOLLOW,
  OWN_FOLLOW,
  OWN_TIMELINE,
  TRENDING,
  PUT_OVER,
  RIB,
  CLEAR_ERROR
} from "./types"

export const fetchUser = () =>
  wrapAsync(async dispatch => {
    const res = await axios.get("/api/current_user")
    dispatch({ type: FETCH_USER, payload: res.data })
  })

export const handleToken = token =>
  wrapAsync(async dispatch => {
    // Send token from client to server for backend to handle,
    // then update the header on client with most current 'credits' data
    const res = await axios.post("/api/stripe", token)
    dispatch({ type: FETCH_USER, payload: res.data })
  })

export const submitBlog = (values, history) =>
  wrapAsync(async () => {
    const res = await axios.post("/api/blogs", values)
    history.push("/dashboard")
  //  dispatch({type:"lala", payload: res.data})
  })

export const fetchBlogDetail = blogId =>
  wrapAsync(async dispatch => {
    const getUrl = `/api/blog/${blogId}/detail`
    const res = await axios.get(getUrl)
    dispatch({ type: FETCH_BLOG_DETAIL, payload: res.data })
  })

export const fetchBlogs = () =>
  wrapAsync(async dispatch => {
    const res = await axios.get("/api/blogs")
    //console.log("fetchBlogs:", JSON.stringify(res.data, null, 2))

    dispatch({ type: FETCH_BLOGS, payload: res.data })
  })

export const fetchUserBlogs = _user =>
  wrapAsync(async dispatch => {
    const res = await axios.get(`/api/blogs/${_user}`)
    dispatch({ type: FETCH_BLOGS, payload: res.data })
  })

export const submitComment = (text, blogId) =>
  wrapAsync(async dispatch => {
    const res = await axios.post("/api/comments/submit", { text, blogId })
    dispatch({ type: SUBMIT_COMMENT, payload: res.data })
  })

export const fetchComments = blogId =>
  wrapAsync(async dispatch => {
    const res = await axios.get(`/api/blog/${blogId}/comments`)
    dispatch({ type: FETCH_COMMENTS, payload: res.data })
  })

export const fetchUserComments = userId =>
  wrapAsync(async dispatch => {
    const res = await axios.get(`/api/users/${userId}/comments`)
    dispatch({ type: FETCH_COMMENTS, payload: res.data })
  })

export const deleteBlog = (blogId, history) =>
  wrapAsync(async dispatch => {
    const res = await axios.post(`/api/blogs/${blogId}/delete`)
    if (history) {
      history.push("/dashboard")
    }

    dispatch({ type: DELETE_BLOG, _id: res.data })
  })

export const deleteComment = commentId =>
  wrapAsync(async dispatch => {
    const res = await axios.post(`/api/comments/${commentId}/delete`)
    dispatch({ type: DELETE_COMMENT, shouldConfirm: true, payload: res.data })
  })

export const fetchUserFollowers = userId =>
  wrapAsync(async dispatch => {
    const res = await axios.get(`/api/users/${userId}/followers`)
    dispatch({ type: FETCH_FOLLOWERS, payload: res.data })
  })

export const fetchUserFollowing = userId =>
  wrapAsync(async dispatch => {
    const res = await axios.get(`/api/users/${userId}/following`)
    dispatch({ type: FETCH_FOLLOWING, payload: res.data })
  })

export const toFollow = userId =>
  wrapAsync(async dispatch => {
    const res = await axios.post(`/api/users/${userId}/followers`)
    dispatch({
      type: TO_FOLLOW,
      follower: res.data.follower,
      followed: res.data.follow
    })
  })

export const toUnfollow = userId =>
  wrapAsync(async dispatch => {
    const res = await axios.post(`/api/users/${userId}/unfollow`)
    dispatch({
      type: TO_UNFOLLOW,
      unfollower: res.data.unfollower,
      unfollowed: res.data.unfollowed
    })
  })

export const fetchOwnFollow = () =>
  wrapAsync(async dispatch => {
    const res = await axios.get("/api/own/follow")
    dispatch({
      type: OWN_FOLLOW,
      followers: res.data.followers,
      following: res.data.following
    })
  })

export const fetchOwnTimeline = () =>
  wrapAsync(async dispatch => {
    const res = await axios.get("/api/own/timeline")
    dispatch({
      type: OWN_TIMELINE,
      timeline: res.data
    })
  })

export const rib = blogId =>
  wrapAsync(async dispatch => {
    const res = await axios.post(`/api/blogs/${blogId}/rib`)
    const { ribs, _id, credits } = res.data
    dispatch({
      type: RIB,
      ribs,
      _id,
      credits
    })
  })

export const getTrending = () =>
  wrapAsync(async dispatch => {
    const res = await axios.get("/api/own/trending")
    dispatch({
      type: TRENDING,
      payload: res.data
    })
  })

export const putOver = userId =>
  wrapAsync(async dispatch => {
    const res = await axios.post(`/api/users/${userId}/putOver`)
    const { credits } = res.data
    dispatch({
      type: PUT_OVER,
      credits
    })
  })

export const clearError = () => dispatch => {
  dispatch({
    type: CLEAR_ERROR
  })
}
