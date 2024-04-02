//const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&appid=25baae6a81058afccd7517c966ed3aed&units=metric';
const url = '//api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&appid=25baae6a81058afccd7517c966ed3aed&units=imperial';

async function apiFetch() {
	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			console.log(data); //for testing, comment out when test complete
			displayResults(data);
		} else {
			throw Error (await response.text());
		}
	} catch (error) {
		console.log(error);
	}
}

apiFetch();

function displayResults(data) {
    if (data.list && data.list.length > 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const afterTomorrow = new Date(today);
        afterTomorrow.setDate(today.getDate() + 2);
        const thirdDay = new Date(today);
        thirdDay.setDate(today.getDate() + 3);

        const nextThreeDaysForecast = data.list.filter(item => {
            const forecastDate = new Date(item.dt * 1000);
            return forecastDate.getDate() === tomorrow.getDate() ||
                forecastDate.getDate() === afterTomorrow.getDate() ||
                forecastDate.getDate() === thirdDay.getDate();
        });

        nextThreeDaysForecast.forEach(item => {
            const forecastDate = new Date(item.dt * 1000);
            let dayId;
            if (forecastDate.getDate() === tomorrow.getDate()) {
                dayId = 'day1';
            } else if (forecastDate.getDate() === afterTomorrow.getDate()) {
                dayId = 'day2';
            } else if (forecastDate.getDate() === thirdDay.getDate()) {
                dayId = 'day3';
            }


            /*const currentTemp = document.querySelector('#current-temp');
            const weatherIcon = document.querySelector('#weather-icon');
            const captionDesc = document.querySelector('figcaption');

            myTown.innerHTML = data.name
	        myDescription.innerHTML = data.weather[0].description;
	        myTemperature.innerHTML = `${data.main.temp}&deg;F`
	        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	        myGraphic.setAttribute('src', iconsrc)
	        myGraphic.setAttribute('alt', data.weather[0].description)*/

            const figureElement = document.getElementById(dayId);
            const tempForecast = figureElement.querySelector('.tempForecast');
            const forecastIcon = figureElement.querySelector('.forecastIcon');
            const dayName = figureElement.querySelector('.day');
            const forecastCaptionDesc = figureElement.querySelector('.forecastCaptionDesc');
            const currentTemp = document.querySelector('#current-temp');
            const currentDesc = document.querySelector('#current-desc');

            currentTemp.innerHTML = `${item.main.temp}&deg;F`;
            tempForecast.innerHTML = `${Math.round(item.main.temp)}&deg;F`;
            const iconsrc = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            // const desc = data.weather[0].description;
            const desc = item.weather[0].description;
            forecastIcon.setAttribute('src', iconsrc);
            forecastIcon.setAttribute('alt', desc);
            forecastCaptionDesc.textContent = `${desc}`;
            currentDesc.innerHTML = item.weather[0].description;
            // forecastCaptionDesc.textContent = ` ${capitalizeCaption(desc)}`;

            const options = { month: 'short', day: 'numeric' };
            dayName.innerHTML = forecastDate.toLocaleString('en-EN', options);
        });
    }
}