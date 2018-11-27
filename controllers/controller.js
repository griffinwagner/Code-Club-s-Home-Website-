const {Member} = require('../db/models/members');
const {Mission} = require('../db/models/mission');
const {Project} = require('../db/models/projects');
const {MeetTime} = require('../db/models/meetTime');
const {ContactH} = require('../db/models/hContact');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

module.exports = (app) => {

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    Mission.find({}, (err, mis) => {
      MeetTime.find({}, (err, mt) => {
        ContactH.find({}, (err, hc) => {
          res.render('home', {location: 'Home', mission: mis, mt: mt, hc: hc});
        });
      });
    });
  });

  app.get('/about', (req, res) => {
    Member.find({}, (err, members) => {
      res.render('about', {location: 'About', members: members})
    });
  });

  app.get('/projects', (req, res) => {
    Project.find({}, (err, pro) => {
      res.render('projects', {location: 'Our Projects', projects: pro})
    });
  });

  app.get('/email', (req, res) => {
    res.render('email', {location: 'Request Project'})
  });

  app.get('*', (req, res) => {
    res.status(404).send("404 -- Sorry, we couldn't find your request.");
  });

}
