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
    type: ["Sushi", "Japanese"],
    images: ["images/yojimbo1.jpg", "images/yojimbo2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 0
  },
  {
    name: "SPIN! Neopolitan Pizza",
    website: "spinpizza.com",
    phoneNumber: "(510) 769-7492",
    address: "2670 5th St, Alameda, CA, 94501",
    type: ["Italian", "Pizza"],
    images: ["images/spin1.jpg", "images/spin2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 1
  },
  {
    name: "Lola's Chicken Shack",
    website: "lolaschickenshack.com",
    phoneNumber: "(510) 521-4488",
    address: "1417 Park St, Alameda, CA, 94501",
    type: ["Chicken", "Sandwiches"],
    images: ["images/lolas1.jpg", "images/lolas2.jpg"],
    cost: "$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 2
  },
  {
    name: "Trabocco Kitchen and Cocktails",
    website: "trabocco.com",
    phoneNumber: "(510) 521-1152",
    address: "2213 S Shore Ctr, Alameda, CA, 94501",
    type: ["Italian", "Bars"],
    images: ["images/trabocco1.jpg", "images/trabocco2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 3
  },
  {
    name: "Mama Papa Lithuania Restaurant",
    website: "mamapapalithuania.com",
    phoneNumber: "(510) 522-4100",
    address: "1241 Park St, Alameda, CA, 94501",
    type: ["European", "Tea"],
    images: ["images/mamapapa1.jpg", "images/mamapapa2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 4
  },
  {
    name: "Yume Sushi",
    website: "",
    phoneNumber: "(510) 865-7141",
    address: "1428 Park St, Alameda, CA, 94501",
    type: ["Sushi", "Japanese"],
    images: ["images/yume1.jpg", "images/yume2.jpg"],
    cost: "$$$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 5
  },
  {
    name: "Chai Thai Noodles",
    website: "chaithainoodle.com",
    phoneNumber: "(510) 832-2500",
    address: "545 International Blvd Ste B, Oakland, CA, 94606",
    type: ["Thai", "Noodles"],
    images: ["images/chaithai1.jpg", "images/chaithai2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 6
  },
  {
    name: "Kamakura Japanese Restaurant",
    website: "kamakurarestaurant.com",
    phoneNumber: "(510) 521-9121",
    address: "2549 Santa Clara Ave, Alameda, CA, 94501",
    type: ["Sushi", "Japanese"],
    images: ["images/kamakura1.jpg", "images/kamakura2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 7
  },
  {
    name: "Sushi House",
    website: "e-sushihouse.com",
    phoneNumber: "(510) 865-0999",
    address: "2375 Shoreline Dr, Alameda, CA, 94501",
    type: ["Sushi", "Japanese"],
    images: ["images/sushihouse1.jpg", "images/sushihouse2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 8
  },
  {
    name: "Chicken On Fire",
    website: "",
    phoneNumber: "(510) 786-9161",
    address: "2619 Oliver Dr, Hayward, CA, 94545",
    type: ["Chicken", "Korean"],
    images: ["images/chickenfire1.jpg", "images/chickenfire2.jpg"],
    cost: "$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 9
  },
  {
    name: "Frascati",
    website: "frascatisf.com",
    phoneNumber: "(415) 928-1406",
    address: "1901 Hyde St, San Francisco, CA, 94109",
    type: ["Italian", "Mediterranean"],
    images: ["images/frascati1.jpg", "images/frascati2.jpg"],
    cost: "$$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 10
  },
  {
    name: "Sotto Mare",
    website: "sottomaresf.com",
    phoneNumber: "(415) 398-3181",
    address: "552 Green St, San Francisco, CA, 94133",
    type: ["Italian", "Seafood"],
    images: ["images/sottomare1.jpg", "images/sottomare2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 11
  },
  {
    name: "Kusakabe",
    website: "kusakabe-sf.com",
    phoneNumber: "(415) 757-0155",
    address: "584 Washington St, San Francisco, CA, 94111",
    type: ["Sushi", "Japanese"],
    images: ["images/kusakabe1.jpg", "images/kusakabe2.jpg"],
    cost: "$$$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 12
  },
  {
    name: "Bluebird Pizzeria",
    website: "",
    phoneNumber: "(510) 562-1199",
    address: "496 E 14th St, San Leandro, CA, 94577",
    type: ["pizza", " "],
    images: ["images/bluebird1.jpg", "images/bluebird2.jpg"],
    cost: "$$",
    reviews: [["Andrew", "This place was great."], ["Bob", "This place sucked"]],
    dataId: 13
  }
];

var matchedRestaurants = [];

app.use(express.static("./"));

app.get("/search", function(req, res) {
  while(matchedRestaurants.length > 0) {
    matchedRestaurants.pop();
  }
  for(var i = 0;i < restaurants.length;i++) {
    if(req.query.q == restaurants[i].type[0].toLowerCase() || req.query.q == restaurants[i].type[1].toLowerCase()) {
      matchedRestaurants.push(restaurants[i]);
    }
  } if(matchedRestaurants.length > 0) {
    res.json(matchedRestaurants);
  }
})



app.listen(8080, function() {
  console.log("Listening on port 8080")
});
