<script>
  let bio = '';
  let pfpURL = '';

  async function onSubmit() {
    let response = await fetch(`http://localhost:8080/api/config`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio, pfpURL }),
    });
    let responseObj = await response.json();
    let responseMessage = responseObj.message;

    console.log(responseMessage);

    if (response.status == 201) {
      console.log('success!!!');
      window.location.replace('/profile');
    } else {
      bio = '';
      pfpURL = '';
    }
  }
</script>

<div class="welcome">
  <h1>Settings.</h1>
  <h3>Where your dreams come true!</h3>

  <hr class="sep" />


  <form on:submit|preventDefault={onSubmit}>
    <h4>Biography:</h4>
    <textarea bind:value={bio} name="bio" placeholder="Talk about you! (max 80 chars)" maxlength="80" rows="2"></textarea>

    <h4>Profile Picture Url:</h4>
    <input
      type="text"
      bind:value={pfpURL}
      name="pfpURL"
      placeholder="www.thiscouldbeyourpfp.com/wow.png"
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

  h4 {
    margin-bottom: 0.4rem;
  }

  textarea {
    resize: none;
  }
</style>
