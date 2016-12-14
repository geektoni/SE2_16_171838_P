# Uninforma 
#### SE2_16_171838_P
[![Build Status](https://travis-ci.org/geektoni/SE2_16_171838_P.svg?branch=staging)](https://travis-ci.org/geektoni/SE2_16_171838_P)
[![codecov](https://codecov.io/gh/geektoni/SE2_16_171838_P/branch/master/graph/badge.svg)](https://codecov.io/gh/geektoni/SE2_16_171838_P)

## Introduction

This is an application prototype for the Software Engineering Course Project. It was made based on a mockup idea produced during one interactive lesson based on [The Gift Giving Project](https://dschool.stanford.edu/groups/designresources/wiki/ed894/The_GiftGiving_Project.html). You can find the proposed mockup [here](https://drive.google.com/file/d/0B8Hfs7DpCPvHWHJKeHFtOWFDM2M/view) (initially it was designed as a smarthphone application).

The application is hosted on Heroku and it is based on a backend written in **Node.js** and **Express.js** and on a frontend written in **HTML** and **CSS**. It also uses a **MongoDB** database to store all the data.

## Code documentation and API documentation
The code has comment inside that explain pretty all the methods (apart from trivial things and test cases). The API is documented through [Swagger](http://swagger.io/) and inside the ```doc/``` dir there is the yaml source file and a nodesj server that displays and online version of the API documentation. To start the documentation type:
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

## Online version

You can find and online vesion of the application at this [link](https://se2-16-171838-p-production.herokuapp.com/).
