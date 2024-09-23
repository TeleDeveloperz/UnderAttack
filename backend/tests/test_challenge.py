
import unittest
from app import app, db, Challenge

class TestChallenge(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_challenge_generation(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('challenge', response.json)

    def test_challenge_verification(self):
        # Generate a challenge
        challenge_response = self.client.get('/')
        challenge = challenge_response.json['challenge']
        
        # Simulate solving the challenge
        import hashlib
        solution = hashlib.sha256(challenge.encode()).hexdigest()
        
        # Verify the solution
        verify_response = self.client.post('/verify', json={
            'challenge': challenge,
            'response': solution
        })
        self.assertEqual(verify_response.status_code, 200)
        self.assertEqual(verify_response.json['status'], 'success')

if __name__ == '__main__':
    unittest.main()
    