/**
 * Script to generate pdf files for given invoice id.
 */
'use strict';

var dataService = require('./services/data.service');
var pdfService = require('./services/pdf.service');

var invoiceId,
  invoiceData,
  generatedFile;


// Get invoice id from args.
invoiceId = process.argv[2];
if (isNaN(invoiceId)) {
  console.log('[ERROR] Please enter a valid invoice id.');
  return false;
}

// Convert the args string to a number.
invoiceId = parseInt(invoiceId, 10);


// Get invoice data for given id.
try {
  invoiceData = dataService.getInvoiceData(invoiceId);
} catch (error) {
  console.log('[ERROR] ' + error.message);
  return false;
}


// Generate pdf file.
// Get invoice data for given id.
try {
  generatedFile = pdfService.generateFromInvoiceData(invoiceData);
} catch (error) {
  console.log('[ERROR] ' + error.message);
  return false;
}


console.log('[OK] Successfully generated PDF file at: ' + generatedFile);
