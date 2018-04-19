import axios from "axios"
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_BLOGS,
  FETCH_BLOG_DETAIL,
  FETCH_COMMENTS,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  DELETE_BLOG
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

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values)
  history.push("/surveys")
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("api/surveys")

  dispatch({ type: FETCH_SURVEYS, payload: res.data })
}

export const submitBlog = (values, history) => async dispatch => {
  const res = await axios.post("/api/blogs", values)
  history.push("/blogs")
  console.log("submitBlog's response: ", res.data)
  //dispatch({ type: , payload: res.data })
}

export const fetchBlogDetail = blogId => async dispatch => {
//  console.log("fetchBlogDetail action was invoked with ", blogId)
  const getUrl = `/api/blog/${blogId}/detail`
  console.log("fetchBlogDetail action invoked: ",getUrl)
  const res = await axios.get(getUrl)

  dispatch({ type: FETCH_BLOG_DETAIL, payload: res.data })
}

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get("/api/blogs")

  dispatch({ type: FETCH_BLOGS, payload: res.data })
}

export const fetchUserBlogs = (_user) => async dispatch => {
  const res = await axios.get(`/api/blogs/${_user}`)

  dispatch({ type: FETCH_BLOGS, payload: res.data })
}

export const submitComment = (text, blogId) => async dispatch => {
  console.log("submitComment's arguments ", text, blogId )
  const res = await axios.post("/api/comments/submit", {text, blogId})
   dispatch({ type: SUBMIT_COMMENT, payload:res.data })
}

export const fetchComments = (blogId) => async dispatch => {
  const res = await axios.get(`/api/blog/${blogId}/comments`)
  // console.log("fetchComment's response: ", res.data)
  dispatch({ type: FETCH_COMMENTS, payload: res.data })
}
export const fetchUserComments = (_user) => async dispatch => {
  console.log("ftchUseComments invoked: ", _user)

  const res = await axios.get(`/api/users/${_user}/comments`)
  dispatch({ type: FETCH_COMMENTS, payload: res.data })
}

export const deleteBlog = (blogId) => async dispatch => {
  const res = await axios.post(`/api/blogs/${blogId}/delete`)
  console.log("deleteBlog invoked, deleted: ", res.data._id, blogId)
  dispatch({ type: DELETE_BLOG, payload: res.data})
}

export const deleteComment = (commentId) => async dispatch => {
  const res = await axios.post(`/api/comments/${commentId}/delete`)

  dispatch({ type: DELETE_COMMENT, shouldConfirm: true, payload: res.data })
}
