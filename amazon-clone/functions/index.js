const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');
const { response, request } = require("express");
const { async } = require("@firebase/util");
const stripe = require('stripe')('sk_test_51KEzjISGoMPfHW4Dx4DmMpc9UQlG2ANF2TVlGhMpESTDDMK4b9kV3HR5vCuGEEW88ImW8953Tb0YHXzki1Z4enY700HqXsks19')

//App

//Api config
const app = express();
//Middleware
app.use(cors({ origin: true }));
app.use(express.json());

//Api Routes
app.get('/', (request, response) => response.status(200).send("hellow world"))
app.post('./payment/create', async(request, response) => {
        const total = request.query.total;
        console.log('patment received', total);

        const paymentIntent = await stripe.paymentIntent.create({
            amount: total,
            currency: "usd"
        });

        response.status(201).send({
            clientSecret: paymentIntent.client_Secret,
        })

    })
    //Listen Command
exports.api = functions.https.onRequest(app);