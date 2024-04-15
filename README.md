# Assignment for React and Django App

Login and display data table on landing page based on roles

## Run the Project

Clone the repository

#### Prerequisites 
>Python3
>PIP
>node.js

#### Running the Django Project

> Move into Assignment directory (django):
```
cd server
```

> Create virtual environment

- On WindowsOS

```
python -m venv venv
```

> Activate virtual environment 

- Using bash:
```
source <venv>/Scripts/activate
```

- Using CMD:
```
<venv>\Scripts\activate
```

> Install requirements

```
pip install -r requirements.txt
```

> Run migrations:

```
python manage.py makemigrations
```

```
python manage.py migrate
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

> Create .env file using .env.sample

> Start the project

```
npm start
```
