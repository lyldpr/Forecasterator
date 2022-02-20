

const db = firebase.firestore();

// let there be a map
let map;

// async function to create items then signal its done for the map to load
async function createItems() {
    let count = 1;
    let finalTest = [[]];
    let item;
    
    // the actual collecting of the data from collection "data1"
    // for each document collect the lat/long and title and
    // assign a count number, this is just for the function
    // to properly be able to display the query one by one
    const querySnapshot = await db.collection("data1").get()
    querySnapshot.forEach((doc) => {
        item = [String(doc.data().title), Number(doc.data().latitude), Number(doc.data().longitude), count]
        finalTest.push(item)
        count++;
    });
    // shift removes the first item in an array (opposite of pop JL)
    finalTest.shift()
    return finalTest
}

async function initMap() {
    
    // location list basically IS the previous function (after its done, aka await)
    let locationsList = await createItems();
    // the map default function centers the map over these coords (aka charleston)
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(32.780925,-79.935150),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // setting up for the markers
    let infowindow = new google.maps.InfoWindow();
    var marker, i;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
    });  

    // each item in locationList has title, lat, long, and count. for every item
    // in the locationList we enter two things, the lat long for the markers JL
    // (so that we can have them marked on the actual map) and the title which we 
    // use for the name of the marker when you click it and it displays the popup
    for (i = 0; i < locationsList.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationsList[i][1], locationsList[i][2]),
            map: map,
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function() {
                infowindow.setContent(locationsList[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
initMap();