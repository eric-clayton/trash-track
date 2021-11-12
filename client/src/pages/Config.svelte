<script>
  let bio = '';

  async function onSubmit() {
  }
</script>

<div class="welcome">
  <h1>Settings.</h1>
  <h3>Where your dreams come true!</h3>

  <hr class="sep" />

  <form on:submit|preventDefault={onSubmit}>
    <input
      type="text"
      bind:value={bio}
      name="bio"
      placeholder="bio"
      autocomplete="off"
    />

    <input type="file" id="pfp" name="pfp" accept="image/*" />

    <button type="submit" class="submit">submit</button>
  </form>

  <!--
  <a href="/logout">
    <button class="signup">Logout :(</button>
  </a>
-->
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

  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }
</style>
