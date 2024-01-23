const express = require('express'); //import express to be used locally
    morgan = require('morgan');
    fs = require('fs');
    path = require('path');
    
const app = express(); //use this variable to route HTTP requests and responses