var search = document.getElementById("search-box");
var resultsDiv = document.getElementById("results");
var restaurantTitle = document.getElementsByClassName("restaurantTitle");
var itemRow = document.getElementsByClassName("itemRow");


search.addEventListener("click", function() {
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
        var panel = document.createElement("div");
        var image = document.createElement("img");
        var nameDiv = document.createElement("div");
        var row = document.createElement("row");
        var columnDiv = document.createElement("div");
        var addressDiv = document.createElement("div");
        var writeReviewPanel = document.createElement("div");
        var writeReviewForm = document.createElement("form");
        var nameFormGroup = document.createElement("div");
        var reviewerNameInput = document.createElement("input");
        var reviewFormGroup = document.createElement("div");
        var reviewTextArea = document.createElement("textarea");
        var submitReviewButton = document.createElement("button");
        nameDiv.innerHTML = "<b>" + "<a class=restaurantTitle data-id=" + results[i].dataId + ">"+ results[i].name + "</a>" + "</b>" + "<br>" + "<a href="+
        "http://" + results[i].website+">" + results[i].website + "</a>" + "<br>" + results[i].cost;
        addressDiv.innerHTML = results[i].address + "<br>" + results[i].phoneNumber;
        image.setAttribute("src", results[i].images[0]);
        resultRow.setAttribute("data-id", results[i].dataId);
        reviewerNameInput.setAttribute("type", "text");
        reviewerNameInput.setAttribute("placeholder", "Name");
        reviewerNameInput.setAttribute("data-id", results[i].dataId)
        reviewTextArea.setAttribute("rows", 2);
        reviewTextArea.setAttribute("placeholder", "Type review here.");
        reviewTextArea.setAttribute("data-id", results[i].dataId)
        submitReviewButton.setAttribute("type", "submit");
        submitReviewButton.textContent = "Submit Review"
        nameDiv.className = "nameDiv col-md-6";
        image.className = "img-responsive resultImage img-rounded";
        resultRow.className = "row itemRow";
        panel.className = "col-md-9 panel panel-default result-panel";
        columnDiv.className = "col-md-12 panel-body";
        addressDiv.className = "col-md-3 addressDiv";
        writeReviewPanel.className = "col-md-8 panel panel-default panel-body";
        nameFormGroup.className = "form-group";
        reviewerNameInput.className = "form-control reviewerName";
        reviewFormGroup.className = "form-group";
        reviewTextArea.className = "form-control reviewerReview";
        submitReviewButton.className = "btn btn-default submitReview";
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
      })
    }
  }
})
