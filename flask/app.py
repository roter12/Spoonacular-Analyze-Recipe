#!/usr/bin/python3

# debug:   flask run
# release: app.py

import os
import json
import requests
from waitress import serve
from dotenv import load_dotenv
from flask import Flask, make_response, render_template, request, url_for, Response

load_dotenv()
debug = os.getenv("FLASK_ENV")
api_key = os.getenv("API_KEY")

app = Flask(__name__)

@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "GET":
        return render_template("index.html")

    ingredients = []
    if len(request.form['ingredients']) > 0:
        ingredients = request.form['ingredients'].split('\n')

    response = requests.post('https://api.spoonacular.com/recipes/analyze?apiKey='+api_key, json={
      "title": request.form['title'],
      "servings": request.form['servings'],
      "ingredients": ingredients,
      "instructions": request.form['instructions']
    })
    return make_response(json.dumps(response.json()), response.status_code)

@app.route("/api2", methods=(["POST"]))
def api2():
    id = request.form['id']
    includeNutrition = request.form['includeNutrition']
    url = 'https://api.spoonacular.com/recipes/{}/information?apiKey={}&includeNutrition={}'

    response = requests.get(url.format(id, api_key, includeNutrition))
    return make_response(json.dumps(response.json()), response.status_code)

if debug != 'development' and __name__ == '__main__':
    serve(app, host="0.0.0.0", port=8080)