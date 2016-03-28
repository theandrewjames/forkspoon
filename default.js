var search = document.getElementById("search-box");

search.addEventListener("click", function() {
  var searchValue = search.value.toLowerCase();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/search?q=" + searchValue, true);
  xhr.send();
  xhr.onload = function() {
    if(xhr.status == 200) {
      var results = JSON.parse(xhr.responseText);
      for(var i = 0;i < results.length;i++) {
        console.log(results[i]);
      }
    }
  }
})
