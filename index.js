const express = require('express');
const app = express();
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const REGION = process.env.REGION || "us-west-2";

const dynamoDB = new DynamoDBClient({
	// credentials: {
	// 	accessKeyId: "",
	// 	secretAccessKey: ""
	// },
	region: `${REGION}`,
});

app.get('/:item', readFromDynamoDB);
app.get('/', (req, res) => res.send('specify an item like /cats'));

app.listen(8080);
console.log("listening on port 8080, Dynamo Region", REGION);

function readFromDynamoDB(req, res) {
	const params = {
		TableName: req.params.item
	};

	console.log(`reading ${req.params.item} from DynamoDB`);
	const data = dynamoDB.send(new ScanCommand(params));
	data.then(result => res.send(result.Items)).catch(err => res.send(err))
}


