'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'token') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		let page_id = event.recipient.id
		if (event.message && event.message.text) {
			sendTextMessage(sender, page_id, "senderId: "+ sender + " page id  " + page_id);
			let text = event.message.text.toLowerCase();
			if (text === 'generic') {
				sendGenericMessage(sender, page_id)
				continue
			}
			
			if (text==="linkaccnt") {
		          sendAccountLinkMessage(sender, page_id)
			  continue
			}
			
						
			if (text==="linkaccntnakuma") {
		          sendAccountLinkMessageNakuma(sender, page_id)
			  continue
			}
			
			
			if (text==="unlinkaccnt") {
			  sendAccountUnLinkMessage(sender, page_id);
			  continue;
			}
			
			if (text === "sharecta") {
			 	sendsharecta(sender, page_id);
				continue;
			}
			
			if (text == "previewsharecta") {
			 	sendsharectapreview(sender, page_id);
				continue;
				
			}
			
			if (text == "configpreviewshare") {
				sendconfigsharecta(sender, page_id);
				continue;
			}
			
			if (text == "media") {
				sendmediacta(sender, page_id);
				continue;
			}
			
			if (text == "nakuma") {
			       sendconfigsharenakumacta(sender, page_id);
				continue;
			}
			
			if (text == "fbintern") {
			       sendconfigsharefbinterncta(sender, page_id);
				continue;
			}
			
			
			
			if (text == "help") {
		          let texttosend = "I can respond to following commands:"
			  sendTextMessage(sender,page_id, texttosend)
			  texttosend = "generic, linkaccnt, unlinkaccnt, sharecta, previewsharecta, configpreviewshare"
			  sendTextMessage(sender, page_id, texttosend)
			}
			
			//sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
		if (event.postback) {
			sendTextMessage(sender, page_id, "senderId: "+ sender);
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, page_id, "Postback received: "+text.substring(0, 200))
			continue
		}

                if (event.referral) {
                        let text = JSON.stringify(event.referral)
                        sendTextMessage(sender, page_id, "Referral event received: "+text.substring(0, 200))
                        continue
                }

		if (event.attachments) {
                        let text = JSON.stringify(event.attachments)
                        sendTextMessage(sender, page_id, "Attachments received: "+text.substring(0, 200))
                        continue
                }

                if (event.account_linking) {
                        let text = JSON.stringify(event)
                        sendTextMessage(sender, page_id, "Account Linking event data at webhook: "+text.substring(0, 200))
                        continue
                }
		
		
		
	}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAALsKrSyf2MBAE6CaRzMrTlsuD6qdOPfyS36CSiN4xNT7o31tBKTTg6KMLeDQIzr987nQeWjFZAnNZBaFh2WiGK9AZBKhsEOj55ehdB3IZAeuXvghAmrc1yudTNIhHMRzo85oh2nuwZAS9yZCWRSdwGoYtHODptd1FptHtPnlhTQZDZD";
const token2 = "EAALsKrSyf2MBAKJ0tPOmslV6TDT5WEMqpm3LfsIcC7QUjyw3dpXsijypZAZCUnURvreW5Ow88BeY0ZAf6FXvHlZAQ7ZAdAJ1X4xgZBOGXzH9elSNSZAALqDWDZBBgpPErrNLoMPjvohvWxEJXcNJVxO2EeYe2DfjPGQPTwBM0eVvEgZDZD";
//const token = "EAALsKrSyf2MBAHaqfZAvV9JmUaw6meqXJ8bpWF2ZCWPSOkDXm7pJUb3JGGZCy1mSvhg82cj9E8JRYbwUvpqzP2m8fZAn9edXZA5LPasfl0P9rCb8WNg989FI5HLJj7WG3tQtFc8ecYYjT2q6aLMI7O4B1HZCVZCF4HzIuI5DWy34AZDZD"

function gettoken(page_id) {
	return page_id == "1535203003449978" ? token: token2;
}

function sendconfigsharecta(sender, pageid) {
	let token_val = gettoken(pageid)
	let messageData = {
		//"attachment":{"type":"template","payload":{"template_type":"button","text":"Extension test","buttons":[{"title":"full intern", "type":"web_url", "webview_height_ratio": "full", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html?env=intern"}, {"title":"tall prod", "type":"web_url", "webview_height_ratio": "tall", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html"}]}}
		    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome to Peter\'s Hats",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We\'ve got the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://tbd-agent.herokuapp.com/webviewmedia.html?env=intern",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            },
            "buttons":[{"title":"Intern", "type":"web_url", "webview_height_ratio": "full", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html?env=intern"}, {"title":"Prod", "type":"web_url", "webview_height_ratio": "tall", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html"}, {"type":"element_share"}]              
          }
        ]
      }
    }
	}

	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token_val},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendmediacta(sender, pageid) {
	let token_val = gettoken(pageid)
	let messageData = {
		    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Media testting",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We\'ve got the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://tbd-agent.herokuapp.com/webviewmedia.html?env=nakuma.sb",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            },
            "buttons":[{"title":"nakuma sb", "type":"web_url", "webview_height_ratio": "full", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webviewmedia.html?env=nakuma.sb"}, {"title":"intern", "type":"web_url", "webview_height_ratio": "tall", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webviewmedia.html?env=intern"}, {"type":"element_share"}]              
          }
        ]
      }
    }
	}

	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token_val},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}


function sendconfigsharenakumacta(sender, pageid) {
	let messageData = {
		"attachment":{"type":"template","payload":{"template_type":"button","text":"Extension test","buttons":[{"title":"full intern", "type":"web_url", "webview_height_ratio": "full", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html?env=intern"}, {"title":"tall prod", "type":"web_url", "webview_height_ratio": "tall", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html"}, {"title":"tall sb", "type":"web_url", "webview_height_ratio": "tall", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html?env=nakuma.sb"}]}}		
	}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:gettoken(pageid)},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendconfigsharefbinterncta(sender, pageid) {
	let messageData = {
		"attachment":{"type":"template","payload":{"template_type":"button","text":"Extension test","buttons":[{"title":"full intern", "type":"web_url", "webview_height_ratio": "full", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html?env=intern"}, {"title":"tall prod", "type":"web_url", "webview_height_ratio": "tall", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webview.html"}, {"title":"tall sb", "type":"web_url", "webview_height_ratio": "tall", "messenger_extensions": true, "url":"https://tbd-agent.herokuapp.com/webviewappleapi.html?env=michelleliu.sb"}]}}		
	}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:gettoken(pageid)},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendTextMessage(sender, pageid, text) {
	let messageData = { text:text }
	let token_val = gettoken(pageid)
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token_val},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}





function sendGenericMessage(sender, pageid) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:gettoken(pageid)},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}


function sendsharecta(sender, pageid) {
	let messageData = {
		
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        {
          "title": "Welcome to Peter",
          "image_url": "https://tctechcrunch2011.files.wordpress.com/2016/04/facebook-chatbot-alt.png?w=738",
          "subtitle": "We have got the right hat for everyone.",
          "default_action": {
            "type": "web_url",
            "url": "https://www.google.com"
          },
          "buttons": [
          {
            "type": "element_share"
          }
        ]
      }
    ]
  }
}		
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:gettoken(pageid)},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}




function sendsharectapreview(sender, pageid) {
	let messageData = {
		
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        {
          "title": "Welcome to Peter",
          "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
          "subtitle": "We have got the right hat for everyone.",
          "default_action": {
            "type": "web_url",
            "url": "https://www.google.com"
          },
          "buttons": [
          {
            "type": "element_share",
            "share_contents": {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                  "elements": [
                    {
                      "title": "In Preview Welcome to Peter",
                      "image_url": "https://tctechcrunch2011.files.wordpress.com/2016/04/facebook-chatbot-alt.png?w=738",
                      "subtitle": "We have got the right hat for everyone.",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://www.fb.com"
                      },
                      "buttons": [
                        {
                          "type": "web_url",
                          "url": "https://www.google.com",
                          "title": "Search in Google"
                        }
                      ]
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    ]
  }
}		
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:gettoken(pageid)},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}


function sendAccountLinkMessage(sender, pageid) {
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Welcome to M-Bank",
          "image_url": "http://www.example.com/images/m-bank.png",
          "buttons": [{
            "type": "account_link",
            "url": "https://our.intern.facebook.com/intern/messaging/account_linking_tool"
          }]
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:gettoken(pageid)},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}



function sendAccountLinkMessageNakuma(sender, pageid) {
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Welcome to M-Bank",
          "image_url": "http://www.example.com/images/m-bank.png",
          "buttons": [{
            "type": "account_link",
            "url": "https://wwww.facebook.com"
          }]
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:gettoken(pageid)},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}


function sendAccountUnLinkMessage(sender, pageid) {
  let messageData = {
     "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Welcome to M-Bank Logout flow",
          "image_url": "http://www.example.com/images/m-bank.png",
          "buttons": [{
            "type": "account_unlink"
          }]
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:gettoken(pageid)},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}


// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
