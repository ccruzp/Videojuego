//This document explains the implementation of a Shuffle Bag and the needed
//functions for its usability in Phaser.

SHUFFLEBAG_ELEMENTS = 27; //Number of elements in the shuffle bag

// Create and initialize a Shuffle Bag
// Get an element from the shuffle Bag
// Restart the Shuffle Bag once the Shuffle Bag is empty

// Create and initialize the Shuffle Bag
shuffleBag_Setup: function(){
    // Create the Shuffle Bag with "SHUFFLEBAG_ELEMENTS" elements
    this.shuffleBag = this.add.group();
    this.shuffleBag.createMultiple(SHUFFLEBAG_ELEMENTS,'','',true);
    
    // Initializes the shuffle bag, each element having its index value
    // This can be changed to initialize each element manually to an
    // arbitrary value
    this.shuffleBag.forEach(function(element) {
	element.value = this.shuffleBag.getIndex(element);
    }, this);
},

// Gets next element from the shuffle Bag
shuffleBag_Get: function(random){

    // If shuffleBag is empty, restart the shuffleBag (function)
    if (this.shuffleBag.countLiving() == 0){
	this.shuffleBag_Restart();
    }
    
    // Set random values to match values of next element in shuffle Bag 
    // This element is select randomly from the list of alive elements
    element = this.shuffleBag.getRandom( SHUFFLEBAG_ELEMENTS-(this.shuffleBag.countLiving()));
    random = element.value;
    
    // Kill the element used
    element.kill();
	
    // Move the element to the top of the group
    this.shuffleBag.sendToBack(element);
      
},

//Restart the shuffle bag once is "empty"
shuffleBag_Restart: function(){
    //Revive all elements from the shuffleBag
    this.shuffleBag.forEachDead(function(element){
	element.reset();
    },this);
    
},