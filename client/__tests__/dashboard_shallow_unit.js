import React from 'react'
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Dashboard }  from "../src/components/dashboard"
import { BlogsList } from "../src/components/timeline/BlogList"
import UserFollowingList from '../src/components/users/UserFollowingList'
import UserFollowersList from '../src/components/users/UserFollowersList'
import AddBlogButton from "../src/components/buttons/addBlogButton"


const { assert, spy } = sinon

describe("When dasboard first loads", () => {
	it("fetchBlogs, fetchOwnFollow are called once", () => {
		const props = {
			fetchBlogs: spy(),
			fetchOwnFollow: spy(),
			auth: true
		}
		const wrapper = shallow(<Dashboard { ...props } />)
		assert.calledOnce(props.fetchBlogs)
		assert.calledOnce(props.fetchOwnFollow)

		
	})
})

describe("When props.auth is", () => {
	it("false, you are offered to login with Google", () => {
		const props = {
			fetchBlogs: () => {},
			fetchOwnFollow: () => {},
			auth: false
		}
		const wrapper = shallow(<Dashboard {...props } />)
		expect(wrapper.contains(

		  <div>Login with google!</div>
		  
		)).toBe(true)

	})

	it("null, you are shown a wait view", () => {
		const props = {
			fetchBlogs: () => {},
			fetchOwnFollow: () => {},
			auth: null
		}
		const wrapper = shallow(<Dashboard {...props } />)
		expect(wrapper.contains(

		  <div> Checking... </div>

		)).toBe(true)

	})

	it("truthy, correct number of components rendered", () => {
		const props = {
			fetchBlogs: () => {},
			fetchOwnFollow: () => {},
			auth: true
		}
		const wrapper = shallow(<Dashboard {...props } />)
		expect(wrapper.children().length).toBe(4)
	})
})