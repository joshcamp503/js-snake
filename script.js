// My viewport = 1366 x 652


var game = {
    init: function( ) {
        game.board = {
          spaces: [ [], [] ]
        }
        for ( i = 1; i < 41; i++ ){
          game.board.spaces[ 0 ].push( i )
          game.board.spaces[ 1 ].push( i )
        }
        game.setup( )
      },

    snake: {
            direction: "right",
            bodyCount: 0,
            move: function( ) {
                if ( game.snake.direction == "right" ) {
                  game.snake.x++
                } else if ( game.snake.direction == "up" ) {
                  game.snake.y--
                // for some reason I have to decrease y here to make the snake go up but i dont know why     
                } else if ( game.snake.direction == "left" ) {
                  game.snake.x--
                } else if ( game.snake.direction == "down" ) {
                  game.snake.y++   
                } else {
                  game.snake.x = 20
                  game.snake.y = 20
                }
                var current = [ game.snake.x, game.snake.y ]
                this.body[ this.bodyCount ] = current
                console.log( this.body )
                game.snake.moveMarker( game.snake.x, game.snake.y, 'snake' )
              },


            // THIS IS WHERE YOU STOPPED THIS FUNCTION DOESNT GET CALLED ANYWHERE YET
            // coord is x/y, dir is + or -
            moveLoop: function( coord, dir ){ 
                if (dir != 1 || dir != -1) {
                  break
                }
                for (var i = 0; i <= this.body.length - 1; i++) {
                  this.body[i][0]++
                }
              },

            moveMarker: function( i, j, k ) {
                $( "." + k ).removeClass( ).addClass( 'gamespace' )
                var targetDiv = "#" + i + "_" + j
                if ( $( targetDiv ).hasClass( 'food' ) ) {
                  game.snake.getBigger()
                  game.makeFood()
                } 
                $( targetDiv ).removeClass( ).addClass( k )
              },

            getBigger: function( ) {
                console.log("Gets bigger")
                var segment = [ game.snake.x - 1, game.snake.y ]
                game.snake.body.push(segment)
                game.snake.bodyCount++
                // return game.snake.body
              },

            getCoords: function( ) {
                var coords = [ this.x, this.y ]
                return coords
              }
      }, 

    setup: function( ) {
        // Setup gameboard and spaces
        // Using an array of arrays and a loop inside a loop
        $( '#content' ).append( '<div id="gameboard"></div>' )
        $.each( game.board.spaces[ 1 ], function( ) {
          var y = this
          $.each( game.board.spaces[ 0 ], function( ) {
            var x = this
            $( '#gameboard' ).append(
              $( '<div class="gamespace"> </div>' ).attr( "id", ( x + "_" + y ))
            )
          })
        })

        game.snake.x = 20
        game.snake.y = 20
        game.snake.body = [ [ game.snake.x, game.snake.y ] ]

        game.setControls( )
        game.makeFood( )
        game.start( )
      },

    setControls: function( ) {
        $( 'body' ).keypress( function( e ) {
          if ( e.which == 107 ) {
            game.snake.direction = "down"
          } else if ( e.which == 106 ) {
            game.snake.direction = "left"
          } else if ( e.which == 105 ) {
            game.snake.direction = "up"
          } else if ( e.which == 108 ) {
            game.snake.direction = "right"
          } else {
            game.snake.direction = "pause"
          }
        })
      },

    makeFood: function ( ) {
        function getRandomInt( min, max ) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }
        var randx = getRandomInt( 1, 40 )
        var randy = getRandomInt( 1, 40 )
        var foodTargetDiv = "#" + randx + "_" + randy
        $( foodTargetDiv ).removeClass( ).addClass( 'food' )
      },

    start: function( ) {        
        // Low-key recursive game loop
        ( function gameLoop( i ) {
          setTimeout( function ( ) {
            i.move( )
            if ( ( i.x < 41 ) && ( i.x > 0 ) && ( i.y < 41 ) && ( i.y > 0 ) ) {          // If i < board constraints, keep looping
              gameLoop( i )       // Call the loop again, and pass it the current value of i
            } else if ( i.direction == "pause" ) {
              console.log( i.direction )
            } else {
              console.log("game over")
            }
          }, 100 )
        } )( game.snake )      // Pass an argument to the loop function

      }

  }


$( document ).ready( game.init )
