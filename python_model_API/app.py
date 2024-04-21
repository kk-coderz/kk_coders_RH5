from flask import Flask, request, jsonify
from flask_httpauth import HTTPBasicAuth
import pandas as pd


app = Flask(__name__)
auth = HTTPBasicAuth()

users = {
    "admin": "secret",
    "user": "pass"
}

df = pd.read_csv('area_forecasts.csv', index_col=0)
json_output = df.to_json(orient='index', indent=4)



@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username



@app.route('/stats', methods=['GET'])
@auth.login_required
def stats():
    return json_output

data = pd.read_csv('cleaned_healthcare_dataset.csv')
    # Convert 'Date of Admission' to datetime
data['Date of Admission'] = pd.to_datetime(data['Date of Admission'])

# Filter relevant columns
data = data[['Date of Admission', 'Medical Condition', 'Area']]

medical_conditions = data['Medical Condition'].unique().tolist()
areas = data['Area'].unique().tolist()

# Group by 'Date of Admission', 'Medical Condition', and 'Hospital' and count admissions
grouped_data = data.groupby(['Date of Admission', 'Medical Condition', 'Area']).size().reset_index(name='Admissions')

# Pivot the data to have 'Medical Condition' as columns
pivot_data = grouped_data.pivot_table(index=['Date of Admission', 'Area'], columns='Medical Condition', values='Admissions', fill_value=0).reset_index()

# Set 'Date of Admission' as index
pivot_data.set_index('Date of Admission', inplace=True)
pivot_data.index = pivot_data.index.month

# Find the max date in the index
max_date = pivot_data.index.max()

# Filter the data for the max date
latest_data = pivot_data.loc[pivot_data.index == max_date]
area_grouped = latest_data.groupby('Area').sum()
json_output2 = area_grouped.to_json(orient='index')



@app.route('/past', methods=['GET'])
@auth.login_required
def past():
    return json_output2

    

if __name__ == '__main__':
    app.run(debug=True)