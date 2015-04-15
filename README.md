# BCMS-Web

BCMS-Web is a web visualization service for complaints data extracted from Bandung government agencies' twitter.
Currently, it has 4 types of visualization : 
* Agencies : Based on agencies that the complaints is addressed to, in the form of pie chart.
* Map : Based on locations that mentioned in the complaints, in the form of scatterplot on the map of Bandung.
* Stream : Based on trends of complaint topics in specified timeline, in the form of stream chart.
* Word : Based on topic frequencies, in the form of word cloud.

## Usage

Make sure you have nodejs and mongodb installed.

To install dependencies : 

```bash
cd to project directory
$ npm install
```

Compile client-side javascripts and less styles : 

```bash
$ npm run build
```

Use dummy data for testing : 

```bash
mongorestore --db bcms testdata
```

Run the database server : 

```bash
$ mongod
```

Run the server (make sure to run database server first) : 

```bash
$ npm start
```
## Compatibility
* Browsers with HTML5 and SVG support, i.e. IE9+, Chrome, Firefox, Safari, Opera.

## Known Issues
