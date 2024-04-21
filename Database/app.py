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

@app.route('/data', methods=['POST'])
def data():
    try:
        content = request.json
        print(6)
        new_entry = {
            'Name': content['Name'],
            'Age': content['Age'],
            'Gender': content['Gender'],
            'Date of Admission': content.get('Date of Admission', datetime.now().strftime('%Y-%m-%d')),
            'Medical Condition': content['Medical Condition'],
            'Area': content['Area']
        }
        append_data(new_entry)
        return jsonify({"success": True, "message": "Data appended successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000)
