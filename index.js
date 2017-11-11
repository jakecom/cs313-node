var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/math', function(request, response) {
	handleMath(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function handleMath(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	// TODO: Here we should check to make sure we have all the correct parameters

	var operation = requestUrl.query.operation;
	var operand1 = Number(requestUrl.query.operand1);

	computeOperation(response, operation, operand1);
}

function computeOperation(response, op, left) {
	op = op.toLowerCase();

	var temp = left;

	left = left - 1;
	if (left < 0){
		left = 0;
	}

	var result = 0;

	if (op == "letters(stamped)") {
		result = (left * 0.21) + 0.49;
	} else if (op == "letters (metered)") {
		result = (left * 0.21) + 0.46;		
	} else if (op == "large envelopes (flats)") {
		result = (left * 0.23) + 0.98;
	} else if (op == "parcels") {
		result = (left * 0.16) + 3.00;
	} else {
	
	}

	left = temp;

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {operation: op, left: left, result: result};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}
