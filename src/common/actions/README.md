# Actions

From the [Redux docs](http://redux.js.org/docs/basics/Actions.html):
"Actions are payloads of information that send data from your application to
your store. They are the only source of information for the store. ... Action
Creators are exactly that—functions that create actions. It's easy to conflate
the terms 'action' and 'action creator,' so do your best to use the proper term."

## Action Creators

Action creators are functions that create actions.  Action Creators themselves do
not dispatch actions to reducers.  The following is an example of an Action Creator
which returns an synchronous action obejct:
``` javascript
// Synchronous Action Creator
function createTodoItem(name, dueDate){
	return {
		type: 'CREATE_TODO_ITEM',
		payload: { name, dueDate }
	}
}
```

## Synchronous Actions

The actions in this project are of two separate forms: synchronous and asynchronous.
Synchronous follow the schema of
[Flux Standard Actions](https://github.com/acdlite/flux-standard-action).
An example synchronous action would look like:

``` javascript
// Synchronous Action
{
	type: 'CREATE_TODO_ITEM',
	payload: {
		name: 'write docs',
		dueDate: '2016-10-10'
	},
	error: false, // optional
	meta: {
		// optional information about the action object
		// but not part of the payload
	}
}
```

## Asynchronous Actions

Web app behavior often requires asynchronous IO calls.  This project uses the
[`redux-thunk`](https://www.npmjs.com/package/redux-thunk) middleware to facilitate
dispatching asynchronous actions to represent these calls. Asynchronous actions are
functions that take `dispatch()` and `getState()` functions as parameters. When such
an action is dispatched, the middleware knows to execute the function and passes in
the Redux `dispatch()` and `getState()` functions as parameters.

The `dispatch()` function is used to dispatch other actions, either synchronous or
asynchronous.  If access to the current state is needed, the `getState()` function
provides access to the state within the Redux store.


The pattern used in this project for the body of such a function is:

1. Call an Action Creator and then dispatch the action.  (The reducer for this action
can do things like set an `isLoading` property within the state to `true`.)
1. Call some asynchronous function
1. In a callback (or promise `catch` method), create and dispatch an action on error.
(The reducer for this action can update the state with an error message.  At the
very least it should clear any `isLoading` values set by the first action.)
1. In a callback (or promise `then` method), create and dispatch an action on success.
(The reducer for this action should update the state based on the returned data.
At the very least it should clear and `isLoading` values set by the first action.)

Here is an example of an action that calls the hypothetical `asyncFunction()`:

``` javascript
// Asynchronous Action
(dispatch, getState) => {
	// 1. Dispatch action from existing Action Creator
	dispatch(creatingTodoItem());

	// 2. Call some asynchronous function
	asyncFunction((err, result) => {
		if (err) {
			// 3. Create and dispatch action on error
			dispatch(todoItemNotCreated(err));
		} else {
			// 4. Create and dispatch action on success
			dispatch(todoItemCreated(result));
		}
	});
}
```