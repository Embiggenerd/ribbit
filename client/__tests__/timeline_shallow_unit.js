import React from 'react'
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { TimelineContainer }  from "../src/components/timeline/TimelineContainer"
import AddBlogButton from "../src/components/buttons/addBlogButton"
import { BlogsList } from "../src/components/timeline/BlogList"
import getBlogsMock from "../mocks/getBlogsMock"

const { assert, spy } = sinon

describe("When timeline first loads", () => {
	it("the component state is {showType: timeline}", () => {
		const props = {
			fetchOwnTimeline: () => {}
		}
		const wrapper = shallow(<TimelineContainer { ...props } />)
		expect(wrapper.state().showType).toEqual("timeline")
	})
	it("fetchOwnTimeline is called once", () => {
		const props = {
			fetchOwnTimeline: spy()
		}
		const wrapper = shallow(<TimelineContainer { ...props } />)
		assert.calledOnce(props.fetchOwnTimeline)
	})
})

describe("When a display button is clicked, the state changes", () => {
	it("to {showType: bloglist}, and fetchOwnTimeline is called once", () => {
		const props = {
			fetchOwnTimeline: () => {},
			fetchBlogs: spy(),
			ownBlogs:[]
		}
		const wrapper = shallow(<TimelineContainer {...props } />)
		expect(wrapper.state().showType).toEqual("timeline")
		wrapper.find("#display-ownBlogs").simulate("click")
		expect(wrapper.state().showType).toEqual("bloglist")
		assert.calledOnce(props.fetchBlogs)

	})
	it("to {showType: trending}, and getTrending is called once", () => {
		const props = {
			fetchOwnTimeline: () => {},
			getTrending: spy(),
			trending:[]
		}
		const wrapper = shallow(<TimelineContainer {...props } />)
		expect(wrapper.state().showType).toEqual("timeline")
		wrapper.find("#display-trending").simulate("click")
		expect(wrapper.state().showType).toEqual("trending")
		assert.calledOnce(props.getTrending)
	})
	it("back to timeline, and fetchOwnTimline is not called again", () => {
		const props = {
			fetchOwnTimeline: spy(),
			getTrending: spy(),
			trending:[],
			ownTimeline: [1, 2, 3]
		}

		const wrapper = shallow(<TimelineContainer {...props } />)
		expect(wrapper.state().showType).toEqual("timeline")
		wrapper.find("#display-trending").simulate("click")
		expect(wrapper.state().showType).toEqual("trending")
		assert.calledOnce(props.getTrending)
		wrapper.find("#display-timeline").simulate("click")
		expect(wrapper.state().showType).toEqual("timeline")
		assert.calledOnce(props.fetchOwnTimeline)
	})
})

describe("When rendered, the children contain", () => {
	it("4 total children, 3 buttons", () => {
		const props = {
			fetchOwnTimeline: () => {}
		}
		const wrapper = shallow(<TimelineContainer { ...props } />)
		expect(wrapper.children().length).toBe(4)
		expect(wrapper.find("button").length).toBe(3)
	})
})