
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://yassinekassem33:nEEPC8ufD4sWqc4X@penaltymanagement.zv2op.mongodb.net/?retryWrites=true&w=majority&appName=penaltyManagement"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db= client.penalty

collection =db["penalty_data"]