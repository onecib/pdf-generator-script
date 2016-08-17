'use strict';


describe('PDF service', function () {
  var pdfService = require('./pdf.service');
  var fs = require('fs');

  var invoiceData = {
    'id': 10000000000000,
    'projectName': 'test',
    'customer': {
      'id': 20000000000000,
      'name': 'acme',
      'address': {
        'id': 56,
        'street': 'Way',
        'postalCode': '12345',
        'city': 'Town'
      }
    },
    'positions': [{
      'id': 78,
      'name': 'Run tests',
      'amount': 1,
      'scaleUnit': 'hours',
      'singlePrice': '9'
    }]
  };

  var expextedInvoiceFilePath = 'files/invoice-10000000000000-customer-20000000000000.pdf';

  var invalidInvoiceData = {
    'id': 30000000000000,
    'projectName': 'invaild'
  };

  afterEach(function () {
    fs.unlink(expextedInvoiceFilePath, function (err) {
      if (err) {
        throw err;
      }
    });
  });


  it('should return path of the generated PDF file', function () {
    expect(pdfService.generateFromInvoiceData(invoiceData)).toBe(expextedInvoiceFilePath);
  });

  it('should return "undefined" for invalid invoice data', function () {
    // Test as anonymous function call to catch an error.
    expect(function () {
      pdfService.generateFromInvoiceData(invalidInvoiceData);
    }).toThrow(new Error('Invoice data is not valid to generate the invoice pdf.'));
  });

});
