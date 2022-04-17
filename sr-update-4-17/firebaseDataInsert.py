import firebase_admin
from firebase_admin import firestore
import os

# jaxson lyles forecasterator
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\Pablo\Desktop\FORECAST\serviceAccountKey.json"

defaultapp = firebase_admin.initialize_app()

db = firestore.Client(project='forecasterator-project')
#collection = db.collection('test')

#users_ref = db.collection(u'test')
#docs = users_ref.stream()

dataChange = []

# this opens the dataset from the txt and starts to
# read line by line, appending it to a giant unsorted list
with open("convertedTrial.txt", "r") as scan:
    docLines = scan.readlines()
    for line in docLines:
        splitLines = line.split(",")
        dataChange.append(splitLines)

# this is the data stream, this contains all the values on a line
# by line basis. each value containing an ID, name, city, 
# county, lat/long, price, etc. 
dataSet = []
for line in dataChange:
    dataSet.append(line)

# this is what creates the array, taking each line from the
# file, separating it by commas, and then inserting that 
# specific list into an even bigger list
itemList = []
for line in range(len(dataSet)):
    #skip the first line jaxson
    if line == 0:
        continue
    lineString = str(dataSet[line])
    # chars we dont want like [] ' " and \ removed
    removeChars = ''.join(char for char in lineString if char not in '[]\'\"\\')
    # split on the "," and appended to the list of the rest of split key/val pairs
    divideString = removeChars.split(",")
    itemList.append(divideString)

# create an empty list that are as long as the dataset list, lyles
# (the list with all of the key/vals). also create empty lists to fill
# the individual key/vals and matrix values to iterate thru the list x/y
listOfValues = [0] * (len(dataSet) - 1)
listOfKeys = [0] * (len(dataSet) - 1)
valueList = []
keyList = []
matrixX = 0
matrixY = 0

# each itemset in the list has individual items
# for each of these items, if there is only 1 item
# (the item isnt a key/val pair) we will ignore it
for itemSet in itemList:
    for item in itemSet:
        if ":" not in item:
            continue
        # we split the key val pairs based on ":" 
        # and append them to their own lists.
        keyVal = str(itemList[matrixX][matrixY]).split(":")
        key = keyVal[0]
        value = keyVal[1]
        valueList.append(value)
        keyList.append(key)
        matrixY += 1

    # we have to copy the lists then add them because if
    # we clear them before it removes them from the list
    # we try to add them to blah blah this part sucked and
    # we probably dont even need it, could need for later
    listOfValues[matrixX] = valueList.copy()
    listOfKeys[matrixX] = keyList.copy()
    valueList.clear()
    keyList.clear()
    matrixY = 0
    matrixX += 1

# this is the actual google firebase function, for every dataset
# we add specific items. i tried to do another approach of iterating
# through the list of keys and then just adding the other half, values
# this didnt seem to work the way i wanted it to, so i hardcoded the keys


'''

twelveCounter = 0
for item in listOfValues:
    
    doc_ref = db.collection(item[0]).document(u"e").collection(u"houses")

    fileW = open("addresses.txt", "w")
    with open("testing.txt", "r") as scan:
        method = scan.readlines()
        id = "id"
        count = 0
        lineNum = 0
        itemsBySixteen = [600]
        eachItem = []
        for i in method:
            eachItem.append(i)
            if lineNum % 16 == 0:
                something = eachItem.copy()
                itemsBySixteen.append(something)
                count += 1
                eachItem.clear()
            lineNum += 1

        #print(itemsBySixteen[2])
        for i in itemsBySixteen[count]:
            if "\"" not in i:
                continue
            if str(item[0]) in i:
                print(item[0])

    idvalue = "jl"
    doc_ref.set({
        u'potato': idvalue
    })
    twelveCounter += 1
    if twelveCounter == 12:
        twelveCounter = 0

'''

#------------------------------------------------------------------------------------------

countr = 2
finalTotalList = []
housesList = []
for item in listOfValues:
    #print("item", item[0])  # the problem is the text file, some of the lines are off
                            # this causes some of the IDS to be skipped
    #doc_ref = db.collection(u'data1').document(item[0]).collection(u"houses").document(u"test")
    
    fileW = open("addresses.txt", "w")
    with open("testing.txt", "r") as scan:
        method = scan.readlines()
        count = 0
        lineNum = 0
        hids = [200]
        ids = [200]
        eachItemHID = []
        eachItemID = []
        lineByLine = []
        for i in method:
            lineByLine.append(i)
            eachItemHID.append(i)
            eachItemID.append(i)
            
            if lineNum % 16 == 0:
                something = eachItemHID.copy()
                hids.append(something)
                count += 1
                eachItemHID.clear()
            
            lineNum += 1
        if item[0] == "786416":
            for i in range(lineNum):
                if i % 16 == 0:
                    housesList.append(lineByLine[i:i+16])
                    #print(lineByLine[i:i+16])
            
        #print(len(listOfKeys))
        # 2402 lines in the txt document
        # 35 neighborhoods
        # 151 addresses
        
        #print(housesList)
        #print(item[0])
        #print(ids[countr][0])
        #print(len(ids))

        # loop that basically goes thru the list of IDs in the neighborhoods and finds
        # matches that correspond to those in the neighborhood list

        # the problem is the text file, some of the lines are off
        # this causes some of the IDS to be skipped
        '''
        for i in range(len(listOfValues)):
            if i < 2:
                continue
            if item[0] in ids[i][0]:
                print(item[0])
                #print(hids[i][0])
                croppedHIDcomma = (hids[i][0]).split(",")
                croppedHID = croppedHIDcomma[0].split(":")
                print(croppedHID[1])
                #doc_ref = db.collection(u'data1').document(item[0]).collection(croppedHID[1]).document(u"test")
                #idvalue = "ok"
                #doc_ref.set({
                #    u'id': idvalue,
                #})
        '''

        commaValsNeigh = []
        newArr1 = []
        colonSplit = []
        neighborValues1 = []
        #print(housesList[0])
        
            #print(i)
            # TRYING TO CUT THE STRINGS BY COMMAS AND THEN INTO KEY/VALUE PAIRS
            # WORST CASE SCENARIO JUST GET THE VALUES

            #commaValsNeigh = i.split(",")
        #print(housesList[149])
        
        for addressIndex in range(len(housesList)):
            if addressIndex == 0:
                newArr1.append(item[0])
            if item[0] in housesList[addressIndex][5]:
                #newArr1[].append(housesList[address])
                #newArr1.append("blah")
                newArr1.append(housesList[addressIndex])
                #newArr1.append(housesList[i])
            #print("appended")
            #print("appeneded2")

        #print(newArr1)
        finalTotalList.append(newArr1)
            #for i in newArr1:
            #    if ":" in i:
            #       colonSplit = i.split(":")
            #    neighborValues1.append(colonSplit)
            
        #print(neighborValues1)
            #print(colonSplitjl)
            #neighKeys = commaValsNeigh[0]
            #neighVals = commaValsNeigh[1]
            #sortedList1.append(sort1)
            #print(neighKeys) # prints entire entry from line 0 - 16, what i need to put inside the document labeled after house ID
        
#print(finalTotalList[13][1][15])
#print(finalTotalList)


#------------------------------------------------------------------------------------------

neighborhoodCount = 0
for neighborhood in finalTotalList:
    addressCount = 0
    if len(neighborhood) == 1:
        print(neighborhood[0], "empty")
    else:
        for address in neighborhood:
            if neighborhood[0] == address:
                document1pos = finalTotalList[neighborhoodCount][0]
                #print(document1pos, "doc")
            else:
                #address
                addressList = address[1].split(",")
                addressSplit = addressList[0].split(":")
                address_keyQuote = addressSplit[0].split("\"")

                #lat-long
                latLongList = address[2].split(",")
                lat = latLongList[0]
                long = latLongList[1]
                latSplit = latLongList[0].split(":")
                longSplit = latLongList[1].split(":")
                lat_keyQuote = latSplit[0].split("\"")
                long_keyQuote = longSplit[0].split("\"")

                #neighborhood-ID
                neighborList = address[5].split(",")
                neighborSplit = neighborList[0].split(":")
                neighboraddIDkey = neighborSplit[0].split("\"")
                neighbor_keyQuote = neighboraddIDkey[1] + "Neighborhood"

                #separate-values
                area_address_city_state_price_beds_bath = address[6].split(",")

                #area-name
                areaNameList = area_address_city_state_price_beds_bath[0]
                areaNameSplit = areaNameList.split(":")
                areaName_keyQuote = areaNameSplit[0].split("\"")
                areaName_valueQuote = areaNameSplit[1].split("\"")

                #actual-address
                streetAddress = area_address_city_state_price_beds_bath[1]
                streetAddressSplit = streetAddress.split(":")
                streetAddress_keyQuote = streetAddressSplit[0].split("\"")
                streetAddress_valueQuote = streetAddressSplit[1].split("\"")

                #city
                cityVar = area_address_city_state_price_beds_bath[2]
                cityVarSplit = cityVar.split(":")
                cityVar_keyQuote = cityVarSplit[0].split("\"")
                cityVar_valueQuote = cityVarSplit[1].split("\"")

                #state
                stateVar = area_address_city_state_price_beds_bath[3]
                stateVarSplit = stateVar.split(":")
                stateVar_keyQuote = stateVarSplit[0].split("\"")
                stateVar_valueQuote = stateVarSplit[1].split("\"")

                #list-price
                listPriceList = area_address_city_state_price_beds_bath[4]
                listPriceSplit = listPriceList.split(":")
                listPrice_keyQuote = listPriceSplit[0].split("\"")
                listPrice_valueQuote = listPriceSplit[1].split("\"")
                
                #beds
                bedsList = area_address_city_state_price_beds_bath[5]
                bedsSplit = bedsList.split(":")
                beds_keyQuote = bedsSplit[0].split("\"")
                
                #baths
                bathsList = area_address_city_state_price_beds_bath[6]
                bathsSplit = bathsList.split(":")
                baths_keyQuote = bathsSplit[0].split("\"")

                #homeType
                homeTypeList = address[9].split(",")
                homeTypeSplit = homeTypeList[0].split(":")
                homeType_keyQuote = homeTypeSplit[0].split("\"")
                homeType_valueQuote = homeTypeSplit[1].split("\"")

                #separate-more-values
                status_listhub = address[10].split(",")

                #status
                statusList = status_listhub[0]
                statusSplit = statusList.split(":")
                status_keyQuote = statusSplit[0].split("\"")
                status_valueQuote = statusSplit[1].split("\"")

                #listHub
                listHubList = status_listhub[1]
                listHubSplit = listHubList.split(":")
                listHub_keyQuote = listHubSplit[0].split("\"")
                listHub_valueQuote = listHubSplit[1].split("\"")

                #mlsID
                mlsIDList = address[13].split(",")
                mlsIDSplit = mlsIDList[0].split(":")
                mlsID_keyQuote = mlsIDSplit[0].split("\"")
                mlsID_valueQuote = mlsIDSplit[1].split("\"")

                doc_ref = db.collection(u'data1').document(document1pos).collection(u"houses").document(addressSplit[1])
                # address
                addresskey = address_keyQuote[1]
                addressvalue = addressSplit[1]
                # lat-long
                latkey = lat_keyQuote[1]
                latvalue = latSplit[1]
                longkey = long_keyQuote[1]
                longvalue = longSplit[1]
                # neighborhood
                neighborkey = neighbor_keyQuote
                neighborvalue = neighborSplit[1]
                # areaName
                areaNamekey = areaName_keyQuote[1]
                areaNamevalue = areaName_valueQuote[1]
                # streetAddress
                streetAddresskey = streetAddress_keyQuote[1]
                streetAddressvalue = streetAddress_valueQuote[1]
                # city
                cityVarkey = cityVar_keyQuote[1]
                cityVarvalue = cityVar_valueQuote[1]
                # state
                stateVarkey = stateVar_keyQuote[1]
                stateVarvalue = stateVar_valueQuote[1]
                # price
                listPricekey = listPrice_keyQuote[1]
                listPricevalue = listPriceSplit[1]
                # beds
                bedskey = beds_keyQuote[1]
                bedsvalue = bedsSplit[1]
                # baths
                bathskey = baths_keyQuote[1]
                bathsvalue = bathsSplit[1]
                # homeType
                homeTypekey = homeType_keyQuote[1]
                homeTypevalue = homeType_valueQuote[1]
                # status
                statuskey = status_keyQuote[1]
                statusvalue = status_valueQuote[1]
                # listHub
                listHubkey = listHub_keyQuote[1]
                listHubvalue = listHub_valueQuote[1]
                # mlsID
                mlsIDkey = mlsID_keyQuote[1]
                mlsIDvalue = mlsID_valueQuote[1]


                doc_ref.set({
                    addresskey: addressvalue,
                    latkey: latvalue,
                    longkey: longvalue,
                    neighborkey: neighborvalue,
                    areaNamekey: areaNamevalue,
                    streetAddresskey: streetAddressvalue,
                    cityVarkey: cityVarvalue,
                    stateVarkey: cityVarvalue,
                    listPricekey: listPricevalue, #forgot???
                    bedskey: bedsvalue,
                    bathskey: bathsvalue,
                    homeTypekey: homeTypevalue,
                    statuskey: statusvalue,
                    listHubkey: listHubvalue,
                    mlsIDkey: mlsIDvalue,
                })
                #print(address[1], "addr-ID")
                #print(address[2], "lat-long")
                #print(address[5], "neigh-ID")
                #print(address[6], "name-address-city-state-listprice-bed-bath")
                #print(address[9], "hope-type")
                #print(address[10], "status-listhubkey")
                #print(address[13], "mls-ID")
                #print(address[14], "image-invest-rentometer-rental-roi-blah")
                
            addressCount += 1
        
        print(addressCount - 1)
        #else:
            #JL
            #break


    neighborhoodCount += 1

            #doc_ref = db.collection(u'data1').document(document1pos).collection(u"houses").document()

    
    
'''

idvalue = item[0]
titlevalue = item[1]
cityvalue = item[2]
statevalue = item[3]
countyvalue = item[4]
latvalue = item[5]
longvalue = item[6]
ratingvalue = item[7]
walkvalue = item[8]
listvalue = item[9]
mashMvalue = item[10]
mashSvalue = item[11]
pricevalue = item[12]
doc_ref.set({
    u'id': idvalue,
    u'title': titlevalue,
    u'city': cityvalue,
    u'state': statevalue,
    u'county': countyvalue,
    u'latitude': latvalue,
    u'longitude': longvalue,
    u'rating': ratingvalue,
    u'walkscore': walkvalue,
    u'listings': listvalue,
    u'mashMeter': mashMvalue,
    u'mashStars': mashSvalue,
    u'price': pricevalue,
})
'''
