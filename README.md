# Uninforma 
#### SE2_16_171838_P
[![Build Status](https://travis-ci.org/geektoni/SE2_16_171838_P.svg?branch=staging)](https://travis-ci.org/geektoni/SE2_16_171838_P)
[![codecov](https://codecov.io/gh/geektoni/SE2_16_171838_P/branch/master/graph/badge.svg)](https://codecov.io/gh/geektoni/SE2_16_171838_P)

# Online version

**You can find an online vesion of the application at this [link](https://se2-16-171838-p-production.herokuapp.com/).**

## Introduction

This is an application prototype for the Software Engineering Course Project. It was made based on a mockup idea produced during one interactive lesson where we worked in pairs following tips given by [The Gift Giving Project](https://dschool.stanford.edu/groups/designresources/wiki/ed894/The_GiftGiving_Project.html). You can find the proposed mockup [here](https://drive.google.com/file/d/0B8Hfs7DpCPvHWHJKeHFtOWFDM2M/view) (initially it was designed as a smarthphone application).

The application is hosted on Heroku and it is composed by a backend written in **Node.js** and **Express.js** and by a frontend written in **HTML** and **CSS** (using the **Pug** template engine). It also uses a **MongoDB** database to store all the data.

The application was also developed using [Travis CI](http://travis-ci.org) to automatize the test suite and [Codecov](https://codecov.io/) to provide a sort-of code coverage statistics (to have more information click on one of the badges under the title on top of the page).

## Code documentation and API documentation
The code was commented using Doxygen notation (apart from trivial things and test cases). The API is documented through [Swagger](http://swagger.io/) and inside the ```doc/``` dir you can find the yaml source file and a nodesj server that displays an online version of the API documentation. To start the swagger nodejs server you can type on a console:
```
cd doc/
npm start
```
The API documentation will be available at [http:://localhost:8080/docs](http:://localhost:8080/docs).

## Install
**Pre-requisite: you must be running a Linux or MacOs enviroment. You should have already installed git, npm, nodejs and mogodb client and server (if you wish to try the application on custom databases).**

To try and run this application on your platform run these command in a shell:
```bash
git clone https://github.com/geektoni/SE2_16_171838_P.git
cd SE2_16_171838_P/
npm install
npm start
```
If you wish to try a custom database, you must change the ```PRODUCTION``` variable inside ```lib\databaseConnection.js``` supplying your ```mongodb://``` url. 
