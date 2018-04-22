// Defines the url variable for the server connection
var urlUsers = "http://localhost:8888/db/users.json";
var urlSeries = "http://localhost:8888/db/series.json";
var urlEvents = "http://localhost:8888/db/events.json";

// User functions
// Fetches the user json list using an XML Http request
function eventUserFetch()
{
  var usersRequest = new XMLHttpRequest();
  usersRequest.open('GET', urlUsers);
  usersRequest.onload = function()
  {
    var recievedData = JSON.parse(usersRequest.responseText);
    eventRotaDefine(recievedData);
  };
  usersRequest.send();
}

// Fetches the user json list using an XML Http request
function seriesUserFetch()
{
  var usersRequest = new XMLHttpRequest();
  usersRequest.open('GET', urlUsers);
  usersRequest.onload = function()
  {
    var recievedData = JSON.parse(usersRequest.responseText);
    seriesRotaDefine(recievedData);
  };
  usersRequest.send();
}

function eventRotaDefine(data) {
  // Grab the input elements
  var nameEvent = document.getElementById('eventRotaName').value;
  var reqBoatNo = document.getElementById('eventBoatNo').value;
  var mlBoatNo = document.getElementById('eventBoatNoML').value;
  var personnelPerBoat = document.getElementById('eventBoatPersonnelNo').value;
  var startDate = document.getElementById('eventDateStart').value;
  var eventLength = document.getElementById('eventDateLength').value;

  var eventobj = {
    "EventName": nameEvent,
    "NumberOfBoats": reqBoatNo,
    "NumberOfMarklayers": mlBoatNo,
    "StartDate": startDate,
    "EventLength": eventLength,
    "MLBoatDriver": {},
    "MLBoatCrew": {},
    "RBoatDriver": {},
    "RBoatCrew": {}
  }

  boatFill = reqBoatNo;
  console.log("Personnel per boat is set at: " + personnelPerBoat);

  // Maybe....
  for (var i = 0; i < data.length; i++) {
    if (data[i].qualifications.PBL2 && data[i].qualifications.ML && data[i].age >= 16 && boatFill > 0 && mlBoatNo > 0 && data[i].used != true) {
      for (var a = 0; a < personnelPerBoat; a++) {
        var selector = 1;
        if (selector = 1) {
          eventobj.MLBoatDriver[boatFill] = data[i].firstName + " " + data[i].lastName;
          data[i].used = true;
          selector--;
        }
      }
      mlBoatNo--;
      boatFill--;
    } else if (data[i].qualifications.PBL2 && data[i].age >= 16 && data[i].qualifications.ML == false && reqBoatNo > mlBoatNo && boatFill > 0 && data[i].used != true) {
      for (var a = 0; a < personnelPerBoat; a++) {
        var selector = 1;
        if (selector = 1) {
          eventobj.RBoatDriver[boatFill] = data[i].firstName + " " + data[i].lastName;
          data[i].used = true;
          selector--;
        }
      }
      boatFill--;
    }
  }

  // Grab the input elements
  var nameEvent = document.getElementById('eventRotaName').value;
  var reqBoatNo = document.getElementById('eventBoatNo').value;
  var mlBoatNo = document.getElementById('eventBoatNoML').value;
  var personnelPerBoat = document.getElementById('eventBoatPersonnelNo').value;
  var startDate = document.getElementById('eventDateStart').value;
  var eventLength = document.getElementById('eventDateLength').value;

  boatFill = reqBoatNo;

  // Maybe not...
  for (var i = 0; i < data.length; i++) {
    if (data[i].qualifications.PBL2 && boatFill > 0 && mlBoatNo > 0 && data[i].used != true) {
      for (var a = 0; a < personnelPerBoat; a++) {
        var selector = 1;
        if (selector = 1) {
          eventobj.MLBoatCrew[boatFill] = data[i].firstName + " " + data[i].lastName;
          data[i].used = true;
          selector--;
        }
      }
      mlBoatNo--;
      boatFill--;
    } else if (data[i].qualifications.PBL2 && reqBoatNo > mlBoatNo && boatFill > 0 && data[i].used != true) {
      for (var a = 0; a < personnelPerBoat; a++) {
        var selector = 1;
        if (selector = 1) {
          eventobj.RBoatCrew[boatFill] = data[i].firstName + " " + data[i].lastName;
          data[i].used = true;
          selector--;
        }
      }
      boatFill--;
    }
  }
  console.log(eventobj);
  console.log(data);
}

function seriesRotaDefine(data) {

  // Grab the input elements
  var seriesName = document.getElementById('seriesType').value;
  var reqBoatNo = document.getElementById('seriesBoatNo').value;
  var personnelPerBoat = document.getElementById('seriesPersonnelNo').value;
  var startDate = document.getElementById('seriesStartDate').value;
  var endDate = document.getElementById('seriesEndDate').value;

  window.alert(seriesName + 'series Created!');

  var eModal = document.getElementById('EventRotaModal');
  eModal.style.display = 'none';

  var seriesobj = {
    "Name": seriesName,
    "numberOfBoats": reqBoatNo,
    "startDate": startDate,
    "endDate": endDate,
    "races": [{},{},{},{},{},{},{},{},{}]
  }

  // console.log(seriesobj);

  console.log("Personnel per boat is set at: " + personnelPerBoat);

  var dateArray = [];

  function getCountOfDay(d1, d2, dayToSearch, count)
  {
    var dateObj1 = d1;
    var dateObj2 = d2;
    var count = 0;
    var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayIndex = week.indexOf(dayToSearch);

    while (dateObj1.getTime() <= dateObj2.getTime())
    {
      if (dateObj1.getDay() == dayIndex)
      {
        count++
        dateArray.push(dateObj1.toDateString());
      }
      dateObj1.setDate(dateObj1.getDate() + 1);
    }

    datesRequired = count;
    return datesRequired;
  }

  var d1 = new Date(startDate);
  var d2 = new Date(endDate);
  var dayToSearch = "Sun";

  getCountOfDay(d1, d2, dayToSearch);

  console.log("Date List: ");
  console.log(dateArray);

  console.log("Number of Sundays is: " + datesRequired);

  // Maybe....
  for (var a = 0; a < datesRequired; a++)
  {
    boatFill = reqBoatNo;
    for (var i = 0; i < data.length; i++)
    {
      if (data[i].qualifications.PBL2 && data[i].age >= 16 && boatFill > 0 && data[i].used != true)
      {
        for (var b = 0; b < personnelPerBoat; b++)
        {
          seriesobj.races[a].date = dateArray.shift();
          seriesobj.races[a].RBoatDriver = data[i].firstName + " " + data[i].lastName;
          data[i].used = true;
        }
        boatFill--;
      }
    }

    boatFill = reqBoatNo;

    for (var i = 0; i < data.length; i++)
    {
      if (data[i].qualifications.PBL2 && boatFill > 0 && data[i].used != true)
      {
        for (var b = 0; b < personnelPerBoat; b++)
        {
          console.log("This is run number: " + a);
          console.log(seriesobj);
          seriesobj.races[a].RBoatCrew = data[i].firstName + " " + data[i].lastName;
          data[i].used = true;
        }
        boatFill--;
      }
    }
  }
  console.log(a);
  console.log(data);
  console.log(seriesobj);
}

function displaySeries(){
  seriesHeading = "<h2>" + + "</h2>";
  seriesBoat =
  cardcontent.insertAdjacentHTML('beforeend', userString);
}
