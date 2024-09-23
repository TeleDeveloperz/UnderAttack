
from flask import Flask, request, jsonify, session
from flask_wtf.csrf import CSRFProtect
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache
import random, string, hashlib, logging

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///challenges.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

csrf = CSRFProtect(app)
limiter = Limiter(app, key_func=get_remote_address)
db = SQLAlchemy(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

logging.basicConfig(filename='challenge.log', level=logging.INFO)

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    challenge = db.Column(db.String(8), unique=True, nullable=False)
    response = db.Column(db.String(64), nullable=False)

@app.route('/')
@limiter.limit("10/minute")
def under_attack():
    challenge = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    response = hashlib.sha256(challenge.encode()).hexdigest()
    new_challenge = Challenge(challenge=challenge, response=response)
    db.session.add(new_challenge)
    db.session.commit()
    return jsonify({'challenge': challenge})

@app.route('/verify', methods=['POST'])
@csrf.exempt
def verify():
    challenge = request.json.get('challenge')
    response = request.json.get('response')
    db_challenge = Challenge.query.filter_by(challenge=challenge).first()
    
    if db_challenge and db_challenge.response == response:
        db.session.delete(db_challenge)
        db.session.commit()
        return jsonify({'status': 'success'}), 200
    return jsonify({'status': 'failed'}), 400

@app.after_request
def log_challenge_attempt(response):
    logging.info(f"IP: {request.remote_addr}, Status: {response.status_code}")
    return response

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
    