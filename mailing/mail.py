#! /usr/bin/env python

import rethinkdb as r
import sendgrid
import os


sg = sendgrid.SendGridClient(str(os.environ['SENDGRID_USER']), str(os.environ['SENDGRID_PASS']))


def sendEmail(to, emailHTML):
    message = sendgrid.Mail()
    message.add_to(to)
    message.set_subject('USIU Hackathon')
    message.set_html(emailHTML)
    #message.set_text(body)
    message.set_from('no-reply <no-reply@usiuhackathon.me>')
    status, msg = sg.send(message)


def sendPost(to, postFollow):
    message = sendgrid.Mail()
    message.add_to(to)
    message.set_subject('USIU Hackathon')
    message.set_html(emailHTML)
    #message.set_text(body)
    message.set_from('no-reply <no-reply@usiuhackathon.me>')
    status, msg = sg.send(message)


def sendPrimer(to, body):
    message = sendgrid.Mail()
    message.add_to(to)
    message.set_subject('USIU Hackathon Primer Event')
    message.set_text(body)
    message.set_from('no-reply <no-reply@usiuhackathon.me>')
    status, msg = sg.send(message)


def sendVerify(to, body):
    message = sendgrid.Mail()
    message.add_to(to)
    message.set_subject('USIU Hackathon')
    message.set_text(body)
    message.set_from('no-reply <no-reply@usiuhackathon.me>')
    status, msg = sg.send(message)


conn = r.connect(host = 'localhost',
                 port = 29019,
                 db = 'hackathon',
                 auth_key = 'hackathon2015')


emailHTML = """
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>USIU-A Hackathon Confirmation</title>
<style>
/* -------------------------------------
        GLOBAL
------------------------------------- */
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400|Oswald:300,400,700);

* {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    font-size: 100%;
    line-height: 1.6;
}

img {
    max-width: 100%;
}

body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    width: 100%!important;
    height: 100%;
}


/* -------------------------------------
        ELEMENTS
------------------------------------- */

hr {
    border: none;
    border: 1px solid #CCC;
    margin: 1em 0;
}

img {
    height: 48px;
}


a {
    color: #444;
    text-decoration: none;
    border-bottom: 1px solid #FFCB08;
}
a:hover {
    color: #000;
}

.btn-primary {
    text-decoration: none;
    color: #FFF;
    background-color: #00A0E3;
    border: solid #00A0E3;
    border-width: 10px 20px;
    line-height: 2;
    font-weight: bold;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 25px;
}
.btn-primary:hover {
    color: #FFF;
    opacity: 0.7;
}

.last {
    margin-bottom: 0;
}

.first {
    margin-top: 0;
}

.padding {
    padding: 10px 0;
}


/* -------------------------------------
        BODY
------------------------------------- */
table.body-wrap {
    width: 100%;
    padding: 20px;
}

table.body-wrap .container {
    border: 1px solid #f0f0f0;
}


/* -------------------------------------
        FOOTER
------------------------------------- */
table.footer-wrap {
    width: 100%;    
    clear: both!important;
}

.footer-wrap .container p {
    font-size: 12px;
    color: #666;
    
}

table.footer-wrap a {
    color: #999;
}


/* -------------------------------------
        TYPOGRAPHY
------------------------------------- */
h1, h2, h3 {
    font-family: "Oswald", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    line-height: 1.1;
    margin-bottom: 15px;
    color: #000;
    margin: 40px 0 10px;
    line-height: 1.2;
    font-weight: 200;
}

h1 {
    font-size: 36px;
}
h2 {
    font-size: 28px;
    color: #00A0E3;
}
h3 {
    font-size: 22px;
    margin-top: 22px;
}
h4 {
    color: #888;
}

p, ul, ol {
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 14px;
}

ul li, ol li {
    margin-left: 5px;
    list-style-position: inside;
}

/* ---------------------------------------------------
        RESPONSIVENESS
        Nuke it from orbit. It's the only way to be sure.
------------------------------------------------------ */

/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
.container {
    display: block!important;
    max-width: 600px!important;
    margin: 0 auto!important; /* makes it centered */
    clear: both!important;
}

/* Set the padding on the td rather than the div for Outlook compatibility */
.body-wrap .container {
    padding: 20px;
}

/* This should also be a block element, so that it will fill 100% of the .container */
.content {
    max-width: 600px;
    margin: 0 auto;
    display: block;
}

/* Let's make sure tables in the content area are 100% wide */
.content table {
    width: 100%;
}

</style>
</head>

<body bgcolor="#f6f6f6">

<!-- body -->
<table class="body-wrap">
    <tr>
        <td></td>
        <td class="container" bgcolor="#FFFFFF">

            <!-- content -->
            <div class="content">
            <table>
                <tr>
                    <td>
                        <img src="https://www.usiuhackathon.me/images/logo_black.png">
                        <hr>

                        <h2>We are one day from the hackathon, are you ready?</h2>

                        <br>

                        <p>Looking forward to seeing what you&rsquo;re going to build! Remember, you will be posting your code to our GitHub organisation account - We have private repos for y&rsquo;all</p>
                        <br>

                         <p>Remember to tweet and follow us <a href="http://twitter.com/USIUHackathon">@usiuhackathon</a>. Please make sure to come early; we start at 8:00 AM. Once the competition has begun, please push regularly to Github. We&rsquo;ll assign repos to all teams, courtesy of Github.</p>
                        <br>


                        <p>
                        After the submission deadline, you can see what other people have built and leave comments on their projects. We will be sending out another email regarding community judging, which will take place during the hackathon. After the community judging phase, we will have our expert judging phase, and winners will be announced.
                        </p>
                        <br>
            
                        <p><center><h3>Give a BIG shout-out to our awesome sponsors: </center></h3></p>
                        <p>
                        <a href="https://twitter.com/rethinkdb">RethinkDB</a>
                        is an open-source distributed database built with love. Enjoy an intuitive query language, 
                        automatically parallelized queries, and simple administration. Table joins and batteries included.
                        </p>

                        <br>

                        <p>
                        <a href="https://www.africastalking.com/">Africa's Talking</a> provides a way for people and companies 
                        across the African continent to connect via SMS messages. They offer bulk SMS, short codes and premium SMS, 
                        USSD, MMS and customized mobile messaging solutions for individuals, businesses and developers.
                        </p>

                        <br>

                        <p>
                        <a href="https://www.kuhustle.com/">Kuhustle</a> is an online tech community work place, 
                        Post a job and get bids to deliver it on time and budget.
                        </p>

                        <p>
                            You should read the <a href="https://www.usiuhackathon.me/guide">Guide</a> and familiarize yourself with the
                            <a href="https://www.usiuhackathon.me/rules">Rules</a>. Also, get your elevator pitch ready.
                            come hone your skills, connect with other developers that are passionate about building good software, 
                            learn about tools and new dev patterns, demonstrate your skills... 
                            and have a chance at wining cool prizes!
                        </p>

                          <p>
                        PS - if you're thinking about how to coordinate with your team during the event, check out Flowdock or Slack, the chat tool that's perfect for software development teams.
                        </p>

                        <br>

                        <h3>In the meantime&hellip;</h3>
                        <p>You can keep up to date by following us on the following networks.</p>
                        <br>
                        <a href="http://facebook.com/usiuhackathon">USIU-Hackathon Facebook Page</a>
                        <br>
                        <a href="http://github.com/USIU-Hackathon/">USIU-Hackathon Github Page</a>
                        <br>
                        <a href="http://twitter.com/usiuhackathon">USIU-Hackathon Twitter Page</a>
                        <br>
                        <br>
                        <p>Regards,</p>
                        <p>The USIU Hackathon Team</p>
                    </td>
                </tr>
            </table>
            </div>
            <!-- /content -->
            
        </td>
        <td></td>
    </tr>
</table>
<!-- /body -->

</body>
</html>
"""


verifyEmail = """
Hi, this is a follow up of the previous email, have you confirmed your attendance 
for the USIU hackathon on the 14 of March 2015?
Please do so.

Regards,
USIU Hackathon Team
"""

rethinkEmail = """
Hi, this is a follow up on the USIU hackathon. Please provide us <a href="http://bit.ly/1GVbnjG">feedback</a>; Help us 
organise an even better hackathon. Looking forward to having you in future hackathons :D.

Win some awesome prizes by rethinkDB, check out there blogging competition with 
<a href="http://rethinkdb.com/blog/airpair-writing-contest/">Airpair</a>. 1000$ up for grabs; 
and other awesome prizes. Submit your Post.

Regards,
USIU hackathon Team
"""

primerEmail = """
Hi, around the USIU campus? Join us on the 11th of March at 2:00 PM in the School of Science Building SC7
for a Primer to the hackathon. We'll go through a guide on all things hackathons, our goals for the event, 
an introduction to our awesome sponsors and a few of their product demos.

Regards,
USIU Hackathon Team
"""

"""
for doc in r.table('Attendee').filter({"confirmed_user":"false"}).run(conn):
    sendVerify(doc['id'], verifyEmail)

"""

"""
for doc in r.table('Attendee').run(conn):
    sendPrimer(doc['id'], primerEmail)
"""


for doc in r.table('Attendee').run(conn):
    sendPost(doc['id'], rethinkEmail)


"""
for doc in r.table('Attendee').run(conn):
    sendEmail(doc['id'], emailHTML)
"""