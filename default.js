var search = document.getElementById("search-box");
var resultsDiv = document.getElementById("results");
var restaurantTitle = document.getElementsByClassName("restaurantTitle");
var itemRow = document.getElementsByClassName("itemRow");
var writeReview = document.getElementsByClassName("writeReview");
var searchForm = document.getElementById("searchForm");
var reviewerName = document.getElementsByClassName("reviewerName");
var reviewerReview = document.getElementsByClassName("reviewerReview");
var reviewsPanel = document.getElementsByClassName("reviews-panel");


searchForm.addEventListener("submit", function() {
  event.preventDefault();
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

        var image = document.createElement("img");
        image.className = "img-responsive resultImage img-rounded";
        image.setAttribute("src", results[i].images[0]);

        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = "<b>" + "<a class=restaurantTitle data-type=restaurantTitle data-id=" + results[i].dataId  + ">"+ results[i].name + "</a>" + "</b>" + "<br>" + "<a href="+
        "http://" + results[i].website+">" + results[i].website + "</a>" + "<br>" + results[i].cost;
        nameDiv.className = "nameDiv col-md-6";

        var row = document.createElement("row");
        var columnDiv = document.createElement("div");
        columnDiv.className = "col-md-12 panel-body";

        var addressDiv = document.createElement("div");
        addressDiv.innerHTML = results[i].address + "<br>" + results[i].phoneNumber;
        addressDiv.className = "col-md-3 addressDiv";

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

        var submitReviewButton = document.createElement("button");
        submitReviewButton.setAttribute("type", "button");
        submitReviewButton.textContent = "Submit Review";
        submitReviewButton.className = "btn btn-primary submitReview";
        submitReviewButton.setAttribute("data-type", "addReview");
        submitReviewButton.setAttribute("data-id", results[i].dataId)

        nameFormGroup.appendChild(reviewerNameInput);
        writeReviewForm.appendChild(nameFormGroup);
        reviewFormGroup.appendChild(reviewTextArea);
        writeReviewForm.appendChild(reviewFormGroup);
        writeReviewForm.appendChild(submitReviewButton)
        writeReviewPanel.appendChild(writeReviewForm)
        columnDiv.appendChild(image);
        columnDiv.appendChild(nameDiv);
        columnDiv.appendChild(addressDiv);
        row.appendChild(columnDiv);
        panel.appendChild(row);
        resultRow.appendChild(panel);
        resultsDiv.appendChild(resultRow);
        resultRow.appendChild(writeReviewPanel)
        for(var x = 0;x < results[i].reviews.length;x++) {
          var reviewsDiv = document.createElement("div");
          var reviewerName = document.createElement("div");
          var review = document.createElement("div");
          reviewsDiv.className = "col-md-8 panel panel-default hidden reviews-panel";
          reviewsDiv.setAttribute("data-id", results[i].dataId)
          reviewerName.className = "panel-heading";
          reviewerName.innerHTML = results[i].reviews[x][0];
          review.textContent = results[i].reviews[x][1];
          reviewsDiv.appendChild(reviewerName);
          reviewsDiv.appendChild(review);
          resultRow.appendChild(reviewsDiv);
        }
      }
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
  console.log(event.target.dataset.id);
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
    var review = {
      name: name,
      review: review,
      dataId: dataId
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/addReview", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(review));
    xhr.onload = function() {
      if(xhr.status == 200) {
        var results = JSON.parse(xhr.responseText)
        console.log(results)
        console.log(id);
        var reviewsDiv = document.createElement("div");
        var reviewerName = document.createElement("div");
        var review = document.createElement("div");
        reviewsDiv.className = "col-md-8 panel panel-default reviews-panel";
        reviewsDiv.setAttribute("data-id", id)
        reviewerName.className = "panel-heading";
        reviewerName.textContent = results[0][0];
        review.textContent = results[0][1];
        reviewsDiv.appendChild(reviewerName);
        reviewsDiv.appendChild(review);
        for(var i = 0;i < itemRow.length;i++) {
          if(itemRow[i].dataset.id == id) {
            itemRow[i].appendChild(reviewsDiv)
          }
        }
      }
    }
  }
})
