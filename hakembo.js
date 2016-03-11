
$( document ).ready( function() {

  window.TO_RAD = Math.PI / 180;
  window.TO_DEG = 1 / TO_RAD;

  var content = document.getElementById('content');

  function setText(text) {
     if( $('h3').text() != text ) {
       $('h3').text( text );
     };
  };

  Leap.loop({

    hand: function(hand){

      palmVerticalThreshold = 0.3;
      palmN = hand.palmNormal[0];

      $('#palmn').text( palmN );

      if (palmN >= palmVerticalThreshold ) {
        setText('Playing...');

      } else {

        var thumbFinger = hand.fingers[0],
            indexFinger = hand.fingers[1],
            middleFinger = hand.fingers[2],
            ringFinger = hand.fingers[3],
            littleFinger = hand.fingers[4],
            fingerExtendedCount = 0;
        for(i = 0; i < hand.fingers.length; i++) 
          if(hand.fingers[i].extended) 
            fingerExtendedCount++;
        if(fingerExtendedCount > 3) { //We have to allow people missing a fingr play too! :D //indexFinger.extended && middleFinger.extended && ringFinger.extended && littleFinger.extended ) {
          setText('Paper');
        } else if (indexFinger.extended && (middleFinger.extended || !ringFinger.extended) ) { //Scissors have two blades, not three xD
          setText('Scissors');
        } else { // We can use \,,/, Malocchio sign, because...ROCK! xD
          setText('Rock');
        };

      };
    }

  });
});
