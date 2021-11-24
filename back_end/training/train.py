import pandas as pd 
import numpy as np 

movies_names = pd.read_csv("movies.csv")

# Reading and labelling the ratings file
user_ratings = pd.read_csv("ratings.csv")

user_ratings = pd.merge(user_ratings,movies_names,on="movieId")
print(user_ratings.head(10))

mean_ratings_movies = pd.DataFrame(user_ratings.groupby('movieId')['rating'].mean())
mean_ratings_movies['number of ratings'] = pd.DataFrame(user_ratings.groupby('movieId')['rating'].count())

# Creating movie matrix 
piv_movie_mat = user_ratings.pivot_table(index='userId',columns='title',values='rating')
print(mean_ratings_movies.sort_values('number of ratings',ascending=False).head(10))

movie_rated = piv_movie_mat['Pulp Fiction (1994)']
similar_to_movie_rated = piv_movie_mat.corrwith(movie_rated)
corr_movie_rated = pd.DataFrame(similar_to_movie_rated,columns=["Correlation"])

corr_movie_rated.dropna(inplace=True) # Drops all the N/A

corr_movie_rated = corr_movie_rated.join(mean_ratings_movies['number of ratings'])
corr_movie_rated = corr_movie_rated[corr_movie_rated['number of ratings']>5].sort_values("Correlation",ascending=False)
print(corr_movie_rated.head(10))

print("Done")