# IT – Softwareentwickler JavaScript Aufgabe 4: pdf generator script 

## Usage

### Setup
```bash
git clone https://github.com/webcore-it/pdf-generator-script.git
cd pdf-generator-script
npm install
```

### Run

The script takes an invoice id as first args parameter. Possible test invoice ids are `42` and `666` (dummy data can be found in `/services/data.service.js`).

To generate a pdf run:
```bash
# Generates a pdf invoice in the files folder:
node app.js 42
```

To get error messages run:

```bash
# Invalid invoice data:
node app.js 666
```

```bash
# No invoice found:
node app.js 1337
```

```bash
# Invalid invoice id:
node app.js oneTwoThree
```

## Tests

Test are writen as jasmine spec files. So jasmine must be installed to be able to run the tests (`npm install -g jasmine`).

```bash
# Run the tests:
jasmine
```
