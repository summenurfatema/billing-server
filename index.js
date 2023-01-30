const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { query } = require('express');
require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6v5oj5d.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const billingCollection = client.db('billing').collection('billCollection')

        app.post('/add-billing', async (req, res) => {
            const billingBody = req.body
            if (!billingBody) {
                res.status(400).send({ error: 'Please insert correct information' });
                return;
            }
            else {
                const result = await billingCollection.insertOne(billingBody)
                res.send(result)
            }

        })

        app.get('/billing-list', async (req, res) => {
            const query = {}
            const result = await billingCollection.find(query).toArray()
            res.send(result)
        })
        app.delete('/delete-billing/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await billingCollection.deleteOne(query)
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(err => console.error(err))





app.get('/', (req, res) => {
    res.send('Power house')
})
app.listen(port, () => {
    console.log(`Power house is running on ${port}`)
})