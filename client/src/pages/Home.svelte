<script>
</script>

<div class="welcome">
  <h1>Welcome to Trash Track!</h1>
  <h3>Saving the world one 🗑️ at a time.</h3>

  <hr class="sep" />

  <h2>What can you do with Trash Track?</h2>

  <ul class="features">
    <li>View nearby trash/recycling bin locations 🗺️</li>
    <li>Level up your profile when adding new bins 🐠</li>
    <li>Share your <i>impressive</i> profile with friends 👫</li>
    <li>Keep track of your favorite bin locations 📝</li>
  </ul>

  <a href="/auth/google">
    <button class="signup">Sign me up!</button>
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
