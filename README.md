GIOVANNI CORNEJO
*Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# trash-track

## A web-application to track trash bins and recycling bins.

*You will need to have Node.js installed (This project uses v14.17.6). Install it using nvm: [unix](https://github.com/nvm-sh/nvm) / [windows](https://github.com/coreybutler/nvm-windows).*

```bash
nvm install 14.17.6
nvm use 14.17.6
```

If you're using [Visual Studio Code](https://code.visualstudio.com/), install the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## How to work on the code

Clone the repository:

```bash
git clone https://github.com/asleeponpluto/trash-track.git
```

Install node dependencies:

```bash
cd trash-track/client
npm install
cd ../server
npm install
```

## Starting the application

When working on the app, it is best to run the client and the server simultaneously so that you don't need to rebuild the svelte app everytime you make changes.
\
\
Start the client (you should be in the client folder):

```bash
npm run dev
```

Start the server (you should be in the server folder):

```bash
npm run dev
```

## Building the client for production

Build an optimised version of the app (you should be in the client folder):

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying a release

The server is set up so that going to http://localhost:8080/gui will automatically run the last built version of the client. When ready to release, simply run the server after building the client and everything else will be taken care of.
