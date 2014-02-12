# Blank FeedHenry Connector

This is a blank FeedHenry Connector. Use is as a starting point for building Connectors. 


# Group Blank Connector API

# helloWorld [/cloud/helloWorld]

'Hello world' endpoint.

## helloWorld [POST] 

'Hello world' endpoint.

+ Request (application/json)
    + Body
            {
              "hello": "world"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }
