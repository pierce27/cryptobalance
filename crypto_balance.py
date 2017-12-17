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

		r = requests.get('https://api.coinmarketcap.com/v1/ticker/dent/')
		dent_price = r.json()
		dent_price = float(dent_price[0]['price_usd'])		

		btc_amt = float(data['btc'])
		xrp_amt = float(data['xrp'])
		ltc_amt = float(data['ltc'])
		eth_amt = float(data['eth'])
		dent_amt = float(data['dent'])

		btc_usd = btc_price*btc_amt
		ltc_usd = ltc_price*ltc_amt
		eth_usd = eth_price*eth_amt
		xrp_usd = xrp_price*xrp_amt
		dent_usd = dent_price*dent_amt
		total_usd = btc_usd + ltc_usd + xrp_usd + eth_usd + dent_usd
		profit = total_usd - invested
		return {'invested_now':invested, 'total':total_usd, 'profit': profit, 'btc':[btc_amt, btc_price, btc_usd], 'ltc':[ltc_amt, ltc_price, ltc_usd], 'xrp':[xrp_amt, xrp_price, xrp_usd], 'eth':[eth_amt, eth_price, eth_usd], 'dent':[dent_amt, dent_price, dent_usd]}





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

# r = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
# address_info = r.json()
# btc_usd = address_info['bpi']['USD']['rate_float']
# ltc_usd = ltc * btc_usd
# print ltc_usd

# usd_value = address_info['balance'] / 10000

# print usd_value