const express = require('express');
const morgan = require('morgan');
const hemet = require('helmet');
const xssClean = require('xss-clean');
const cors = require('cors')
const { ZodError, success } = require('zod');
const { timeStamp } = require('console');
const app = express();

const isDev = process.env.NODE_ENV === 'developement';

app.get('/', (req, res) => res.send('Hello World!'));

// URL allows
app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded());

// logging
if (isDev) {
    app.use(morgan('dev'));
}

// error handler
app.use(function (err, req, res, next) {
     if (isDev) {
      console.error(err.stack)
     }

    let status = err.status || 500;
    let message = err.message || 'Something broke!';
    
    // validation errors
    if (err instanceof ZodError) {
        res.status(status).json({
            success: false,
            status: 400,
            message: 'validation errors',
            errors: err.error,
            data: null,
            time: new date().toISOString() 
        })
    }

    res.status(500).json({
        success: false,
        status,
        message,
        errors: null,
        data: null,
        time: new Date().toISOString()
    });
});


// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: "not found",
        errors: null,
        data: null
    })
})

module.exports = app;