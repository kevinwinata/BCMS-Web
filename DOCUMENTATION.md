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
* `/index`
* `/agencies`
* `/map`
* `/stream`
* `/word`

## React Components
* Home
* Navbar
* Toolbar
* Visualization

## Charting Utilities
* pieChart
* mapChart
* streamChart
* wordChart

## Views and Styles
* There are only 2 views, index and error. They are written as ejs files in `/views` directory. 
* Styles are written as less files in `/less` directory. Those files and material-ui style components will be compiled to single .css file in `/public/stylesheets`.