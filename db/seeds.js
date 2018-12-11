const mongoose = require('mongoose');
const Item = require('../models/item');
const User = require('../models/user');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Message = require('../models/message');


const userIds = [
  '5be9bd11c7f4b190431791a3',
  '5be9bd11c7f4b190431791a4'
];

const messageData = [
  {
    from: userIds[0],
    to: userIds[1],
    content: 'Hello Lily!'
  }, {
    from: userIds[1],
    to: userIds[0],
    content: 'Hi India!'
  }, {
    from: userIds[1],
    to: userIds[0],
    content: 'Hi India!'
  }, {
    from: userIds[1],
    to: userIds[0],
    content: 'Hi India! How\'s life?'
  }
];

const userData = [{
  username: 'indiaderrick',
  profilePicture: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/37192300_10155675644408733_6016307235238445056_n.jpg?_nc_cat=109&_nc_ht=scontent-lhr3-1.xx&oh=b22013e02817f104f05a0df76dea5f6d&oe=5CAFC64E',
  _id: userIds[0],
  name: 'India',
  email: 'i@i',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
  profilePicture: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/21558774_10209573915095493_1280107147547459076_n.jpg?_nc_cat=106&_nc_ht=scontent-lhr3-1.xx&oh=691ceb499df65cc89fc885324f9fc4a8&oe=5C65334D',
  name: 'Lily',
  email: 'l@l',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
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
    addedBy: userIds[1],
    image: 'https://cdn.shopify.com/s/files/1/2238/4623/products/IGGY-JACKET-FUR-1_1024x.jpg?v=1539258144',
    originallyFrom: 'DE LA VALI',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'jacket',
    // addedBy: {},
    retailPrice: 495,
    newPrice: 120
  },
  {name: 'Leo Band Ring',
    addedBy: userIds[1],
    image: 'https://elizabeth-gage.com/wp-content/uploads/2017/05/Zodiac-templar-band-with-four-leo-motifs-ZBG26427.jpg',
    originallyFrom: 'Elizabeth Gage',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'jewellery',
    // addedBy: {},
    retailPrice: 4560,
    newPrice: 800
  },
  {name: 'Bug embroidery knuckle duster clutch',
    addedBy: userIds[0],
    image: 'http://images.selfridges.com/is/image//selfridges/446-2000084-5306460OXXT1055_BLACKWHITE_ALT10?$PDP_M_ZOOM$&defaultImage=446-2000084-5306460OXXT1055_BLACKWHITE_M',
    originallyFrom: 'Alexander McQueen',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'bag',
    // addedBy: {},
    retailPrice: 2990,
    newPrice: 1200
  },
  {name: 'Iris Velvet Wrap Dress',
    addedBy: userIds[0],
    image: 'https://images.harrods.com/product/rixo/iris-velvet-wrap-dress_000000006062133002.jpg',
    originallyFrom: 'Rixo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'dress',
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
      return Message.create(messageData);
    })
    .then(messages => {
      console.log(`${messages.length} messages created`);
      mongoose.connection.close()
        .catch(err => console.log(err));
    });
});
