'use strict';

var imageArray = [];
var totalClicks = 0;
var tallyClicks = [];
var imageNames = [];
var surveyLength;
var resultsButton = document.getElementById('displayResults');
// Constructor object with name and path images
function images(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.tallysClicked = 0;
  this.viewsDisplayed = 0;
  imageNames.push(this.name);
  imageArray.push(this);
};

// Declare the images
var bag = new images('bag', 'images/bag.jpg');
var banana = new images('banana', 'images/banana.jpg');
var bathroom = new images('bathroom', 'images/bathroom.jpg');
var boots = new images('boots', 'images/boots.jpg');
var breakfast = new images('breakfast', 'images/breakfast.jpg');
var bubblegum = new images('bubblegum', 'images/bubblegum.jpg');
var chair = new images('chair', 'images/chair.jpg');
var cthulhu = new images('cthulhu', 'images/cthulhu.jpg');
var duck_dog = new images('duck_dog', 'images/duck_dog.jpg');
var pet_sweeper = new images('pet_sweeper', 'images/pet_sweeper.jpg');
var plastic_pen = new images('plastic_pen', 'images/plastic_pen.jpg');
var scissors = new images('scissors', 'images/scissors.jpg');
var shark = new images('shark', 'images/shark.jpg');
var sweeper_baby = new images('sweeper_baby', 'images/sweeper_baby.jpg');
var tautaun = new images('tautaun', 'images/sweeper_baby.jpg');
var unicorn = new images('unicorn', 'images/unicorn.jpg');
var usb = new images('usb','images/unicorn.jpg');
var water_can = new images('water_can', 'images/water_can.jpg');
var wine_glass = new images('wine_glass','images/wine_glass.jpg');

//
var productRank = {
  totalClicks: 0,
  leftObject: null,
  middleObject: null,
  rightObject: null,
  barChart: null,

  //Get all Elements by Id
  leftElement: document.getElementById('imageOne'),
  middleElement: document.getElementById('imageTwo'),
  rightElement: document.getElementById('imageThree'),
  imagesElement: document.getElementById('images'),
  //Generated and returned a random number
  getRandomIndex: function(){
    return Math.floor(Math.random() * imageArray.length);
  },
  //Make a display images
  displayImages: function(){
    // Assign left object to get a random image from the image array
    productRank.leftObject = imageArray[productRank.getRandomIndex()];
    productRank.middleObject = imageArray[productRank.getRandomIndex()];
    productRank.rightObject = imageArray[productRank.getRandomIndex()];

    if (productRank.leftObject === productRank.middleObject || productRank.leftObject === productRank.rightObject || productRank.middleObject === productRank.rightObject){
      productRank.displayImages();
    }
    //access the leftObject's view variable and increment by one
    productRank.leftObject.viewsDisplayed += 1;
    //access the middleObject's view variable and increment by one
    productRank.middleObject.viewsDisplayed += 1;
    //access the rightObject's view variable and increment by one
    productRank.rightObject.viewsDisplayed += 1;
    //access the leftElement's src value (this is the HTML tag 'src = "" ') and assign the imageArray's variable of filePath to it
    productRank.leftElement.src = productRank.leftObject.filePath;
    // duplicate for middleElement
    productRank.middleElement.src = productRank.middleObject.filePath;
    //duplicate for rightElement
    productRank.rightElement.src = productRank.rightObject.filePath;
    //access the leftElement's id value (this is the HTML tag 'id = "" ') and assign the imageArray's variable of name to it
    productRank.leftElement.id = productRank.leftObject.name;
    //do for middleElement
    productRank.middleElement.id = productRank.middleObject.name;
    //do for rightElement
    productRank.rightElement.id = productRank.rightObject.name;
  },
  handleClick: function() {
    if( event.target.id === productRank.leftObject.name || event.target.id === productRank.middleObject.name || event.target.id === productRank.rightObject.name
    ) {
      console.log('clicked');
      totalClicks += 1;
      console.log(totalClicks);
      productRank.displayImages();
      productRank.tallysClicked();
    }
    else {
      alert('Slow down and please click on a photo, not the empty space.');
    }
    if (totalClicks > 24) {
      productRank.imagesElement.removeEventListener('click' , productRank.handleClick);
      console.log('max number clicks reached');
      resultsButton.hidden = false;
      collectTallys();
      return;
    }
  },
  tallysClicked: function(){
  //access your array at array in click tally array Element
    if (event.target.id === productRank.leftObject.name) {
      productRank.leftObject.tallysClicked += 1;
    }

    else if (event.target.id === productRank.middleObject.name) {
      productRank.middleObject.tallysClicked += 1;
    }

    else if (event.target.id === productRank.rightElement.name) {
      productRank.rightElement.tallysClicked += 1;
    }
    else {
      alert('Pick a product!');
    }
    console.log('I clicked' + event.target.id);

    surveyLength += 1;

    productRank.displayImages();
  }
};

productRank.imagesElement.addEventListener('click', productRank.handleClick);
productRank.displayImages();

var handleResults = function() {
  drawChart();
};
resultsButton.addEventListener('click', handleResults);

var collectTallys = function() {
  for (var i = 0; i < imageArray.length; i++) {
    tallyClicks.push(imageArray[i].tallysClicked);
  }
};
