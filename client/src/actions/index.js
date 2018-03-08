import axios from "axios"
import { FETCH_USER } from "./types"

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
