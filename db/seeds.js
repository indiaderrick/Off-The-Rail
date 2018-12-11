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

  },
  {
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
  {name: 'Antonia ruby-crystal embellished bag',
    addedBy: userIds[0],
    image: 'https://assetsprx.matchesfashion.com/img/product/1385/1236902_3.jpg',
    originallyFrom: 'Shripms',
    description: 'Shrimps’ unfailing eye for playful details is succinctly translated into its signature Antonia bag, which is reimagined in gemstone shades for the new season – this red iteration is inspired by rubies',
    retailPrice: 680,
    newPrice: 240
  },
  {
    image: 'https://images.harrods.com/product/dolce-and-gabbana/lori-winged-heart-pumps-105_000000006090118007.jpg?dwn=500px:568px',
    name: 'Lori Winged Heart Pumps 105',
    addedBy: userIds[0],
    originallyFrom: 'D&G',
    description: 'For the romantics, Dolce & Gabbana presents these heeled pumps with a bold winged heart motif. Constructed from crystals and sequins for a shimmering display, the shoe sits atop a curved heel for a modern dimension while the pointed shoe offers a flattering silhouette.',
    retailPrice: 1255,
    newPrice: 450
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/2238/4623/products/9775_1_1024x.jpg?v=1538568862',
    name: 'Tiger Lilly Jacket Teal Velvet',
    addedBy: userIds[0],
    originallyFrom: 'De La Vali',
    description: 'Every girl needs a power suit and the Tiger Lily jacket is one half of yours! Bringing drama to your look in eye catching teal velvet it is perfectly tailored with a double breasted front, deep front pockets and exaggerated lapels.  Pair them with the matching Tiger Lily trousers or dress down with jeans.',
    retailPrice: 650,
    newPrice: 280

  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0942/9062/products/FLORENTINA_5.jpg?v=1529674821',
    name: 'FLORENTINA DRESS',
    addedBy: userIds[1],
    originallyFrom: 'Rat & Boa',
    description: 'Flirting with femininity, dancing with passion and oozing sex appeal; this floor length, off the shoulder piece with a long flowing silhouette is designed to hug and accentuates your curves.  ',
    retailPrice: 234,
    newPrice: 180
  },
  {

    image: 'https://cdn.shopify.com/s/files/1/2238/4623/products/SUKI_DRESS_LEOPARD_F_1024x.jpg?v=1536764703',
    name: 'Suki Dress Leopard',
    addedBy: userIds[0],
    description: 'The epitome of sophistication with a wearable twist, our best selling Suki Dress is inspired by the intricate beauty of a traditional Cheongsam dress, featuring delicate details such as a Mandarin style collar and ornate button fastenings. ',
    originallyFrom: 'De La Vali',
    retailPrice: 395,
    newPrice: 195
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
  },
  {name: 'Maria – Tiger Sequin',
    addedBy: userIds[1],
    image: 'https://www.rixo.co.uk/wp-content/uploads/2018/11/MARIA-SEQUIN-1-EDITED-LR.jpg',
    originallyFrom: 'Rixo',
    description: 'Dare to bare and win the envy of all your friends and enemies in this jaw dropping sequin number! The Gigi’s rebellious younger sister in Blue Sequin Tiger Stripes. She’s loud, she’s proud and she’s the party animal you’re destined to be this Winter. Don’t hold back, or hide behind that old LBD in your closet, go big or go home in this glorious dress and you won’t regret it.',
    type: 'dress',
    retailPrice: 525,
    newPrice: 315
  },
  {name: 'Aquamarine Intanglio Necklace',
    addedBy: userIds[1],
    image: 'https://elizabeth-gage.com/wp-content/uploads/2017/05/NMS25481-600x434.jpg',
    originallyFrom: 'Elizabeth Gage',
    description: 'This stunning rock crystal bead necklace has been divided into five sections by beautifully textured gold caps. Strung into the centre is a repoussé surround set with an aquamarine intaglio of a heraldic lion. The necklace is secured with a dragon head and loop clasp',
    type: 'jewellery',
    retailPrice: 25200,
    newPrice: 6000
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
