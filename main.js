document.addEventListener("DOMContentLoaded", function () {
  function displayEventsInTables(events) {
    var currentDate = new Date();
    var upcomingTable = document.getElementById("upcoming").getElementsByTagName("tbody")[0];
    var pastTable = document.getElementById("past").getElementsByTagName("tbody")[0];
    var upcomingHeader = document.querySelector('h2');
  
    var upcomingEventsExist = false;
  
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var eventDate = new Date(event.date + ' ' + event.time);
  
      var row;
      if (eventDate < currentDate) {
        row = pastTable.insertRow(pastTable.rows.length);
      } else {
        upcomingEventsExist = true;
        row = upcomingTable.insertRow(upcomingTable.rows.length);
      }
  
      var dateCell = row.insertCell(0);
      var timeCell = row.insertCell(1);
      var locationCell = row.insertCell(2);
  
      dateCell.innerHTML = event.date;
      timeCell.innerHTML = event.time;
      locationCell.innerHTML = event.location;
    }
  
    if (!upcomingEventsExist) {
      upcomingHeader.innerHTML = "Coming Soon";
      document.getElementById("upcoming").style.display = "none";
    }
  }
  
  fetch('gigs.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayEventsInTables(data.events);
    })
    .catch(function(error) {
      console.error('error when loading JSON: ' + error);
    });
});
  
