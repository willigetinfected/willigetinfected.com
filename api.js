function getAPI() {

  $('#chanceInfected').text(' ');
  $('#chanceInfected2').text(' ');
  var request = new XMLHttpRequest();

  var country = selectCountry.value;
  var state = selectState.value;
  if (state == '') state = 'blank';
  var theURL = 'https://us-central1-willigetinfectedapi.cloudfunctions.net/getChanceInfected?state=' + state + '&country=' + country + '&days=100';

  request.open('GET', theURL, true);
  request.onload = function () {
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      if (data.week == 100) var week = 'very high';
      else var week = data.week + '%';
      if (data.month == 100) var month = 'very high';
      else var month = data.month + '%';
      if (data.eightweek == 100) var eightweek = 'very high';
      else var eightweek = data.eightweek + '%';

      if (state == 'blank') var location = country;
      else var location = state + ', ' + country;

      if (data.week == null) {
        $('#chanceInfected').text('Please insert a valid location. If the error proceeds, the location you input might not be in our database yet. Check back later.');
        $('#chanceInfected2').text('');
      } else if ($('#statediv').css('display') == 'block' && selectState.value == '') {
        $('#chanceInfected').text('Please enter a state/province for that country.');
        $('#chanceInfected2').text('');
      } else {
        $('#chanceInfected').text('In ' + location + ', there are ' + data.confirmed + ' COVID-19 cases out of the total population of ' + data.population + '.');
        $('#chanceInfected2').text('This means you have a:');
        $('#bValue').text(week);
        $('#chanceInfected3').text(' chance of getting infected in the next week');
        $('#bValue2').text(month);
        $('#chanceInfected4').text(' chance in the next month');
        $('#bValue3').text(eightweek);
        $('#chanceInfected5').text(' chance in the next 8 weeks');
      }
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