//Keymap: 1, 2, 3, 4, R

$(document).ready( function () {
	var test = 1;

	//reset/refresh with click or 'R' key
	$(document).bind('keydown',function(e){
       if(e.keyCode == 82) {
          console.log("R");
          $("#header").trigger("click");
       }
    });

    //for testing purposes only
    $(document).bind('keydown',function(e){
       if(e.keyCode == 49) { //1 key
          console.log("1");
          $("#one").trigger("click");
       }
    });
    $(document).bind('keydown',function(e){
       if(e.keyCode == 50) { //2 key
          console.log("2");
          $("#two").trigger("click");
       }
    });
    $(document).bind('keydown',function(e){
       if(e.keyCode == 51) { //3 key
          console.log("3");
          $("#three").trigger("click");
       }
    });
    $(document).bind('keydown',function(e){
       if(e.keyCode == 52) { //4 key
          console.log("4");
          $("#four").trigger("click");
       }
    });

    //actual clicks on elements
    $("#header").click(function() {
  		location.reload();
	});
    $("#one").click(function() {
  		console.log("Something should happen here");
	});
    $("#two").click(function() {
  		console.log("Something should happen here");
	});
	$("#three").click(function() {
  		console.log("Something should happen here");
	});
	$("#four").click(function() {
  		console.log("Something should happen here");
	});

	//auto scroll 158px
});