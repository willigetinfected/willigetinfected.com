var hasStateArr = ['China', 'United States of America', 'France', 'United Kingdom of Great Britain and Northern Ireland', 'Netherlands', 'Denmark', 'Cruise Ship', 'Australia', 'Canada'];
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", 
"Barbados", "Belarus", "Belgium", "Benin", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Cambodia", "Cameroon", "Canada", "Cayman Islands", 
"Central Arfrican Republic", "Chile", "China", "Colombia", "Republic of the Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czechia", "Denmark", "Djibouti", 
"Dominican Republic", "Ecuador", "Egypt", "Equatorial Guinea", "Estonia", "Ethiopia", "Finland", "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Guam", 
"Guatemala", "Guernsey", "Guinea", "Guyana", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", 
"Kazakhstan", "Kenya", "Kosovo", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Liberia", "Liechtenstein", "Lithuania", "Luxembourg", "North Macedonia",
"Malaysia", "Maldives", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
"Namibia", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", 
"Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", 
"San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Singapore", "Slovakia", "Slovenia",
"Somalia", "South Africa", "South Korea", "Sudan", "Spain", "Sri Lanka", "Saint Lucia", "Saint Vincent and the Grenadines", "Sudan", "Suriname", "Sweden", "Switzerland",
"Taiwan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Ukraine", 
"United Arab Emirates", "United Kingdom of Great Britain and Northern Ireland", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Zambia"];

function updateState() {
  for (let i = 0; i < hasStateArr.length; i++) {
    if (!(selectCountry.value === hasStateArr[i])) {
      $('#statediv').css('display', 'none');
    } else {
      $('#statediv').css('display', 'block');
      i = hasStateArr.length - 1;
    }
  }
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    updateState();
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    a.addEventListener("click", function () {
      updateState();
    });
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
autocomplete(document.getElementById("selectCountry"), countries);