from flask import Flask, redirect, url_for, session
from authlib.integrations.flask_client import OAuth

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a real secret key

# OAuth 2 client setup
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='your_client_id',  # Replace with your Google client ID
    client_secret='your_client_secret',  # Replace with your Google client secret
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={'scope': 'openid profile email'},
)

@app.route('/')
def homepage():
    return 'Welcome! <a href="/login">Login</a>'

@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/login/callback')
def authorize():
    token = google.authorize_access_token()
    user_info = google.get('userinfo').json()
    # Do something with the user_info or use session to manage user state
    session['user'] = user_info
    return redirect('/')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
