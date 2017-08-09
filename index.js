const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression

const csvFilePath = 'Advertising.csv';
let csvData = [], //parsed data
	X = [],
	y = []; // Output

let regressionModel;

const readline = require('readline'); //for user prompt to allow predictions

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

csv()
.fromFile(csvFilePath)
.on('json', (jsonObj) => {
	csvData.push(jsonObj);
})
.on('done', () => {
	dressData(); //To get data points from JSON Objects
	performRegression();
});

function performRegression() {
	regressionModel = new SLR(X, y); // train the model on training data
	console.log(regressionModel.toString(3));
	predictOutput();
}


/**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */
function dressData() {
	csvData.forEach((row) => {
		X.push(f(row.Radio));
		y.push(f(row.Sales));
	});
}

function f(s) {
	return parseFloat(s);
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    });
}
