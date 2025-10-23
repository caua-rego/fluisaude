'''
Main do projeto
'''
from flask import Flask
import sqlite3

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
