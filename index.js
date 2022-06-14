function initMap() {
    let map;
    let options = {
        center: {
            lat: 40.6331,
            lng: -89.3985
        },
        zoom: 11
    }

    const MapOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        options.center.lat = crd.latitude;
        console.log(`Longitude: ${crd.longitude}`);
        options.center.lng = crd.longitude;
        console.log(`More or less ${crd.accuracy} meters.`);
        map = new google.maps.Map(document.getElementById("map"), options);
        const marker = new google.maps.Marker({
            position: {
                lat: options.center.lat,
                lng: options.center.lng
            },
            map: map,
        });
    }

    function error(err) {
        console.log("Displaying Default Location")
        console.warn(`ERROR(${err.code}): ${err.message}`);
        map = new google.maps.Map(document.getElementById("map"), options);
        const marker = new google.maps.Marker({
            position: {
                lat: options.center.lat,
                lng: options.center.lng
            },
            map: map,
        });
    }

    navigator.geolocation.getCurrentPosition(success, error, MapOptions);

    // const defaultBounds = {
    //     north: center.lat + 0.1,
    //     south: center.lat - 0.1,
    //     east: center.lng + 0.1,
    //     west: center.lng - 0.1,
    // };

    const options_2 = {
        // bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["geometry", "icon", "name"],
        strictBounds: false,
        types: ["establishment"]
    };

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById("input1"), options_2);

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map,
        });
    })

}