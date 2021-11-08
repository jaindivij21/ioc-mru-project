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
6) Visit localhost:3000 to upload the txt file.
7) Now start the flask server using the following command:
```
> cd ./public/scripts/
> python main.py
```
8) Once the flask server is runnning on port 5000 i.e. localhost:5000, visit *localhost:3000/mru* to see the tabular representation of the data.
