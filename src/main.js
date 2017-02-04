var grid = require('hex-grid');
var edgeOrders = require('./edgeOrders');
var tileSet = require('./tiles');
var tiles = tileSet.regularTiles;

var allHexes = [];

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
  allHexes.push(hex);

  return hex;
}

tileSet.regularTiles.forEach(tile => {
  var hex = createHex();
  var edgeOrder = randomEdgeOrder();

  addCuriousityEdges(hex, edgeOrder);
  addContent(hex, tile);
});

tileSet.regularTiles.forEach(tile => {
  var hex = createHex();
  var edgeOrder = randomEdgeOrder();

  addCuriousityEdges(hex, edgeOrder);
});

tileSet.blankTiles.forEach(tile => {
  var hex = createHex();
  addContent(hex, tile);
});

tileSet.numberedTiles.forEach(tile => {
  var hex = createHex();

  for (var i = 0; i < 6; i++) {
    var slot = document.createElement('span');
    slot.classList.add('slot');
    slot.classList.add(`slot-${i + 1}`);
    slot.textContent = i + 1;

    var rotation = 30 + i * 60;
    var transform = `rotate(${rotation}deg) translateY(140px)`;
    slot.style.transform = transform;
    hex.appendChild(slot);
  }

  addContent(hex, tile);
});

var numberPerGroup = 6;
var current = 0;

while(current < allHexes.length) {
  var groupHexes = allHexes.slice(current, current + numberPerGroup);
  current += numberPerGroup;

  var gridWrapper = document.createElement('div');
  gridWrapper.classList.add('wrapper');

  var gridEle = document.createElement('div');
  gridEle.classList.add('grid');
  groupHexes.forEach(hex => {
    gridEle.appendChild(hex);
  });

  gridWrapper.appendChild(gridEle)
  document.body.appendChild(gridWrapper);
}

function scan() {
  var grids = Array.from(document.querySelectorAll('.grid'));

  grids.forEach(gridEle => {
    var hexes = gridEle.getElementsByClassName('hex');

    console.log(gridEle);

    grid({
      element: gridEle,
      spacing: -8,
    }, hexes);

    var lastHex = hexes[hexes.length - 1];
    var height = lastHex.offsetHeight + lastHex.offsetTop + 100;
    gridEle.style.height = `${height}px`;
  });
}

scan();
window.addEventListener('resize', scan);
window.addEventListener('load', scan);
