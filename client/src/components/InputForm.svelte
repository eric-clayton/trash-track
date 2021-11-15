<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let lat = '';
  export let lng = '';
  export let buttonText = 'submit';

  function onSubmit() {
    dispatch('formSubmit', { lat, lng });

    lat = '';
    lng = '';
  }

  function geoLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      });
    } else {
      console.log('Geolocation not available on this client.');
    }
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" bind:value={lat} name="lat" placeholder="Latitude" autocomplete="off" />
  <input type="text" bind:value={lng} name="lng" placeholder="Longitude" autocomplete="off" />
  <div class="buttons">
    <button type="submit" class="submit">{buttonText}</button>
    <button on:click={geoLocation} type="button" class="geo hoverbg-lightblue"
      ><img src="/assets/feather/map-pin.svg" alt="" /></button
    >
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }

  .buttons {
    display: flex;
  }

  .submit {
    flex-grow: 1;
    margin-right: 0.5rem;
  }

  .geo {
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hoverbg-lightblue:hover {
    background-color: lightblue;
  }
</style>
