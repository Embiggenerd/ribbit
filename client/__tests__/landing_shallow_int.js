import { shallow } from 'enzyme';
import sinon from 'sinon';
import Landing from './src/components/Landing'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'


describe("<Landing /> shallow", () => {
	it("renders components", () => {
		const store = configureStore([
    		thunk
		])({auth:true})
		const wrapper = shallow(<Landing store={store} />).dive()

	})
})
