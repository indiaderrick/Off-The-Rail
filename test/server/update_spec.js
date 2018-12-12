/* global api, expect, describe, it, beforeEach */

const Item = require('../../models/item');

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

// TODO: add secret to environment file
const { secret } = require('../../config/environment');

const userIds = [
  '5be9bd11c7f4b190431791a3'
];

const itemData =  {
  name: 'Green Tiger Stripe',
  addedBy: userIds[0],
  image: 'https://www.rixo.co.uk/wp-content/uploads/2018/03/LUCY-TIGER-STRIPE-1-EDITED-LR.jpg',
  originallyFrom: 'Rixo',
  description: 'Lucy is back in our new and vibrant Green Tiger Stripe print. Adorned with subtle sequin embroidery around the neck and the ruffle of her playful slit she is THE dress to have for any up-coming party. Her high neck and long sleeves let the print do the talking and her open back makes sure that all eyes are on you.',
  type: 'dress',
  // addedBy: {},
  retailPrice: 495,
  newPrice: 125
};



let itemId;
let token;

describe('Galleries UPDATE', () => {

  beforeEach(done => {
    Item.remove({})
      .then(() => Item.create(itemData))
      .then(item => itemId = item._id)
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
    api.put(`/api/items/${itemId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response with a token', done => {
    api.put(`/api/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(itemData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/items/${itemId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

});
