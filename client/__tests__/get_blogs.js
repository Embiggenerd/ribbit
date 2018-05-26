import * as actions from "../src/actions"
import * as types from "../src/actions/types"
import thunk from "redux-thunk"
import configureMockStore from "redux-mock-store"
import getBlogsMock from "../mocks/getBlogsMock"
import moxios from "moxios"
import ownBlogsReducer from "../src/reducers/ownBlogsReducer"

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)
describe("getBlogs action", () => {
  beforeEach(function() {
    moxios.install()
  })

  afterEach(function() {
    moxios.uninstall()
  })

  it("dispatches proper list", () => {
    console.log("getBlogsMock.data", JSON.stringify(getBlogsMock.data))
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: JSON.stringify(getBlogsMock.data)
      })
    })
    const expectedActions = [{
      type: types.FETCH_BLOGS,
      payload: getBlogsMock.data
    }]
    const store = mockStore({ownBlogs:[]})

    return store.dispatch(actions.fetchBlogs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe("getBlogs reducer", () => {
  it("returns default state", () => {
    expect(ownBlogsReducer(undefined, {})).toEqual([])
  })

  it("deletes correct blog", () => {
    const initialState = getBlogsMock.data
    const deleteAction = { type:types.DELETE_BLOG, _id:"5b05fb6defdb6718fcdbd8fc" }
    const expectedState = [
      {
        ribs: 0,
        _id: "5b05fb2aefdb6718fcdbd8fb",
        title: "ee",
        body: "rrr",
        _user: "5aea0d084f0d0f4f1939d139",
        _userDisplayName: "Embiggen Thyself",
        dateSent: "2018-05-23T23:37:14.232Z",
        __v: 0
      }
    ]
    expect(ownBlogsReducer(initialState, deleteAction)).toEqual(expectedState)
  })
  it("ribs correct blog", () => {
    const initialState = getBlogsMock.data
    const ribAction = { type: types.RIB, _id:"5b05fb2aefdb6718fcdbd8fb", ribs:3}
    const expectedState = [
      {
        ribs: 0,
        _id: "5b05fb6defdb6718fcdbd8fc",
        title: "ttt",
        body: "lll",
        _user: "5aea0d084f0d0f4f1939d139",
        _userDisplayName: "Embiggen Thyself",
        dateSent: "2018-05-23T23:38:21.698Z",
        __v: 0
      },
      {
        ribs: 3,
        _id: "5b05fb2aefdb6718fcdbd8fb",
        title: "ee",
        body: "rrr",
        _user: "5aea0d084f0d0f4f1939d139",
        _userDisplayName: "Embiggen Thyself",
        dateSent: "2018-05-23T23:37:14.232Z",
        __v: 0
      }
    ]

    expect(ownBlogsReducer(initialState, ribAction)).toEqual(expectedState)
  })
})
