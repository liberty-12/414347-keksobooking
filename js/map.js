'use strict';

var avatars = ['1', '2', '3', '4', '5', '6', '7', '8'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInArray = function (arr, isNoRepeated) {
  var randomPosition = Math.floor((Math.random() * arr.length));
  var temp = arr[randomPosition];

  if (isNoRepeated) {
    arr.splice(randomPosition, 1);
  }

  return temp;
};

var getRandomInteger = function (min, max) {
  var random = Math.floor(min + Math.random() * (max + 1 - min));

  return random;
};

var getNewArray = function (arr, number) {
  var newArray = [];
  for (var i = 0; i < number; i++) {
    newArray[i] = arr[i];
  }

  return newArray;
};

var compareRule = function () {
  return Math.random() - 0.5;
};

var renderAdvertFeatures = function (avatarFeature, titleFeature, typeFeature, timeFeature, attribute, photoFeature) {
  var adverts = [];
  for (var i = 1; i <= 8; i++) {
    var advert = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + getRandomInteger(1, 8).toString() + '.png'
      },
      'offer': {
        'title': getRandomInArray(titleFeature, true),
        'address': '',
        'price': getRandomInteger(1000, 1000000),
        'type': getRandomInArray(typeFeature),
        'rooms': getRandomInteger(1, 5),
        'guest': getRandomInteger(0, 5),
        'checkin': getRandomInArray(timeFeature),
        'checkout': getRandomInArray(timeFeature),
        'features': getNewArray(attribute, getRandomInteger(1, 6)),
        'description': '',
        'photos': photoFeature.sort(compareRule)
      },
      'location': {
        'x': '',
        'y': getRandomInteger(130, 630)
      }
    };
    adverts.push(advert);
  }

  return adverts;
};

var advertisments = renderAdvertFeatures(avatars, titles, types, time, features, photos);


// var map = document.querySelector('.map').classList.remove('map--faded');
