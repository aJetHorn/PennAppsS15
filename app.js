//Keymap: 1, 2, 3, 4, R

$(document).ready( function () {
	var test = 1;

	var data1 = [60, 61, 62, 63, 65];
	var data2 = [3.1, 3.6, 3.8, 4, 4.1];

	var data3 = [];
	var data4 = [];

	var dataX = [];
	var dataY = [];

	var dataURL;

	var dataXURL;
	var dataYURL;

  var dataXName;
  var dataYName;

	var X = true; //X and Y

	var smallestSize;

	var stockNameX = " "; //was AAPL
	var bgColor = "#ecf0f1";

  var formattedGraphData = [];


	//adds up all array elements and returns sum
	function sumOfArrayElements(array){
		var sum = 0;
		for (var i = 0; i < array.length; i++){
			sum += array[i];
		}
		return sum;
	}
	function sumOfArrayElementProducts(array1, array2){
		var size = array1.length;
		if (array1.length != array2.length){
			console.log("In sumOfArrayElementSums, arrays aren't the same length");
			console.log("array1: " + array1.length + " " + "array2: " + array2.length);
			if (array1.length > array2.length){
				size = array2.length;
			}
		}
		var sum = 0;
		for (var i = 0; i < size; i++){
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
		var size = array1.length;
		if (array1.length != array2.length){ //change this if error
			console.log("Correlation coefficient arrays aren't same length");
			if (array1.length > array2.length){
				size = array2.length;
				array1 = array1.slice(0, array2.length);
			}
			else{
				array2 = array2.slice(0, array1.length);
			}
			//size = array2.length; //change this if it produces an error
		}
		//var size = array1.length;
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
			R = 222 - (128*r*1.7335);
			B = 222 - (128*r);
		}
		else{
			r *= -1;
			R = 222;
			G = 222 - (128*r*1.7335);
			B = 222 - (128*r);
		}

		return [R, G, B];
	}

	function transition(){
		$("#buttons").animate({
		 backgroundColor: "#000"
		}, "slow" );
	}

	function transitionColor(r){
		var color = correlationColor(r);
    backgroundColor = color; //lazy global, used with canvas
		console.log(color);
		jQuery("#buttons, #header").animate({
		 backgroundColor: jQuery.Color("rgb(" + parseInt(color[0]) + "," + parseInt(color[1]) + "," + parseInt(color[2]) + ")")
		}, "slow" );
	}

	function clearXYPanel(){
		$("#tags").val("");
		$("#stock").val("");
	}

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
	function getURLByName(name){
		var URL = "#_#_INVALID NAME PAIRING_#_#";
		for (var i = 0; i < dataSource.length; i++){
			if (name.toUpperCase() == "STOCK"){
				URL = "WIKI/" + stockName;
			}
			else if (dataSource[i][0].toUpperCase() == name.toUpperCase()){
				URL = dataSource[i][1];
			}
		}
		return URL;
	}
	function setDataXURL(URL){
		dataXURL = URL;
	}
	function setDataYURL(URL){
		dataYURL = URL;
	}
	// $("#useButton").click(function() {
	// 	if (X){
			
 //      if ($("#stock").val().toUpperCase() != ""){
 //        stockName = $("#stock").val().toUpperCase();
 //        dataXName = $("#tags").val() + " (" + stockName + ")";
 //      }
 //      else{
 //        dataXName = $("#tags").val();
 //      }
 //      var urlTemp = getURLByName($("#tags").val());
	// 		setDataXURL(urlTemp);
	// 		console.log(dataXURL);

	// 		dataURL = dataXURL;
	// 	getQuandlData(function(data) { //asynch
 //        console.log(data.data);
 //        console.log(data.data.length);

 //        var significantValues = [];
 //        for (var i = 0; i < data.data.length; i++){
 //        	significantValues.push(data.data[i][1]);
 //        }
 //        console.log(significantValues);
 //        //data3 = significantValues;
 //        dataX = significantValues;
 //      });	

	// 	}
	// 	else{
			
 //      if ($("#stock").val().toUpperCase() != ""){
 //        stockName = $("#stock").val().toUpperCase();
 //        dataYName = $("#tags").val() + " (" + stockName + ")";
 //      }
 //      else{
 //        dataYName = $("#tags").val();
 //      }
 //      var urlTemp = getURLByName($("#tags").val());
      
	// 		setDataYURL(urlTemp);
	// 		console.log(dataYURL);


	// 	dataURL = dataYURL;
	// getQuandlData(function(data) { //asynch
 //        console.log(data.data);
 //        console.log(data.data.length);

 //        var significantValues = [];
 //        for (var i = 0; i < data.data.length; i++){
 //        	significantValues.push(data.data[i][1]);
 //        }
 //        console.log(significantValues);
 //        //data4 = significantValues;
 //        dataY = significantValues;
 //        //transitionColor(getCorrelationCoefficient(data3, data4));
 //        //transitionColor(getCorrelationCoefficient(dataX, dataY));
 //      });

	// 	}
	// 	$("#xyPanel").toggle("drop", {}, 500);
	// 	clearXYPanel();
	// });

    $("#buttons .button").click(function() {
      if ($("#info").is(':visible')){
        $("#info").toggle("drop", {}, 500);
      }
    })

    $("#one").click(function() {
      $("#data1").toggle("drop", {}, 500);
    })

 //    $("#one").click(function() { //X
 //    	if (!($("#xyPanel").is(':visible') && !X)){
 //    		$("#xyPanel").toggle("drop", {}, 500);
 //    	}
 //    	X = true;
 //    	clearXYPanel();
	// });
 //    $("#two").click(function() { //Y
 //    	if (!($("#xyPanel").is(':visible') && X)){
 //    		$("#xyPanel").toggle("drop", {}, 500);
 //    	}
 //    	X = false;
 //    	clearXYPanel();
	// });
	$("#three").click(function() { //frequency
		//transitionColor(getCorrelationCoefficient(data1, data2));
		//console.log($("#xyPanel").is(':visible'));

	});
	$("#four").click(function() {
		//transition();
	});
	$("#five").click(function() {

		//transitionColor(getCorrelationCoefficient(data1, data2));
		//TRYING TO WORK WITH QUANDL
		//stockName = "AMD";



	// 	dataURL = dataXURL;
	// getQuandlData(function(data) { //asynch
	// 	console.log("X");
 //        console.log(data.data);
 //        console.log(data.data.length);

 //        var significantValues = [];
 //        for (var i = 0; i < data.data.length; i++){
 //        	significantValues.push(data.data[i][1]);
 //        }
 //        console.log(significantValues);
 //        //data3 = significantValues;
 //        dataX = significantValues;
 //      });	




	// 	//stockName = "T";
	// 	dataURL = dataYURL;
	// getQuandlData(function(data) { //asynch
	// 	console.log("Y");
 //        console.log(data.data);
 //        console.log(data.data.length);

 //        var significantValues = [];
 //        for (var i = 0; i < data.data.length; i++){
 //        	significantValues.push(data.data[i][1]);
 //        }
 //        console.log(significantValues);
 //        //data4 = significantValues;
 //        dataY = significantValues;
 //        //transitionColor(getCorrelationCoefficient(data3, data4));
 //        //transitionColor(getCorrelationCoefficient(dataX, dataY));
 //      });


    buildFormattedGraph();
    drawGraph();
    transitionColor(getCorrelationCoefficient(dataX, dataY));
    //$('#display').css('width', '100%'); .animate({'width':perc+'%'});
    //$('#display').animate({'width':100+'%'});
    // jQuery("#display, html").animate({
    //  backgroundColor: jQuery.Color("rgb(" + parseInt(backgroundColor[0]) + "," + parseInt(backgroundColor[1]) + "," + parseInt(backgroundColor[2]) + ")")
    // }, "fast" );

		//END OF QUANDL
	}); //end of "five" click

	  //Quandl section before moved to different file ---
  function getQuandlData(callback){
    //console.log(data);
    var filter = "?collapse=weekly&trim_start=2014-01-17"; //default, will be changed
    var urlContent = dataURL + ".json" + filter;
    // if (X){
    // 	console.log("X...");
    // 	urlContent = dataXURL + ".json" + filter;
    // }
    // else if (!X){
    // 	console.log("Y...");
    // 	urlContent = dataYURL + ".json" + filter;
    // }
    //"WIKI/" + stockName + ".json" + filter;
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
    var base_url = "https://www.quandl.com/api/v1/datasets/";
    return base_url + content + auth_token_url + trail;
  }

  function buildFormattedGraph(){
    var graphSize = dataX.length; 
    if (dataX.length != dataY.length){ //unequal lengths
      if (dataX.length > dataY.length){
          graphSize = dataY.length;
          dataX = dataX.slice(0, dataY.length);
      }
      else{
        dataY = dataY.slice(0, dataX.length);
      }
    }

    for (var i = 0; i < graphSize; i++){
      formattedGraphData.push([i+1,dataX[i],dataY[i]]);
    }
  }
  function drawGraph() {
    g = new Dygraph(document.getElementById("display"),
      formattedGraphData,
      {
        ylabel: 'Price in USD or Amount',
        xlabel: 'Weeks',
        title: dataXName + " vs. " + dataYName,
        showRoller: false,
        rollPeriod: 1
      })
    g.resize(1160, 360);
     //$('#display').css('width', '100%').css('width', '-=1px');
  }
//Tags!

	var dataTypes = [
      "Bitcoin",
      "Aluminum",
      "Coal",
      "Copper",
      "Crude Oil",
      "Milk",
      "Beef",
      "Cattle Hides",
      "Broiler Chickens",
      "Pork",
      "Butter",
      "Lamb",
      "Wool",
      "Salmon",
      "Shrimp",
      "Fishmeal",
      "US Harbor Gasoline",
      "Regular Gas",
      "Midgrade Gas",
      "Premium Gas",
      "All Gas (Weighted)",
      "Gold",
      "Marcellus Natural Gas",
      "Palladium",
      "Platinum",
      "Silver",
      "Steel",
      "Iron",
      "Lead",
      "Zinc",
      "Tin",
      "Iridium",
      "Rhodium",
      "Tobacco",
      "Fed Funds Effective",
      "4-week Treasury Bill",
      "3-month Treasury Bill",
      "6-month Treasury Bill",
      "1-year Treasury Bill",
      "Prime Rate",
      "S&P 500 Index",
      "Nasdaq 100 Index",
      "Dow Jones Industrial Average",
      "NYSE ARCE Major Market Index",
      "NYSE ARCA Institutional Index",
      "Nasdaq Composite Index",
      "RUSSELL 3000 Index",
      "Wilshire 5000 Index",
      "NYSE Composite Index",
      "Nasdaq Bank Index",
      "Nasdaq Computer Index",
      "Nasdaq Industrial Index",
      "PHLX Housing Sector Index",
      "Morgan Stanley Consumer Index",
      "PHLX Oil Service Sector Index",
      "NYSE AMEX Natural Gas Index",
      "NYSE Amex Oil Index",
      "TSX Global Gold Index",
      "US Total Population (Thousands)",
      "China Total Population (Millions)",
      "US Total Urban Population (Thousands)",
      "US Population Annual Percentage Growth Rate",
      "US Unemployment Rate (Percentage of total labor force)",
      "US Consumer Price Index (1983 = 100)",
      "US General Government Total Expenditure (Billions)",
      "US GDP at constant prices (percentage change)",
      "US Industrial Production (constant US prices, seasonal adjustment)",
      "US Total Nuclear Production (in thousands of KW-hrs)",
      "China Total Nuclear Production (in thousands of KW-hrs)",
      "US Total Wind Production (in thousands of KW-hrs)",
      "US Public Expenditure on education (Percentage of GDP)",
      "Norway Public Expenditure on education (Percentage of GDP)",
      "Sugar No. 16 Futures",
      "Orange Juice Futures",
      "Cocoa Futures",
      "US Life Expectancy at birth",
      "US Age at first marriage, male",
      "US Immunization (percentage of children age 12-23 months)",
      "US health expenditure per capita",
      "US Improved sanitation facilities (percent of population with access",
      "Canada CO2 emissions (kilotons)",
      "California Zillow Home Value Index (All Homes)",
      "US Nitrous oxide emissions (thousand metric tons of CO2 equivalent)",
      "Sweden Nitrous oxide emissions (thousand metric tons of CO2 equivalent)",
      "China Number of people under-nourished",
      "US Agriculture value added (percentage of GDP)",
      "US Services value added (percentage of GDP)",
      "US Rural population (percentage of total population)",
      "US Population ages 65 and above (Percent of total)",
      "US Real interest rate (%)",
      "US Kerosene Total Production (Thousand metric tons)",
      "US Uranium Production (Thousand metric tons)",
      "US Prevalence of overweight males (Percent of male population over 15)",
      "Germany Prevalence of overweight males (Percent of male population over 15)",
      "US Age dependency ratio (% of working age population)",
      "China Commodity exports (Billions of USD)",
      "US Total Investment (Percent of GDP)",
      "China Commodity imports (Billions of USD)",
      "US Internet Users per 100 people",
      "US Armed forces personnel, total",
      "US Life Expectancy at birth, female",
      "US Depth of hunger (kilocalories per person per day)",
      "China Poverty gap at $5 a day PPP (percent)",
      "China Population living in slums (percent of urban population)",
      "US Estimated Control of Corruption",
      "US Estimated Rule of Law",
      "Stock"
    ];
    var dataSource = [
      ["Bitcoin","BAVERAGE/USD"],
      ["Aluminum","OFDP/ALUMINIUM_21"],
      ["Coal","DOE/COAL"],
      ["Copper","OFDP/COPPER_6"],
      ["Crude Oil","OPEC/ORB"],
      ["Milk","WSJ/MILK"],
      ["Beef","ODA/PBEEF_USD"],
      ["Cattle Hides","WSJ/HIDES"],
      ["Broiler Chickens","WSJ/CHKN_NTL"],
      ["Pork","ODA/PPORK_USD"],
      ["Butter","WSJ/BUTTER"],
      ["Lamb","ODA/PLAMB_USD"],
      ["Wool","ODA/PWOOLC_USD"],
      ["Salmon","ODA/PSALM_USD"],
      ["Shrimp","ODA/PSHRI_USD"],
      ["Fishmeal","ODA/PFISH_USD"],
      ["US Harbor Gasoline","FRED/DGASNYH"],
      ["Regular Gas","FRED/GASREGCOVW"],
      ["Midgrade Gas","FRED/GASMIDCOVW"],
      ["Premium Gas","FRED/GASPRMCOVW"],
      ["All Gas (Weighted)","FRED/GASALLCOVW"],
      ["Gold","LBMA/GOLD"],
      ["Marcellus Natural Gas","WSJ/NG_MARC"],
      ["Palladium","LPPM/PALL"],
      ["Platinum","LPPM/PLAT"],
      ["Silver","LBMA/SILVER"],
      ["Steel","WSJ/ST_SCRP"],
      ["Iron","WSJ/FE_TJN"],
      ["Lead","OFDP/LEAD_31"],
      ["Zinc","OFDP/ZINC_26"],
      ["Tin","OFDP/TIN_36"],
      ["Iridium","JOHNMATT/IRID"],
      ["Rhodium","JOHNMATT/RUTH"],
      ["Tobacco","WORLDBANK/WLD_TOBAC_US"],
      ["Fed Funds Effective","FRED/DFF"],
      ["4-week Treasury Bill","FRED/DTB4WK"],
      ["3-month Treasury Bill","FRED/DTB3"],
      ["6-month Treasury Bill","FRED/DTB6"],
      ["1-year Treasury Bill","FRED/DTB1YR"],
      ["Prime Rate","FRED/DPRIME"],
      ["S&P 500 Index","YAHOO/INDEX_GSPC"],
      ["Nasdaq 100 Index","YAHOO/INDEX_GSPC"],
      ["Dow Jones Industrial Average","NASDAQOMX/NDX"],
      ["NYSE ARCE Major Market Index","BCB/UDJIAD1"],
      ["NYSE ARCA Institutional Index","YAHOO/INDEX_XMI"],
      ["Nasdaq Composite Index","NASDAQOMX/COMP"],
      ["RUSSELL 3000 Index","YAHOO/INDEX_NYA"],
      ["Wilshire 5000 Index","YAHOO/INDEX_RUA"],
      ["NYSE Composite Index","YAHOO/INDEX_XMI"],
      ["Nasdaq Bank Index","NASDAQOMX/BANK"],
      ["Nasdaq Computer Index","YAHOO/INDEX_IIX"],
      ["Nasdaq Industrial Index","NASDAQOMX/INDS"],
      ["PHLX Housing Sector Index","YAHOO/INDEX_HGX"],
      ["Morgan Stanley Consumer Index","YAHOO/INDEX_CYC"],
      ["PHLX Oil Service Sector Index","NASDAQOMX/EPX"],
      ["NYSE AMEX Natural Gas Index","YAHOO/INDEX_OSX"],
      ["NYSE Amex Oil Index","YAHOO/INDEX_XNG"],
      ["TSX Global Gold Index","YAHOO/INDEX_XAU"],
      ["US Total Population (Thousands)","WORLDBANK/USA_SP_POP_TOTL"],
      ["China Total Population (Millions)", "WORLDBANK/CHN_SP_POP_TOTL"],
      ["US Total Urban Population (Thousands)", "WORLDBANK/USA_SP_URB_TOTL_IN_ZS"],
      ["US Population Annual Percentage Growth Rate", "WORLDBANK/USA_SP_POP_GROW"],
      ["US Unemployment Rate (Percentage of total labor force)", "ODA/USA_LUR"],
      ["US Consumer Price Index (1983 = 100)", "RATEINF/CPI_USA"],
      ["US General Government Total Expenditure (Billions)", "ODA/USA_GGX"],
      ["US GDP at constant prices (percentage change)", "ODA/USA_NGDP_RPCH"],
      ["US Industrial Production (constant US prices, seasonal adjustment)", "WORLDBANK/USA_IPTOTSAKD"],
      ["US Total Nuclear Production (in thousands of KW-hrs)", "UN/ELECTRICITYTOTALNUCLEARPRODUCTION_USA"],
      ["China Total Nuclear Production (in thousands of KW-hrs)", "UN/ELECTRICITYTOTALNUCLEARPRODUCTION_CHN"],
      ["US Total Wind Production (in thousands of KW-hrs)", "UN/ELECTRICITYTOTALWINDPRODUCTION_USA"],
      ["US Public Expenditure on education (Percentage of GDP)", "UN/UIS_PUBLICEXPENDITUREONEDUCATIONASOFGDP__USA"],
      ["Norway Public Expenditure on education (Percentage of GDP)", "UN/UIS_PUBLICEXPENDITUREONEDUCATIONASOFGDP__NOR"],
      ["Sugar No. 16 Futures", "futures/ice-sugar-no-16-futures"],
      ["Orange Juice Futures", "futures/ice-orange-juice-futures"],
      ["Cocoa Futures", "SCF/ICE_CC1_FW-ICE"],
      ["US Life Expectancy at birth", "WORLDBANK/USA_SP_DYN_LE00_IN"],
      ["US Age at first marriage, male", "WORLDBANK/USA_SP_DYN_SMAM_MA"],
      ["US Immunization (percentage of children age 12-23 months)", "WORLDBANK/USA_SH_IMM_IDPT"],
      ["US health expenditure per capita", "WORLDBANK/USA_SH_XPD_PCAP_PP_KD"],
      ["US Improved sanitation facilities (percent of population with access", "WORLDBANK/USA_SH_STA_ACSN"],
      ["Canada CO2 emissions (kilotons)", "WORLDBANK/CAN_EN_ATM_CO2E_KT"],
      ["California Zillow Home Value Index (All Homes)", "ZILLOW/STATE_ALLHOMES_CALIFORNIA"],
      ["US Nitrous oxide emissions (thousand metric tons of CO2 equivalent)", "WORLDBANK/USA_EN_ATM_NOXE_KT_CE"],
      ["Sweden Nitrous oxide emissions (thousand metric tons of CO2 equivalent)", "WORLDBANK/SWE_EN_ATM_NOXE_KT_CE"],
      ["China Number of people under-nourished", "WORLDBANK/CHN_SN_ITK_DEFC"],
      ["US Agriculture value added (percentage of GDP)", "WORLDBANK/USA_NV_AGR_TOTL_ZS"],
      ["US Services value added (percentage of GDP)", "WORLDBANK/USA_NV_SRV_TETC_ZS"],
      ["US Rural population (percentage of total population)", "WORLDBANK/USA_SP_RUR_TOTL_ZS"],
      ["US Population ages 65 and above (Percent of total)", "WORLDBANK/USA_SP_POP_65UP_TO_ZS"],
      ["US Real interest rate (%)", "WORLDBANK/USA_FR_INR_RINR"],
      ["US Kerosene Total Production (Thousand metric tons)", "UN/KEROSENETOTALPRODUCTION_USA"],
      ["US Uranium Production (Thousand metric tons)", "UN/URANIUMPRODUCTION_USA"],
      ["US Prevalence of overweight males (Percent of male population over 15)", "WORLDBANK/USA_SH_STA_OW15_MA_ZS"],
      ["Germany Prevalence of overweight males (Percent of male population over 15)", "WORLDBANK/DEU_SH_STA_OW15_MA_ZS"],
      ["US Age dependency ratio (% of working age population)", "WORLDBANK/USA_SP_POP_DPND"],
      ["China Commodity exports (Billions of USD)", "UN/COMM_1_ALLCOMMODITIES_EXPORT_CHN"],
      ["US Total Investment (Percent of GDP)", "ODA/USA_NID_NGDP"],
      ["China Commodity imports (Billions of USD)", "UN/COMM_1_ALLCOMMODITIES_IMPORT_CHN"],
      ["US Internet Users per 100 people", "WORLDBANK/USA_IT_NET_USER_P2"],
      ["US Armed forces personnel, total", "WORLDBANK/USA_MS_MIL_TOTL_P1"],
      ["US Life Expectancy at birth, female", "WORLDBANK/USA_SP_DYN_LE00_FE_IN"],
      ["US Depth of hunger (kilocalories per person per day)", "WORLDBANK/USA_SN_ITK_DPTH"],
      ["China Poverty gap at $5 a day PPP (percent)", "WORLDBANK/CHN_SI_POV_GAP5"],
      ["China Population living in slums (percent of urban population)", "WORLDBANK/CHN_EN_POP_SLUM_UR_ZS"],
      ["US Estimated Control of Corruption", "WORLDBANK/USA_CC_EST"],
      ["US Estimated Rule of Law", "WORLDBANK/USA_RL_EST"],
      ["Stock",""]
    ];
    $( "#tags" ).autocomplete({
      source: dataTypes
    });

});