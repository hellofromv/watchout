var width = 960;
var height = 500;
var bombPositions = [];
var numberOfBombs = 15;
var bombHeight = 40;
var marioPosition = [50, 50];

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('cursor', 'none')
  .append('g');

//add mario
var mario = svg.append('image')
  .attr('class', 'mario')
  .attr('x', marioPosition[0])
  .attr('y', marioPosition[1])
  .attr('height', bombHeight)
  .attr('width', bombHeight)
  .attr('xlink:href', 'mario.png')
  .style('cursor', 'none');

var randomizePositions = function(numberOfBombs) {
  for (var i = 0; i < numberOfBombs; i++) {
    var randomX = Math.random() * (width - bombHeight);
    var randomY = Math.random() * (height - bombHeight);
    bombPositions[i] = [randomX, randomY];
  }
};  

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

//randomize and update bomb positions
randomizePositions(numberOfBombs);
updateBombs(bombPositions);

d3.select('svg').on('mousemove', function() {
  var coordinates = d3.mouse(this);
  d3.select('.mario')
    .attr('x', coordinates[0])
    .attr('y', coordinates[1]);

  //checkCollision(coordinates);  
});


var checkCollisions = function(marioPosition) {
  console.log(d3.selectAll('.bombs').attr('x'));
};

checkCollisions();



//reset bomb positions every second
setInterval(function() {
  randomizePositions(numberOfBombs);
  updateBombs(bombPositions);
}, 1000);

//timer
var time = 0;
setInterval(function() {
  time += 10;
  d3.select('.current').selectAll('span')
    .data([1])
    .text(time / 1000);
}, 10);