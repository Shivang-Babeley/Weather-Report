const express = require("express")
const https = require("https")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , function(req,res){
    res.sendFile(__dirname+"/index.html");
}
);
app.post("/",function (req,res) {
    const city = req.body.cityName;
    const apiKey = "3223647cfca40240fb9380ef1ed1626f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit+"&lang=en"
    https.get(url , function (response) {
        console.log(response.statusCode)
        response.on("data",function (data) {
            
            const weatherCast = JSON.parse(data);
            console.log(weatherCast);
            const discription = weatherCast.weather[0].description
            const icon = weatherCast.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(iconUrl);
            console.log(discription);
            const temp = weatherCast.main.temp;
            res.write("<h1>Temperature is : "+temp +"<\h1>")
            res.write("<h4>Weather Discription is "+discription+"<\h4>")
            res.write("<img src="+iconUrl+">")
            res.send()
        })
    })
})


app.listen(3000,function () {
    console.log("Server is running at port 3000")
})




// const apiKey = "3223647cfca40240fb9380ef1ed1626f";
//     const city = "Berlin";
//     const unit = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit+"&lang=en"
//     https.get(url , function (response) {
//         console.log(response.statusCode)
//         response.on("data",function (data) {
//             const weatherCast = JSON.parse(data);
//             const discription = weatherCast.weather[0].description
//             const icon = weatherCast.weather[0].icon;
//             const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
//             console.log(iconUrl);
//             console.log(discription);
//             const temp = weatherCast.main.temp;
//             res.write("<h1>Temperature is : "+temp +"<\h1>")
//             res.write("<h4>Weather Discription is "+discription+"<\h4>")
//             res.write("<img src="+iconUrl+">")
//             res.send()
//         })
//     })