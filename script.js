// My viewport = 1366 x 652


var game = {
    init: function( ) {
        game.board = {
          spaces: [ [], [] ]
        };

        for ( i = 1; i < 41; i++ ){
          game.board.spaces[ 0 ].push( i )
          game.board.spaces[ 1 ].push( i )
        };

        game.snake = {
          position: [20, 20],
          direction: "r",
          body: [[]]
        };

        game.setup();
    },

    setup: function( ) {
        // Setup gameboard and spaces
        $( '#content' ).append( '<div id="gameboard"></div>' );
        $.each( game.board.spaces[1], function( ) {
          var y = this;
          $.each( game.board.spaces[0], function() {
            var x = this;
            $( '#gameboard' ).append(
              $( '<div class="gamespace"> </div>' ).attr( "id", ( x + "_" + y ))
            );
          });
        });

        $( '#20_20' ).removeClass( 'gamespace' ).addClass('snake');

        game.move();
    },

    getTargetID: function( ) {
        // build functionality for "r" direction first
        var x = game.snake.position[0];
        var y = game.snake.position[1];
        x++;
        var targetID = x + "_" + y
        return targetID;
    },

    move: function( ) {
      var targetDiv = "#" + game.getTargetID();
      $('.snake').removeClass( 'snake' ).addClass( 'gamespace' )
      $(targetDiv).removeClass( 'gamespace' ).addClass('snake');
    }
}


$( document ).ready( game.init );