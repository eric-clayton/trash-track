<script>
</script>

<div class="welcome">
  <h1>Welcome to your profile!</h1>
  <h3>something here</h3>

  <hr class="sep">

  <h2>your stats</h2>

  <ul class="features">
    <li>440 bench</li>
    <li>7 foot 5 inches</li>
    <li>lebrons best friend</li>
    <li>swag af</li>
  </ul>

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
