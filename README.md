# Assignment for React and Django App

Login and display data table on landing page based on roles

## Run the Project

Clone the repository

#### Prerequisites 
#Python3
#PIP
#node.js

#### Running the Django Project

> Move into Assignment directory (django):
```
cd Assignment
```

> Create virtual environment

- On WindowsOS/Linux

```
python3 -m venv venv
```

> Activate virtual environment 

- Using bash:
```
source venv/bin/activate
```

- Using CMD:
```
venv\Scripts\activate
```

> Install requirements

```
pip install -r requirements.txt
```

> Run migrations:

```
python3 manage.py makemigrations
```

```
python3 manage.py migrate
```

> Create superuser:

```
python3 manage.py createsuperuser
```
* enter username and password
* go to below url and login with superuser credentials and create user with read-only access
  ```
  http://127.0.0.0.1:8000/admin
  ```

> Run on port 8000:

```
python manage.py runserver
```

### Running the ReactJS Project

> Move into frontend directory (ReactJS)

```
cd frontend
```

> Install dependencies

```
npm install
```

> Start the project

```
npm start
```
