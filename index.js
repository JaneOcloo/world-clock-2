function updateTime() {
  const cities = document.querySelectorAll(".city");
  cities.forEach((city) => {
    const cityTimeZone = city.getAttribute("data-timezone");
    const cityDateElement = city.querySelector(".city-date");
    const cityTimeElement = city.querySelector(".time");

    const cityTime = moment().tz(cityTimeZone);
    cityDateElement.innerHTML = cityTime.format("MMMM D, YYYY");
    cityTimeElement.innerHTML = cityTime.format("HH:mm:ss");
  });
}

// Updates time every second
setInterval(updateTime, 1000);

function addCity(event) {
  const cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  const cityName = cityTimeZone.split("/")[1].replace("_", " ");
  const citiesElement = document.querySelector("#cities");

  // Check if city already exists
  if (document.querySelector(`[data-timezone='${cityTimeZone}']`)) return;

  // Create new city card
  const cityDiv = document.createElement("div");
  cityDiv.classList.add("city");
  cityDiv.setAttribute("data-timezone", cityTimeZone);

  cityDiv.innerHTML = `
        <h2>${cityName} 🏙️</h2>
        <div class="city-date"></div>
        <div class="time"></div>
        <button class="delete-btn">❌</button>
    `;

  // Add delete functionality
  cityDiv.querySelector(".delete-btn").addEventListener("click", () => {
    cityDiv.remove();
  });

  citiesElement.appendChild(cityDiv);
  updateTime();
}

document.querySelector("#city-selector").addEventListener("change", addCity);
