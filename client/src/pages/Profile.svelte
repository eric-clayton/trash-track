<script>
  import { onMount } from 'svelte';

  let username = null;
  let bio = null;
  let trashCount = null;
  let recycleCount = null;
  let pfpURL = null;

  const xpPerLevel = 100;
  let remainingXP = null;
  let level = null;
  let progress = 0;

  onMount(async () => {
    let response = await fetch(`http://localhost:8080/api/userdata`);
    let responseObj = await response.json();

    if (response.status === 200) {
      username = responseObj.username;
      bio = responseObj.bio;
      trashCount = responseObj.trashCount;
      recycleCount = responseObj.recycleCount;
      pfpURL = responseObj.pfpURL;
      remainingXP = xpPerLevel - (responseObj.xp % xpPerLevel);
      level = responseObj.xp / xpPerLevel;
      progress = level - Math.floor(level);
      level = Math.floor(level);
    }
  });
</script>

<div class="welcome">
  <h1>{username}.</h1>
  {#if bio && bio !== ''}
    <div class="bio">
      <p>{bio}</p>
    </div>
  {/if}

  <hr class="sep" />

  <div class="profile">
    <img class="pfp" src={pfpURL} alt=""/>
    <div class="level">
      <h3>Level {level}</h3>
      <progress value={progress}></progress>
      <p>XP until next level: {remainingXP}</p>
    </div>
  </div>

  <h3>Logged Bins</h3>
  <p>Trash Bins: <span class="text-darkred">{trashCount}</span></p>
  <p>Recycle Bins: <span class="text-darkred">{recycleCount}</span></p>

  <div class="buttons">
    <a href="/config">
      <button class="button hoverbg-lightblue"><img src="/assets/feather/tool.svg" alt=""></button>
    </a>
    <a href="/logout">
      <button class="button hoverbg-lightred"><img src="/assets/feather/log-out.svg" alt=""></button>
    </a>
  </div>
</div>

<style>
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bio {
    width: 16rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: center;
  }

  .sep {
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .button {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hoverbg-lightblue:hover {
    background-color: lightblue;
  }

  .hoverbg-lightred:hover {
    background-color: indianred;
  }

  .buttons {
    margin-top: 1rem;
    display: flex;
    gap: 10%;
  }

  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .level {
    margin-left: 1rem;
  }

  .text-darkred {
    color: darkred;
  }
  
  /* IE10 */
  progress {
    -webkit-appearance: none;
    appearance: none;
    color: salmon;
  }

  /* Firefox */
  progress::-moz-progress-bar { 
    background: salmon;  
  }

  /* Chrome */
  progress::-webkit-progress-value {
    background: salmon;
  }

  h3 {
    margin-top: 1rem;
  }

  .pfp {
    height: 5rem;
    width: 5rem;
    /* box-shadow: 0px 0px 10px lightgrey; */
    border-radius: 0.6rem;
  }
</style>
