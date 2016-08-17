'use strict';


describe('Data service', function () {
  var dataService = require('./data.service');

  it('should return invoice Data for valid invoice ids', function () {
    expect(dataService.getInvoiceData(42)).toBeDefined();
  });

  it('should throw an error for invalid invoice ids', function () {
    // Test as anonymous function call to catch an error.
    expect(function () {
      dataService.getInvoiceData(10000000000000);
    }).toThrow(new Error('No data found for invoice id 10000000000000.'));
  });

});
