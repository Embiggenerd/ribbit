import axios from "axios"

export const updateReadingHours = async (hours, _user) => {
  console.log("updateReadingHours invoked with _user, hours: ", _user, hours)
  const res = await axios.post(`/api/users/${_user}/hours`, {hours})
  console.log("updateReadingHours updated: ", res.data)
}
