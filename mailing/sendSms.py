#! /usr/bin/env python

import rethinkdb as r
import os

conn = r.connect(host = 'localhost',
                 port = int(os.environ['RETHINKDB_PORT']),
                 db = 'hackathon',
                 auth_key = str(os.environ['RETHINKDB_AUTH_KEY']))


from AfricasTalkingGateway import AfricasTalkingGateway, AfricasTalkingGatewayException

import logging
logging.basicConfig(filename='SMS.log', level=logging.DEBUG)

username = str(os.environ['SMS_API_USER'])
apikey = str(os.environ['SMS_API_KEY'])


def sendText(to):
    gateway = AfricasTalkingGateway(username, apikey)
    """We are a day away from the USIU-hackathon; 
	the very first that takes place this Saturday on the 14th of March.
	We hope to see you there!
	"""
    message = "The USIU Hackathon is finally here :D. Registration starts at 8:00 AM. Happy Pi Day, Happy hacking!"

    recipients = gateway.sendMessage(to, message)

    try:
        for recipient in recipients:
            logging.info('number=%s;status=%s;messageId=%s;cost=%s'
                         % (recipient['number'], recipient['status'],
                            recipient['messageId'], recipient['cost']))

    except AfricasTalkingGatewayException, e:
        logging.warning('Database setup completed %s' % str(e))



for doc in r.table('Attendee').run(conn):
    sendText(doc['phone_number'])