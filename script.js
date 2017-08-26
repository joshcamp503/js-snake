// My viewport = 1366 x 652


var game = {
    init: function( ) {
        
        game.setup();
    },

    setup: function( ) {
        $( '#content' ).append( '<div id="gameboard"></div>' );

        for ( i = 0; i < 1600; i++ ) {
          $( '#gameboard' ).append(
            $( '<div class="gamespace"> </div>' ).attr( "id", ( "d" + i ) )
          );
        };

        $( '#d820' ).replaceWith( '<div id="snakehead"> </div>' );
    }
}


$( document ).ready( game.init );