
## Setup

1. If you don’t have Python installed, [install it from here](https://www.python.org/downloads/).

2. Create a new virtual environment:

   Linux:
   ```bash
   $ python -m venv venv
   $ . venv/bin/activate
   ```

   Windows:
   ```cmd
   $ python -m venv venv
   $ venv\Script\activate.bat
   ```


3. Install the requirements:

   ```bash
   $ pip install -r requirements.txt
   ```


## Run

### Debug mode

   ```bash
   $ flask run
   ```

[http://localhost:5000](http://localhost:5000)


### Release mode
   Remove [FLASK_ENV] key in `.env` file.

   ```bash
   $ python app.py
   ```

[http://localhost:8080](http://localhost:8080)