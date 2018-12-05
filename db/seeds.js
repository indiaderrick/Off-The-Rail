const mongoose = require('mongoose');
const Item = require('../models/item');
const User = require('../models/user');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const userIds = [
  '5be9bd11c7f4b190431791a3',
  '5be9bd11c7f4b190431791a4'
];

const userData = [{
  username: 'indiaderrick',
  _id: userIds[0],
  name: 'India',
  email: 'i@i',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  city: 'London',
  location: {
    lat: 51.51051,
    lng: -0.14986
  },
  password: 'pass',
  passwordConfirmation: 'pass'
}, {
  username: 'lilymarriott',
  _id: userIds[1],
  name: 'Lily',
  email: 'l@l',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  city: 'London',
  location: {
    lat: 51.51040,
    lng: -0.14989
  },
  password: 'pass',
  passwordConfirmation: 'pass'
}];

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Item.create([{
    name: 'Zita Faux Fur Jacket',
    image: 'https://cdn.shopify.com/s/files/1/2238/4623/products/IGGY-JACKET-FUR-1_1024x.jpg?v=1539258144',
    originallyFrom: 'DE LA VALI',
    smallImages: ['https://cdn.shopify.com/s/files/1/2238/4623/products/8974_1024x.jpg?v=1539258144', 'https://cdn.shopify.com/s/files/1/2238/4623/products/IGGY-JACKET-FUR-2_1024x.jpg?v=1539258144'],
    color: ['black'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: ['jacket', 'coat'],
    // addedBy: {},
    retailPrice: 495,
    newPrice: 120
  },
  {name: 'Leo Band Ring',
    image: 'https://elizabeth-gage.com/wp-content/uploads/2017/05/Zodiac-templar-band-with-four-leo-motifs-ZBG26427.jpg',
    originallyFrom: 'Elizabeth Gage',
    color: ['gold'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: ['jewellery', 'statement'],
    // addedBy: {},
    retailPrice: 4560,
    newPrice: 800
  },
  {name: 'Bug embroidery knuckle duster clutch',
    image: 'http://images.selfridges.com/is/image//selfridges/446-2000084-5306460OXXT1055_BLACKWHITE_ALT10?$PDP_M_ZOOM$&defaultImage=446-2000084-5306460OXXT1055_BLACKWHITE_M',
    originallyFrom: 'Alexander McQueen',
    smallImages: ['http://images.selfridges.com/is/image//selfridges/446-2000084-5306460OXXT1055_BLACKWHITE_ALT01?$PDP_M_ALL$', 'http://images.selfridges.com/is/image//selfridges/446-2000084-5306460OXXT1055_BLACKWHITE_ALT03?$PDP_M_ALL$'],
    color: ['black', 'white', 'gold'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: ['bag', 'statement'],
    // addedBy: {},
    retailPrice: 2990,
    newPrice: 1200
  },
  {name: 'Iris Velvet Wrap Dress',
    image: 'https://images.harrods.com/product/rixo/iris-velvet-wrap-dress_000000006062133002.jpg',
    originallyFrom: 'Rixo',
    smallImages: ['https://images.harrods.com/product/rixo/iris-velvet-wrap-dress_000000006062133002_1.jpg?dwn=500px:568px', 'https://images.harrods.com/product/rixo/iris-velvet-wrap-dress_000000006062133002_f.jpg?dwn=500px:568px'],
    color: 'blue',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: ['dress', 'smart'],
    // addedBy: {},
    retailPrice: 495,
    newPrice: 125
  }
  ])

    .then(item => console.log(`${item.length} items created`));
  User
    .create(userData)
    .then(users => {
      console.log(`${users.length} users created`);
    })
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());

});
