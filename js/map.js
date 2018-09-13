'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var initialAvatars = ['1', '2', '3', '4', '5', '6', '7', '8'];
var initialTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var initialTypes = ['palace', 'flat', 'house', 'bungalo'];
var initialFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var initialTimes = ['12:00', '13:00', '14:00'];
var initialPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
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

var getRandomElement = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getMixedArray = function (arr) {
  var copyOfArray = arr.slice();

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
  var randomAvatars = getMixedArray(avatars);
  var randomTitles = getMixedArray(titles);
  for (var i = 0; i < 8; i++) {
    var x = getRandomInteger(0, 1200);
    var y = getRandomInteger(130, 630);
    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + randomAvatars[i] + '.png'
      },
      'offer': {
        'title': randomTitles[i],
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

var renderCard = function (card) {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = defenitionOfTypes[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guest + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  var fragment = document.createDocumentFragment();
  var featureParent = cardElement.querySelector('.popup__features');

  card.offer.features.forEach(function (feature) {
    var element = cardElement.querySelector('.popup__feature--' + feature);
    element.textContent = defenitionOfFeatures[feature];
    fragment.appendChild(element);
  });

  featureParent.innerHTML = '';
  featureParent.appendChild(fragment);

  var photoElement = cardElement.querySelector('.popup__photo');
  var photoParent = cardElement.querySelector('.popup__photos');

  card.offer.photos.forEach(function (photo) {
    var photoTemplate = photoElement.cloneNode(true);
    photoTemplate.src = photo;
    fragment.appendChild(photoTemplate);
  });

  photoParent.innerHTML = '';
  photoParent.appendChild(fragment);

  document.querySelector('.map').insertBefore(cardElement, mapFiltersContainer);
};

var activateMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

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

var advertisments = getAdvert(initialAvatars, initialTitles, initialTypes, initialTimes, initialFeatures, initialPhotos);
activateMap();
addPinsToDOM(advertisments);
renderCard(advertisments[1]);
