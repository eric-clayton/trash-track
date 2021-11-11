<script>
  import { onMount } from 'svelte';

  let username = null;

  onMount(async () => {
    let response = await fetch(`http://localhost:8080/api/username`);
    let responseObj = await response.json();

    if (response.status === 200) {
      username = responseObj.username;
    }
  });
</script>

<div class="welcome">
  <h1>Welcome to your profile!</h1>
  <h3>{username}</h3>

  <hr class="sep" />

  <h2>Your stats:</h2>

  <ul class="features">
    <li>890 Recycle Bins</li>
    <li>540 Trash Bins</li>
  </ul>

  xp bar right here

  <a href="/logout">
    <button class="signup">Logout :(</button>
  </a>
</div>

<style>
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sep {
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .features {
    font-size: 13pt;
    margin-top: 0.5rem;
  }

  .signup {
    padding-left: 5rem;
    padding-right: 5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-top: 2rem;
  }

  .signup:hover {
    background-color: darkseagreen;
  }

  ul {
    list-style-position: inside;
  }
</style>
