let cityName = 'Mumbai';

// Search Value Code
const searchBox = document.getElementById('Search');
const searchBTN = document.getElementById('submit');
const wikiText = document.getElementById('wikiText');

searchBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getWeatherReport(searchBox.value);
        city_name.innerText = `${searchBox.value}`
        health_city_name.innerText = `How to protect yourself from air pollution around ${searchBox.value}?`
        returnText(searchBox.value);
    }
})

searchBTN.addEventListener('click', () => {
    getWeatherReport(searchBox.value);
    city_name.innerText = `${searchBox.value}`
    health_city_name.innerText = `How to protect yourself from air pollution around ${searchBox.value}?`
    returnText(searchBox.value);
})

// Masonary Grid ---

window.onload = () => {
    const grid = document.getElementById('grid');

    const masonary = new Masonry(grid, {
        gutter: 30,
    });
}

//Navbar toggle animation
const toggleButton = document.getElementById('toggle-button')
const navBar = document.getElementById('navbar')
const navLinks = document.getElementById('nav-links')
const search = document.getElementById('search')

toggleButton.addEventListener('click', function () {
    if (navBar.style.height == '70px') {
        navBar.style.height = '300px'
    } else {
        navBar.style.height = '70px'
    }

    if (navLinks.style.display == 'none') {
        navLinks.style.display = 'flex'
    } else {
        navLinks.style.display = 'none'
    }

    if (search.style.display == 'none') {
        search.style.display = 'flex'
    } else {
        search.style.display = 'none'
    }
})

// Health Advice
const mask = document.getElementById('mask');
const ball = document.getElementById('ball');
const window_q = document.getElementById('window');
const air = document.getElementById('air');
const family = document.getElementById('family');
const heath_city_name = document.getElementById('health_city_name')
const city_name = document.getElementById('city_name')

const mask_text = document.getElementById('mask_text')
const ball_text = document.getElementById('ball_text')
const window_text = document.getElementById('window_text')
const air_text = document.getElementById('air_text')
const family_text = document.getElementById('family_text')

let apiValue = 100;

city_name.innerText = `${cityName}`
health_city_name.innerText = `How to protect yourself from air pollution around ${cityName}?`

if (apiValue > 75) {
    mask.classList.remove('cross_mask')
    mask_text.innerText = 'Required'

    air.classList.remove('cross_air')
    air_text.innerText = 'Required'
}
if (apiValue > 150) {
    ball.classList.remove('cross_ball')
    ball_text.innerText = 'Required'

    window_q.classList.remove('cross_window')
    window_text.innerText = 'Close Door'
}
if (apiValue > 250) {
    family.classList.remove('cross_family')
    family_text.innerText = 'Cannot go Outdoor'
}



// ############### Weather Api ##################
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherAPI = {
    apiKey: "396d9dc65747c8ef03cce973fb71177a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

getWeatherReport(cityName);

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherAPI.baseUrl}?q=${city}&appid=${weatherAPI.apiKey}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// Display Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city')
    city.innerText = `${weather.name}`

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`

    let minmaxtemp = document.getElementById('min-max');
    minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`

    let weathertype = document.getElementById('weather');
    weathertype.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById("date");
    let todayDate = new Date();
    date.innerHTML = dateManage(todayDate);

    let image = document.getElementById('img')

    if (weathertype.textContent == "Clear") {
        image.src = '../images/sunny.jpg'
    } else if (weathertype.textContent == "Clouds") {
        image.src = '../images/cloudy.jpg'
    } else if (weathertype.textContent == "Haze") {
        image.src = '../images/haze.jpg'
    } else if (weathertype.textContent == "Rain") {
        image.src = '../images/rain.jpg'
    } else if (weathertype.textContent == "Drizzle") {
        image.src = '../images/drizzle.jpg'
    } else if (weathertype.textContent == "Thunderstorm") {
        image.src = '../images/thunderstorm.jpg'
    }

    setMap([weather.coord.lon, weather.coord.lat]);
}


// Date Manage
function dateManage(dateArg) {
    let dates = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = dates[dateArg.getDay()];

    return `${date} ${month} (${day}) ${year}`;
}


// ################### Canvas Styling #######################
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext("2d");

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}

function angleforapi(api) {
    return 360 * (api / (500 - 0))
}

ctx.strokeStyle = "#f03737";

ctx.lineWidth = 8;
ctx.lineCap = "round";

var api_value = 50;
ctx.beginPath();
ctx.arc(75, 75, 62, degToRad(270), degToRad(Math.round(270 + angleforapi(apiValue))));
ctx.stroke();

ctx.strokeStyle = "#000";
ctx.font = "40px Poppins"
ctx.textAlign = 'center';
ctx.fillText(apiValue, 75, 88)




function returnText(city) {
    if (city == 'Mumbai') {
        wikiText.innerText = 'Mumbai also known as Bombay is the capital city of the Indian state of Maharashtra. According to the United Nations, as of 2018, Mumbai is the second-most populous city in the country after Delhi.'
    } else if (city == 'Delhi') {
        wikiText.innerText = 'Delhi officially the National Capital Territory (NCT) of Delhi, is a city and a union territory of India containing New Delhi, the capital of India.'
    } else if (city == 'Ankleshwar') {
        wikiText.innerText = 'Ankleshwar, (sometimes written Ankaleshwar) is a city and a municipality in the Bharuch district of the state of Gujarat, India. The city is located 14 kilometres from Bharuch.'
    } else if (city == 'Aurngabad') {
        wikiText.innerText = 'Aurangabad district is one of the thirty-eight districts of Bihar state, India. It is currently a part of the Red Corridor. Aurangabad played a major role in the Indian independence struggle'
    } else if (city == 'Aizawl') {
        wikiText.innerText = 'Aizawl is the capital of the state of Mizoram in India. Aizawl was officially established on 25 February 1890. With a population of 293,416,[3] it is the largest city in the state.'
    } else if (city == 'Bahadurgarh') {
        wikiText.innerText = 'Bahadurgarh city located in Jhajjar, a district in the state of Haryana, India. The city comprises 31 wards and is approximately 2 km from National Capital Territory (NCT) of Delhi and 30 km from New Delhi.'
    } else if (city == 'Bandra') {
        wikiText.innerText = 'Bandra is an upscale coastal suburb located in Mumbai, India. The suburb is located to the immediate north of the Mithi River, which separates Bandra from Mumbai City district.'
    } else if (city == 'Bhiwani') {
        wikiText.innerText = 'Bhiwani is a city and a municipal council in Bhiwani district in the state of Haryana, India. Besides being a seat of spiritual learning.'
    } else if (city == 'Bagalkot') {
        wikiText.innerText = 'Bagalakote, is a city in the state of Karnataka, India, which is also the headquarters of Bagalakote district. It is situated on branch of River Ghataprabha about 481 km (299 mi) northwest of state capital Bengaluru'
    } else if (city == 'Bulandshr') {
        wikiText.innerText = 'Bulandshahr district (also spelled Bulandshahar) is a district in the Meerut region in the North Indian state of Uttar Pradesh (UP), situated between the two rivers Ganga and Yamuna.'
    } else if (city == 'Ballabgarh') {
        wikiText.innerText = 'Ballabgarh, is a large town and a tehsil in Faridabad district of Haryana, India, and is part of the National Capital Region. The town was founded by Raja Balram Singh, in 1739,'
    } else if (city == 'Bengaluru') {
        wikiText.innerText = 'Bangalore, officially known as Bengaluru is the capital and the largest city of the Indian state of Karnataka. It has a population of more than 8 million and a metropolitan population of around 11 million'
    } else if (city == 'Bhiwadi') {
        wikiText.innerText = 'Bhiwadi is situated at 28.21°N, 76.87°E. It is 70 km away from New Delhi, 200 km from Jaipur, 90 km from Alwar, 40 km from Gurgaon and 60 km from Faridabad (PROP Touch India Sec-49).'
    } else if (city == 'Chennai') {
        wikiText.innerText = 'Chennai also known as Madras is the capital city of the Indian state of Tamil Nadu. Located on the Coromandel Coast of the Bay of Bengal, it is the largest cultural, economic and educational centre of south India.'
    } else if (city == 'Chandrapur') {
        wikiText.innerText = 'Chandrapur district (earlier known as Chanda district) is a district in the Nagpur Division in the Indian state of Maharashtra.'
    } else if (city == 'Chikkaballapur') {
        wikiText.innerText = 'Chikkaballapur is the district headquarters of the newly created Chikkaballapur district in the state of Karnataka, India. It is located within 3 km of Muddenahalli '
    } else if (city == 'Chikkamagaluru') {
        wikiText.innerText = 'Chikmagalur, officially known as Chikkamagaluru, is a district in the state of Karnataka. Coffee was first cultivated in India in Chikmagalur.'
    } else if (city == 'Chandigarh') {
        wikiText.innerText = 'Chandigarh is a city, district and union territory in India that serves as the joint capital of the two neighbouring states of Punjab and Haryana.'
    } else if (city == 'Coimbatore') {
        wikiText.innerText = 'Coimbatore also known as Kovai or sometimes spelt as Covai is one of the major metropolitan cities in the Indian state of Tamil Nadu.'
    } else if (city == 'Charkhi Dadri') {
        wikiText.innerText = 'Charkhi Dadri is a city and headquarters of Charkhi Dadri district in the state of Haryana, India, about 90 km from Delhi.'
    } else if (city == 'Dharuhera') {
        wikiText.innerText = 'Dharuhera is a census town in the state of Haryana, India. Dharuhera comes under Delhi NCR region and it is a big Industrial hub in Rewari District.'
    } else if (city == 'Dwarka') {
        wikiText.innerText = 'Dwarka is a city and a municipality of Devbhumi Dwarka district in the state of Gujarat in northwestern India. It is located on the western shore of the Okhamandal Peninsula on the right bank of the Gomti River. '
    } else if (city == 'Gaya') {
        wikiText.innerText = 'Gaya is a city, municipal corporation and the administrative headquarters of Gaya district and Magadh division of the Indian state of Bihar.'
    } else if (city == 'Gurugram') {
        wikiText.innerText = 'Gurgaon, since 2016 officially named Gurugram (pronunciation: [ɡʊɾʊɡɾaːm]), is a city located in the northern Indian state of Haryana. '
    } else if (city == 'Guwahati') {
        wikiText.innerText = 'Guwahati is the biggest city of the Indian state of Assam and also the largest metropolis in northeastern India.'
    } else if (city == 'Govindgarh') {
        wikiText.innerText = 'Govindgarh, the summer capital of Mahraja Rewa, is about 18 km from Rewa in Madhya Pradesh, India.'
    } else if (city == 'Howrah') {
        wikiText.innerText = 'Howrah is the second-largest city after Kolkata in the Indian state of West Bengal.'
    } else if (city == 'Hajipur') {
        wikiText.innerText = 'Hajipur is the headquarters and largest city of Vaishali district of the state of Bihar in India. Hajipur is the 16th most populous city of Bihar'
    } else if (city == 'Hisar') {
        wikiText.innerText = 'Hisar is the administrative headquarters of Hisar district of Hisar division in the state of Haryana in northwestern India.'
    } else if (city == 'Hyderabad') {
        wikiText.innerText = 'Hyderabad is the capital and largest city of the Indian state of Telangana and the de jure capital of Andhra Pradesh.'
    } else if (city == 'Indore') {
        wikiText.innerText = 'Indore is the most populous and the largest city in the Indian state of Madhya Pradesh. It serves as the headquarters of both Indore District and Indore Division. '
    } else if (city == 'Jind') {
        wikiText.innerText = 'Jind is one of the largest and oldest cities in the Indian state of Haryana. Rani Talab is the main destination for tourists while Pandu-Pindara and Ramrai are the main religious spots, attracting devotees for the holy bath during Amavasya.'
    } else if (city == 'Jadavpur') {
        wikiText.innerText = 'Jadavpur is a southern neighbourhood of Kolkata in the district of Kolkata of West Bengal, India.'
    } else if (city == 'Jabalpur') {
        wikiText.innerText = 'Jabalpur is a tier 2 city in the state of Madhya Pradesh, India. According to the 2011 census, it is the third-largest urban agglomeration in Madhya Pradesh'
    } else if (city == 'Kolkata') {
        wikiText.innerText = 'Kolkata previously Calcutta the official name until 2001 is the capital of the Indian state of West Bengal. Located on the eastern bank of the Hooghly River'
    } else if (city == 'Kota') {
        wikiText.innerText = 'Kota, previously known as Kotah, is a city located in the southeast of northern Indian state of Rajasthan. It is located about 240 kilometres (149 mi) south of the state capital, Jaipur, situated on the banks of Chambal River.'
    } else if (city == 'Kalyan') {
        wikiText.innerText = 'Kalyan is a city in Thane district of Maharashtra state in Konkan division and a part of Mumbai Metropolitan Region (MMR). It is governed by Kalyan-Dombivli Municipal Corporation.'
    } else if (city == 'Kurukshetra') {
        wikiText.innerText = 'Kurukshetra is a city in the Indian state of Haryana. It is also known as Dharmakshetra ("Holy Place") and as the "Land of the Bhagavad Gita" '
    } else if (city == 'Kurla') {
        wikiText.innerText = 'Dwarka is a city and a municipality of Devbhumi Dwarka district in the state of Gujarat in northwestern India. It is located on the western shore of the Okhamandal Peninsula on the right bank of the Gomti River. '
    } else if (city == 'Kochi') {
        wikiText.innerText = 'Kochi formerly known in English as Cochin is a major port city on the Malabar Coast of India bordering the Laccadive Sea, which is a part of the Arabian Sea.'
    } else if (city == 'Kaithal') {
        wikiText.innerText = 'Kaithal (Hindi: [kɛːt̪ʰl]) is a city and municipal council in the Kaithal district of the Indian state of Haryana. Kaithal was previously a part of Karnal district and later'
    } else if (city == 'Kannur') {
        wikiText.innerText = 'Kannur formerly known in English as Cannanore, Arabic as Kannanur, and Portuguese as Cananor,is a city and a Municipal Corporation in the state of Kerala, India. '
    } else if (city == 'Mumbai') {
        wikiText.innerText = 'Mumbai is the capital city of the Indian state of Maharashtra. Mumbai is the second-most populous city in the country after Delhi.'
    } else if (city == 'Meerut') {
        wikiText.innerText = 'Meerut is a city in the western part of the Indian state of Uttar Pradesh. It is an ancient city, with settlements dating back to the Indus Valley civilisation having been found in and around the area.'
    } else if (city == 'Muzaffarpur') {
        wikiText.innerText = 'Muzaffarnagar is a city under Muzaffarnagar Urban Metropolitan Region and is controlled by municipal board in the Indian state of Uttar Pradesh.'
    } else if (city == 'Nashik') {
        wikiText.innerText = 'Nashik is an ancient city and the largest city in the northern region of the Indian state of Maharashtra. '
    } else if (city == 'Navi Mumbai') {
        wikiText.innerText = 'Navi Mumbai is a planned city situated on the west coast of the Indian subcontinent, in the Konkan division of Maharashtra state, on the mainland of India. '
    } else if (city == 'Patna') {
        wikiText.innerText = 'Patna historically known as Pataliputra and Azimabad is the capital and largest city of the state of Bihar in India.'
    } else if (city == 'Pashamylaram') {
        wikiText.innerText = 'Patancheru is located in the north western end of Hyderabad. It is an industrial zone located about 32 km from the city centre on the Hyderabad-Solapur highway, and around 18 km from HITEC City.'
    } else if (city == 'Pune') {
        wikiText.innerText = 'Pune is the seventh most populous city in India and the second-largest city in the state of Maharashtra, with an estimated population of 7.4 million as of 2020.'
    } else if (city == 'Panchkula') {
        wikiText.innerText = 'Panchkula is a planned city and district headquarter in the Panchkula district, part of Ambala division in Haryana, India. The origin of the name Panchkula came from the place where five irrigation canals meet. '
    } else if (city == 'Patiala') {
        wikiText.innerText = 'Patiala is a city in southeastern Punjab, northwestern India. It is the fourth largest city in the state and is the administrative capital of Patiala district. '
    } else if (city == 'Panipat') {
        wikiText.innerText = 'Panipat is a historic city in Haryana, India.[3] It is 95 km north of Delhi and 169 km south of Chandigarh on NH-1. '
    } else if (city == 'Palwal') {
        wikiText.innerText = 'Palwal is a city and a municipal council. It is the headquarters of Palwal district, the 21st district of Haryana state in northern India. It is a centre for the cotton trade in the area.'
    } else if (city == 'Rajamahendravaram') {
        wikiText.innerText = 'Rajahmundry, officially known as Rajamahendravaram, is a city in the Indian state of Andhra Pradesh. It is the seventh most populated city in the state.'
    } else if (city == 'Shillong') {
        wikiText.innerText = 'Shillong is a hill station in the northeastern part of India and the capital of Meghalaya, which means "The Abode of Clouds".'
    } else if (city == 'Sirsa') {
        wikiText.innerText = 'Sirsa is a city and a municipal council in Sirsa district in the westernmost region of the Indian state of Haryana, bordering Punjab and Rajasthan.'
    } else if (city == 'Thiruvananthapuram') {
        wikiText.innerText = 'Thiruvananthapuram commonly known by its former name Trivandrum /trɪˈvændrəm/,[8] is the capital of the Indian state of Kerala.'
    } else if (city == 'Tirupati') {
        wikiText.innerText = 'Tirupati is a city in Chittoor district of the Indian state of Andhra Pradesh. Located 750 km southwest of states executive capital Visakhapatnam,'
    } else if (city == 'Velachery') {
        wikiText.innerText = 'Velachery is a commercial and residential area in south Chennai, and is the largest commercial centre in south Chennai. It is surrounded by Guindy in the north'
    } else if (city == 'Varanasi') {
        wikiText.innerText = 'Varanasi also known as Kashi is a city on the banks of the river Ganges in Uttar Pradesh, India, 320 kilometres (200 mi) south-east of the state capital, Lucknow, and 121 kilometres (75 mi) east of Allahabad.'
    }
}