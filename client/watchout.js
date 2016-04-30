var width = 960;
var height = 500;
var bombHeight = 40;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g');

var bombPositions = [];
var numberOfBombs = 15;

var getMousePosition = function() {
  var coordinates = [0, 0];
  coordinates = d3.mouse(this);
  console.log(coordinates);

  update(coordinates, 'mario', 'mario.png');
};

var randomizePositions = function(numberOfBombs) {
  for (var i = 0; i < numberOfBombs; i++) {
    var randomX = Math.random() * (width - bombHeight);
    var randomY = Math.random() * (height - bombHeight);
    bombPositions[i] = [randomX, randomY];
  }
};  

var update = function(positions, className, imageSource) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var character = svg.selectAll('.' + className)
      .data(positions);

  // UPDATE
  // Update old elements as needed.
  character.attr('class', className)
      .transition().duration(1500)
      .attr('x', function(d) { return d[0]; } )
      .attr('y', function(d) { return d[1]; } );

  // ENTER
  // Create new elements as needed.
  character.enter().append('image')
      .attr('class', className)
      .transition().duration(1500)
      .attr('x', function(d) { return d[0]; } )
      .attr('y', function(d) { return d[1]; } );


  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  character.attr('height', bombHeight)
      .attr('width', bombHeight)
      .attr('xlink:href', imageSource);

  // EXIT
  // Remove old elements as needed.
  //bombs.exit().remove();
};

//add Mario to svg
var marioPosition = svg.on('mouseclick', getMousePosition);
//update(marioPosition, 'mario', 'mario.png');

//randomize and update bomb positions
randomizePositions(numberOfBombs);
update(bombPositions, 'bomb', 'bob-omb.png');

// Grab a random sample of letters from the alphabet, in alphabetical order.
setInterval(function() {
  randomizePositions(numberOfBombs);
  update(bombPositions, 'bomb', 'bob-omb.png');
}, 1000);