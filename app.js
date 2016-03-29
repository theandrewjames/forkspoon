var express = require("express");
var app = express();
var jsonParser = require("body-parser").json();
var nodemon = require("nodemon");

var restaurants = [
  {
    name: "Yojimbo",
    website: "yojimbosushi.com",
    phoneNumber: "(510) 523-4120",
    address: "1221 Park St, Alameda, CA, 94501",
    type: "Sushi",
    images: ["images/yojimbo1.jpg", "images/yojimbo2.jpg"],
    dataId: 0
  },
  {
    name: "SPIN! Neopolitan Pizza",
    website: "spinpizza.com",
    phoneNumber: "(510) 769-7492",
    address: "2670 5th St, Alameda, CA, 94501",
    type: "Italian",
    images: ["images/spin1.jpg", "images/spin2.jpg"],
    dataId: 1
  },
  {
    name: "Lola's Chicken Shack",
    website: "lolaschickenshack.com",
    phoneNumber: "(510) 521-4488",
    address: "1417 Park St, Alameda, CA, 94501",
    type: "Chicken",
    images: ["images/lolas1.jpg", "images/lolas2.jpg"],
    dataId: 2
  },
  {
    name: "Trabocco Kitchen and Cocktails",
    website: "trabocco.com",
    phoneNumber: "(510) 521-1152",
    address: "2213 S Shore Ctr, Alameda, CA, 94501",
    type: "Italian",
    images: ["images/trabocco1.jpg", "images/trabocco2.jpg"],
    dataId: 3
  },
  {
    name: "Mama Papa Lithuania Restaurant",
    website: "mamapapalithuania.com",
    phoneNumber: "(510) 522-4100",
    address: "1241 Park St, Alameda, CA, 94501",
    type: "European",
    images: ["images/mamapapa1.jpg", "images/mamapapa2.jpg"],
    dataId: 4
  }
];

var matchedRestaurants = [];

app.use(express.static("./"));

app.get("/search", function(req, res) {
  while(matchedRestaurants.length > 0) {
    matchedRestaurants.pop();
  }
  for(var i = 0;i < restaurants.length;i++) {
    if(req.query.q == restaurants[i].type.toLowerCase() || req.query.q == restaurants[i].name.toLowerCase()) {
      matchedRestaurants.push(restaurants[i])
    }
  } if(matchedRestaurants.length > 0) {
    res.json(matchedRestaurants);
  }
})

app.listen(8080, function() {
  console.log("Listening on port 8080")
});
