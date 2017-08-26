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

        game.setup();
    },

    setup: function( ) {
        $( '#content' ).append( '<div id="gameboard"></div>' );

        $.each(game.board.spaces[1], function( ) {
          var y = this;
          $.each(game.board.spaces[0], function() {
            var x = this;
            $( '#gameboard' ).append(
              $( '<div class="gamespace"> </div>' ).attr( "id", ( x + "_" + y ))
            );
          });
        });

        $( '#29_29' ).replaceWith( '<div id="snakehead"> </div>' );
    }
}


$( document ).ready( game.init );