from flask import Flask, request, jsonify
from flask_httpauth import HTTPBasicAuth
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
auth = HTTPBasicAuth()
CORS(app)

users = {
    "admin": "secret",
    "user": "pass"
}

df = pd.read_csv('area_forecasts.csv')
df_transposed = df.set_index('Area').T
json_output = df_transposed.to_json(orient='index')


@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username



@app.route('/stats', methods=['GET'])
@auth.login_required
def stats():
    return json_output

if __name__ == '__main__':
    app.run(debug=True)
