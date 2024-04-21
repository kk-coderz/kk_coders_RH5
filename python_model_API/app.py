from flask import Flask, request, jsonify
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import pandas as pd


app = Flask(__name__)
CORS(app, resources={r"/last": {"origins": "*"}})
CORS(app, resources={r"/stats": {"origins": "*"}})
auth = HTTPBasicAuth()

users = {
    "admin": "secret",
    "user": "pass"
}

df = pd.read_csv('./area_forecasts.csv', index_col=0)
json_output = df.to_json(orient='index', indent=4)



@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username



@app.route('/stats', methods=['GET'])
@auth.login_required
def stats():
    return json_output

data = pd.read_csv('./cleaned_healthcare_dataset.csv')
data['Date of Admission'] = pd.to_datetime(data['Date of Admission'])

# Filter data for the latest month
latest_month = data['Date of Admission'].dt.to_period("M").max()
filtered_df = data[data['Date of Admission'].dt.to_period("M") == latest_month]

# Pivot the DataFrame
pivot_df = filtered_df.pivot_table(index='Area', columns='Medical Condition', aggfunc='size', fill_value=0)

# Rename the columns to remove spaces
pivot_df.columns = [col.replace(' ', '_') for col in pivot_df.columns]
json_output2 = pivot_df.to_json(orient='index')



@app.route('/past', methods=['GET'])
@auth.login_required
def past():
    return json_output2

    

if __name__ == '__main__':
    app.run(port=5000)
