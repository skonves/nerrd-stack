# Node + Express + React + Redux (NERRd)

## Node
Browsers run Javascript; servers run whatever. Using [Node](https://nodejs.org) on
the server means that both the client and server can run code written in the same
language.  This allows for an "Isomorphic" architecture in which the client- and
server-side code is largely one and the same providing several benefits:

* **Performance** - Page rendering happens using the same logic as the
frontend before the page is even served.  This improves performance by allowing
for the first paint to happen before Javascript is loaded, compiled, and run on
the client.
* **Code reuse** - Logic does not have to be independently implemented in both the
client and server code.  Less code means less development and maintenance costs.
* **SEO** - Server-side rendering also means that search engine bots see HTML, not
a blank page.  As a bonus, users who disable Javascript also get to see content.

## Express
"[Express](http://expressjs.com/) is a minimal and flexible Node.js web
application framework that provides a robust set of features for web and mobile
applications."

## React
"[React](https://facebook.github.io/react/) makes it painless to create
interactive UIs. Design simple views for each state in your application,
and React will efficiently update and render just the right components
when your data changes."

## Redux
"[Redux](http://redux.js.org/) is a predictable state container for JavaScript apps".
At a very high level, Redux is a simple take on the Flux pattern that facilitates
a unidirectional flow of data between Components, Actions, and Reducers.

Components have knowledge of Actions which represent various UI events.  Actions
are dispatched to Reducers which create an updated version of the application
state.  This updated state is the passed as props to the Components rendering an
updated UI.

Redux as a package manages the "Store" which houses the application state.  It also
provides a pattern for laying out the reducer functions used to configure the
Store.

# How do I...

## Run this example site?
1. Get the code by cloning this repo
1. Install dependencies by running `npm install`
1. Build by runing `npm run build`
1. Start by runing `npm start`
1. Access the site by navigating to `http://localhost:3000`