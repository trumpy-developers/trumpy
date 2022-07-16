import flask
from flask import Flask, request, jsonify
from json import dumps, loads
import config
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# app.config['DEBUG'] = True

client = pymongo.MongoClient(config.DATABASE_URL)
db = client[config.DATABASE_NAME]
article_coll = db[config.AR_COLLECTION_NAME]
user_coll = db[config.US_COLLECTION_NAME]


@app.route('/', methods=['GET'])
def about():
    return "trumpy-api"


def new_article_data_gen(url):
    return {
        'aid': str(hash(url)),
        'url': url,
        'reactions': {
            'anger': {
                "count": 0,
                "type": "positive",
                "extent": 0,
            },
            'happy': {
                "count": 0,
                "type": "positive",
                "extent": 0,
            }
        },
        'fakenews': {
            'flagger': 0,
            'total': 0,
        }
    }


def new_user_data_gen(uid):
    return {
        'uid': uid,
        'reactions': {},
        'fakenews': {},
    }


def get_article_data(url):
    doc = article_coll.find_one({'url': url})
    if doc is None:
        article_coll.insert_one(new_article_data_gen(url))
        doc = article_coll.find_one({'url': url})
    res = dict(doc)
    res.pop('_id')
    return res


def get_user_data(uerid):
    doc = user_coll.find_one({'uid': uerid})
    if doc is None:
        user_coll.insert_one(new_user_data_gen(uerid))
        doc = user_coll.find_one({'uid': uerid})
    res = dict(doc)
    res.pop('_id')
    return res


@app.route("/api", methods=['POST'])
def api():
    data = request.get_json()
    url = data['url']
    userid = data['uid']
    if 'reaction' in data:
        handle_reaction(url, userid, data['reaction'])
    if 'fakenews' in data:
        handle_fakenews(url, userid, data['fakenews'])
    article_data = get_article_data(url)
    user_data = get_user_data(userid)
    aid = article_data['aid']
    if aid in user_data['fakenews'].keys():
        article_data['user_statu'] = user_data['fakenews'][aid]
    else:
        article_data['user_statu'] = 'none'
    return jsonify(article_data)


def handle_reaction(url, userid, rtype):
    article_data = get_article_data(url)
    user_data = get_user_data(userid)
    aid = article_data['aid']
    user_data['reactions'][aid] = aid
    user_coll.update_one({'uid': userid}, {'$set': user_data})
    article_data['reactions'][rtype]['count'] += 1
    article_coll.update_one({'aid': aid}, {'$set': article_data})


def handle_fakenews(url, userid, ftype):
    article_data = get_article_data(url)
    user_data = get_user_data(userid)
    aid = article_data['aid']
    if aid in user_data['fakenews'].keys():
        if ftype == user_data['fakenews'][aid]:
            # already flagged
            print("already flagged")
            return
        else:
            print("flagged as different type")
            print(user_data)
            print(article_data)
            if user_data['fakenews'][aid] == 'negative':
                article_data['fakenews']['flagger'] -= 1
            else:
                article_data['fakenews']['flagger'] += 1
            user_data['fakenews'][aid] = ftype
            article_coll.update_one({'aid': aid}, {'$set': article_data})
            user_coll.update_one({'uid': userid}, {'$set': user_data})
    else:
        # update new
        print("new flagger")
        user_data['fakenews'][aid] = ftype
        user_coll.update_one({'uid': userid}, {'$set': user_data})
        if ftype == 'negative':
            article_data['fakenews']['flagger'] += 1
        article_data['fakenews']['total'] += 1
        article_coll.update_one({'aid': aid}, {'$set': article_data})


if __name__ == '__main__':
    app.run(host='localhost', port=8080)
