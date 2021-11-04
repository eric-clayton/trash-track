<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let lat = '';
  export let lng = '';

  function onSubmit() {
    dispatch('formSubmit', {lat, lng});

    lat = '';
    lng = '';
  }

</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" bind:value={lat} name="lat" placeholder="latitude" autocomplete="off" />
  <input type="text" bind:value={lng} name="lng" placeholder="longitude" autocomplete="off" />
  <button type="submit">submit</button>
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
</style>
