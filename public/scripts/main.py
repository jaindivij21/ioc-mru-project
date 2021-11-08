# * Main python scripts file

# REQUIREMENTS
from flask import Flask
from bson.json_util import dumps
from flask_pymongo import PyMongo
from datetime import datetime
from dotenv import load_dotenv
from pandas import pandas

load_dotenv()

# APP CONST
app = Flask(__name__)

# SETUP DATABASE
app.config['MONGO_URI'] = f"mongodb://localhost:27017/mruDB"

mongo = PyMongo(app)


# get mehtod for the root path
@app.route('/', methods=['GET'])
def index():

    # dataframe with only the columns I want
    df = pandas.read_csv('../assets/main.txt', delimiter="\t")
    df.rename(columns={'Unnamed: 0': 'Time'}, inplace=True)
    df = df[[
        'Time', 'FIC01 PV', 'FIC02 PV', 'FIC03 PV', 'WI01 PV', 'WI02 PV',
        'PI13 PV', 'PI14 PV', 'PI15 PV', 'PIC17 PV', 'PI19 PV', 'LIC01 PV',
        'LIC02 PV', 'TT07 PV', 'TT08 PV', 'TT09 PV', 'TT16 PV', 'TT17 PV',
        'TT18 PV', 'TT25 PV', 'TT26 PV', 'TT27 PV', 'CH01 PV'
    ]]

    for i in df.index:
        date_str = f"{df.at[i, 'Time']}/{datetime.today().year}"
        df.at[i, 'Time'] = datetime.strptime(date_str, '%H:%M:%S %m/%d/%Y')
        # We need to sample the data hourly
        df.at[i, 'Hour'] = df.at[i, 'Time'].hour
        df.at[i, 'Time'] = df.at[i, 'Time'].strftime("%H:%M:%S %m/%d/%Y")

    df = df.drop_duplicates(subset='Hour', keep='first')
    df.drop(['Hour'], axis='columns', inplace=True)
    df.reset_index(drop=True, inplace=True)

    mongo.db.server.delete_many({})

    data = df.to_dict(orient='records')

    # Use Py-Mongo to store the data into the MongoDB Database
    mongo.db.server.insert_many(data)

    # retrive the data back from the database
    mru = mongo.db.server.find()
    print(mru)
    resp = dumps(mru)
    print("Data Sent Back Successfully!")
    return resp


# port to run the server on
if __name__ == "__main__":
    app.run(port=5000, debug=True)
