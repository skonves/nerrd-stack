# Division of Code
Isomorphism literally means that the client and server both run code of the "same shape" and for the NERRd stack, this is largely true; however, there are cases where client- and server-side code differ.  The bulk of the site will be embodied by the Flux pattern wherein Components, Actions, and Reducers manage and render state in a unidirectional flow.  Elements of the Flux cycle are contained in the `/common` folder and are 100% shared.  However, to get this Flux cycle going, it has to be "bootstrapped" and that bootstrapping is a little different between client and server.  In addition to bootstrapping, Data IO is a little different between client and server.  This is covered in more depth in the [Data IO Readme](./server/strategies/README.md).  Server-specific code is found in `/server` and client-specific code is found in `/client`.

## /client
The entry point for the client-side code is `/client/index.js`.  This code is executed one everytime the page is loaded from the server (eg. first page load, or if the page is manually refreshed, etc.).  Anything that needs to be added as part of the client-side bootstrapping process should be added here.  Please note that most logic should **not** go here but will likely have better home in one of the Flux elements, in the router (See routing readme ... `// TODO: write and link`), or in one of the Data IO elements.

## /common
This is were 99% of the magic happens.  This code is executed on both the client and the server, so don't make any references to anything like `fs` or `window`.

### /common/actions
This is where actions (and Action Creators) are defined.  If you need to add a new way for a user to interact with the web app (eg, a new button to click, a new panel to expand, etc), you will likely need to start by adding an Action Creator.  Read the [Actions Readme](./common/actions/README.md) for more info.

### /common/components
This is where React Components live.

### /common/reducers
This is where reducers live.  After you add an new action, you will need to add reducer methods which create an updated state for the application.  Read the Reducers Readme (`// TODO: add and link`) for more info.

### /common/routes
This is where logic exists that maps the current URI to a hierarchy of components using [React Router](https://github.com/ReactTraining/react-router).  The NERRd Stack employs the philosophy that, whenever possible, all activity in the site should be communicated via the URI.  React Router's `onEnter` methods are used to "pre-hydrate" state when navigation happens: both during first page load on the server-side and when navigation occurs on the client.  If you need to add a new Component, you will likely need to update the router.  Read the Routing Readme (`// TODO: add and link`) for more info.

### /common/utils
This is where any miscellaneous utility code lives.  Remember, this is common code.  So don't try to access any IO or browser globals.

## /server
The entry point for the server-side code is `/server/server.js`.  This code (similar to `/client/index.js`) is executed one everytime the page is loaded from the server (eg. first page load, or if the page is manually refreshed, etc.).  `// TODO: add info or readme about server bootstrapping`