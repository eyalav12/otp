
const express = require('express');
const router = new express.Router();
const Otp = require('../models/otpModel');
require('dotenv').config();
const validator = require('validator');
const axios = require('axios');
const { sendVerificationEmail } = require('../email');

const city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];


function randomCities(){
    const selectedCities=[];
    while(selectedCities.length!=3){
        const randInd=Math.floor(Math.random()*city_names.length);
        console.log(randInd);
        console.log(city_names[randInd]);
        if(!selectedCities.includes(city_names[randInd])){
            selectedCities.push(city_names[randInd]);
        }
    }
    return selectedCities;
}

async function getTemperatures(cities) {
    console.log('start');
    const temperatures = [];
    for (const city of cities) {
        try {
            const temperature = await getTemperature(city);
            temperatures.push(temperature);
        } catch (error) {
            console.error(`Failed to fetch temperature for ${city}`);
            return res.status(400).json({ message: 'Invalid' });
            
        }
    }
    console.log(temperatures);
    return temperatures;
}


async function getTemperature(city) {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await axios.get(url);
        const temperature = response.data.current.temp_c;
        console.log(temperature);
        return Math.abs(Math.round(temperature));
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getTemperature1(city) {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log('bad');
            throw new Error(`Failed to fetch weather data for ${city}`);
        }
        const data = await response.json();
        const temperature = data.current.temp_c;
        console.log(temperature);
        console.log(Math.abs(Math.round(temperature)));
        let formattedTemperature = Math.abs(Math.round(temperature)).toString();
    
    
        if (formattedTemperature.length === 1) {
            formattedTemperature = '0' + formattedTemperature;
        }
        return formattedTemperature; 
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function generateOTP(){
    console.log('in');
    const cities=randomCities();
    console.log(cities);
    const temps=await getTemperatures(cities);
    return String(temps[0])+String(temps[1])+String(temps[2]);

}

function generateOTP1() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}




router.post('/generate-otp', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        console.log('Generating OTP for email:', email);
        const otp = await generateOTP();
        console.log('Generated OTP:', otp);
        
        const otpRecord = new Otp({ email, otp, createdAt: new Date() });
        await otpRecord.save();
        console.log('OTP record saved:', otpRecord);

        try {
            await sendVerificationEmail(email, otp);
            console.log('Verification email sent');
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            
        }

        res.send({ message: 'OTP generated and email sent', otp: otpRecord });

    } catch(error){
        console.error('Error in /generate-otp route:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
});















        

router.post('/validate-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({ message: 'No OTP found for this email' });
        }

        
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        
        res.json({ message: 'OTP is valid' });
    } catch (error) {
        console.error('Error in validate-otp route:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
})

module.exports = router;









