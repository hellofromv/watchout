var width = 960;
var height = 500;
var bombPositions = [];
var numberOfBombs = 10;
var bombHeight = 40;
var marioPosition = [50, 50];
var collisionCount = 0;
var highScore = 0;
var collisionFlag = false;
var marioHeight = 40;


var svg = d3.select('.container').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('cursor', 'none')
  .append('g');


//add mario
var mario = svg.append('image')
  .attr('class', 'mario')
  .attr('x', marioPosition[0])
  .attr('y', marioPosition[1])
  .attr('height', marioHeight)
  .attr('width', marioHeight)
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
  var character = svg.selectAll('.bombs')
      .data(positions);

  // Update old elements as needed.
  character.attr('class', 'bombs')
      .transition().duration(1000)
      .tween('collisions', checkCollisions)
      .attr('xlink:href', function(d) { return this.getAttribute('x') < d[0] ? 'walkingBomb.gif' : 'walkingBombreverse.gif'; })
      .attr('x', function(d) { return d[0]; } )
      .attr('y', function(d) { return d[1]; } );
    
  // Create new elements as needed.
  character.enter().append('image')
      .attr('class', 'bombs')
      .transition().duration(1000)
      .tween('collisions', checkCollisions)
      .attr('xlink:href', function(d) { return this.getAttribute('x') < d[0] ? 'walkingBomb.gif' : 'walkingBombreverse.gif'; })
      .attr('x', function(d) { return d[0]; } )
      .attr('y', function(d) { return d[1]; } );

  character.attr('height', bombHeight)
      .attr('width', bombHeight);

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
  checkCollisions();
});


var checkCollisions = function() {
  return function() {
    if (collisionFlag !== true) {
      collisionFlag = true;
      
      //get Mario's position
      var marioX = Number(d3.select('.mario').attr('x')) - 10; //10 is a fudge factor
      var marioY = Number(d3.select('.mario').attr('y')) - 10;

      //get all the bombs's positions
      var bombsCoordinates = [];
      d3.selectAll('.bombs')[0].forEach(function(el) {
        bombsCoordinates.push([el.getAttribute('x'), el.getAttribute('y')]);
      });

      //check if the distance between mario and all the bomb's is a collision
      bombsCoordinates.forEach(function(aBombXY) {
        var distanceX = aBombXY[0] - marioX;
        var distanceY = aBombXY[1] - marioY;

        var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

        if (distance < 40) {
          collisionCount++;
          if ((time / 1000) > highScore) {
            highScore = time / 1000;
          } 
          updateBoard();
          time = 0;
        }
      });

      setTimeout(function() {
        collisionFlag = false;
      }, 100);
    }
  };
};


var updateBoard = function() {
  d3.select('.highscore').selectAll('span').text(highScore);

  d3.select('.collisions').selectAll('span').text(collisionCount);
};


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
    .text((time / 1000).toFixed(2));
}, 10);
