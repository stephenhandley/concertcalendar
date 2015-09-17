import React, { addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
const { TestUtils } = addons;
import Header from '../Header';

describe('Header', () => {

    describe('rendering', () => {
        let component;

        before(() => {
            component = TestUtils.renderIntoDocument(
              <Header
                placeholder="placeholder"
                createTodo={_.noop}
              />
            );
        });

        afterEach(() => {
            React.unmountComponentAtNode(React.findDOMNode(component));
        });

        it(`should render a 'header' element that wraps the component`, () => {
            const headerComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'header');

            expect(headerComponent).toExist();
        });


    });

});
