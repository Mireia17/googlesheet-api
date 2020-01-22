const GoogleSpreadsheet = require ('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client.json');

function printAnswer (response) {
    console.log(`${response.answer}`)
}
async function accessSpreadsheet(row, id) {
    const doc = new GoogleSpreadsheet(id);
    await promisify(doc.useServiceAccountAuth)(creds); //this will give us access to the spreadsheet
    const info = await promisify(doc.getInfo)(); //here we are getting the info from the spreadsheet
    const sheet = info.worksheets[0];
    
    const rows = await promisify(sheet.getRows)({
        query: (`key = ${row}`) // here we will need to add the 
    });
    
    rows.forEach(row => {
        printAnswer(row);
    })
}

accessSpreadsheet("Shipping_Costs", '1UKn3Nb-yz9CYkbwc3nqZFwd592I19bDjqR-r-PiVtpc');