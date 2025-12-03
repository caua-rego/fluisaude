import threading
import webbrowser

from app import create_app

app = create_app()

if __name__ == "__main__":
    threading.Timer(1.0, lambda: webbrowser.open_new("http://127.0.0.1:5001/")).start()
    app.run(host="0.0.0.0", port=5001, debug=True)
