var grid = require('hex-grid');
var edgeOrders = require('./edgeOrders');
var tileSet = require('./tiles');
var tiles = tileSet.regularTiles;

function edgeNumber(edge) {
  switch (edge) {
    case 'S':
      return 1;
    case 'W':
      return 2;
    case 'M':
      return 3;
    case 'L':
      return 4;
    case 'P':
      return 5;
    case 'G':
      return 6;
  }
}

function edgeOrderClass(edge) {
  switch (edge) {
    case 'S':
      return 'em-hocho'
    case 'W':
      return 'em-star';
    case 'M':
      return 'em-musical_note';
    case 'L':
      return 'em-maple_leaf';
    case 'P':
      return 'em-paw_prints';
    case 'G':
      return 'em-moneybag';
  }
}

function edgeColor(edge) {
  switch (edge) {
    case 'S':
      return 'blue'
    case 'W':
      return 'turquoise';
    case 'M':
      return 'red';
    case 'L':
      return 'green';
    case 'P':
      return 'orange';
    case 'G':
      return 'yellow';
  }
}

function randomEdgeOrder() {
  var order = edgeOrders[Math.floor(Math.random()*edgeOrders.length)];
  var rotations = Math.floor(Math.random() * order.length);

  for (var i = 0; i < rotations; i++) {
    order.push(order.shift());
  }

  return order;
}

function addCuriousityEdges(element, edgeOrder) {
  for (var i = 0; i < 6; i++) {
    var edgeType = edgeOrder[i];
    var slot = document.createElement('i');
    slot.classList.add('slot');
    slot.classList.add(`slot-${i + 1}`);
    slot.classList.add('em');
    slot.classList.add(edgeOrderClass(edgeType));

    var rotation = 30 + i * 60;
    var transform = `rotate(${rotation}deg) translateY(140px)`;
    slot.style.transform = transform;
    element.appendChild(slot);

    var edge = document.createElement('div');
    edge.classList.add('edge');
    edge.style.backgroundColor = edgeColor(edgeType);
    var transform = `rotate(${rotation}deg) translateY(170px)`;
    edge.style.transform = transform;
    element.appendChild(edge);
  }
}

function addContent(element, tile) {
  var content = `<div class="content">
    <div class="title">${tile.name}</div>
    <div class="subtext">${tile.subtext}</div>
  </div>`;

  var contentEle = document.createElement('div');
  contentEle.innerHTML = content;
  element.appendChild(contentEle.children[0]);
}

function createHex() {
  var hex = document.createElement('div');
  hex.className = 'hex';
  gridEle.appendChild(hex);

  return hex;
}

var gridEle = document.getElementById('grid');

tileSet.regularTiles.forEach(tile => {
  var hex = createHex();
  var edgeOrder = randomEdgeOrder();

  addCuriousityEdges(hex, edgeOrder);
  addContent(hex, tile);
});

tileSet.blankTiles.forEach(tile => {
  var hex = createHex();
  addContent(hex, tile);
});

tileSet.numberedTiles.forEach(tile => {
  var hex = createHex();

  var edgeOrder = randomEdgeOrder();

  for (var i = 0; i < 6; i++) {
    var number = edgeNumber(edgeOrder[i]);
    var slot = document.createElement('span');
    slot.classList.add('slot');
    slot.classList.add(`slot-${i + 1}`);
    slot.textContent = number;

    var rotation = 30 + i * 60;
    var transform = `rotate(${rotation}deg) translateY(140px)`;
    slot.style.transform = transform;
    hex.appendChild(slot);
  }

  addContent(hex, tile);
});

var hexes = document.querySelectorAll('.hex');

var root = document.querySelector('#grid');

var g;
function scan () {
    g = grid({
      element: root,
      spacing: -8,
    }, hexes);
}

scan();
window.addEventListener('resize', scan);
window.addEventListener('load', scan);
