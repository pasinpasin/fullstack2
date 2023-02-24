from pymongo import MongoClient


@staticmethod
def get_db_handle():
    client = MongoClient(host='mongodb+srv://unishk:unishk123@cluster0.wkawcd9.mongodb.net/?retryWrites=true&w=majority' )
    db_handle = client["test2"]
    return db_handle, client


def get_collection_handle(db_handle, collection_name):
    return db_handle[collection_name]