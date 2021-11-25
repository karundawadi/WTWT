import pandas as pd 

def recommend_movies(movie_name,user_filter):
    ratings_provided = pd.read_csv("training/ratings.csv")
    movie_names_provided = pd.read_csv("training/movies.csv")

    # Merging both ratings provided and movie names provided such that we have access to the titles 
    ratings_provided = pd.merge(ratings_provided,movie_names_provided,on='movieId')

    # Dropping unnecessary columns to increase efficency; the more data means more time taken 
    ratings_provided.drop(ratings_provided.columns[[3, 5]], axis = 1, inplace = True)

    # Of the ratings provided calculating the mean and storing it in ratings 
    ratings = pd.DataFrame(ratings_provided.groupby('title')['rating'].mean())

    # Adding the number of times a rating was given by an user; will later be used 
    ratings['no of ratings'] = pd.DataFrame(ratings_provided.groupby('title')['rating'].count())

    # Creating a table with all the movies names and users 
    movie_pivot_table = ratings_provided.pivot_table(index='userId',columns="title",values='rating')
    movie_selected = movie_name
    
    # Finding the list of users and their corresponding movies ratings 
    user_selected_movie_ratings = movie_pivot_table[movie_selected]
    
    # Doing a corelation to estimate which movie will be recommended by a group who has watched similar movies 
    similar_to_user_selected_movie = movie_pivot_table.corrwith(user_selected_movie_ratings)

    # Creating a column named corelation 
    corr_user_movies = pd.DataFrame(similar_to_user_selected_movie,columns=['Corelation'])
    
    # Many movies will be unwatched by this section of people; dropping them 
    # To improve the accuracy we can actually predict the values 
    corr_user_movies.dropna(inplace=True)
    
    # Joining the movies list with number of ratings to filter them 
    corr_user_movies = corr_user_movies.join(ratings['no of ratings'])
    
    # Sorting on the based of number of ratings; the user can choose the no of users ratings 
    movies_recommended = corr_user_movies[corr_user_movies['no of ratings']>user_filter].sort_values('Corelation',ascending=False)
    
    # Data formatting 
    values = movies_recommended.head(10)
    return_values = []
    for i in range(1,6):
        return_values.append(values.iloc[i].name)
        
    # Will send top 5 movies 
    return return_values
