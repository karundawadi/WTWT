from training.train import *
from flask import Flask

app = Flask(__name__)

# This is test API 
@app.route("/hello/<int:test>")
def hello(test):
    print(test)
    return "<p>Hello</p>"

# Our primary API
@app.route("/recommend/<movie_name_front_end>/<int:user_filter_front_end>")
def take_movie_name(movie_name_front_end,user_filter_front_end):
    # Test cases can be added here if needed 
    recommended_movies = recommend_movies(movie_name_front_end,user_filter_front_end)
    return recommended_movies

if __name__ == "__main__":
    app.run()