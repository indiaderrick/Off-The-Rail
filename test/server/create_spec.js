/* global describe, it, expect, api, beforeEach */

const User = require('../../models/item');
const jwt = require('jsonwebtoken');

// TODO: add secret to environment file
const { secret } = require('../../config/environment');

const Item = require('../../models/item');

const userIds = [
  '5be9bd11c7f4b190431791a3'
];


const itemData =  [{
  name: 'Green Tiger Stripe',
  addedBy: userIds[0],
  image: 'https://www.rixo.co.uk/wp-content/uploads/2018/03/LUCY-TIGER-STRIPE-1-EDITED-LR.jpg',
  originallyFrom: 'Rixo',
  description: 'Lucy is back in our new and vibrant Green Tiger Stripe print. Adorned with subtle sequin embroidery around the neck and the ruffle of her playful slit she is THE dress to have for any up-coming party. Her high neck and long sleeves let the print do the talking and her open back makes sure that all eyes are on you.',
  type: 'dress',
  retailPrice: 495,
  newPrice: 125
}];

let token;

describe('Items CREATE', () => {

  beforeEach(done => {
    Item.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({
        email: 'test',
        username: 'test',
        password: 'test'
      }))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.post('/api/items')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });


  // it('should return a 201 response', done => {
  //   api.post('/api/items')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(itemData)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(201);
  //       done();
  //     });
  // });

  it('should return an object', done => {
    api.post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(itemData)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(itemData)
      .end((err, res) => {
        expect(res.body.name).to.eq(itemData.name);
        expect(res.body.image).to.eq(itemData.image);
        done();
      });
  });

});
