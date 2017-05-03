const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.fileExists = function (filepath) {
  return new Promise(function (resolve, reject) {
    fs.stat(filepath, function (err, stat) {
      if (err) reject();
      else    resolve(stat);
    });
  });
};

function getRandomNumberArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomUsers(nbrUser) {
  const randomUserApiUrl = 'https://randomuser.me/api/?results=' + nbrUser;
  const formatUser = function ({name, location, email, dob, registered, phone, id, picture, nat}) {
    const {street, city, state, postcode} = location;
    return {
      location: {
        street,
        city,
        state,
        postCode: postcode
      },
      email,
      registered,
      phone,
      picture,
      nationality: nat,
      dateOfBirth: dob.split(' ')[0],
      name: name.first + ' ' + name.last,
      id: id.name + '-' + id.value
    }
  };
  return axios.get(randomUserApiUrl)
    .then(response => response.data.results)
    .then(users => {
      return users.map(formatUser).filter(user => user.id !== '-null');
    })
    .catch((err) => {

    });
}

function generateRamdomEstates(nbrEstates) {

  const roomTypes = ['entire_home', 'private_room', 'shared_room'];
  const pictureUrls = [
    'http://lorempixel.com/800/600/city/',
    'http://lorempixel.com/800/600/nature/',
  ];
  const titles = [
    'Central guestroom! Walk everywhere!',
    'Charming room in spacious apartment',
    'Charming studio with postcard view',
    'MARAIS: Unique studio with GARDEN',
    ' COLOSSEUM TERMINI B&B NILI RED',
    'Amazing design flat heart of Paris!',
    'All 5 Stars',
    'Convenient and Close to everywhere'
  ];

  const estates = new Array(nbrEstates).fill({}).map(() => {
    return {
      title: titles[getRandomNumberArbitrary(0, 8)] || '',
      roomType: roomTypes[getRandomNumberArbitrary(0, 3)] || '',
      pictureUrl: pictureUrls[getRandomNumberArbitrary(0, 2)] || '',
      maxGuestAccepted: getRandomNumberArbitrary(0, 13) || '',
      pricePerNight: getRandomNumberArbitrary(0, 1000) || ''
    };
  });

  return Promise.resolve(estates);
};

exports.writeDbFile = function (estates) {
  fs.writeFileSync(pathToDb, estates);
};

exports.createDataForDb = function () {
  const maxUsers = 1000;
  const maxEstates = 600;
  return Promise.all([getRandomUsers(maxUsers), generateRamdomEstates(maxEstates)])
    .then(([users, estates]) => {
      return [
        users,
        estates.map(estate => {
          const currentUser = users[getRandomNumberArbitrary(0, 200)];
          return Object.assign(
            {},
            estate,
            {
              userInfo: currentUser
            }
          );
        })
      ];
    })
};

exports.isAuthorized = function (req, tokenToMatch) {
  const authorization = req.get('Authorization');
  if (!authorization) {
    return false;
  }
  return authorization.trim().split(' ')[1] === tokenToMatch;

};
