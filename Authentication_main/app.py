from flask import Flask, redirect, url_for, session
from authlib.integrations.flask_client import OAuth

app = Flask(__name__)
app.secret_key = 'YOUR_SECRET_KEY_HERE'

# OAuth setup
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='638151064556-6o7bc48rmsqr6f4hhlek80ocdvfpia55.apps.googleusercontent.com',
    client_secret='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',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    access_token_url='https://oauth2.googleapis.com/token',
    access_token_params=None,
    refresh_token_url=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={
        'scope': 'openid email profile',
        'token_endpoint_auth_method': 'client_secret_post',
        'token_placement': 'header',
        'jwks_uri': 'https://www.googleapis.com/oauth2/v3/certs'
    },
    server_metadata_url= 'https://accounts.google.com/.well-known/openid-configuration'
)


@app.route('/')
def homepage():
    user = session.get('user')
    if user:
        return f'Hello, {user["name"]}! <a href="/logout">Logout</a>'
    return 'Welcome! <a href="/login">Login via Google</a>'

@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/login/callback')
def authorize():
    token = google.authorize_access_token()
    resp = google.get('userinfo')
    user_info = resp.json()
    session['user'] = user_info
    return redirect('/')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
