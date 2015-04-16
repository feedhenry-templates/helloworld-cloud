var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var winston = require('winston');
var $fh = require('fh-mbaas-api');

function route() {
  var server = new express.Router();
  server.use(cors());
  server.use(bodyParser());

  server.get('/', function (req, res) {
    winston.info('List all categories');
    $fh.db({
      act: 'list',
      type: 'category'
    }, function (err, found) {
      if (err) {
        winston.warn('No categories found');
        winston.warn('Error ', err);
        return res.json({
          status: 'error',
          message: err
        });
      }

      //convert list of entities to array of category names
      var result = [];
      for (var i in found.list) {
        result.push(found.list[i].fields.name);
      }

      return res.json({
        status: 'ok',
        data: result
      });
    });
  });

  server.post('/', function (req, res) {
    var category = req.body;
    winston.info('Saving category ', category);
    $fh.db({
      act: 'create',
      type: 'category',
      fields: {
        name: category.name
      }
    }, function (err, entity) {
      if (err) {
        winston.warn('Could not write category to database');
        winston.warn('Error ', err);
        return res.json({
          status: 'error',
          message: err
        });
      }

      return res.json({
        status: 'ok',
        message: entity
      });
    });
  });

  server.delete('/:name', function (req, res) {
    var categoryName = req.params.name;
    winston.info('Delete category ', categoryName);
    $fh.db({
      act: 'list',
      type: 'category',
      eq: {
        name: categoryName
      }
    }, function (err, found) {
      if (err || found.count === 0) {
        return winston.warn('Could not find category', err);
      }
      $fh.db({
        act: 'delete',
        type: 'category',
        guid: found.list[0].guid
      });

      res.json({
        status: 'ok'
      });
    });
  });

  server.post('/send', function (req, res) {
    var message = req.body;

    winston.info('Calling service to send push message ', message);
    $fh.service({
        guid: process.env.AEROGEAR_SERVICE_GUID,
        endpoint: "send",
        params: {
          message: message
        }
      },
      function (err, data) {
        winston.info('Back from AeroGear Push Service - err = ', err, ' :: data = ', data);
        if (err) {
          return res.json({
            status: 'error',
            message: err
          });
        }
        return res.json({
          status: 'ok',
          message: 'message send'
        });
      }
    );
  });

  return server;
}

module.exports = route;
