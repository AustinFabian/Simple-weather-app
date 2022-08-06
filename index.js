
const Express = require('express');

const Https = require('https');

const dotenv = require('dotenv')

const bodyParser = require('body-parser');
const { ppid } = require('process');

const app = Express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(Express.static("public"));

dotenv.config({path:'./config.env'});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req,res){

    var query = req.body.cityname;

    var lang = req.body.lang;

    var apiKey = process.env.APPID;

    var unit = "metric";

    var url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit + "&q=" + query + "&appid=" + apiKey + "&lang=" + lang;

    Https.get(url,function(response){
        console.log('status Code :' , response.statusCode);

        console.log('Headers :' , response.headers);

        response.on('data', function(data){
            var jsData = JSON.parse(data);

            console.log(JSON.stringify(jsData));

            console.log(jsData);

            const weatherIcon = jsData.weather[0].icon;

            const image = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

            console.log( 'temperature : ', jsData.main.temp);

            console.log( "weather description : " ,jsData.weather[0].description);

            res.write(`<h1 style="padding: 20px; font-family: system-ui;">The weather Temperature In ${jsData.name} is ${jsData.main.temp}°Celcius <br> The weather description is : ${jsData.weather[0].description} </h1>`)

            res.write(`<h1 style="padding: 20px; font-family: system-ui;">wind speed : ${jsData.wind.speed}</h1> <br> <img style="width: 300px" src="${image}" alt="My Image"> <img style="width: 300px" src="${image}" alt="My Image"> <img style="width: 300px" src="${image}" alt="My Image"> <img style="width: 300px" src="${image}" alt="My Image"> <img style="width: 200px" src="${image}" alt="My Image"> <img style="width: 200px" src="${image}" alt="My Image"> <img style="width: 200px" src="${image}" alt="My Image"> <img style="width: 200px" src="${image}" alt="My Image">`);

            // res.write(lang);

            res.send();
        });

        // var object = {
        //     Name : 'Austin',
        //     Age : 19,res.send('<h1>Hello! And Hi!</h1>');
        //     currently : 'programming'
        // }

        // console.log(JSON.stringify(object));

    });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server running on port 3000");
});
