var express = require("express");
var app = express();
var jsonParser = require("body-parser").json();
var nodemon = require("nodemon");

var restaurants = [
  {
    name: "Yojimbo",
    website: "yojimbosushi.com",
    phoneNumber: "(510) 523-4120",
    address: "1221 Park St, Alameda, CA 94501",
    type: "sushi"
  },
  {
    name: "SPIN! Neopolitan Pizza",
    website: "spinpizza.com",
    phoneNumber: "(510) 769-7492",
    address: "2670 5th St, Alameda, CA 94501",
    type: "italian"
  },
  {
    name: "Lola's Chicken Shack",
    website: "lolaschickenshack.com",
    phoneNumber: "(510) 521-4488",
    address: "1417 Park St, Alameda, CA 94501",
    type: "chicken"
  },
  {
    name: "Trabocco Kitchen and Cocktails",
    website: "trabocco.com",
    phoneNumber: "(510) 521-1152",
    address: "2213 S Shore Ctr, Alameda, CA 94501",
    type: "italian"
  },
  {
    name: "Mama Papa Lithuania Restaurant",
    website: "mamapapalithuania.com",
    phoneNumber: "(510) 522-4100",
    address: "1241 Park St, Alameda, CA 94501",
    type: "european"
  }
];

var matchedRestaurants = [];

app.use(express.static("./"));

app.get("/search", function(req, res) {
  console.log(req.query);
  for(var i = 0;i < restaurants.length;i++) {
    if(req.query.q == restaurants[i].type || req.query.q == restaurants[i].name.toLowerCase()) {
      matchedRestaurants.push(restaurants[i])
    }
  } if(matchedRestaurants.length > 0) {
    res.json(matchedRestaurants);
  }
})

app.listen(8080, function() {
  console.log("Listening on port 8080")
});
