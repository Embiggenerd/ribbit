import * as actions from "../src/actions"
import * as types from "../src/actions/types"
import thunk from "redux-thunk"
import configureMockStore from "redux-mock-store"
import submitBlogError from "../__tests__/mocks/submitBlogError"

const middlwares = [thunk]

const mockStore = configureMockStore(middlewares)

describe("actions", () => {
  beforeEach(function() {
    moxios.install()
  })

  afterEach(function() {
    moxios.uninstall()
  })
  it("handleSubmit", () => {
    // The handleSubmit AC dispatched error or does not dispatch
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: submitBlogError
      })
    })

    const expectedActions = {
      type: types.ERROR,
      message: submitBlogError.message,
      data: submitBlogError.response.data
    }
    const store = mockStore({ errors: {} })

    return store.dispatch(actions.submitPosts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
