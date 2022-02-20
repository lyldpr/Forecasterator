from operator import itemgetter
import firebase_admin
from google.cloud import firestore
from firebase_admin import firestore
import os

# jaxson lyles forecasterator
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\Pablo\Desktop\FORECAST\serviceAccountKey.json"

defaultapp = firebase_admin.initialize_app()

db = firestore.Client(project='forecasterator-project')
collection = db.collection('test')

users_ref = db.collection(u'test')
docs = users_ref.stream()

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
#  the individual key/vals and matrix values to iterate thru the list x/y
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
for item in listOfValues:
    doc_ref = db.collection(u'data1').document(item[0])
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
