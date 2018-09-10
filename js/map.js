'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var arrayOfAvatars = ['1', '2', '3', '4', '5', '6', '7', '8'];
var arrayOfTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var arrayOfTypes = ['palace', 'flat', 'house', 'bungalo'];
var arrayOfFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var arrayOfTimes = ['12:00', '13:00', '14:00'];
var arrayOfPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var defenitionOfTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var defenitionOfFeatures = {
  'wifi': 'Wi-Fi',
  'dishwasher': 'Посудомоечная машина',
  'parking': 'Парковка',
  'washer': 'Стиральная машина',
  'elevator': 'Лифт',
  'conditioner': 'Кондиционер'
};

var getRandomElement = function (arr, isNoRepeated) {
  var randomPosition = Math.floor((Math.random() * arr.length));
  var temp = arr[randomPosition];

  if (isNoRepeated) {
    arr.splice(randomPosition, 1);
  }

  return temp;
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getMixedArray = function (arr) {
  var copyOfArray = arr.slice(0);

  for (var i = copyOfArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copyOfArray[i];
    copyOfArray[i] = copyOfArray[j];
    copyOfArray[j] = temp;
  }

  return copyOfArray;
};

var getAdvert = function (avatars, titles, types, times, features, photos) {
  var adverts = [];
  for (var i = 1; i <= 8; i++) {
    var x = getRandomInteger(0, 1200);
    var y = getRandomInteger(130, 630);
    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + getRandomElement(avatars, true) + '.png'
      },
      'offer': {
        'title': getRandomElement(titles, true),
        'address': x + ', ' + y,
        'price': getRandomInteger(1000, 1000000),
        'type': getRandomElement(types),
        'rooms': getRandomInteger(1, 5),
        'guest': getRandomInteger(0, 5),
        'checkin': getRandomElement(times),
        'checkout': getRandomElement(times),
        'features': getMixedArray(features).slice(0, getRandomInteger(1, features.length)),
        'description': '',
        'photos': getMixedArray(photos)
      },
      'location': {
        'x': x,
        'y': y
      }
    };
    adverts.push(advert);
  }

  return adverts;
};

var renderPin = function (card, template) {
  var pinElement = template.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = card.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = card.location.y - PIN_HEIGHT + 'px';
  pinImg.src = card.author.avatar;
  pinImg.alt = card.offer.title;

  return pinElement;
};

var renderCard = function (card, template, defenitionTypes, defenitionFeatures) {
  var cardElement = template.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = defenitionTypes[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guest + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  for (var i = 0; i < card.offer.features.length; i++) {
    cardElement.querySelector('.popup__feature--' + card.offer.features[i]).textContent = defenitionFeatures[card.offer.features[i]];
  }

  var photoElement = cardElement.querySelector('.popup__photo');
  photoElement.src = card.offer.photos[0];

  for (i = 1; i < card.offer.photos.length; i++) {
    var photoTemplate = photoElement.cloneNode(true);
    photoTemplate.src = card.offer.photos[i];
    cardElement.querySelector('.popup__photos').appendChild(photoTemplate);
  }

  return cardElement;
};

var showElement = function (target, className) {
  if (typeof (target) === 'string') {
    document.querySelector(target).classList.remove(className);
  } else {
    target.classList.remove(className);
  }
};

var map = document.querySelector('.map');

var addPinsToDOM = function (pins) {
  var pinList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  pins.forEach(function (item, i) {
    fragment.appendChild(renderPin(pins[i], pinTemplate));
  });

  pinList.appendChild(fragment);
};

var addCardsToDOM = function (cards) {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(cards[1], cardTemplate, defenitionOfTypes, defenitionOfFeatures));

  map.insertBefore(fragment, mapFiltersContainer);
};

var advertisments = getAdvert(arrayOfAvatars, arrayOfTitles, arrayOfTypes, arrayOfTimes, arrayOfFeatures, arrayOfPhotos);
showElement(map, 'map--faded');
addPinsToDOM(advertisments);
addCardsToDOM(advertisments);
