'use strict';


/*
 * Some dummy data to play with.
 */
var dummyData = [{
  'id': 42,
  'projectName': 'Erstellen einer Webseite',
  'customer': {
    'id': 100,
    'name': 'MüllerMayer AG',
    'address': {
      'id': 1,
      'street': 'Mühlweg 12',
      'postalCode': '80801',
      'city': 'München'
    }
  },
  'positions': [{
    'id': 1234,
    'name': 'Mockups erstellen',
    'amount': 12,
    'scaleUnit': 'hours',
    'singlePrice': '60.50'
  }, {
    'id': 1235,
    'name': 'Rapid Prototype entwickeln',
    'amount': 30,
    'scaleUnit': 'hours',
    'singlePrice': '70.80'
  }, {
    'id': 1236,
    'name': 'Prototype Vorstellung',
    'amount': 3,
    'scaleUnit': 'hours',
    'singlePrice': '30.10'
  }, {
    'id': 1237,
    'name': 'Website entwickeln',
    'amount': 95,
    'scaleUnit': 'hours',
    'singlePrice': '65.10'
  }, {
    'id': 1238,
    'name': 'Schulung',
    'amount': 27,
    'scaleUnit': 'hours',
    'singlePrice': '15.10'
  }, {
    'id': 1239,
    'name': 'Hardware',
    'amount': 1,
    'scaleUnit': 'fix',
    'singlePrice': '2589.10'
  }]
}, {
  'id': 666,
  'projectName': 'Corrupt data'
}];



/**
 * Helper to get the needed data from the dummy data.
 * @param  {Number} invoiceId
 * @return {Opject}
 */
function getInvoiceDataFromDummyData(invoiceId) {
  for (var i = dummyData.length - 1; i >= 0; i--) {
    if (dummyData[i].id !== undefined && dummyData[i].id === invoiceId) {
      return dummyData[i];
    }
  }

  // If the invoice was not found, throw an exception.
  throw new Error('No data found for invoice id ' + invoiceId + '.');
}



/**
 * Get the data for the given invoice id from the database.
 * In this test-case get it from the dummy data.
 * @param  {number} invoiceId
 * @return {Object}
 */
function getInvoiceData(invoiceId) {
  // Get the data from the database. In this test get it from the dummyData.
  try {
    return getInvoiceDataFromDummyData(invoiceId);
  } catch (error) {
    throw error;
  }

}

exports.getInvoiceData = getInvoiceData;
