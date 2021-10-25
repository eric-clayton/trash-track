<script>
  import Navbar from './components/Navbar.svelte';
  import Header from './components/Header.svelte';
  import Divider from './components/Divider.svelte';

  import { Router, Link, Route } from 'svelte-navigator';
  import Home from './pages/Home.svelte';
  import Find from './pages/Find.svelte';
  import Add from './pages/Add.svelte';

  let linkArray = [
    { name: 'Home', address: '/home' },
    { name: 'Find a Location', address: '/find' },
    { name: 'Add a Location', address: '/add' },
    { name: 'Profile', address: '/profile' },
  ];
</script>

<main class="container">
  <Header />
  <Navbar {linkArray} />

  <Divider />

  <Router>
    <div>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/find">
        <Find />
      </Route>

      <Route path="/add">
        <Add />
      </Route>

    </div>
  </Router>
</main>

<style>
  .container {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
