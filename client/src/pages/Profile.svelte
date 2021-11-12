<script>
  import { onMount } from 'svelte';

  let username = null;
  let trashCount = null;
  let recycleCount = null;

  const xpPerLevel = 100;
  let remainingXP = null;
  let level = null;
  let progress = 0;

  onMount(async () => {
    let response = await fetch(`http://localhost:8080/api/userdata`);
    let responseObj = await response.json();

    if (response.status === 200) {
      username = responseObj.username;
      trashCount = responseObj.trashCount;
      recycleCount = responseObj.recycleCount;
      remainingXP = xpPerLevel - (responseObj.xp % xpPerLevel);
      level = responseObj.xp / xpPerLevel;
      progress = level - Math.floor(level);
      level = Math.floor(level);
    }
  });
</script>

<div class="welcome">
  <h1>{username}.</h1>

  <hr class="sep" />

  <div class="profile">
    <img class="pfp" src="https://townsquare.media/site/675/files/2019/08/67661039_2600194060216546_4230772670389551104_n-e1565265186272.jpg?w=980&q=75" alt=""/>
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

  h3 {
    margin-top: 1rem;
  }

  .text-darkred {
    color: darkred;
  }

  .pfp {
    height: 5rem;
    width: 5rem;
  }
</style>
