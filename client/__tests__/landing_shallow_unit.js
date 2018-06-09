import React from 'react'
//import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Landing } from '../src/components/Landing'
import  {TimelineContainer}  from "../src/components/timeline/TimelineContainer"
import {AddBlogButton} from "../src/components/buttons/addBlogButton"


describe("When Landing's auth === true", () => {

	it("it contains the right amount of children", () => {
		const props = {
			auth: true
		}
		const wrapper = shallow(<Landing {...props} />)
		expect(wrapper.children().length).toBe(2)
	})
})
describe("When Landing's auth === null", () => {

	it("it renders wait text", () => {
		const props = {
			auth: null
		}
		const wrapper = shallow(<Landing {...props} />)
		expect(wrapper.contains([
		  <h3>Checkin credentials...</h3>
		  
		])).toBe(true)
	})
})
describe("When the landing's auth === false", () => {
	it("it renders welcome screen", () => {
		const props = {
			auth: false
		}
		const wrapper = shallow(<Landing {...props} />)
		expect(wrapper.contains([
			
            <h3>Welcome To Ribbit!</h3>,
            <ul>
              <li>Ribbits have meaning!</li>
              <li>Timeline order is based on reading hours minus ribbits.</li>
              <li>You can&apos;t ribbit your way to the top</li>
              <li>But you can ribbit down the competition!</li>
            </ul>,
            <a href="/auth/google">Login with Google</a>
          ])).toBe(true)
	})
})
