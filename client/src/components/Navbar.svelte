<script>
  export let linkArray;
  let open = false;
</script>

<div class="navbar">
  {#if open === true}
    {#each linkArray as link}
      <a href={link.address} class="navbar-link">{link.name}</a>
    {/each}
  {/if}

  <button on:click|preventDefault={() => (open = !open)} class="navbar-link">
    <img src="/assets/feather/menu.svg" alt="expand" />
  </button>
</div>

<style>
  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .navbar-link {
    text-decoration: none;
    text-align: center;
    font-size: 12pt;
    color: black;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: lightgrey;
    width: 100%;
    border-color: grey;
    border-bottom-style: solid;
    border-width: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button.navbar-link {
    border: none;
    border-radius: 0;
  }

  .navbar-link:hover {
    background-color: lightblue;
  }
</style>
