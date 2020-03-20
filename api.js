function getAPI() {

  var request = new XMLHttpRequest();

  var country = selectCountry.value;
  var state = selectState.value;
  if (state == '') state = 'blank';
  var theURL = 'https://us-central1-willigetinfectedapi.cloudfunctions.net/getChanceInfected?state=' + state + '&country=' + country + '&days=100';

  request.open('GET', theURL, true); //?state=Texas&country=United%20States%20of%20America&days=100
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      if (state == 'blank') var location = country;
      else var location = state + ', ' + country;
      if (data.week == null) $('#chanceInfected').text('Please insert a valid location. If the error proceeds, the location you input might not be in our database yet. Check back later.');
      else if ($('#statediv').css('display') == 'block' && selectState.value == '') $('#chanceInfected').text('Please enter a state/province for that country.');
      else $('#chanceInfected').text(
        ' In ' + location + ', there are ' + data.confirmed + ' COVID-19 cases out of the total population of ' + data.population + '.' +
        'This means you have a ' + data.week + '% chance of getting infected in the next week, ' +
        data.month + '% chance in the next month, ' +
        'and a ' + data.threemonth + '% chance in the three months.'
        );
    } else {
      console.log('error');
    }
  }

  request.send();


  $('#inputdiv').css('display', 'none');
  $('#resultdiv').css('display', 'block');
}

function bopemback() {
  $('#inputdiv').css('display', 'block');
  $('#resultdiv').css('display', 'none');
  $('#statediv').css('display', 'none');
  selectCountry.value = '';
  selectState.value = '';
}



/*

In Washington, United States of America, there are 643 COVID-19 cases out of the total population of 7797095.
//You have a 7.1557624646% chance of getting infected in the next 100 days. 

According to our calculations, your chance of catching COVID-19 is:

19% within a week
30% within 2 weeks
67% withing a month


*/