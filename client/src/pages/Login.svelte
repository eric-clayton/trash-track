<script>
</script>

<div class="welcome">
  <h1>You are not logged in :(</h1>

  <hr class="sep" />

  <a href="/auth/google">
    <button class="signup">Log in!</button>
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
</style>
