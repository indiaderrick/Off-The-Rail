/* global api, expect, describe, it, beforeEach */

const Item = require('../../models/item');


const userIds = [
  '5be9bd11c7f4b190431791a3',
  '5be9bd11c7f4b190431791a4'
];

const itemData = [{
  name: 'Green Tiger Stripe',
  addedBy: userIds[0],
  image: 'https://www.rixo.co.uk/wp-content/uploads/2018/03/LUCY-TIGER-STRIPE-1-EDITED-LR.jpg',
  originallyFrom: 'Rixo',
  description: 'Lucy is back in our new and vibrant Green Tiger Stripe print. Adorned with subtle sequin embroidery around the neck and the ruffle of her playful slit she is THE dress to have for any up-coming party. Her high neck and long sleeves let the print do the talking and her open back makes sure that all eyes are on you.',
  type: 'dress',
  // addedBy: {},
  retailPrice: 495,
  newPrice: 125
},
{
  image: 'https://cdn.shopify.com/s/files/1/2238/4623/products/DeLaVali-7315_1024x.JPG?v=1537794026',
  name: 'Tangerine Yellow Magnolia Dress',
  addedBy: userIds[1],
  originallyFrom: 'De La Vali',
  description: 'This Magnolia Tangerine dress is a real head turner. It’s billowing trail follows her every step, alluring all that chance upon her. Inspired by our beloved Spanish roots the flowing Tangerine satin oriental dress is made for dancing and getting caught in the heat of passion.',
  retailPrice: 595,
  newPrice: 320

},
{
  image: 'https://cdn.shopify.com/s/files/1/2238/4623/products/H1B9844_1024x.jpg?v=1537345756',
  name: 'Tito Dress Black Lace Black',
  addedBy: userIds[1],
  originallyFrom: 'Rat & Boa',
  description: 'The ultimate in evening glam, our Tito black lace ruffle maxi dress is elegant and demure. With a high neck and stunning ruffle sleeves it is the LBD you need this party season. ',
  retailPrice: 650,
  newPrice: 495

}];

describe('Item INDEX', () => {
  beforeEach(done => {
    Item.remove({})
      .then(() => Item.create(itemData))
      .then(() => done());
  });
});

it('should return an array', done => {
  api.get('/api/items')
    .end((err, res) => {
      expect(res.body).to.be.an('array');
      done();
    });
});

it('should return a 200 response', done => {
  api.get('/api/items')
    .end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
});

it('should return an array of OBJECTS', done => {
  api.get('/api/items')
    .end((err, res) => {
      res.body.forEach(item => expect(item).to.be.an('object'));
      done();
    });
});
