# 11282group44

Member 1: Joseph Somerdin
\
Member 2: Eric Clayton
\
Member 3: Ashish Satyavarapu
\
Member 4: Giovanni Cornejo

---

# trash-track

## A web-application to track trash bins and recycling bins.

*You will need to have Node.js installed (This project uses v14.18.1). Install it using nvm: [unix](https://github.com/nvm-sh/nvm) / [windows](https://github.com/coreybutler/nvm-windows).*

```bash
nvm install 14.18.1
nvm use 14.18.1
```

If you're using [Visual Studio Code](https://code.visualstudio.com/), install the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## How to work on the code

Clone the repository:

```bash
git clone https://github.com/asleeponpluto/11282group44.git
```

Install node dependencies:

```bash
cd 11282group44/client
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

Now navigate to `http://localhost:8080` in your browser to see live changes.

## Building the client for production

Build an optimised version of the app (you should be in the client folder):

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).
