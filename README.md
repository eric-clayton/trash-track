*Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# trash-track

### A web-application to track trash bins and recycling bins.

*Note that you will need to have [Node.js](https://nodejs.org) installed. It is recommended that you install it using nvm: [unix](https://github.com/nvm-sh/nvm#installing-and-updating) / [windows](https://github.com/coreybutler/nvm-windows).*


## How to work on the code

Clone the repository...

```bash
git clone https://github.com/asleeponpluto/trash-track.git
```

...install node dependencies...

```bash
cd trash-track 
npm install
```

...then start the application by using [Rollup](https://rollupjs.org) (already installed):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

If you're using [Visual Studio Code](https://code.visualstudio.com/), install the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).
