### 11282group44

Member 1: Joseph Somerdin
\
Member 2: Eric Clayton
\
Member 3: Ashish Satyavarapu
\
Member 4: Giovanni Cornejo

---

# trash-track

A web-application to track trash/recycling bins.

## Build/Run Instructions

- Install Node.js [here](https://nodejs.org/en/) (v16.13.0 tested working)
- Install MongoDB [here](https://www.mongodb.com/try/download/community) (Add install directory to path on windows)

Clone the repository:

```bash
git clone https://github.com/asleeponpluto/11282group44.git
```

Install node dependencies:

```bash
cd 11282group44/server
npm install
cd ../client
npm install
```

Build Svelte frontend:
```bash
# must be in client directory
npm run build
```

Run server:
```bash
# must be in server directory
npm run start
```

Now navigate to `http://localhost:8080` in your browser.

## Using auto-reload when working on the app

Auto-reload Svelte frontend:
```bash
# must be in client directory
npm run dev
```

Auto-reload server:
```bash
# must be in server directory
npm run dev
```

Now navigate to `http://localhost:8080` in your browser.
