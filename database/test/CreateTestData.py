import os
import sys
import argparse 
import json
import pymongo
from pymongo import MongoClient

# parameter
parser = argparse.ArgumentParser(description='dbCreate [dbName]')
parser.add_argument("-d", "--dbName", required=True)
parser.add_argument("-c", "--collectionName", required=True)
parser.add_argument("-j", "--srcJson", required=True)

args = parser.parse_args()
dbName = args.dbName
collectionName = args.collectionName
jsonFile = args.srcJson

print ('dbName : ' + dbName + 'collectionName' + collectionName + '\n');
# db connect
client = MongoClient('127.0.0.1', 27017)

# db select
db = client.get_database(dbName)
collection = db.get_collection(collectionName)

# collection delete
collection.remove()
db.collection.drop()

# db insert Data
#collection.insert({"title": 'green night', "ageMin" : 20, "ageMax" : 32, "regDate" : "2018/03/03", "location" : "hong dae green", "gender" : "Male", "price" : 30000, "openUrl" : "www.ej.com", "intro" : "come come", "maxMemberNum" : "5", "registDate" : "2018/03/03"});
page = open(jsonFile, "r")
parsed = json.loads(page.read())

for item in parsed:
    collection.insert(item)

results = collection.find()
for result in results:
    print (result)

#os.system ('ls -al');
