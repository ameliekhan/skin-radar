from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
import logging
import re
from collections import OrderedDict

#todo: add the number of ingredients we've stored
#todo: empower people to do their own research, always!

app = Flask(__name__)
CORS(app)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["IngredientDatabase"]

mycollection = mydb["IngredientsTable"]  # collection is the same as Table


#mydict = {"scientificname": "Tocopherol", "commonname": "Vitamin E"}  # rows are dictionaries



#mycollection.insert_one(mydict)
#mycollection.delete_one(mydict)

#search_query = scholarly.search_keyword('Ascorbic')
#print(next(search_query))

@app.route('/')
def hello_world():
    return "I'm Amelie and I'm beautiful! :-)\n"


@app.route('/pizza', methods=['POST'])
def find():
    all_ingr_info = []
    ingredients = request.form["ingredient"]
    ingr_array = ingredients.split(',')

    for ingr in ingr_array:
        try:
            ingr= f"{ingr.lower().strip()}"
            ingr = re.sub(r'\([^)]*\)', '', ingr)
            ingredientInfo = mycollection.find_one({"name":ingr}, {"_id": False})

            # order_of_keys = ["name", "description", "categories", "rating", "references"]
            # list_of_tuples = [(key, ingredientInfo[key]) for key in order_of_keys]
            # ingredientInfo = OrderedDict(list_of_tuples)

            if ingredientInfo is not None:
                all_ingr_info.append(ingredientInfo)

        except Exception as e:
            logging.error(e)
            #logging.error('couldnt find: '+ ingr)
            pass
    print(all_ingr_info)
    return jsonify(all_ingr_info)

if __name__ == '__main__':
    app.run()
