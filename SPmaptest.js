
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

    // SEA LEVEL RISE FILTERS 

    // load source links
    var filter1ft = 'http://drive.google.com/uc?id=1988f8CgwMF8YnWJHEp1SLd5YzXkqhivH';
    var filter2ft = 'http://drive.google.com/uc?id=15ZTYieM2S9kvEsHav0GcJrbasVLaU7yz'; 
    var filter3ft = 'http://drive.google.com/uc?id=1G5vg6_dlDdYys4EDu1G9rxtdgy2nZ58N'; 
    var filter4ft = 'http://drive.google.com/uc?id=1bZm3CpX3E-9VlyyM1VL_tb_-rZx1i4uy'; 
    var filter5ft = 'http://drive.google.com/uc?id=1oLOx4aAU06_u221cAv-NbIKhNYg7cjdN'; 


    // create KML overlays for each sea level 
    var kmlLayer1ft = new google.maps.KmlLayer(filter1ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });

    // hide the layer 
    kmlLayer1ft.setMap(null);

    // 2ft
    var kmlLayer2ft = new google.maps.KmlLayer(filter2ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });
    kmlLayer2ft.setMap(null);

    // 3ft
    var kmlLayer3ft = new google.maps.KmlLayer(filter3ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });
    kmlLayer3ft.setMap(null);

    //4ft
    var kmlLayer4ft = new google.maps.KmlLayer(filter4ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });
    kmlLayer4ft.setMap(null);

    // 5ft
    var kmlLayer5ft = new google.maps.KmlLayer(filter5ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });
    kmlLayer5ft.setMap(null);

    // get the slider and output fields in the HTML document
    var slider = document.getElementById("sliderRange"); 
    var yearOutput = document.getElementById("year"); 
    var riseOutput = document.getElementById('rise'); 
    yearOutput.innerHTML = slider.value; 
     

    // add a DOM listener to check slider
    google.maps.event.addDomListener(slider, "change", function() {

        // output the year and starting sea level rise 
        currentYear = slider.value; 
        yearOutput.innerHTML = currentYear; 
        riseOutput.innerHTML = "0 Ft"; 

        console.log(currentYear)

        if(currentYear < 2060){
            kmlLayer1ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer5ft.setMap(null);

            // display seal level rise 
            riseOutput.innerHTML = "0 Ft"; 
        }

        // if between year 2060 and 2090
        else if(currentYear >= 2060 && currentYear < 2090){
            // show the current layer (1ft)
            kmlLayer1ft.setMap(map);

            // hide all other layers 
            kmlLayer2ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer5ft.setMap(null);

            // display seal level rise 
            riseOutput.innerHTML = "1 Ft"; 
        
        // if between 2090 and 2120
        } else if(currentYear >= 2090 && currentYear < 2120){
            // show the current layer (2ft)
            kmlLayer2ft.setMap(map);

            // hide all other layers 
            kmlLayer1ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer5ft.setMap(null);

            // display seal level rise 
            riseOutput.innerHTML = "2 Ft"; 

        // if between 2120 and 2140 
        }else if(currentYear >= 2120 && currentYear < 2140){
            // show the current layer (3ft)
            kmlLayer3ft.setMap(map);

            // hide all other layers 
            kmlLayer1ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer5ft.setMap(null);

            // display seal level rise 
            riseOutput.innerHTML = "3 Ft"; 

        // if between 2140 and 2170 
        }else if(currentYear >= 2140 && currentYear < 2170){
            // show the current layer (4ft)
            kmlLayer4ft.setMap(map);

            // hide all other layers 
            kmlLayer1ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer5ft.setMap(null);

            // display seal level rise 
            riseOutput.innerHTML = "4 Ft"; 
        

        // if > 2170 
        }else if(currentYear >=2170){
            // show the current layer (5ft)
            kmlLayer5ft.setMap(map);

            // hide all other layers 
            kmlLayer1ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer4ft.setMap(null);

            // display seal level rise 
            riseOutput.innerHTML = "5 Ft"; 
        }

    });
}

initMap();