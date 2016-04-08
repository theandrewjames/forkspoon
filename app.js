var express = require("express");
var app = express();
var jsonParser = require("body-parser").json();
var cookieParser = require("cookie-parser");


var restaurants = [
  {
    name: "Yojimbo",
    website: "yojimbosushi.com",
    phoneNumber: "(510) 523-4120",
    address: "1221 Park St, Alameda, CA, 94501",
    type: ["Sushi", "Japanese", "Food"],
    images: ["images/yojimbo1.jpg", "images/yojimbo2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 0
  },
  {
    name: "SPIN! Neopolitan Pizza",
    website: "spinpizza.com",
    phoneNumber: "(510) 769-7492",
    address: "2670 5th St, Alameda, CA, 94501",
    type: ["Italian", "Pizza", "Food"],
    images: ["images/spin1.jpg", "images/spin2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 1
  },
  {
    name: "Lola's Chicken Shack",
    website: "lolaschickenshack.com",
    phoneNumber: "(510) 521-4488",
    address: "1417 Park St, Alameda, CA, 94501",
    type: ["Chicken", "Sandwiches", "Food"],
    images: ["images/lolas1.jpg", "images/lolas2.jpg"],
    cost: "$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 2
  },
  {
    name: "Trabocco Kitchen and Cocktails",
    website: "trabocco.com",
    phoneNumber: "(510) 521-1152",
    address: "2213 S Shore Ctr, Alameda, CA, 94501",
    type: ["Italian", "Bars", "Food"],
    images: ["images/trabocco1.jpg", "images/trabocco2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 3
  },
  {
    name: "Mama Papa Lithuania Restaurant",
    website: "mamapapalithuania.com",
    phoneNumber: "(510) 522-4100",
    address: "1241 Park St, Alameda, CA, 94501",
    type: ["European", "Tea", "Food"],
    images: ["images/mamapapa1.jpg", "images/mamapapa2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 1, 0, 0]],
    rating: 0,
    dataId: 4
  },
  {
    name: "Yume Sushi",
    website: "",
    phoneNumber: "(510) 865-7141",
    address: "1428 Park St, Alameda, CA, 94501",
    type: ["Sushi", "Japanese", "Food"],
    images: ["images/yume1.jpg", "images/yume2.jpg"],
    cost: "$$$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 5
  },
  {
    name: "Chai Thai Noodles",
    website: "chaithainoodle.com",
    phoneNumber: "(510) 832-2500",
    address: "545 International Blvd Ste B, Oakland, CA, 94606",
    type: ["Thai", "Noodles", "Food"],
    images: ["images/chaithai1.jpg", "images/chaithai2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 6
  },
  {
    name: "Kamakura Japanese Restaurant",
    website: "kamakurarestaurant.com",
    phoneNumber: "(510) 521-9121",
    address: "2549 Santa Clara Ave, Alameda, CA, 94501",
    type: ["Sushi", "Japanese", "Food"],
    images: ["images/kamakura1.jpg", "images/kamakura2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 1, 0, 0]],
    rating: 0,
    dataId: 7
  },
  {
    name: "Sushi House",
    website: "e-sushihouse.com",
    phoneNumber: "(510) 865-0999",
    address: "2375 Shoreline Dr, Alameda, CA, 94501",
    type: ["Sushi", "Japanese", "Food"],
    images: ["images/sushihouse1.jpg", "images/sushihouse2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 1, 0, 0]],
    rating: 0,
    dataId: 8
  },
  {
    name: "Chicken On Fire",
    website: "",
    phoneNumber: "(510) 786-9161",
    address: "2619 Oliver Dr, Hayward, CA, 94545",
    type: ["Chicken", "Korean", "Food"],
    images: ["images/chickenfire1.jpg", "images/chickenfire2.jpg"],
    cost: "$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 9
  },
  {
    name: "Frascati",
    website: "frascatisf.com",
    phoneNumber: "(415) 928-1406",
    address: "1901 Hyde St, San Francisco, CA, 94109",
    type: ["Italian", "Mediterranean", "Food"],
    images: ["images/frascati1.jpg", "images/frascati2.jpg"],
    cost: "$$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 2, 0, 0]],
    rating: 0,
    dataId: 10
  },
  {
    name: "Sotto Mare",
    website: "sottomaresf.com",
    phoneNumber: "(415) 398-3181",
    address: "552 Green St, San Francisco, CA, 94133",
    type: ["Italian", "Seafood", "Food"],
    images: ["images/sottomare1.jpg", "images/sottomare2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 1, 0, 0]],
    rating: 0,
    dataId: 11
  },
  {
    name: "Kusakabe",
    website: "kusakabe-sf.com",
    phoneNumber: "(415) 757-0155",
    address: "584 Washington St, San Francisco, CA, 94111",
    type: ["Sushi", "Japanese", "Food"],
    images: ["images/kusakabe1.jpg", "images/kusakabe2.jpg"],
    cost: "$$$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 1, 0, 0]],
    rating: 0,
    dataId: 12
  },
  {
    name: "Bluebird Pizzeria",
    website: "",
    phoneNumber: "(510) 562-1199",
    address: "496 E 14th St, San Leandro, CA, 94577",
    type: ["pizza", "Food"],
    images: ["images/bluebird1.jpg", "images/bluebird2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great.", 5, 0, 0], ["Bob", "This place sucked", 1, 0, 0]],
    rating: 0,
    dataId: 13
  }
];

var users = [
  {
    username: "Tom",
    password: "burgers",
    firstName: "Tom",
    lastName: "Burgers",
    city: "Newport Beach",
    image: "images/reviewer1.jpeg",
    aboutMe: "Just travelling around the world eating everything. On a mission to gain 200lbs.",
    reviews: []
  },
  {
    username: "Lisa",
    password: "burgers",
    firstName: "Lisa",
    lastName: "Burgers",
    city: "Newport Beach",
    image: "images/lisaburgers.jpg",
    aboutMe: "I'm travelling around the world with my husband eating hamburgers at every stop. Theres not a burger I haven't tried.",
    reviews: []
  }
];

function updateRating() {
  for(var i = 0;i < restaurants.length;i++) {
  var score = 0;
    for(var x = 0;x < restaurants[i].reviews.length;x++) {
      score = score + restaurants[i].reviews[x][2];
    }
  restaurants[i].rating = Math.round((score) / restaurants[i].reviews.length);
  }
}


app.use(express.static("./"));

app.get("/search", function(req, res) {
  var matchedRestaurants = [];
  updateRating();
  for(var i = 0;i < restaurants.length;i++) {
    for(var x = 0;x < restaurants[i].type.length;x++) {
      if(req.query.q == restaurants[i].type[x].toLowerCase()) {
        matchedRestaurants.push(restaurants[i]);
      }
    }
  } if(matchedRestaurants.length > 0) {
    res.json(matchedRestaurants);
  } else {
    res.sendStatus(404);
  }
})

app.post("/addReview", jsonParser, function(req,res) {
  var match = [];
  for(var i = 0;i < restaurants.length;i++){
    if(req.body.dataId == restaurants[i].dataId) {
      restaurants[i].reviews.unshift([req.body.name, req.body.review, req.body.stars, 0, 0]);
      updateRating();
      match.push(restaurants[i]);
    }
  }
  if(match.length > 0) {
    res.json(match)
  }
  else {
    res.sendStatus(404);
  }
})

app.post("/addRestaurant", jsonParser, function(req, res) {
  var newRestaurant = {
    name: req.body.name,
    website: req.body.site,
    phoneNumber: req.body.phone,
    address: req.body.address,
    type: ["Food"],
    images: ["images/no-image-found.jpg", ""],
    cost: req.body.cost,
    reviews: [],
    rating: 0,
    dataId: (restaurants.length)
  }
  restaurants.push(newRestaurant);
  res.sendStatus(200);
})


app.post("/login", jsonParser, function(req, res) {
  var matched = [];
  for(var i = 0;i < users.length;i++) {
    if(req.body.username == users[i].username && req.body.password == users[i].password) {
      matched.push(users[i]);
    }
  }
  if(matched.length > 0) {
    res.cookie("loggedIn", "true");
    res.send(matched);
  }
  else {
    res.sendStatus(404);
  }
})

app.post("/useful", jsonParser, function(req, res) {
  var value = [];
  for(var i = 0;i < restaurants.length;i++) {
    if(req.body.id == restaurants[i].dataId) {
      var newValue = req.body.value + 1;
      restaurants[i].reviews[req.body.location][3] = newValue;
      value.push(restaurants[i].reviews[req.body.location][3]);
    }
  }
  if(value.length > 0) {
    res.send(value);
  }
  else {
    res.sendStatus(404);
  }
})

app.post("/funny", jsonParser, function(req, res) {
  var value = [];
  for(var i = 0;i < restaurants.length;i++) {
    if(req.body.id == restaurants[i].dataId) {
      var newValue = req.body.value + 1;
      restaurants[i].reviews[req.body.location][4] = newValue;
      value.push(restaurants[i].reviews[req.body.location][4])
    }
  }
  if(value.length > 0) {
    res.send(value)
  }
  else {
    res.sendStatus(404);
  }
})

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log("Listening on port " + port);
})
