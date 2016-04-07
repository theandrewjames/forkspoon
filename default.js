var search = document.getElementById("search-box");
var resultsDiv = document.getElementById("results");
var restaurantTitle = document.getElementsByClassName("restaurantTitle");
var itemRow = document.getElementsByClassName("itemRow");
var writeReview = document.getElementsByClassName("writeReview");
var searchForm = document.getElementById("searchForm");
var reviewerName = document.getElementsByClassName("reviewerName");
var reviewerReview = document.getElementsByClassName("reviewerReview");
var reviewsPanel = document.getElementsByClassName("reviews-panel");
var stars = document.getElementsByClassName("stars");
var costIcons = document.getElementsByClassName("costIcons");
var newRestaurantForm = document.getElementById("newRestaurantForm");
var addRestaurant = document.getElementById("add-restaurant");
var newName = document.getElementById("newName");
var newSite = document.getElementById("newSite");
var newAddress = document.getElementById("newAddress");
var newNumber = document.getElementById("newNumber");
var costRating = document.getElementsByClassName("cost");
var usernameInput = document.getElementById("usernameInput");
var passwordInput = document.getElementById("passwordInput");
var passwordStatus = document.getElementById("passwordStatus");
var loginModal = document.getElementById("loginModal");
var loginButton = document.getElementById("login-button");
var userGreeting = document.getElementById("user");

function numberToStars(x) {
  var stars = "";
  for(var i = 0;i < x;i++) {
    stars = stars + "★";
  }
  return stars;
}

function dollarSigns(x) {
  var cost = "";
  for(i = 0;i < x;i++) {
    cost = cost + "$";
  }
  return cost;
}


searchForm.addEventListener("submit", function() {
  event.preventDefault();
  newRestaurantForm.classList.add("hidden");
  var searchValue = search.value.toLowerCase();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/search?q=" + searchValue, true);
  xhr.send();
  xhr.onload = function() {
    if(xhr.status == 200) {
      while(resultsDiv.hasChildNodes()) {
        resultsDiv.removeChild(resultsDiv.lastChild)
      };
      var results = JSON.parse(xhr.responseText);
      for(var i = 0;i < results.length;i++) {

        var resultRow = document.createElement("div");
        resultRow.setAttribute("data-id", results[i].dataId);
        resultRow.className = "row itemRow";

        var panel = document.createElement("div");
        panel.className = "col-md-9 panel panel-default result-panel";

        var hr = document.createElement("hr");
        hr.className = "col-md-9 hr"

        var image = document.createElement("img");
        image.className = "img-responsive resultImage img-rounded";
        image.setAttribute("src", results[i].images[0]);
        //Trying to switch from innerhtml but this code breaks it even though its identical
        // var mainInfo = document.createElement("div");
        // mainInfo.className = "nameDiv col-md-6";
        //
        // var restaurantTitle = document.createElement("a");
        // restaurantTitle.className = "restaurantTitle";
        // restaurantTitle.setAttribute("data-type", "restaurantTitle");
        // restaurantTitle.setAttribute("data-id", results[i].dataId);
        // restaurantTitle.textContent = results[i].name;
        //
        // var titleBreak = document.createElement("br");
        //
        // var site = document.createElement("a");
        // site.setAttribute("href", "http://" + results[i].website);
        // site.textContent = results[i].website;
        //
        // var siteBreak = document.createElement("br");
        //
        // var cost = document.createElement("div");
        // cost.textContent = results[i].cost;

        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = "<b>" + "<a class=restaurantTitle data-type=restaurantTitle data-id="
        + results[i].dataId  + ">"+ results[i].name + "</a>" + "</b>" + " " +
        "<div class=titleStars>" + numberToStars(results[i].rating) + "</div>" +
        results[i].reviews.length + " " + "reviews" + "<br>" + "<a href=" +
        "http://" + results[i].website+">" + results[i].website + "</a>" + "<br>" + results[i].cost;
        nameDiv.className = "nameDiv col-md-6";


        var row = document.createElement("row");
        var columnDiv = document.createElement("div");
        columnDiv.className = "col-md-12 panel-body";

        var contactDiv = document.createElement("div");
        contactDiv.className = "col-md-3 addressDiv";

        var addressDiv = document.createElement("div");
        addressDiv.textContent = results[i].address;

        var contactBreak = document.createElement("br");

        var phoneDiv = document.createElement("div");
        phoneDiv.textContent = results[i].phoneNumber;



        var writeReviewPanel = document.createElement("div");
        writeReviewPanel.setAttribute("data-id", results[i].dataId);
        writeReviewPanel.className = "col-md-8 panel panel-default panel-body hidden writeReview";

        var writeReviewForm = document.createElement("form");

        var nameFormGroup = document.createElement("div");
        nameFormGroup.className = "form-group";

        var reviewerNameInput = document.createElement("input");
        reviewerNameInput.setAttribute("type", "text");
        reviewerNameInput.setAttribute("placeholder", "Name");
        reviewerNameInput.setAttribute("data-id", results[i].dataId);
        reviewerNameInput.className = "form-control reviewerName";

        var reviewFormGroup = document.createElement("div");
        reviewFormGroup.className = "form-group";

        var reviewTextArea = document.createElement("textarea");
        reviewTextArea.setAttribute("rows", 2);
        reviewTextArea.setAttribute("placeholder", "Type review here.");
        reviewTextArea.setAttribute("data-id", results[i].dataId);
        reviewTextArea.className = "form-control reviewerReview";

        var ratingDiv = document.createElement("div");
        ratingDiv.className = "rating col-md-4 col-md-offset-1";

        var starOne = document.createElement("span");
        starOne.setAttribute("data-type", "star");
        starOne.setAttribute("data-id", results[i].dataId);
        starOne.setAttribute("data-loc", 0);
        starOne.className = "stars";
        starOne.textContent = "☆";

        var starTwo = document.createElement("span");
        starTwo.setAttribute("data-type", "star");
        starTwo.setAttribute("data-id", results[i].dataId);
        starTwo.setAttribute("data-loc", 1);
        starTwo.className = "stars";
        starTwo.textContent = "☆";

        var starThree = document.createElement("span");
        starThree.setAttribute("data-type", "star");
        starThree.setAttribute("data-id", results[i].dataId);
        starThree.setAttribute("data-loc", 2);
        starThree.className = "stars";
        starThree.textContent = "☆";

        var starFour = document.createElement("span");
        starFour.setAttribute("data-type", "star");
        starFour.setAttribute("data-id", results[i].dataId);
        starFour.setAttribute("data-loc", 3);
        starFour.className = "stars";
        starFour.textContent = "☆";

        var starFive = document.createElement("span");
        starFive.setAttribute("data-type", "star");
        starFive.setAttribute("data-id", results[i].dataId);
        starFive.setAttribute("data-loc", 4);
        starFive.className = "stars";
        starFive.textContent = "☆";

        ratingDiv.appendChild(starOne);
        ratingDiv.appendChild(starTwo);
        ratingDiv.appendChild(starThree);
        ratingDiv.appendChild(starFour);
        ratingDiv.appendChild(starFive);

        var ratingFormGroup = document.createElement("div");
        ratingFormGroup.className = "form-group";

        var ratingRow = document.createElement("div");
        ratingRow.className = "row";

        var submitReviewButton = document.createElement("button");
        submitReviewButton.setAttribute("type", "button");
        submitReviewButton.textContent = "Submit Review" ;
        submitReviewButton.className = "btn btn-primary submitReview col-md-4";
        submitReviewButton.setAttribute("data-type", "addReview");
        submitReviewButton.setAttribute("data-id", results[i].dataId)

        nameFormGroup.appendChild(reviewerNameInput);
        writeReviewForm.appendChild(nameFormGroup);
        reviewFormGroup.appendChild(reviewTextArea);
        writeReviewForm.appendChild(reviewFormGroup);
        ratingRow.appendChild(ratingDiv);
        ratingRow.appendChild(submitReviewButton)
        ratingFormGroup.appendChild(ratingRow);
        writeReviewForm.appendChild(ratingFormGroup);
        writeReviewPanel.appendChild(writeReviewForm)
        columnDiv.appendChild(image);
        //Code to switch from innerhtml
        // mainInfo.appendChild(restaurantTitle);
        // mainInfo.appendChild(titleBreak);
        // mainInfo.appendChild(site);
        // mainInfo.appendChild(siteBreak);
        // mainInfo.appendChild(cost);
        // columnDiv.appendChild(mainInfo);
        columnDiv.appendChild(nameDiv)
        contactDiv.appendChild(addressDiv);
        contactDiv.appendChild(contactBreak);
        contactDiv.appendChild(phoneDiv);
        columnDiv.appendChild(contactDiv);
        row.appendChild(columnDiv);
        panel.appendChild(row);
        resultRow.appendChild(panel);
        resultRow.appendChild(hr);
        resultsDiv.appendChild(resultRow);
        resultRow.appendChild(writeReviewPanel);
        for(var x = 0;x < results[i].reviews.length;x++) {
          var div = document.createElement("div");
          div.className = "col-md-7";

          var reviewsDiv = document.createElement("div");
          reviewsDiv.className = "panel panel-default hidden reviews-panel";
          reviewsDiv.setAttribute("data-id", results[i].dataId);

          var reviewerName = document.createElement("div");
          reviewerName.className = "panel-heading";
          reviewerName.innerHTML = results[i].reviews[x][0];

          var reviewBody = document.createElement("div");
          reviewBody.className = "panel-body";

          var rating = document.createElement("div");
          rating.className = "reviewRating";
          rating.textContent = numberToStars(results[i].reviews[x][2]);


          var review = document.createElement("div");
          review.textContent = results[i].reviews[x][1];

          var panelFooter = document.createElement("div");
          panelFooter.className = "panel-footer";

          var usefulButton = document.createElement("button");
          usefulButton.className = "btn btn-primary";
          usefulButton.setAttribute("type", "button");
          usefulButton.setAttribute("data-type", "useful")
          usefulButton.textContent = "Useful ";

          var badge = document.createElement("span");
          badge.className = "badge";
          badge.textContent = 0;

          reviewsDiv.appendChild(reviewerName);
          reviewBody.appendChild(rating);
          usefulButton.appendChild(badge);
          panelFooter.appendChild(usefulButton);
          reviewBody.appendChild(review);
          reviewsDiv.appendChild(reviewBody);
          reviewsDiv.appendChild(panelFooter);
          div.appendChild(reviewsDiv);
          resultRow.appendChild(div);
        }
      }
    }
    else if(xhr.status == 404) {
      while(resultsDiv.hasChildNodes()) {
        resultsDiv.removeChild(resultsDiv.lastChild)
      }
      var nonePanel = document.createElement("div");
      nonePanel.className = "panel panel-default col-md-7 col-md-offset-1";

      var noneBody = document.createElement("div");
      noneBody.className = "panel-body";
      noneBody.textContent = "No results found. Try searching for pizza, sushi or chicken";

      nonePanel.appendChild(noneBody);
      resultsDiv.appendChild(nonePanel)
    }
    for(var i = 0;i < restaurantTitle.length;i++) {
      restaurantTitle[i].addEventListener("click", function() {
        var reviewsDiv = document.getElementsByClassName('reviews-panel')
        var titleId = this.dataset.id;
        for(var i = 0;i < itemRow.length;i++) {
          var rowId = itemRow[i].dataset.id;
          if(rowId < titleId || rowId > titleId) {
            itemRow[i].classList.add("hidden");
          }
        }
        for(var i = 0;i < reviewsDiv.length;i++) {
          if(reviewsDiv[i].dataset.id == titleId) {
            reviewsDiv[i].classList.remove("hidden");
          }
        }
        for(var i = 0;i < writeReview.length;i++) {
          if(writeReview[i].dataset.id == titleId) {
            writeReview[i].classList.remove("hidden");
          }
        }
      })
    }
  }
})

document.addEventListener("click", function() {
  if(event.target.dataset.type == "addReview") {
    var id = event.target.dataset.id;
    for(var i = 0;i < reviewerName.length;i++) {
      if(reviewerName[i].dataset.id == event.target.dataset.id) {
        var name = reviewerName[i].value;
      }
    }
    for(var i = 0;i < reviewerReview.length;i++) {
      if(reviewerReview[i].dataset.id == event.target.dataset.id) {
        var review = reviewerReview[i].value;
        var dataId = event.target.dataset.id;

      }
    }
    var matched = [];
    for(var i = 0;i < stars.length;i++) {
      if(stars[i].dataset.id == event.target.dataset.id && stars[i].classList.contains("fullStar")) {
        matched.push(stars[i]);
      }
    }

    var review = {
      name: name,
      review: review,
      dataId: dataId,
      stars: matched.length
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/addReview", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(review));
    xhr.onload = function() {
      if(xhr.status == 200) {
        var results = JSON.parse(xhr.responseText)

        var div = document.createElement("div");
        div.className = "col-md-7";

        var reviewsDiv = document.createElement("div");
        reviewsDiv.className = "panel panel-default reviews-panel";
        reviewsDiv.setAttribute("data-id", id);

        var reviewerName = document.createElement("div");
        reviewerName.className = "panel-heading";
        reviewerName.textContent = results[0].reviews[0][0];

        var rating = document.createElement("div");
        rating.className = "reviewRating";
        rating.textContent = numberToStars(results[0].reviews[0][2]);


        var ratingReview = document.createElement("div");
        ratingReview.className = "panel-body";

        var review = document.createElement("div");
        review.textContent = results[0].reviews[0][1];

        var panelFooter = document.createElement("div");
        panelFooter.className = "panel-footer";

        var usefulButton = document.createElement("button");
        usefulButton.className = "btn btn-primary";
        usefulButton.setAttribute("type", "button");
        usefulButton.setAttribute("data-type", "useful")
        usefulButton.textContent = "Useful ";

        var badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = 0;

        reviewsDiv.appendChild(reviewerName);
        ratingReview.appendChild(rating);
        ratingReview.appendChild(review);
        reviewsDiv.appendChild(ratingReview);
        usefulButton.appendChild(badge);
        panelFooter.appendChild(usefulButton);
        reviewsDiv.appendChild(panelFooter)
        div.appendChild(reviewsDiv);
        for(var i = 0;i < itemRow.length;i++) {
          if(itemRow[i].dataset.id == id) {
            itemRow[i].appendChild(div)
          }
        }
      }
      else if(xhr.status == 404) {
        console.log("No review found.")
      }
    }
  }
  if(event.target.dataset.type == "star") {
    var id = event.target.dataset.id;
    var location = event.target.dataset.loc;
    for(var i = 0;i < stars.length;i++) {
      if(stars[i].dataset.id == id && stars[i].dataset.loc <= location) {
        stars[i].textContent = "★";
        stars[i].classList.add("fullStar");
      } else if (stars[i].dataset.id == id && stars[i].dataset.loc >= location) {
        stars[i].textContent = "☆";
        stars[i].classList.remove("fullStar");
      }
    }
  }
  if(event.target.dataset.type == "costRating") {
    var location = event.target.dataset.loc;
    for(var i = 0;i < costIcons.length;i++) {
      if(costIcons[i].dataset.loc <= location) {
        costIcons[i].textContent = "$";
        costIcons[i].classList.add("cost");
      }
      else if(costIcons[i].dataset.loc >= location) {
        costIcons[i].textContent = "●";
        costIcons[i].classList.remove("cost");
      }
    }
  }
  if(event.target.dataset.type == "addRestaurant") {
    newRestaurantForm.classList.toggle("hidden");
  }
  if(event.target.dataset.type == "submitRestaurant") {
    event.preventDefault();
    var newRestaurant = {
      name: newName.value,
      site: newSite.value,
      address: newAddress.value,
      phone: newNumber.value,
      cost: dollarSigns(costRating.length)
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/addRestaurant", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(newRestaurant));
    xhr.onload = function() {
      if(xhr.status == 200) {
        newName.value = "";
        newSite.value = "";
        newAddress.value = "";
        newNumber.value = "";
        for(var i = 0;i < costIcons.length;i++) {
          costIcons[i].classList.remove("cost");
          costIcons[i].textContent = "$";
        }
        newRestaurantForm.classList.add("hidden");
      }
    }
  }
  if(event.target.dataset.type == "signIn") {
    var username = usernameInput.value;
    var password = passwordInput.value;
    var login = {
      username: username,
      password: password
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(login));
    xhr.onload = function() {
      if(xhr.status == 200) {
        var results = JSON.parse(xhr.responseText);
        usernameInput.value = "";
        passwordInput.value = "";
        passwordStatus.textContent = "";
        $("#loginModal").modal("hide");
        loginButton.textContent = "Logout";
        loginButton.removeAttribute("data-toggle");
        loginButton.setAttribute("data-type", "logout");
        loginButton.removeAttribute("data-target", "#loginModal");
        console.log(results);
        userGreeting.textContent = "Welcome, " + results;
      }
      else if(xhr.status == 404) {
        passwordStatus.textContent = "Incorrect password";
      }
    }

  }
  if(event.target.dataset.type == "logout") {
    userGreeting.textContent = "";
    loginButton.textContent = "Login";
    loginButton.removeAttribute("data-type");
    loginButton.setAttribute("data-toggle", "modal");
    loginButton.setAttribute("data-target", "#loginModal");
    $("#loginModal").modal("toggle");
  }
  if(event.target.dataset.type == "useful") {
    
  }
})
