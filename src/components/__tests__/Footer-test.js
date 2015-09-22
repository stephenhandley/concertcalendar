import React, { addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
const { TestUtils } = addons;

import Footer from '../Footer';
import { VisibilityFilters } from  '../../actions/actionTypes';
const {SHOW_ALL, SHOW_INCOMPLETE, SHOW_COMPLETE} = VisibilityFilters;

describe('Footer', () => {

    describe('rendering', () => {
        let component;

        context("no complete todos", ()=>{
            const completeCount=0;

            context("no incomplete todos", ()=>{
                const incompleteCount=0;

                before(() => {
                    component = TestUtils.renderIntoDocument(
                      <Footer
                        incompleteCount={incompleteCount}
                        completeCount={completeCount}
                        filter={SHOW_ALL}
                        onShow={_.noop}
                        deleteCompletedTodos={_.noop}
                      />
                    );
                });

                afterEach(() => {
                    React.unmountComponentAtNode(React.findDOMNode(component));
                });

                // This is the base case, so we test to make sure that rendering is complete.
                it(`should render a 'footer' element that wraps the component`, () => {
                    const footerComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'footer');

                    expect(footerComponent).toExist();
                });

                it(`should render a TodoCount output that reflects no items`, () => {
                    const spanComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'span');

                    expect(spanComponent).toExist();
                    expect(React.findDOMNode(spanComponent).textContent).toEqual("No items left")
                });

                it(`should render three filter links`, () => {
                    const linkComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');

                    expect(linkComponents.length).toEqual(3);
                });
            });

            context("one incomplete todo", ()=>{
                const incompleteCount=1;

                before(() => {
                    component = TestUtils.renderIntoDocument(
                      <Footer
                        incompleteCount={incompleteCount}
                        completeCount={completeCount}
                        filter={SHOW_ALL}
                        onShow={_.noop}
                        deleteCompletedTodos={_.noop}
                      />
                    );
                });

                afterEach(() => {
                    React.unmountComponentAtNode(React.findDOMNode(component));
                });

                it(`should render a TodoCount output that reflects one item`, () => {
                    const spanComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'span');

                    expect(spanComponent).toExist();
                    expect(React.findDOMNode(spanComponent).textContent).toEqual("1 item left")
                });
            });

            context("two incomplete todos", ()=>{
                const incompleteCount=2;

                before(() => {
                    component = TestUtils.renderIntoDocument(
                      <Footer
                        incompleteCount={incompleteCount}
                        completeCount={completeCount}
                        filter={SHOW_ALL}
                        onShow={_.noop}
                        deleteCompletedTodos={_.noop}
                      />
                    );
                });

                afterEach(() => {
                    React.unmountComponentAtNode(React.findDOMNode(component));
                });

                it(`should render a TodoCount output that reflects two items`, () => {
                    const spanComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'span');

                    expect(spanComponent).toExist();
                    expect(React.findDOMNode(spanComponent).textContent).toEqual("2 items left")
                });
            });


        });

        context("one complete todo", ()=>{
            const completeCount=1;
            const incompleteCount=0;

            before(() => {
                component = TestUtils.renderIntoDocument(
                  <Footer
                    incompleteCount={incompleteCount}
                    completeCount={completeCount}
                    filter={SHOW_ALL}
                    onShow={_.noop}
                    deleteCompletedTodos={_.noop}
                  />
                );
            });

            afterEach(() => {
                React.unmountComponentAtNode(React.findDOMNode(component));
            });

            it(`should render a Clear button`, () => {
                const buttonComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

                expect(buttonComponent).toExist();
                expect(React.findDOMNode(buttonComponent).textContent).toEqual("Clear completed");
            });
        });

    });

    describe('events', () => {
        let component;
        let onShowStub = sinon.stub();
        let deleteCompletedTodosStub = sinon.stub();

        const incompleteCount=0;
        const completeCount=1;

        before(() => {
            component = TestUtils.renderIntoDocument(
              <Footer
                incompleteCount={incompleteCount}
                completeCount={completeCount}
                filter={SHOW_ALL}
                onShow={onShowStub}
                deleteCompletedTodos={deleteCompletedTodosStub}
              />
            );
        });

        afterEach(() => {
            React.unmountComponentAtNode(React.findDOMNode(component));
        });


        it(`should trigger a filter if a user clicks on a given filter button`, () => {

          const linkComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');

          expect(onShowStub.called).toBe(false);

          TestUtils.Simulate.click(React.findDOMNode(linkComponents[0]), 'click');

          expect(onShowStub.called).toBe(true);
        });

        it(`should trigger the delete all action if a user clicks on the clear button`, () => {

          const buttonComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

          expect(deleteCompletedTodosStub.called).toBe(false);

          TestUtils.Simulate.click(React.findDOMNode(buttonComponent), 'click');

          expect(deleteCompletedTodosStub.called).toBe(true);
        });

    });
});
