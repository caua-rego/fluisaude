"""Entry point for running the Flask backend locally."""

from app import create_app

app = create_app()

if __name__ == "__main__":
    # Enable debug reload and listen on all interfaces for local testing.
    app.run(host="0.0.0.0", port=5001, debug=True)
