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

  async function onDelete() {
    let userDataResponse = await fetch(`http://localhost:8080/api/userdata`);
    let userObj = await userDataResponse.json();
    let username = userObj.username;

    let deleteResponse = await fetch(`http://localhost:8080/api/user/${username}`, {
      method: 'DELETE',
    });
    let deleteObj = await deleteResponse.json();
    let deleteMessage = deleteObj.message;

    console.log(deleteMessage);

    if (deleteResponse.status == 200) {
      console.log('deleted!!!');
      window.location.replace('/home');
    }
  }
</script>

<div class="welcome">
  <h1>Settings.</h1>
  <h3>Where your dreams come true!</h3>

  <hr class="sep" />

  <form on:submit|preventDefault={onSubmit}>
    <h4>Biography:</h4>
    <textarea
      bind:value={bio}
      name="bio"
      placeholder="Talk about you! (max 80 chars)"
      maxlength="80"
      rows="2"
    />

    <h4>Profile Picture Url:</h4>
    <input
      type="text"
      bind:value={pfpURL}
      name="pfpURL"
      placeholder="www.thiscouldbeyourpfp.com/wow.png"
      autocomplete="off"
    />

    <button type="submit" class="submit">Submit</button>
  </form>

  <button on:click={onDelete} type="button" class="delete-button hoverbg-lightred"
    >Delete Account<img src="/assets/feather/user-x.svg" alt="Delete User" /></button
  >

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

  .delete-button {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .delete-button img {
    margin-left: 0.8rem;
  }

  .hoverbg-lightred:hover {
    background-color: indianred;
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
