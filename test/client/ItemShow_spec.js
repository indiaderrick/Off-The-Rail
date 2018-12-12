/* global describe,it */
import React from 'react';
import axios from 'axios';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import ItemShow from '../../src/components/items/ItemShow';
// import { getBasket } from '../../src/lib/basket';

const testData = {
  _id: 1234,
  name: 'Green Tiger Stripe',
  image: 'https://www.rixo.co.uk/wp-content/uploads/2018/03/LUCY-TIGER-STRIPE-1-EDITED-LR.jpg',
  originallyFrom: 'Rixo'
};

// Since there is no router, there is no this.props.match.params.id!
// Here, we're just going to invent a match object, and pass it to props
// when we render the component
const match = {
  params: {
    id: 1234
  }
};

sinon.stub(axios, 'get')
  .returns(Promise.resolve({ data: testData }));

// Create a mocha test suite, a collection of test cases:
describe('ItemShow', () => {
  it('should show the item name and image', done => {
    const component = shallow(<ItemShow match={match}/>);
    // Just fake the fact that we have a burger on this.state:
    component.setState({ item: testData });
    console.log(component.debug());
    // NOTE: We can console.log the HTML our browser has produced from the component!
    // We can now write our assertions. These must all be true
    // for the test case to pass.
    // expect(component.find('img').props().src).to.eq(testData.image);
    expect(component.find('.itemName').text()).to.contain(testData.name.toUpperCase());
    done();
  });

  it('should show an input with quantity 0 by default', done => {
    const component = shallow(<ItemShow match={match}/>);
    component.setState({ burger: testData });
    expect(component.find('.field label').text()).to.eq('Quantity');
    expect(component.find('.field input').length).to.eq(1);
    expect(component.find('.field input').props().value).to.eq(0);
    done();
  });

  // it('should redirect to the /basket page after "Add to basket" click', done => {
  //   // There's no router, which means no this.props.history! We'll have to simulate
  //   // it by handing in an empty object to props.history and testing that.
  //   const history = [];
  //   // Note the history prop:
  //   const component = shallow(<ItemShow match={match} history={history}/>);
  //   component.setState({ burger: testData });
  //   const button = component
  //     .findWhere(x => x.text() === 'Add to basket')
  //     .find('button');
  //   button.simulate('click');
  //   expect(history[0]).to.eq('/basket');
  //   done();
  // });
  //
  // it('should add the correct item to localStorage on add to basket', done => {
  //   const component = shallow(<ItemShow match={match} history={[]}/>);
  //   component.setState({ burger: testData, quantity: 3 });
  //   expect(component.find('input').props().value).to.eq(3);
  //   // Click the button (it's actually the only one on the page!)
  //   component.find('button').simulate('click');
  //   expect(getBasket().length).to.eq(1);
  //   expect(getBasket()[0].quantity).to.eq(3);
  //   expect(getBasket()[0].name).to.eq(testData.name);
  //   done();
  // });
  //
  // // Because this last test case actually waits for componentDidMount and
  // // the axios request to run, it's a bit more complicated. We need
  // // `async() => {}` instead of `done => {}`, which allows us to `await` the
  // // componentDidMount method. All the other test cases just put the test data
  // // directly onto this.state.
  // it('should show the name and image after componentDidMount', async () => {
  //   // Shallow render the burger show component. Notice the match prop.
  //   const component = mount(<ItemShow match={match}/>);
  //   // Now we have to wait for componentDidMount to run...
  //   await component.instance().componentDidMount();
  //   // ...and for the subsequent render to run after this.setState:
  //   component.update();
  //   // Now the component has all the data.
  //   // We can console.log the HTML our browser has produced from the component!
  //   // console.log(component.html());
  //   // We can now write our assertions:
  //   expect(component.state().burger).to.be.an('object');
  //   expect(component.state().burger.name).to.eq(testData.name);
  //   expect(component.find('img').props().src).to.eq(testData.image);
  //   expect(component.find('h1').text()).to.eq(testData.name);
  // });


});
