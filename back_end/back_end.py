from training.train import *
from flask import Flask
from flask_cors import CORS
import json 

app = Flask(__name__)
# Added CORS avilability
CORS(app)

# This is test API 
@app.route("/hello/<int:test>,,methods=['GET', 'POST']")
def hello(test):
    print(test)
    return "<p>Hello</p>"

@app.route("/test",methods=['GET', 'POST'])
def test():
    return "Working"

@app.route("/",methods=['GET', 'POST'])
def hello_test():
    return "Hello"

# Our primary API
@app.route("/recommend/<movie_name_front_end>/<int:user_filter_front_end>",methods=['GET', 'POST'])
def take_movie_name(movie_name_front_end,user_filter_front_end):
    # Test cases can be added here if needed 
    recommended_movies = recommend_movies(movie_name_front_end,user_filter_front_end)
    return_string = json.dumps(recommended_movies)
    return return_string

if __name__ == "__main__":
    app.run()