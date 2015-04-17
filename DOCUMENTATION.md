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

* `/index` - Main page.
* `/agencies` - Returns JSON file with the following schema : 
```json
{
	"_id": "<agencies number>",
	"count": "<number of complaints addressed to corresponding agencies>" 
}
```
* `/map` - Returns JSON file with the following schema : 
```json
{
	"_id": {
		"name": "<location name>",
		"latitude": "<location latitude>",
		"longitude": "<location longitude>"
	},
	"topics": [
		{
			"topic": "<topic name>",
			"count": "<number of the topic within a particular location>"
		}, ... 
	]
}
```
* `/stream` - Returns JSON file with the following schema : 
```json
{
	"_id": "<topic name>",
	"date": "<a date that fall within requested date parameter>"
	"count":"<how many times the topic has been addressed in the particular date>"
}
```
* `/word` - Returns JSON file with the following schema : 
```json
{
	"_id": "<topic name>",
	"count":"<how many times the topic has been addressed>"
}
```

## React Components

* Home - A div containing welcoming text.
* Navbar - Navigation bar at the top.
* Toolbar - Leftmost section, containing forms to change request parameter.
* Visualization - Rightmost section, calls charting utilities to draw charts.

## Charting Utilities

* pieChart - A pie chart to visualize the distribution of complaints between agencies.
* mapChart - A scatterplot placed on top of the map of Bandung to visualize the distribution of complaints based on mentioned location.
* streamChart - A stream chart to visualize trends of most popular topics based on date.
* wordChart - A word cloud to visualize popularity of various topics.

## Views and Styles

* There are only 2 views, index and error. They are written as ejs files in `/views` directory. 
* Styles are written as less files in `/less` directory. Those files and material-ui style components will be compiled to single .css file in `/public/stylesheets`.