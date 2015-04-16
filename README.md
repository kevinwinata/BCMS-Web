# BCMS-Web

BCMS-Web is a web visualization service for complaints data extracted from Bandung government agencies' twitter.
Currently, it has 4 types of visualization : 
* Agencies : Based on agencies that the complaints is addressed to, in the form of pie chart.
* Map : Based on locations that mentioned in the complaints, in the form of scatterplot on the map of Bandung.
* Stream : Based on trends of complaint topics in specified timeline, in the form of stream chart.
* Word : Based on topic frequencies, in the form of word cloud.

[Documentation](DOCUMENTATION.md)

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

* Layout may broke when viewed under low resolution.

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.