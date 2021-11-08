# Indian Oil Corporation Intern Project
## How To Run on local machine:
1) Install all the npm dependencies (in package.json) using the command:
```
npm i
```
2) Start a virtual envirnment for the Python Script in /public/scripts/
```
> pip install virtualenv
> python -m venv ./
> .\venv\Scripts\activate.bat
```
3) install the pip dependencies:
```
> python -m pip install -r requirements.txt
```
4) app.js is the main web app while the ./public/scripts/main.py is the flask api service.
5) run node.js using the following commmand:
```
> node app.js
```
6) Now start the flask server on port 5000 i.e. localhost:5000 using the following command:
```
> cd ./public/scripts/
> python main.py
```
7) Visit **localhost:3000** to upload the txt file.
9) You will be redirected to **localhost:3000/mru** to see the tabular representation of the data.

## Project Description
Given .txt files with readings from various sensors at time intervals of around 10 seconds. This web app allows the user to upload that file on the web application, which thereafter is processed by a flask microservice, which extracts hourly reading from the txt file and compiles it into JSON format under specific headings/tags. This microservice returns the JSON upon request from our NodeJS (Express) web applicatin which in turn displays the data beautifully on the website in form of a table.

### Technologies Used
1) Javascript/HTML/CSS
2) NodeJS, Express
3) Flask, Pandas (Python)
