//===================================model======================================

let catsModel = {
  currentCat: null,
  cats: [
  {
    name: 'Jimin Cat',
    numberOfClick: 0,
    image: 'images/cat-and-jimin.jpg',
    altTxt: 'blonde Jimin with ginger cat'
  },
  {
    name: 'Brandley',
    numberOfClick: 0,
    image: 'images/brandley.jpg',
    altTxt: 'Jimin with cat'
  },
  {
    name: 'Futrzak',
    numberOfClick: 0,
    image: 'images/cat3.jpg',
    altTxt: 'young Jimin with furry cat'
  },
  {
    name: 'Serendipity',
    numberOfClick: 0,
    image: 'images/cat4.jpg',
    altTxt: 'Jimin with cat from MV'
  },
  {
    name: 'Random Cat',
    numberOfClick: 0,
    image: 'images/cat5.jpg',
    altTxt: 'Jimin with black cat'
  }
]};

let adminModel = {
  inputData: [
    {
      label: 'Name ',
      inputType: 'text'
    },
    {
      label: 'Image url ',
      inputType: 'text'
    },
    {
      label: 'Number of clicks ',
      inputType: 'text'
    }
  ],
  buttonData: [
    {
      buttonId: 'cancelButton',
      text: 'Cancel'
    },
    {
      buttonId: 'saveButton',
      text: 'Save'
    }
  ]
}
//===========================octopus============================================

let octopus = {
  // initialize page
  initialize: function() {
    catsNameList.loadList();
    showingCatPicture.loadCats();
    adminMode.initAdmin();
  },

  // get current cat
  getCurrentCat: function() {
    return catsModel.currentCat;
  },

  setCurrentCat: function(currentElement) {
    catsModel.currentCat = currentElement;
  },

  getCats: function() {
    return catsModel.cats;
  },

  countClick: function() {
    catsModel.currentCat.numberOfClick++;
    showingCatPicture.render();
  },

  // variable to show / hide admin mode
  showAdminMode: true,

  getInputData: function() {
    return adminModel.inputData;
  },

  getButtonData: function() {
    return adminModel.buttonData;
  }
}
//====================view======================================================

let catsNameList = {
  // load cat list on page
  loadList: function() {
    let listOfCats = document.getElementById('catList');
    let catsFromModel = octopus.getCats();

    for (let i = 0; i < catsFromModel.length; i++) {
      let currentElement = catsFromModel[i];
      let listElement = document.createElement('li');
      listElement.appendChild(document.createTextNode(currentElement.name));
      listOfCats.appendChild(listElement);

      //add event listener to cat list
      listElement.addEventListener('click', (function(currentElementCopy) {
        return function() {
          octopus.setCurrentCat(currentElementCopy);
          showingCatPicture.render();
        };
      })(currentElement));
    }
  },
}

let showingCatPicture = {

  loadCats: function() {
    // store variable for future use
    this.nameFromDom = document.getElementById('catName');
    this.imageFromDom = document.getElementById('cat-image');
    this.textFromDom = document.getElementById('text');
    this.numberFromDom = document.getElementById('number');

    //add event listener to picture
    this.imageFromDom.addEventListener('click', function() {
      octopus.countClick();
    });
  },

  // fill current cat with current data
  render: function() {
    let currentCat = octopus.getCurrentCat();
    this.nameFromDom.textContent = currentCat.name;
    this.imageFromDom.src = currentCat.image;
    this.imageFromDom.alt = currentCat.altTxt;
    this.textFromDom.textContent = 'You clicked on Jimin and his cat this number of times:';
    this.numberFromDom.textContent = currentCat.numberOfClick;
  },
}

let adminMode = {

  initAdmin: function() {
    let adminButton = document.getElementById('adminButton');

    // add event listener to show and hide admin mode
    adminButton.addEventListener('click', function() {
      if (octopus.showAdminMode === true) {
        adminMode.loadAdmin();
      } else {
        adminMode.closeAdmin();
      }
    });
  },

  // show admin mode
  loadAdmin: function() {
    let admArea = document.getElementById('adminArea');
    let input = octopus.getInputData();
    let buttons = octopus.getButtonData();

    // build input fields
    for (let i = 0; i < input.length; i++) {
      let currentInput = input[i];
      let labelElement = document.createElement('label');
      let inputElement = document.createElement('input');
      labelElement.appendChild(document.createTextNode(currentInput.label));
      inputElement.setAttribute('id', 'input' + (i + 1));
      inputElement.setAttribute('type', currentInput.inputType);
      admArea.appendChild(labelElement);
      labelElement.appendChild(inputElement);
    };

    // build buttons
    for (let i = 0; i < buttons.length; i++) {
      let currentButton = buttons[i];
      let buttonElement = document.createElement('button');
      buttonElement.appendChild(document.createTextNode(currentButton.text));
      buttonElement.setAttribute('id', currentButton.buttonId);
      admArea.appendChild(buttonElement);
    };

      // add event listener to save input data
      let save = document.getElementById('saveButton');
      save.addEventListener('click', function() {
        adminMode.saveAdminInputs();
      });

      // add event listener to close admin mode
      let cancel = document.getElementById('cancelButton');
      cancel.addEventListener('click', function() {
        adminMode.closeAdmin();
      });

      // set 'false' to prevent load next input and buttons
      octopus.showAdminMode = false;
  },

  // close admin mode
  closeAdmin: function() {
    document.getElementById('adminArea').innerHTML = '';
    // set 'true' to let load admin mode with next click
    octopus.showAdminMode = true;
  },

  // save inputs if not empty and change data
  // ======= to do: prevent from fill input fields with space only =====
  saveAdminInputs: function() {
    // cat name
    if (document.getElementById('input1').value !== '') {
      adminMode.changeName();
    };

    // cat image
    if (document.getElementById('input2').value !== '') {
      adminMode.changeImage();
    };

    // number of clicks
    if (document.getElementById('input3').value !== '') {
      adminMode.changeClicks();
    };
  },

  changeName: function() {
    let newName = document.getElementById('input1').value; // get input data
    let currentCat = octopus.getCurrentCat(); // get current cat
    currentCat.name = newName; // change current data to input data
    showingCatPicture.render(); // load new data
  },

  changeImage: function() {
    let newImg = document.getElementById('input2').value; // get input data
    let currentCat = octopus.getCurrentCat(); // get current cat
    currentCat.image = newImg; // change current data to input  data
    showingCatPicture.render(); // load new data
  },

  changeClicks: function() {
    let newClick = document.getElementById('input3').value; // get input data
    let currentCat = octopus.getCurrentCat(); // get current cat
    currentCat.numberOfClick = newClick; // change current data to input data
    showingCatPicture.render(); // load new data
  }

}

// call function to load page
octopus.initialize();
