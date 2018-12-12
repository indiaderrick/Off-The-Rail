/* global api, expect, describe, it, beforeEach */

const Item = require('../../models/item');
// const User = require('../../models/item');


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

describe('Item SHOW', () => {

  beforeEach(done => {
    Item.remove({})
      .then(() => Item.create(itemData))
      .then(item => {
        itemId = item._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/items/${itemId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/items/${itemId}`)
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('object');
        done();
      });
  });


  it('should return the correct data', done => {
    api.get(`/api/items/${itemId}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(itemData.name);
        expect(res.body.image).to.eq(itemData.image);
        done();
      });
  });

});
