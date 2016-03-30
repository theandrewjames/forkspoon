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
        nameDiv.innerHTML = "<b>" + "<a class=restaurantTitle dataId=" + results[i].dataId + ">"+ results[i].name + "</a>" + "</b>" + "<br>" + "<a href="+
        "http://" + results[i].website+">" + results[i].website + "</a>" + "<br>" + results[i].cost;
        addressDiv.innerHTML = results[i].address + "<br>" + results[i].phoneNumber;
        image.setAttribute("src", results[i].images[0]);
        nameDiv.className = "nameDiv col-md-6";
        image.className = "img-responsive resultImage img-rounded";
        resultRow.className = "row itemRow";
        resultRow.setAttribute("dataId", results[i].dataId);
        panel.className = "col-md-9 panel panel-default result-panel";
        columnDiv.className = "col-md-12 panel-body";
        addressDiv.className = "col-md-3 addressDiv";
        columnDiv.appendChild(image);
        columnDiv.appendChild(nameDiv);
        columnDiv.appendChild(addressDiv);
        row.appendChild(columnDiv);
        panel.appendChild(row);
        resultRow.appendChild(panel)
        resultsDiv.appendChild(resultRow);
      }
    } for(var i = 0;i < restaurantTitle.length;i++) {
      restaurantTitle[i].addEventListener("click", function() {
        var titleId = this.getAttribute("dataid");
        for(var i = 0;i < itemRow.length;i++) {
          var rowId = itemRow[i].getAttribute("dataid");
          if(rowId < titleId || rowId > titleId) {
            itemRow[i].classList.add("hidden");
          }
        }
      })
    }
  }
})
