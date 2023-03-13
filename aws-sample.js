//import { checkResponse } from './index.js';
// Import AWS SDK for JavaScript and environment vars
const AWS = require('aws-sdk');
//require("dotenv").config()

// Configure AWS credentials and region
/*AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_SECRET,
  region: process.env.REGION
  //session token left
  
});
*/
// Create an S3 instance
const s3 = new AWS.S3();

var params = { 
  Bucket: 'trellix-realprotect-querylog-parsed',
  Delimiter: '/',
  Prefix: '2023-02-24//'}
 
 s3.listObjects(params, function (err, data) {
  if(err)console.log(err);
  else {
    // Convert the data to a string
    const fileContent = data.Body.toString('utf-8');

    // Apply your own method to the file content
    //const processedData = checkResponse(fileContent);
  }
  console.log(fileContent);
 });
// Define the S3 bucket and file you want to read
/*const bucketName = 'trellix-realprotect-querylog-parsed';
const fileName = '2023-02-24/';


// Get the object from the S3 bucket
s3.listObject({ Bucket: bucketName, Key: fileName }, function(err, data) {
  if (err) {
    console.log(err);
  } 
  
});*/
