var width = 960;
var height = 500;
var bombHeight = 40;
var marioPosition = [50, 50];

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g');

//add mario
var mario = svg.append('image')
  .attr('class', 'mario')
  .attr('x', marioPosition[0])
  .attr('y', marioPosition[1])
  .attr('height', bombHeight)
  .attr('width', bombHeight)
  .attr('xlink:href', 'mario.png')
  .style('cursor', 'pointer');

var bombPositions = [];
var numberOfBombs = 15;

// var getMousePosition = function() {
//   var coordinates = [0, 0];
//   coordinates = d3.mouse(this);
//   console.log(coordinates);

//   updateMario(coordinates);
// };

var randomizePositions = function(numberOfBombs) {
  for (var i = 0; i < numberOfBombs; i++) {
    var randomX = Math.random() * (width - bombHeight);
    var randomY = Math.random() * (height - bombHeight);
    bombPositions[i] = [randomX, randomY];
  }
};  

// var updateMario = function(positions) {
//   // DATA JOIN
//   // Join new data with old elements, if any.
//   var character = svg.selectAll('.mario')
//       .data(positions);

//   // UPDATE
//   // Update old elements as needed.
//   character.attr('class', 'mario movable')
//       .attr('transform', function(d) { return 'translate(' + d[0] + ',' + d[1] + ')'; } )
//       .on('mousedown', getMousePosition)
//       .style('cursor', 'pointer')
//       .call(drag);

//   // ENTER
//   // Create new elements as needed.
//   character.enter().append('image')
//       .attr('class', 'mario movable')
//       .attr('transform', function(d) { return 'translate(' + d[0] + ',' + d[1] + ')'; } )
//       .on('mousedown', getMousePosition)
//       .style('cursor', 'pointer')
//       .call(drag);


//   // ENTER + UPDATE
//   // Appending to the enter selection expands the update selection to include
//   // entering elements; so, operations on the update selection after appending to
//   // the enter selection will apply to both entering and updating nodes.
//   character.attr('height', bombHeight)
//       .attr('width', bombHeight)
//       .attr('xlink:href', imageSource);

//   // EXIT
//   // Remove old elements as needed.
//   //bombs.exit().remove();
// };


var updateBombs = function(positions) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var character = svg.selectAll('.bombs')
      .data(positions);

  // UPDATE
  // Update old elements as needed.
  character.attr('class', 'bombs')
      .transition().duration(1000)
      .attr('x', function(d) { return d[0]; } )
      .attr('y', function(d) { return d[1]; } );

  // ENTER
  // Create new elements as needed.
  character.enter().append('image')
      .attr('class', 'bombs')
      .transition().duration(1000)
      .attr('x', function(d) { return d[0]; } )
      .attr('y', function(d) { return d[1]; } );

  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  character.attr('height', bombHeight)
      .attr('width', bombHeight)
      .attr('xlink:href', 'bob-omb.png');

  // EXIT
  // Remove old elements as needed.
  character.exit().remove();
};

//add Mario to svg
//update(marioPosition, 'mario', 'mario.png');

//randomize and update bomb positions
randomizePositions(numberOfBombs);
updateBombs(bombPositions);

d3.select('svg').on('mousemove', function() {
  var coordinates = d3.mouse(this);
  d3.select('.mario')
    .attr('x', coordinates[0])
    .attr('y', coordinates[1]);
});


// Grab a random sample of letters from the alphabet, in alphabetical order.
setInterval(function() {
  randomizePositions(numberOfBombs);
  updateBombs(bombPositions);
}, 1000);