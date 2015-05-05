# Documentation

## Libraries and Tools

BCMS-Web use the following dependencies : 
* [Express](http://expressjs.com/) as framework for the server.
* [mongoose](http://mongoosejs.com/) to connect with the mongo database.
* [React](http://facebook.github.io/react/) for building client side UI.
* [D3.js](http://d3js.org/) for client side visualizations. 
* [material ui](http://material-ui.com/) as reusable and pretty React UI elements.

and the following tools for building : 
* [browserfy](http://browserify.org/) + [reactify](https://github.com/andreypopp/reactify) to compile client side javascript files, JSX (React-specific javascript with XML) files, and their dependencies into a single, bundled javascript file.
* [autoless](https://github.com/jgonera/autoless) to compile less files into a single CSS file.
* [uglify](https://github.com/mishoo/UglifyJS2) to minify the bundled javascript in production build.

## Model

BCMS-Web use a single model called `Complaint` with the following schema
```json
id: String,
text: String,
timestamp: Number,
destinations: [Number],
entities: [
	{ 
		name: String, 
		class: String 
	}
],
relations: [
	{ 
		entity1: String,
		entity2: String,
		class: String 
	}
],
topic: String,
location: {
	name: String,
	latitude: String,
	longitude: String
}
```
That schema is corresponded with the schema of documents stored within `complaints` collection in `bcms` Mongo database.

## Routes

Route files are located in `/routes` directory.
* `/index` - Main page.
* `/agencies` - Returns JSON file with the following schema : 
```javascript
{
	"_id": "<agencies number>",
	"children": [
		{
			"topic": "<topic name>",
			"count": "<number of the topic within the particular agency>"
		}, ... 
	],
	"count": "<number of complaints addressed to corresponding agencies>" 
}
```
* `/map` - Returns JSON file with the following schema : 
```javascript
{
	"_id": {
		"name": "<location name>",
		"latitude": "<location latitude>",
		"longitude": "<location longitude>"
	},
	"topics": [
		{
			"topic": "<topic name>",
			"count": "<number of the topic within the particular location>"
		}, ... 
	],
	"total": <number of all complaints within the particular location>
}
```
* `/stream` - Returns JSON file with the following schema : 
```javascript
{
	"key": "<topic name>",
	"date": "<a date that fall within requested date parameter>"
	"value":"<how many times the topic has been addressed in the particular date>"
}
```
* `/word` - Returns JSON file with the following schema : 
```javascript
{
	"_id": "<topic name>",
	"count":"<how many times the topic has been addressed>"
}
```

## React Components

Component files are located in `/components` directory as JSX files. They use `material-ui` components.
* `Home` - A `Paper` containing welcoming text.
* `Navbar` - Navigation bar at the top, containing a centered logo, 3 `FlatButton` - About, FAQ, and Contact -  that show `Dialog` with appropriate text, and a `FlatButton` that links to the source page.
* `Toolbar` - Leftmost section, containing form to change request parameter. The form contains a `DropDown` to choose visualization modes, 2 `DatePicker` to choose interval, a `FlatButton` to show checkboxes for selecting agencies, and a `RaisedButton` that makes AJAX GET call to retrieve visualization data and then call `Visualization` component with corresponding `mode` propTypes. 
* `Visualization` - Rightmost section, calls a corresponding charting function based on `mode` propTypes to draw charts.

## Charting Functions

These functions utilize D3.js library to build various visualizations based on queried data.
* `pieChart` - A function located in `/utils/piechart.js`, is used to generate a pie chart to visualize the distribution of complaints between agencies.
* `mapChart` - A function located in `/utils/mapchart.js`, is used to generate a scatterplot placed on top of the map of Bandung to visualize the distribution of complaints based on mentioned location.
* `streamChart` - A function located in `/utils/streamchart.js`, is used to generate a stream chart to visualize trends of most popular topics based on date.
* `wordChart` - A function located in `/utils/wordchart.js`, is used to generate a word cloud to visualize popularity of various topics.

## Other Utilities

* `palette` - A collection of colors in material palette and functions to pick them in various ways.

## Views and Styles

* There are only 2 views, index and error. They are written as ejs files in `/views` directory. 
* Styles are written as less files in `/less` directory. Those files and material-ui style components will be compiled to single .css file in `/public/stylesheets`.