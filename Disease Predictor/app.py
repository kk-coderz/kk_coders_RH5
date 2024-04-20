from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:4200"}})

# Load model and label encoders
print("Started")
clf = joblib.load('model.pkl')
print("1")
label_encoder1 = joblib.load('label_encoder1.pkl')
print("2")
label_encoder2 = joblib.load('label_encoder2.pkl')
print("3")
label_encoder3 = joblib.load('label_encoder3.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    age = data['Age']
    gender = data['Gender']
    area = data['Area']

    # Encode categorical variables
    gender_encoded = label_encoder1.transform([gender])[0]
    area_encoded = label_encoder2.transform([area])[0]

    # Predict
    predicted_prob = predict_medical_condition(age, gender_encoded, area_encoded)

    return jsonify(predicted_prob)

def predict_medical_condition(age, gender_encoded, area_encoded):
    X_new = pd.DataFrame({
        'Age': [age],
        'Gender_encoded': [gender_encoded],
        'Area_encoded': [area_encoded]
    })

    predicted_prob = clf.predict_proba(X_new)
    class_labels = label_encoder3.inverse_transform(clf.classes_)

    return {label: prob * 100 for label, prob in zip(class_labels, predicted_prob[0])}

if __name__ == '__main__':
    app.run(debug=True)
