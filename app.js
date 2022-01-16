window.addEventListener('load', ()=> {
    let long
    let lat
    let iconTemperature = document.querySelector('.icon-temperature')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.degree-section')
    const temperatureSpan = document.querySelector('.degree-section span')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const api = `https://api.weatherapi.com/v1/current.json?key=b144a5c66926478dbe0214822221601&q=${lat},${long}`

            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const {temp_c, temp_f} = data.current
                    const {icon} = data.current.condition
                    const {country, name, region} = data.location

                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temp_c
                    locationTimezone.textContent = `${country} / ${name}, ${region}`
                    iconTemperature.src = icon

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', ()=> {
                        if (temperatureSpan.textContent === "C") {
                            temperatureDegree.textContent = temp_f
                            temperatureSpan.textContent = "F"
                        }else {
                            temperatureDegree.textContent = temp_c
                            temperatureSpan.textContent = "C"
                        }
                    })
                })
        })
    }
})