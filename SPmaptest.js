
const firebaseConfig = {
    apiKey: "AIzaSyD6pyQSvV0Hubn0cAru0SmqzOgowbYgI6I",
    authDomain: "forecasterator-project.firebaseapp.com",
    projectId: "forecasterator-project",
    storageBucket: "forecasterator-project.appspot.com",
    messagingSenderId: "44874632175",
    appId: "1:44874632175:web:28ac7bc441a9c89a33041a",
    measurementId: "G-WGHEB3C8SM"
};
// jaxson lyles forecasterator
// defining and initializing google firebase and firestore
firebase.initializeApp({
    apiKey: "AIzaSyD6pyQSvV0Hubn0cAru0SmqzOgowbYgI6I",
    authDomain: "forecasterator-project.firebaseapp.com",
    projectId: "forecasterator-project",
});

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
        zoom: 14,
        center: new google.maps.LatLng(32.791430,-79.944280),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    let filter = new google.maps.KmlLayer("filters/1ft-2060.kmz", {
        suppressInfoWindows: true,
        preserveViewport: false,
        map: map
      });

    // let filter = new google.maps.KmlLayer("filters/1ft-2060.kmz");
    // filter.setMap(map);


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