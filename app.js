//button
var Button = document.querySelector('#dBut');
//country code from the select options
var countyCode = document.querySelector('#countryCode');

Button.addEventListener('click',function(e){
    e.preventDefault();
    var cityId = countyCode.value;
	console.log('Your City Id: ' + cityId);
	
	var query = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + cityId + "&units=metric&cnt=16&appid=d2a8aa667de6ffde2fe5226a2609501c"
	console.log('Query String: ' + query);
	
	$.getJSON(query, function(data){
	//console.log(data.list);
	var Humidity = [];
	var Temp = [];
	var Rain = [];

	var array = data.list;
	var count = 0;
	
	for(var key in array){
		if (array.hasOwnProperty(key)) {
			var clouds = array[key].clouds;
			var humidity = array[key].humidity;
			var tempMin = array[key].temp.min;
			var tempMax = array[key].temp.max;
			var avgTemp = (tempMin + tempMax) / 2;
			var pressure = array[key].pressure;
			var rain = array[key].rain;
			var rainInMM = rain * 25.4;

			// console.log("Clouds: " + clouds);
			// console.log("Humidity: " + humidity);
			// console.log("Temp: " + avgTemp);
			// console.log("Pressure: " + pressure);
			// console.log("Rain: " + rainInMM);

			Humidity[count] = humidity;;
			Temp[count] = avgTemp;
			Rain[count] = rainInMM;
			count++;

		}
	}

	var tempSum = 0;
	var humiditySum = 0;
	var rainSum = 0;

	for(var i = 0; i < Temp.length; i++){
		tempSum = tempSum + Temp[i];
		humiditySum = humiditySum + Humidity[i];
		rainSum = rainSum + Rain[i];
	}

	console.log('Rain Sum: ' + rainSum);
	console.log('Humidity Sum: ' + humiditySum);
	console.log('Temperature Sum: ' + tempSum);
	console.log('Data length: ' + Temp.length);
	console.log('');

	rainAvg = rainSum/Rain.length;
	humidityAvg = humiditySum/Humidity.length;
	tempAvg = tempSum/Temp.length;

	console.log('Average Rain: ' + rainAvg);
	console.log('Average Humidity: ' + humidityAvg);
	console.log('Average Temperature: ' + tempAvg);
	console.log('');

	if (tempAvg > 26 && tempAvg < 30 && humidityAvg < 50 && rainAvg > 750 && rainAvg < 1500) {
		console.log('corn planting Period');
	}else{
		console.log('Not corn Planting');
	}

	if (tempAvg > 19 && tempAvg < 33 && humidityAvg < 50 && rainAvg > 2500 && rainAvg < 4000) {
		console.log('Palmfruit Period');
	}else{
		console.log('Not Palmfruit Period');
	}

	if (tempAvg > 16 && tempAvg < 27 && humidityAvg < 50 && rainAvg > 250 && rainAvg < 1500) {
		console.log('Tomato Planting Time');
	}else{
		console.log('Not Tomato Planting Period');
	}
});	

});



