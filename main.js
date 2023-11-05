document.addEventListener("DOMContentLoaded", function () {
  let upcomingTable = document.getElementById("upcoming").getElementsByTagName("tbody")[0];
  let pastTable = document.getElementById("past").getElementsByTagName("tbody")[0];
  let upcomingHeader = document.querySelector('h2');

  function displayEventsInTables(events) {
    const currentDate = new Date();
    let upcomingEventsExist = false;

    for (const event of events) {
      const eventDate = new Date(event.date + ' ');

      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      const locationCell = document.createElement('td');

      dateCell.innerHTML = event.date;
      locationCell.innerHTML = event.location;

      if (eventDate < currentDate) {
        pastTable.appendChild(row);
      } else {
        upcomingEventsExist = true;
        upcomingTable.appendChild(row);
      }

      row.appendChild(dateCell);
      row.appendChild(locationCell);
    }

    if (!upcomingEventsExist) {
      const comingSoon = upcomingHeader.appendChild(document.createElement('p'));
      comingSoon.innerText = "tba ...";
      comingSoon.style.textAlign = "center";
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
