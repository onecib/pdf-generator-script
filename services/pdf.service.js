'use strict';


var fs = require('fs');

var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

var pdfmake = require('pdfmake');
var printer = new pdfmake(fonts);

/**
 * Checks if the given invoice data is valid to be used as data source.
 * @param  {Object} invoiceData
 * @return {Boolean}
 */
function isValidInvoiceData(invoiceData) {

  if (invoiceData === undefined) {
    return false;
  }

  if (invoiceData.id === undefined) {
    return false;
  }

  if (invoiceData.customer === undefined) {
    return false;
  }

  // Todo: Add more validation.

  return true;
}



/**
 * Helper to translate scale units into text.
 * @param  {String} scaleUnit
 * @return {String}
 */
function translateScaleUnit(scaleUnit) {
  switch (scaleUnit) {
  case 'hours':
    return 'Std';
  case 'fix':
    return '';
  default:
    return '';
  }
}



/**
 * Helper to get the price of a invoice position.
 * The return value will always have 2 decimal digits.
 * @param  {Number} amount
 * @param  {Number} price
 * @return {Number}
 */
function calcualtePrice(amount, price) {
  return (amount * price).toFixed(2);
}



/**
 * Helper to get the tax value of a invoice position.
 * The return value will always have 2 decimal digits.
 * @param  {Number} amount
 * @param  {Number} price
 * @return {Number}
 */
function calcualteTaxPrice(amount, price) {
  return (calcualtePrice(amount, price) * 0.19).toFixed(2);
}



/**
 * Helper to generate the pdf address layout of the invoice recipient.
 * @param  {Object} customer
 * @return {Object}
 */
function getCustomerAddress(customer) {
  return {
    text: customer.name + '\n' + customer.address.street + '\n' + customer.address.postalCode + ' ' + customer.address.city,
    style: 'address'
  };
}



/**
 * Helper to generate the pdf positions table layout of the invoice positions.
 * @param  {Object} positions
 * @return {Array}
 */
function getPositions(positions) {

  var sumNet = 0,
    sumTax = 0;

  // Definition of the table header.
  var result = [
    [{
      text: 'Leistung',
      style: 'tableHeader'
    }, {
      text: 'Menge',
      style: 'tableHeader'
    }, {
      text: 'Einzelpreis in EUR',
      style: 'tableHeader'
    }, {
      text: 'MwSt-Satz',
      style: 'tableHeader'
    }, {
      text: 'MwSt in EUR',
      style: 'tableHeader'
    }, {
      text: 'Nettobetrag in EUR',
      style: 'tableHeader'
    }]
  ];


  for (var i = 0, l = positions.length; i < l; i++) {
    // Calculate the prices of the current position and sum them up for total.
    var taxPrice = calcualteTaxPrice(positions[i].amount, positions[i].singlePrice),
      price = calcualtePrice(positions[i].amount, positions[i].singlePrice);
    sumTax += parseFloat(taxPrice);
    sumNet += parseFloat(price);

    // Add position as new row.
    result.push([
      positions[i].name,
      positions[i].amount + ' ' + translateScaleUnit(positions[i].scaleUnit),
      positions[i].singlePrice,
      '19,0%',
      taxPrice,
      price
    ]);
  }

  // Finally add the total prices
  result.push([{
    colSpan: 5,
    text: 'Summe Netto:',
    style: 'tablePrice'
  }, '', '', '', '', {
    text: sumNet.toFixed(2),
    style: 'tablePrice'
  }]);

  result.push([{
    colSpan: 5,
    text: 'gesetzl. MwSt.:',
    style: 'tablePrice'
  }, '', '', '', '', {
    text: sumTax.toFixed(2),
    style: 'tablePrice'
  }]);

  result.push([{
    colSpan: 5,
    text: 'Summe Brutto:',
    style: 'tablePrice'
  }, '', '', '', '', {
    text: (sumNet + sumTax).toFixed(2),
    style: 'tablePrice'
  }]);

  return result;
}



/**
 * Generates a invoice pdf for the given invoice data.
 * Returns the path to the generated file.
 * @param  {Object} invoiceData
 * @return {String}
 */
function generateFromInvoiceData(invoiceData) {

  // Validate the given data.
  if (isValidInvoiceData(invoiceData) === false) {
    throw new Error('Invoice data is not valid to generate the invoice pdf.');
  }




  var filePath = 'files/invoice-' + invoiceData.id + '-customer-' + invoiceData.customer.id + '.pdf';

  var customerAddress = getCustomerAddress(invoiceData.customer);
  var positions = getPositions(invoiceData.positions);

  // Definition of the pdf file.
  var docDefinition = {
    content: [{
        text: 'SUPER COMPANY',
        style: 'companyLogo'
      },
      customerAddress, {
        text: 'Rechnung Nr.: ' + invoiceData.id,
        style: 'invoiceNumber'
      }, {
        style: 'positionsTable',
        table: {
          headerRows: 1,
          body: positions

        }
      }
    ],
      styles: {
        invoiceNumber: {
          fontSize: 18,
          margin: [0, 50, 0, 10]
        },
        address: {
          fontSize: 16,
          margin: [0, 10, 0, 5]
        },
        positionsTable: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        tablePrice: {
          alignment: 'right',
          fontSize: 14,
          bold: true,
        },
        companyLogo: {
          fontSize: 28,
          bold: true,
          alignment: 'right',
          margin: [0, 40, 0, 40]
        }
      }
    };


  // Create a new pdf document and fill with content.
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.end();

  // Return the path of the generated file.
  return filePath;
}

exports.generateFromInvoiceData = generateFromInvoiceData;
