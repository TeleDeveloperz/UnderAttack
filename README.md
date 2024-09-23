# UnderAttack

A full-stack solution to provide JavaScript challenges and CAPTCHA-like protection for visitors accessing your website. Inspired by Cloudflare's "Under Attack" mode.

## Features

- JavaScript-based challenge system
- Flask backend with SQLite database for challenge storage
- Next.js frontend with real-time challenge verification
- CSRF protection and rate limiting
- Logging and basic analytics
- Accessibility improvements
- Unit and integration tests
- CI/CD pipeline with GitHub Actions

## Installation

### Backend (Flask)

```bash
cd UnderAttack/backend
pip install -r requirements.txt
python app.py
```

### Frontend (Next.js)

```bash
cd UnderAttack/frontend
npm install
npm run dev
```

## Testing

### Backend

```bash
cd UnderAttack/backend
python -m unittest discover tests
```

### Frontend

```bash
cd UnderAttack/frontend
npm test
```

## Deployment

The project is set up for deployment on Vercel. Push to the main branch to trigger the CI/CD pipeline.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
