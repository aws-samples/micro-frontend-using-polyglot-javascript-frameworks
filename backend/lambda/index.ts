import { Handler } from 'aws-lambda';
import serverless from 'serverless-http';
import express from 'express';
import * as AWS from 'aws-sdk';

// Using the helper functions
import * as helpers from './helper';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creating AWS DynamoDB client
const dynamo = new AWS.DynamoDB.DocumentClient();

// Get API
app.get('/charts/:userId', async (req, res) => {

   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 

   // Getting userId from pathParameters
   const userId = req.params.userId;

   // Setting up DynamoDB query
   const findQueryParams = helpers.getChartsDataQuery(userId)

   try {
       // Getting chart data from DynamoDB
       const result = await dynamo.get(findQueryParams).promise();
      
       // Returning result if Item is found
       if(result.Item){
          res.status(200).send(JSON.stringify(result.Item))
       } else {
          res.status(204).send(JSON.stringify({}))
       }
   } catch (err) {
       // Returning generic error message if something goes wrong
       res.status(500).send('Something went wrong!')
   }
});

// Post API
app.post('/charts', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 


    // Fetching body from the API request
    let chartsData = typeof req.body == 'object' ? req.body : JSON.parse(req.body);

    // Setting up DynamoDB Query parameters
    const findQueryParams = helpers.getChartsDataQuery(chartsData.userId)

    // Setting up DynamoDB Update parameters
    const updateQueryParams = helpers.updateChartsDataQuery(chartsData)
    
    try {

      // Checking if the chart data exists for the user
      let data = await dynamo.get(findQueryParams).promise();
      
      // Updating the charts data if data is found
      if(data.Item) {
        await dynamo.update(updateQueryParams).promise();
      } else {  // Creating the charts data if data is not found

        // Setting up DynamoDB Query parameters for creating the charts data
        const createQueryParams = {
          TableName: process.env.TABLE_NAME || 'charts',
          Item: chartsData
        }

        await dynamo.put(createQueryParams).promise();
      }

      // Returning success message
      res.status(200).send('ChartsData saved successfully')
    } catch(err) {
      // Returning generic error message if something goes wrong
      res.status(500).send('Something went wrong!')
    }
})

export const handler: Handler = serverless(app)