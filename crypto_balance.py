import requests
import json
import sys
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class CryptoBalance(Resource):
	def get(self):
		invested = float(request.args.get('invested'))

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

		btc_amt = float(request.args.get('btc'))
		xrp_amt = float(request.args.get('xrp'))
		ltc_amt = float(request.args.get('ltc'))
		eth_amt = float(request.args.get('eth'))

		btc_usd = btc_price*btc_amt
		ltc_usd = ltc_price*ltc_amt
		eth_usd = eth_price*eth_amt
		xrp_usd = xrp_price*xrp_amt
		total_usd = btc_usd + ltc_usd + xrp_usd + eth_usd
		profit = total_usd - invested
		return {'invested':invested, 'total':total_usd, 'profit': profit, 'btc':btc_price, 'ltc':ltc_price, 'xrp':xrp_price, 'eth':eth_price}





api.add_resource(CryptoBalance, '/crypto/balance') # Route_1



if __name__ == '__main__':
	app.run(port=80)

# r = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
# address_info = r.json()
# btc_usd = address_info['bpi']['USD']['rate_float']
# ltc_usd = ltc * btc_usd
# print ltc_usd

# usd_value = address_info['balance'] / 10000

# print usd_value