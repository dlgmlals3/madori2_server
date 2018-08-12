import os
import sys
import argparse 

import pymongo
from pymongo import MongoClient

# parameter
parser = argparse.ArgumentParser(description='dbCreate [dbName]')
parser.add_argument("-d", "--dbName", required=True)
parser.add_argument("-c", "--collectionName", required=True)
args = parser.parse_args()
dbName = args.dbName
collectionName = args.collectionName
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
collection.insert({"name": 'simon', "age" : 21})
collection.insert({"name": 'minwoohi', "age" : 31})
collection.insert({"name": 'mesi', "age" : 28})
collection.insert({"name": 'heculous', "age" : 29})

results = collection.find()
for result in results:
    print (result)

#os.system ('ls -al');
