import requests
import json
import sys
import os
from flask import Flask,request,render_template
from flask_restful import Resource, Api
from flask import send_from_directory, send_file


app = Flask(__name__, static_url_path='', static_folder='dist')
api = Api(app)

class CryptoBalance(Resource):
	def post(self):
		data = request.get_json() 
		invested = float(data['invested'])

		r = requests.get('https://api.coinmarketcap.com/v1/ticker/litecoin/')
		ltc_price = r.json()
		ltc_price = float(ltc_price[0]['price_usd'])

		r = requests.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
		btc_price = r.json()
		btc_price = float(btc_price[0]['price_usd'])

		r = requests.get('https://api.coinmarketcap.com/v1/ticker/ethereum/')
		eth_price = r.json()
		eth_price = float(eth_price[0]['price_usd'])

		r = requests.get('https://api.coinmarketcap.com/v1/ticker/ripple/')
		xrp_price = r.json()
		xrp_price = float(xrp_price[0]['price_usd'])

		r = requests.get('https://api.coinmarketcap.com/v1/ticker/bch/')
		bch_price = r.json()
		bch_price = float(bch_price[0]['price_usd'])		


		btc_amt = float(data['btc'])
		xrp_amt = float(data['xrp'])
		ltc_amt = float(data['ltc'])
		eth_amt = float(data['eth'])
		bch_amt = float(data['bch'])

		btc_usd = btc_price*btc_amt
		ltc_usd = ltc_price*ltc_amt
		eth_usd = eth_price*eth_amt
		xrp_usd = xrp_price*xrp_amt
		bch_usd = bch_price*bch_amt
		total_usd = btc_usd + ltc_usd + xrp_usd + eth_usd + bch_usd
		profit = total_usd - invested

		return {'invested_now':invested, 'total':total_usd, 'profit': profit, 'btc':[btc_amt, btc_price, btc_usd], 'ltc':[ltc_amt, ltc_price, ltc_usd], 'xrp':[xrp_amt, xrp_price, xrp_usd], 'eth':[eth_amt, eth_price, eth_usd], 'bch':[bch_amt, bch_price, bch_usd]}



api.add_resource(CryptoBalance, '/cryptkeep') # Route_1

@app.route('/')
def index():
    return send_file('templates/index.html')

@app.route('/js/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join('.', 'static', 'js'), filename)    



if __name__ == '__main__':
	if (sys.argv[1] == 'dev'):
		host = '127.0.0.1'
		port = 3000
	else:
		host = '0.0.0.0'
		port = int(os.environ.get("PORT", 33507))	
	
	app.run(host=host, port=port)