import axios from "axios"
import { wrapAsync } from '../middlewear'
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
  RIB
} from "./types"

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user")
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
  // Send token from client to server for backend to handle,
  // then update the header on client with most current 'credits' data
  const res = await axios.post("/api/stripe", token)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitBlog = (values, history) => wrapAsync(async dispatch => {

    const res = await axios.post("/api/blogs", values)
    history.push("/dashboard")

})

export const fetchBlogDetail = blogId => async dispatch => {
  const getUrl = `/api/blog/${blogId}/detail`
  const res = await axios.get(getUrl)
  dispatch({ type: FETCH_BLOG_DETAIL, payload: res.data })
}

export const fetchBlogs = () => async dispatch => {
  console.log("fethBlogs invoked")
  const res = await axios.get("/api/blogs")
  dispatch({ type: FETCH_BLOGS, payload: res.data })
}

export const fetchUserBlogs = _user => async dispatch => {
  const res = await axios.get(`/api/blogs/${_user}`)
  dispatch({ type: FETCH_BLOGS, payload: res.data })
}

export const submitComment = (text, blogId) => async dispatch => {
  console.log("submitComment's arguments ", text, blogId)
  const res = await axios.post("/api/comments/submit", { text, blogId })
  dispatch({ type: SUBMIT_COMMENT, payload: res.data })
}

export const fetchComments = blogId => async dispatch => {
  const res = await axios.get(`/api/blog/${blogId}/comments`)
  // console.log("fetchComment's response: ", res.data)
  dispatch({ type: FETCH_COMMENTS, payload: res.data })
}
export const fetchUserComments = userId => async dispatch => {
  // console.log("ftchUseComments invoked: ", _user)

  const res = await axios.get(`/api/users/${userId}/comments`)
  dispatch({ type: FETCH_COMMENTS, payload: res.data })
}

export const deleteBlog = (blogId, history) => async dispatch => {
  const res = await axios.post(`/api/blogs/${blogId}/delete`)
  console.log("deleteBlog invoked, deleted: ", res.data._id, blogId)
  history.push("/dashboard")
  dispatch({ type: DELETE_BLOG, payload: res.data })
}

export const deleteComment = commentId => async dispatch => {
  const res = await axios.post(`/api/comments/${commentId}/delete`)

  dispatch({ type: DELETE_COMMENT, shouldConfirm: true, payload: res.data })
}

export const fetchUserFollowers = userId => async dispatch => {
  console.log("fetchUserFOllowers predispatch, argument: ", userId)
  const res = await axios.get(`/api/users/${userId}/followers`)
  console.log("fetchUserFollower's res.data: ", res.data)
  dispatch({ type: FETCH_FOLLOWERS, payload: res.data })
}

export const fetchUserFollowing = userId => async dispatch => {
  const res = await axios.get(`/api/users/${userId}/following`)
  console.log("fetchUserFollowing's res.data: ", res.data)
  dispatch({ type: FETCH_FOLLOWING, payload: res.data })
}

export const toFollow = userId => async dispatch => {
  const res = await axios.post(`/api/users/${userId}/followers`)
  console.log("followUserButton's payload to reducer: ", res.data)
  dispatch({
    type: TO_FOLLOW,
    follower: res.data.follower,
    followed: res.data.follow
  })
}

export const toUnfollow = userId => async dispatch => {
  const res = await axios.post(`/api/users/${userId}/unfollow`)
  dispatch({
    type: TO_UNFOLLOW,
    unfollower: res.data.unfollower,
    unfollowed: res.data.unfollowed
  })
}

export const fetchOwnFollow = () => async dispatch => {
  const res = await axios.get("/api/own/follow")
  dispatch({
    type: OWN_FOLLOW,
    followers: res.data.followers,
    following: res.data.following
  })
}

export const fetchOwnTimeline = () => async dispatch => {
  console.log("fetchOwnTimeline action invoked")
  const res = await axios.get("/api/own/timeline")
  console.log("FetchOwnTimeline get request returned: ", res.data)
  dispatch({
    type: OWN_TIMELINE,
    timeline: res.data
  })
}

export const rib = blogId => async dispatch => {
  const res = await axios.post(`/api/blogs/${blogId}/rib`)
  const { ribs, _id, credits } = res.data
  console.log("rib action res.data: ", res.data)
  dispatch({
    type: RIB,
    ribs,
    _id,
    credits
  })
}

export const getTrending = () => async dispatch => {
  console.log("trending invoked")
  const res = await axios.get("/api/own/trending")
  console.log("trending's res.data: ", res.data)
  dispatch({
    type: TRENDING,
    payload: res.data
  })
}

export const putOver = userId => async dispatch => {
  console.log("putOver invoked")
  const res = await axios.post(`/api/users/${userId}/putOver`)
  console.log("putOver api call returned: ", res.data)
  const { credits } = res.data
  dispatch({
    type: PUT_OVER,
    credits
  })
}
