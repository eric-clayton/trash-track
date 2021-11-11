<script>
  let username = '';

  async function onSubmit() {
    let response = await fetch(`http://localhost:8080/api/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    let responseObj = await response.json();
    let responseMessage = responseObj.message;

    console.log(responseMessage);

    if (response.status == 201) {
      console.log('success!!!');
      window.location.replace('/profile');
    } else {
      username = '';
    }
  }
</script>

<div class="welcome">
  <h1>Update your profile!</h1>
  <h3>A username is required.</h3>

  <hr class="sep" />

  <form on:submit|preventDefault={onSubmit}>
    <input
      type="text"
      bind:value={username}
      name="username"
      placeholder="username"
      autocomplete="off"
    />
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
