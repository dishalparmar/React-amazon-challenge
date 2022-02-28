// Make sure you are in the functions folder. 
// Remember: "functions" folder is the backend of this app and "src" is the front end
// 1 npm install express
// 2 npm install cors
// 3 npm install stripe
// 4 Go to stripe and get the secret key


// This is the page were we create the full backen Node.js. 
//This is the setup needed to get backend express app to run on a cloud function

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');

                                // Secret key from stripe
const stripe = require('stripe')('Secret key from stripe goes here...');


// Setup the Express App (API) Below stuff is what we need to set up an API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());    // This will allow us to send data and pass it in json format

// API routes

app.get('/', (request, response) => {
    response.send('Hello World');
});


// This makes a request to below URL and for that amount in subunits 
// This is the url we make request to in the Payment.js - payments/create?total=${getBasketTotal(basket) * 100}
app.post('/payments/create', async(request, response) => {
    const total = request.query.total;      // we are getting the total here in subunits

    console.log('Total amount recieved ', total);

    // When we hit app.post we get back the total and create a paymentIntent below from stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,    // this is in subunits of the currency
      currency: 'gbp'
    });

    // Status 201 - Ok Created = We created the paymentIntent
    // Here we .send the response back we get from the paymentIntent, we want to send back the clientSecret
    response.status(201).send({
      clientSecret: paymentIntent.client_secret
    });  
})

// Listen comman
exports.api = functions.https.onRequest(app);

// When you got to this point run: 'firebase emulators:start' to make sure 
// the express server is working.
// This is a example endpoint you will get after running 'firebase emulators:start'
// This API will print out your "hello world" from line 31 above
// and this is the url we put as baseURL in Axios.js


// To deploy - make sure you are in the functions folder and run below:
// firebase deploy --only functions
