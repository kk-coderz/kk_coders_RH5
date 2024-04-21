from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
from datetime import datetime
import os

app = Flask(__name__)
CORS(app, resources={r"/data": {"origins": "*"}})

FILE_PATH = 'cleaned_healthcare_dataset.csv'

def append_data(new_data):
    fieldnames = ['Name', 'Age', 'Gender', 'Date of Admission', 'Medical Condition', 'Area']

    file_exists = os.path.isfile(FILE_PATH) and os.path.getsize(FILE_PATH) > 0

    with open(FILE_PATH, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        if not file_exists:
            writer.writeheader()

        writer.writerow(new_data)

#Write the valid data function
def valid_data(new_entry):
    #check if all values are present
    if not all(new_entry.values()):
        return False
    #check if age is between 0 and 100
    if not 0 <= new_entry['Age'] <= 100 and new_entry['Age'].isdigit():
        return False
    #Area is not in areas
    areas = ["Area1", "Area2", "Area3"]
    if new_entry['Area'] not in areas:
        return False
    #Condition is not in conditions
    conditions = ['Diabetes', 'Asthma', 'Obesity', 'Arthritis', 'Hypertension','Cancer']
    if new_entry["Medical Condition"] not in conditions:
        return False

    return True

@app.route('/data', methods=['POST'])
def data():
    try:
        content = request.json
        new_entry = {
            'Name': content['Name'],
            'Age': content['Age'],
            'Gender': content['Gender'],
            'Date of Admission': content.get('Date of Admission', datetime.now().strftime('%Y-%m-%d')),
            'Medical Condition': content['Medical Condition'],
            'Area': content['Area']
        }
        if valid_data(new_entry):
            append_data(new_entry)
        else:
            raise ValueError("Invalid data")
        return jsonify({"success": True, "message": "Data appended successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000)
