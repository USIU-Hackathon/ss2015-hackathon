#! /usr/bin/env python

import rethinkdb as r

conn = r.connect(host = 'localhost',
                 port = 29019,
                 db = 'hackathon',
                 auth_key = 'hackathon2015')


from AfricasTalkingGateway import AfricasTalkingGateway, AfricasTalkingGatewayException

import logging
logging.basicConfig(filename='SMS.log', level=logging.DEBUG)

username = "IanJuma"
apikey = "2a2a5ea28cdd80d566b20e8be38343d8ffebfbb7331b08a781d81d63d9f9d3ab"


def sendText(to):
    gateway = AfricasTalkingGateway(username, apikey)
    message = """We are a day away from the USIU-hackathon; 
    			the very first that takes place this Saturday on the 14th of March.
    			We hope to see you there!
    			"""

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