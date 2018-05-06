import axios from "axios"

export const updateReadingHours = async (hours, _user) => {
  const res = await axios.post(`/api/users/${_user}/hours`, {hours})
}
