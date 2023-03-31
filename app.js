const container = document.querySelector('.container_search');
const search = document.querySelector('.search-box button');
const weatherDiv = document.querySelector('.weather-div');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const APIKey = '183867a2eebba07e9c5f11cf207dea04';
    const city = document.querySelector('.search-box input').value;

    
    if(city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json =>{
            
            if(json.cod == 404){
                container.style.height = '300px';
                weatherDiv.style.display = 'none';
                weatherDetails.style.display = 'none';
                notFound.style.display = 'block';
                notFound.classList.add('fadeIn');
                return;
            }
            notFound.style.display = 'none';
            notFound.classList.remove('fadeIn');

            const image = document.querySelector('.weather-div img');
            const temperature = document.querySelector('.weather-div .temperature');
            const description = document.querySelector('.weather-div .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'assets/cloudy.png';
                    break;
                
                case 'Rain':
                    image.src = 'assets/rain.png';
                    break;
                
                case 'Snow':
                    image.src = 'assets/snow.png';
                    break;
                
                case 'Clouds':
                    image.src = 'assets/clouds.png';
                    break;
                
                case 'Haze':
                    image.src = 'assets/storm.png';
                    break;
                
                default:
                    image.src = '';
            }
            
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.main.wind)}Km/h`

            weatherDiv.style.display = '';
            weatherDetails.style.display = '';
            weatherDiv.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '600px';
        });
});

