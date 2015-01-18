//Keymap: 1, 2, 3, 4, R

$(document).ready( function () {
	var test = 1;

	var data1 = [60, 61, 62, 63, 65];
	var data2 = [3.1, 3.6, 3.8, 4, 4.1];

	var data3 = [];
	var data4 = [];

	var stockName = "AAPL";

	//adds up all array elements and returns sum
	function sumOfArrayElements(array){
		var sum = 0;
		for (var i = 0; i < array.length; i++){
			sum += array[i];
		}
		return sum;
	}
	function sumOfArrayElementProducts(array1, array2){
		if (array1.length != array2.length){
			console.log("In sumOfArrayElementSums, arrays aren't the same length");
			console.log("Continuing anyway");
		}
		var sum = 0;
		for (var i = 0; i < array1.length; i++){
			sum += array1[i] * array2[i];
		}
		return sum;
	}

	function sumOfSquaredArrayElements(array){
		var sum = 0;
		for (var i = 0; i < array.length; i++){
			sum += Math.pow(array[i], 2);
		}
		return sum;
	}

	function meanOfArrayElements(array){
		return sumOfArrayElements(array) / array.length;
	}

	function calculateStandardDeviation(array){
		var mean = meanOfArrayElements(array);
		var sumOfSquaredDifferences = 0;
		for (var i = 0; i < array.length; i++){
			sumOfSquaredDifferences += Math.pow(array[i] - mean, 2);
		}
		var standardDeviation = Math.pow(sumOfSquaredDifferences / (array.length - 1), (1/2));
		return standardDeviation;
	}

	function calculateCorrelationCoefficient(array1, array2){
		if (array1.length != array2.length){
			console.log("Lengths aren't equal, proceeding anyway");
			console.log("Array1: " + array1.length + " Array2: " + array2.length);
		}
		var r = 0;
		var summation = 0;
		var array1Mean = meanOfArrayElements(array1);
		var array2Mean = meanOfArrayElements(array2);

		var array1StdDev = calculateStandardDeviation(array1);
		var array2StdDev = calculateStandardDeviation(array2);

		for (var i = 0; i < array1.length; i++){
			summation += (((array1[i] - array1Mean) / array1StdDev) * ((array2[i] - array2Mean) / array2StdDev));
		}
		r = (1 / array1.length - 1);
		console.log("Means: " + array1Mean + " " + array2Mean);
		console.log("Standard Deviations: " + array1StdDev + " " + array2StdDev);
		return r * summation;
	}

	function getCorrelationCoefficient(array1, array2){
		if (array1.length != array2.length){
			console.log("Correlation coefficient arrays aren't same length");
		}
		var size = array1.length;
		var sumArray1 = sumOfArrayElements(array1);
		var sumArray2 = sumOfArrayElements(array2);
		var sumProducts = sumOfArrayElementProducts(array1, array2);
		var sumArray1Squares = sumOfSquaredArrayElements(array1);
		var sumArray2Squares = sumOfSquaredArrayElements(array2);
		console.log(sumArray1 + " " + sumArray2 + " " + sumProducts +
		 " " + sumArray1Squares + " " + sumArray2Squares);


		var r = ((size)*(sumProducts)-(sumArray1)*(sumArray2))/
			Math.pow(((size)*(sumArray1Squares)-(Math.pow(sumArray1,2)))*
			((size)*(sumArray2Squares)-(Math.pow(sumArray2, 2))), .5);
		console.log(r);
		return r;
	}

//00DE5E

	function correlationColor(r){
		if (r < -1 || r > 1){
			console.log("Correlation coefficient is too large or too small");
		}

		//#00DE5E

		var R;
		var G;
		var B;
		var colorMix = 204;
		if (r == 0){
			R = 222;
			G = 222;
			B = 222;
		}
		else if (r > 0){
			//222
			//0, 222, 94 is maximum

			//MAX (neutral) +222, +128
			//ratio: 18 / 104; 64 / 131

			//1.

			//0.5869565217391304
			G = 222;
			//colorMix = 0;
			R = 222 - (128*r*1.7335);
			//0 + (222 - colorMix);
			B = 222 - (128*r);
			//94 + (128 );
		}
		else{
			r *= -1;
			R = 222;
			//colorMix = 255 + (255 * r);
			G = 222 - (128*r*1.7335);
			B = 222 - (128*r);
		}

		return [R, G, B];
		//console.log(R + " " + G + " " + B);
	}

	function transition(){
		$("#buttons").animate({
		 backgroundColor: "#000"
		}, "slow" );
	}

	function transitionColor(r){
		var color = correlationColor(r);
		console.log(color);
		jQuery("#buttons, #header").animate({
		 backgroundColor: jQuery.Color("rgb(" + parseInt(color[0]) + "," + parseInt(color[1]) + "," + parseInt(color[2]) + ")")
		}, "slow" );
	}

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
    $(document).bind('keydown',function(e){
       if(e.keyCode == 53) { //4 key
          console.log("5");
          $("#five").trigger("click");
       }
    });

    //actual clicks on elements
    $("#header").click(function() {
  		//location.reload();
	});
    $("#one").click(function() { //X
    	//console.log(calculateCorrelationCoefficient(data1, data2));
	});
    $("#two").click(function() { //Y

    	//correlationColor(getCorrelationCoefficient(data1, data2));
	});
	$("#three").click(function() { //frequency
		//transitionColor(getCorrelationCoefficient(data1, data2));

	});
	$("#four").click(function() {
		//transition();
	});
	$("#five").click(function() {

		//transitionColor(getCorrelationCoefficient(data1, data2));
		//TRYING TO WORK WITH QUANDL
		stockName = "AMD";
	getQuandlData(function(data) { //asynch
        console.log(data.data);
        console.log(data.data.length);

        var significantValues = [];
        for (var i = 0; i < data.data.length; i++){
        	significantValues.push(data.data[i][1]);
        }
        console.log(significantValues);
        data3 = significantValues;
      });	

		stockName = "T";
	getQuandlData(function(data) { //asynch
        console.log(data.data);
        console.log(data.data.length);

        var significantValues = [];
        for (var i = 0; i < data.data.length; i++){
        	significantValues.push(data.data[i][1]);
        }
        console.log(significantValues);
        data4 = significantValues;
        transitionColor(getCorrelationCoefficient(data3, data4));
      });










		//END OF QUANDL
	}); //end of "five" click

	  //Quandl section before moved to different file ---
  function getQuandlData(callback){
    //console.log(data);
    var filter = "?collapse=weekly&trim_start=2014-01-17";
    var urlContent = "datasets/WIKI/" + stockName + ".json" + filter;
    var URL = buildQuandlURL(urlContent, "");
    getQuandlObject(URL, function(data) {
      callback(data);
    });
  }

  function getQuandlObject(URL, callback){ //error checking...
    //https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?auth_token=VEUT87tRgmysCmNqsAfS
    $.getJSON( URL, function( data ) {
      callback(data);
    })
  }
  function buildQuandlURL(content, trail){ //Won't work with all cases
    var auth_token = "VEUT87tRgmysCmNqsAfS";
    var auth_token_url = "&auth_token=" + auth_token;
    var base_url = "https://www.quandl.com/api/v1/";
    return base_url + content + auth_token_url + trail;
  }
});