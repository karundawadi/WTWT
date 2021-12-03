# What to watch tonight ?

What to watch tonight is a recommendation system. It has two components : 
* Back- end system 
    * Training and recommendation system 
    * Webserver system 
* Front-end system 

The fron-end system and back-end system can be found in their own individual directory. The entire front-end system is live at http://recomnly.surge.sh/

## Back-end system 
Python and its various libraries (`Pandas`, `Numpy`,`Flask`,`Flask-CORS`) are used to develop the back end system. 
The training and recommendation is done using the data avialble at https://grouplens.org/datasets/movielens/

## Front-end system 
Front end system is written using Javascript and its various libraries (`React`,`Axios`,`Materail UI`,`Bootstrap`). The live version hosted at http://recomnly.surge.sh/ does not work until the backend server is started. To see a working version of the web application please follow instruction on installtion section below. 

## Installation 

1. Install the latest version of [Python](https://www.python.org/downloads/) 
2. Install the latest version of [node.js](https://nodejs.org/en/download/)
3. Install the latest version of [git](https://git-scm.com/downloads) 
4. Setup for backend 
    i. Install pip by typing  ```$ python -m ensurepip --upgrade```
    ii. You can install all the dependencies found on `requirements.txt` at Documentation/back_end/requirements.txt using pip in a virtual environment or in your working environement. 
    *  ```$ python pip install pandas  ```
    * ```$ python pip install numpy  ```
    * ```$ python pip install flask  ```
    * ```$ python pip install flask-cors  ```
5. Navigate to the cloned folder in your terminal 
6. Navigate to the back_end directory 
    i. Start the backend server by typing ```python back_end.py``` 
7. Navigate to front_end directory
    i. Install the node modules by typing ```npm install```
    ii. Start the web server by typing ```npm start```

## Contributing 

You can fork the repository to make further changes. You can also raise issues if you encounter any. 