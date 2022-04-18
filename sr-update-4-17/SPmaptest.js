
const firebaseConfig = {
    apiKey: "AIzaSyD6pyQSvV0Hubn0cAru0SmqzOgowbYgI6I",
    authDomain: "forecasterator-project.firebaseapp.com",
    projectId: "forecasterator-project",
    storageBucket: "forecasterator-project.appspot.com",
    messagingSenderId: "44874632175",
    appId: "1:44874632175:web:28ac7bc441a9c89a33041a",
    measurementId: "G-WGHEB3C8SM"
};
// jaxson lyles - sammi ramsden forecasterator
// defining and initializing google firebase and firestore
firebase.initializeApp({
    apiKey: "AIzaSyD6pyQSvV0Hubn0cAru0SmqzOgowbYgI6I",
    authDomain: "forecasterator-project.firebaseapp.com",
    projectId: "forecasterator-project",
});

const db = firebase.firestore();
let firstLoad = true;
let activeNeighbor = false;

// let there be a map
let map;

let neighborhoodIDArray = []


var activeOutput = document.getElementById("activeLocations"); 
var inactiveOutput = document.getElementById("inactiveLocations"); 


// async function to create items then signal its done for the map to load
async function createItems() {
    let count = 1;
    let finalTest = [[]];
    let item;
    
    // the actual collecting of the data from collection "data1"
    // for each document collect the lat/long and title and
    // assign a count number, this is just for the function
    // to properly be able to display the query one by one

    //await db.collection("data1").document(neighborhoodIDArray[variable]).collection("houses").get()

    const querySnapshot = await db.collection("data1").get()

    querySnapshot.forEach((doc) => {
        neighborhoodIDArray.push(doc.data().id)
        item = [String(doc.data().title), Number(doc.data().latitude), Number(doc.data().longitude), Number(doc.data().price), count]
        finalTest.push(item)
        count++;
    });
    // shift removes the first item in an array (opposite of pop)
    finalTest.shift()
    console.log(finalTest)
    return finalTest
}

async function showHouses(nayborhoodID) {
    let count1 = 1;
    let finalTest1 = [[]];
    let item1;
    console.log(nayborhoodID)
    const querySnapshot1 = await db.collection("data1").doc(String(neighborhoodIDArray[nayborhoodID])).collection("houses").get()
    
    querySnapshot1.forEach((doc) => {
        neighborhoodIDArray.push(doc.data().id)
        item1 = [String(doc.data().address), Number(doc.data().latitude), Number(doc.data().longitude), Number(doc.data().listPrice), count1]
        finalTest1.push(item1)
        count1++;
    });

    finalTest1.shift()
    console.log(finalTest1)
    return finalTest1
}

async function initMap(addrID) {
    let locationsList = []
    // location list basically IS the previous function (after its done, aka await)
    console.log(firstLoad, "FIRST")
    console.log(activeNeighbor, "NAY")
    if (firstLoad == true) {
        locationsList = await createItems();
    }
    if (activeNeighbor == true) {
        locationsList = await showHouses(addrID);
    }
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
    // in the locationList we enter two things, the lat long for the markers
    // (so that we can have them marked on the actual map) and the title which we 
    // use for the name of the marker when you click it and it displays the popup
    activeOutput.innerHTML = locationsList.length;

    for (i = 0; i < locationsList.length; i++) {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationsList[i][1], locationsList[i][2]),
            map: map,
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function() {
                if (activeNeighbor == false) {
                    infowindow.setContent(locationsList[i][0] + `<br />` + `<br />` + `Average Price in Neighborhood: ` + locationsList[i][3] +
                    `<br />` + `<br />` + `<button onclick="nayToAdd(${i})">Show Addresses In Neighborhood</button>`)
                    
                } else {
                    infowindow.setContent(locationsList[i][0] + `<br />` + `<br />` + `Property Price: ` + locationsList[i][3] +
                    `<br />` + `<br />` + `<button onclick="addToNay()">Back To All Neighborhoods</button>`)
                }
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    // SEA LEVEL RISE FILTERS 

    // load source links
    var filter0ft    = 'http://drive.google.com/uc?id=1JG29Ec-3byG-lR3Png3sV-MuBUE1jzBo'; 
    var filter_25ft  = 'http://drive.google.com/uc?id=1Vf7lEvVse3a4YuAtpapX4wVBciZLIzG5';
    var filter_5ft   = 'http://drive.google.com/uc?id=1T0fvxuuecY9e7BKWQYPF3gvOTJ192G8Y'; 
    var filter_75ft  = 'http://drive.google.com/uc?id=1XaZUuoRx6ZEDKJjt6xG6MjGokVBMjy2y';
    var filter1ft    = 'http://drive.google.com/uc?id=1vUValgWXtL4W3Ww94gjmMIza51JzEfeh';
    var filter1_25ft = 'http://drive.google.com/uc?id=1NYteqb5kNmx9Y82SeX_e34Y3JxU9Uqc4';
    var filter1_5ft  = 'http://drive.google.com/uc?id=1PxXqIWquANje49J6cUdtQI_tB5uJVJK6'; 
    var filter1_75ft = 'http://drive.google.com/uc?id=1dYbRxfIiKR9ntLb-YNFlFj-e0W9Y8T37';
    var filter2ft    = 'http://drive.google.com/uc?id=164FszKCFM4kHsKK4MDjdC3MZyeniVl02'; 
    var filter2_25ft = 'http://drive.google.com/uc?id=1iyixfFmAKWTTd_TI19pht97t0AEAuTW2';
    var filter2_5ft  = 'http://drive.google.com/uc?id=1sw_08QZcLzCVbZ8VhL-vpM2jh7Dc7nVr'; 
    var filter2_75ft = 'http://drive.google.com/uc?id=1D4yiHMtgb_99pPG0y9khHJuVhn1JIVoL';
    var filter3ft    = 'http://drive.google.com/uc?id=1apKOcl7z2aywT6h7vJpAsK0qwuBkJnr0'; 
    var filter3_25ft = 'http://drive.google.com/uc?id=19nspM9wH71A8sdnfu93Ir8d_19-NazMe';
    var filter3_5ft  = 'http://drive.google.com/uc?id=13krSRA8IZSU5ei8KgRY4UdQiTRsV84lP'; 
    var filter3_75ft = 'http://drive.google.com/uc?id=1Kqhcc89Ny7uvnc8SqxYqe9NMTRRwtjlx';
    var filter4ft    = 'http://drive.google.com/uc?id=1jZuLak4Lyw8_OjNlt6De0hsQ45IX1fr2'; 
    var filter4_25ft = 'http://drive.google.com/uc?id=1KUTceZl2Lmz6hDQQ8pTlhlZnZSiV_ULn';
    var filter4_5ft  = 'http://drive.google.com/uc?id=1nSjakRDgGcE2Mb5Y6nuK_R0OleFdvNrX'; 
    var filter4_75ft = 'http://drive.google.com/uc?id=1Bkqooz7je9FXk9hlc1zGpLHhKa9yYbLC';
    var filter5ft    = 'http://drive.google.com/uc?id=13m7AFNcOw4rP9sH3brVow3ZJligjvHbW'; 


    // create KML overlays for each sea level 

    
    var kmlLayer0ft = new google.maps.KmlLayer(filter0ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });

    var kmlLayer_25ft = new google.maps.KmlLayer(filter_25ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer_5ft = new google.maps.KmlLayer(filter_5ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer_75ft = new google.maps.KmlLayer(filter_75ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });


    // 1 ft
    var kmlLayer1ft = new google.maps.KmlLayer(filter1ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer1_25ft = new google.maps.KmlLayer(filter1_25ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer1_5ft = new google.maps.KmlLayer(filter1_5ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer1_75ft = new google.maps.KmlLayer(filter1_75ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });


    // 2ft
    var kmlLayer2ft = new google.maps.KmlLayer(filter2ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer2_25ft = new google.maps.KmlLayer(filter2_25ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer2_5ft = new google.maps.KmlLayer(filter2_5ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer2_75ft = new google.maps.KmlLayer(filter2_75ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    // 3ft
    var kmlLayer3ft = new google.maps.KmlLayer(filter3ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer3_25ft = new google.maps.KmlLayer(filter3_25ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer3_5ft = new google.maps.KmlLayer(filter3_5ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer3_75ft = new google.maps.KmlLayer(filter3_75ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    //4ft
    var kmlLayer4ft = new google.maps.KmlLayer(filter4ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer4_25ft = new google.maps.KmlLayer(filter4_25ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer4_5ft = new google.maps.KmlLayer(filter4_5ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    var kmlLayer4_75ft = new google.maps.KmlLayer(filter4_75ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    // 5ft
    var kmlLayer5ft = new google.maps.KmlLayer(filter5ft, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: null
    });

    // get the slider and output fields in the HTML document
    var slider = document.getElementById("sliderRange"); 
    var yearOutput = document.getElementById("year"); 
    var riseOutput = document.getElementById('rise'); 
    yearOutput.innerHTML = slider.value; 
     

    // add a DOM listener to check slider year value
    google.maps.event.addDomListener(slider, "input", function() {

        // output the year and starting sea level rise 
        currentYear = slider.value; 
        yearOutput.innerHTML = currentYear; 
        riseOutput.innerHTML = "0 Ft"; 

        // console.log(currentYear)


        // 0 ft
        if(currentYear < 2060){

            // hide all other layers
            kmlLayer_5ft.setMap(null);
            kmlLayer_25ft.setMap(null);
            kmlLayer_75ft.setMap(null);
            kmlLayer1ft.setMap(null);
            kmlLayer1_25ft.setMap(null);
            kmlLayer1_5ft.setMap(null);
            kmlLayer1_75ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer2_25ft.setMap(null);
            kmlLayer2_5ft.setMap(null);
            kmlLayer2_75ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer3_25ft.setMap(null);
            kmlLayer3_5ft.setMap(null);
            kmlLayer3_75ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer4_25ft.setMap(null);
            kmlLayer4_5ft.setMap(null);
            kmlLayer4_75ft.setMap(null);
            kmlLayer5ft.setMap(null);

            // display seal level rise 
            riseOutput.innerHTML = "0 ft"; 


            // .25ft
            if(currentYear >= 2045 && currentYear < 2050){
                kmlLayer_25ft.setMap(map); 
                riseOutput.innerHTML = ".25 ft"; 
            }
            //.5ft
            else if(currentYear >= 2050 && currentYear < 2054){
                kmlLayer_5ft.setMap(map);
                riseOutput.innerHTML = ".5 ft"; 
            //.75ft
            }else if(currentYear >= 2054 && currentYear < 2060){
                kmlLayer_75ft.setMap(map)
                riseOutput.innerHTML = ".75 ft"; 
            }
        } 

        // 1 ft
        else if(currentYear >= 2060 && currentYear < 2090){
            kmlLayer1ft.setMap(map);

            kmlLayer_25ft.setMap(null);
            kmlLayer_5ft.setMap(null);
            kmlLayer_75ft.setMap(null);
            kmlLayer1_25ft.setMap(null);
            kmlLayer1_5ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer2_25ft.setMap(null);
            kmlLayer2_5ft.setMap(null);
            kmlLayer2_75ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer3_25ft.setMap(null);
            kmlLayer3_5ft.setMap(null);
            kmlLayer3_75ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer4_25ft.setMap(null);
            kmlLayer4_5ft.setMap(null);
            kmlLayer4_75ft.setMap(null);
            kmlLayer5ft.setMap(null);

            riseOutput.innerHTML = "1 ft"; 

            if(currentYear >= 2075 && currentYear < 2079){
                kmlLayer1_25ft.setMap(map); 
                riseOutput.innerHTML = "1.25 ft"; 
            }else if(currentYear >= 2079 && currentYear < 2083){
                kmlLayer1_5ft.setMap(map);
                riseOutput.innerHTML = "1.5 ft"; 
            }else if(currentYear >= 2083 && currentYear < 2090){
                kmlLayer1_75ft.setMap(map);
                riseOutput.innerHTML = "1.75 ft"; 
            }
        }

        // 2ft 
        else if(currentYear >= 2090 && currentYear < 2120){
            kmlLayer2ft.setMap(map);

            kmlLayer_25ft.setMap(null);
            kmlLayer_5ft.setMap(null);
            kmlLayer_75ft.setMap(null);
            kmlLayer1ft.setMap(null);
            kmlLayer1_25ft.setMap(null);
            kmlLayer1_5ft.setMap(null);
            kmlLayer1_75ft.setMap(null);
            kmlLayer2_25ft.setMap(null);
            kmlLayer2_5ft.setMap(null);
            kmlLayer2_75ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer3_25ft.setMap(null);
            kmlLayer3_5ft.setMap(null);
            kmlLayer3_75ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer4_25ft.setMap(null);
            kmlLayer4_5ft.setMap(null);
            kmlLayer4_75ft.setMap(null);
            kmlLayer5ft.setMap(null);

            riseOutput.innerHTML = "2 ft"; 

            if(currentYear >= 2100 && currentYear < 2110){
                kmlLayer2_25ft.setMap(map); 
                riseOutput.innerHTML = "2.25 ft"; 
            }else if(currentYear >= 2110 && currentYear < 2115){
                kmlLayer2_5ft.setMap(map);
                riseOutput.innerHTML = "2.5 ft"; 
            }else if(currentYear >= 2115 && currentYear < 2120){
                kmlLayer2_75ft.setMap(map);
                riseOutput.innerHTML = "2.75 ft"; 
            }


        //3 ft 
        }else if(currentYear >= 2120 && currentYear < 2140){
            kmlLayer3ft.setMap(map);

            kmlLayer_25ft.setMap(null);
            kmlLayer_5ft.setMap(null);
            kmlLayer_75ft.setMap(null);
            kmlLayer1ft.setMap(null);
            kmlLayer1_25ft.setMap(null);
            kmlLayer1_5ft.setMap(null);
            kmlLayer1_75ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer2_25ft.setMap(null);
            kmlLayer2_5ft.setMap(null);
            kmlLayer2_75ft.setMap(null);
            kmlLayer3_25ft.setMap(null);
            kmlLayer3_5ft.setMap(null);
            kmlLayer3_75ft.setMap(null);
            kmlLayer4ft.setMap(null);
            kmlLayer4_25ft.setMap(null);
            kmlLayer4_5ft.setMap(null);
            kmlLayer4_75ft.setMap(null);
            kmlLayer5ft.setMap(null);

            riseOutput.innerHTML = "3 ft"; 

            if(currentYear >= 2126 && currentYear < 2130){
                kmlLayer3_25ft.setMap(map); 
                riseOutput.innerHTML = "3.25 ft"; 
            }else if(currentYear >= 2130 && currentYear < 2135){
                kmlLayer3_5ft.setMap(map);
                riseOutput.innerHTML = "3.5 ft"; 
            }else if(currentYear >= 2135 && currentYear < 2140){
                kmlLayer3_75ft.setMap(map);
                riseOutput.innerHTML = "3.75 ft"; 
            }      

        //4ft 
        }else if(currentYear >= 2140 && currentYear < 2170){
            kmlLayer4ft.setMap(map);

            kmlLayer_25ft.setMap(null);
            kmlLayer_5ft.setMap(null);
            kmlLayer_75ft.setMap(null);
            kmlLayer1ft.setMap(null);
            kmlLayer1_25ft.setMap(null);
            kmlLayer1_5ft.setMap(null);
            kmlLayer1_75ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer2_25ft.setMap(null);
            kmlLayer2_5ft.setMap(null);
            kmlLayer2_75ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer3_25ft.setMap(null);
            kmlLayer3_5ft.setMap(null);
            kmlLayer3_75ft.setMap(null);
            kmlLayer4_25ft.setMap(null);
            kmlLayer4_5ft.setMap(null);
            kmlLayer4_75ft.setMap(null);
            kmlLayer5ft.setMap(null);

            riseOutput.innerHTML = "4 ft";
            
            if(currentYear >= 2145 && currentYear < 2153){
                kmlLayer4_25ft.setMap(map); 
                riseOutput.innerHTML = "4.25 ft"; 
            }else if(currentYear >= 2153 && currentYear<2163){
                kmlLayer4_5ft.setMap(map);
                riseOutput.innerHTML = "4.5 ft";
            }else if(currentYear >= 2163 && currentYear <2170){
                kmlLayer4_75ft.setMap(map);
                riseOutput.innerHTML = "4.75 ft";
            }
        
        }

        //5ft 
        else if(currentYear >=2170){
            kmlLayer5ft.setMap(map);

            kmlLayer_5ft.setMap(null);
            kmlLayer1ft.setMap(null);
            kmlLayer1_5ft.setMap(null);
            kmlLayer2ft.setMap(null);
            kmlLayer2_5ft.setMap(null);
            kmlLayer3ft.setMap(null);
            kmlLayer3_5ft.setMap(null);
            kmlLayer4ft.setMap(null);

            riseOutput.innerHTML = "5 ft"; 
        }

    });

    firstLoad = false;
}

// neighborhood to address
function nayToAdd(addrID){
    activeNeighbor = true;
    initMap(addrID);
}

function addToNay(){
    firstLoad = true;
    activeNeighbor = false;
    initMap();
}

/* old 
document.getElementById("resetBTN").addEventListener('click', function (){
    addToNay();
});
*/