# Data IO
Repositories and strategies allow client- and server-specific code to perform the same IO
operations in client- and server-specific ways.

## Rationale
All IO from the browser should go through the server.  This means that all
API, database, and file system IO can be abstracted through routes on the server greatly
simplifying authentication, CORS headers, etc.

While the philosophy of routing all client-side IO through the server provides benefits, it also
poses a challenge for isomorphic sites.  Specifically, when the initial page-load is being
rendered on the server, IO should *not* be routed through server routes, instead, it should hit
data sources directly.  Similarly, the server routes that facilitate client-side IO also need
to hit those same data sources.

When using Redux, React components should be restricted to rendering state and dispatching
actions.  They shouldn't perform any IO.  Reducers are pure functions that create a new state
from the combination of an existing state and an action object.  As pure functions, they shouldn't
be performing IO either.  Thus, in the Redux trifecta of Actions, Reducers, and Componenets,
Actions (specifically Action Creators) are the only functions that should be performing IO.

However, actions are fundamental part of the Flux pattern and are thus a part of the common code
which is shared between the client and server.  The solution implemented by this project is to
add a layer of indirection in which IO operations are performed by name rather than calling
functions directly.

Repositories and Strategies are the mechanism by which named IO operations are injected into
client- and server-side code.

## Repositories
* Configure the repository in both the server and client `index.js` file.
* The names of all strategies within the repositories *must* be identical 

The repository can be configured with multiple strategies.
Both the client and server should define their own strategies (see below) and should configure
their own repository.

Example of configuring the repository (on the server):
``` js
import { createRepository } from '{root}/src/common/utils/repository';
import { userDataStrategy } from '{root}/src/server/strategies/userDataStrategy';
// NOTE: client would use a different strategy

createRepository({
	userData: userDataStrategy
	// more strategies could be added here
});
```

Now in any code (client, server, or common), a strategy can be accessed via the repository:
``` js
import { getRepository } from '{root}/src/common/utils/repository';

const userDataStrategy = getRepository().userData;

// Use the strategy
userDataStrategy('get', { username });
```

## Strategies

"Strategies" expose named IO operations.  A strategy module should expose a sinlge function which
accepts an operation name and an object containing any values needed to perform the operation.

Example:
``` js
function operationA(values) {
	return new Promise((resolve, reject) => {
		// perform IO
	});
}

function operationB(values) {
	return new Promise((resolve, reject) => {
		// perform IO
	});
}

export default function (name, values) {
	switch (name) {
		case 'operationA':
			return operationA(values);
		case 'operationB':
			return operationB(values);
	}
}
```

This allows the client- and server-specific code to perform IO operations by name rather than
by calling a common function.
