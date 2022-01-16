let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 45.5017, lng: -73.5673 },
        zoom: 5
    });
};

// Fetch stores from API
async function getStores() {
    const res = await fetch('/complaints');
    const data = await res.json();

    const complaints = data.data.map(complaint => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [complaint.location.coordinates[0], complaint.location.coordinates[1]]
            },
            properties: {
                caseID: complaint.caseID,
                caseTitle: complaint.caseTitle,
                icon: 'shop'
            }
        };
    });

    const showPoints = function (results) {

        for (let i = 0; i < results.length; i++) {
            const coords = results[i].geometry.coordinates;
            const latLng = new google.maps.LatLng(coords[1], coords[0]);
        
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });

            const contentString = 
                `<p><b>CaseID</b></p>` +
                `<p>${results[i].properties.caseID}</p>` +
                `<p><b>Case Title</b></p>` +
                `<p>${results[i].properties.caseTitle}</p>`

            const infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener("click", () => {
                infowindow.open({
                  anchor: marker,
                  map,
                  shouldFocus: false,
                });
            });
        };
    };

    showPoints(complaints)
};

getStores();