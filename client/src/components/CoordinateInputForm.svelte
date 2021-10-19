<script>
  import { onDestroy } from 'svelte';
  import { coordArray } from '../stores.js';

  let lat = '';
  let lng = '';
  let coordStore;

  const testPoints = [
    { lat: 29.6488, lng: -82.3433 }, // century tower
    { lat: 29.6465, lng: -82.3479 }, // reitz union
    { lat: 29.6381, lng: -82.3686 }, // southwest rec
    { lat: 29.6481, lng: -82.3437 }, // marston science library
  ];

  function coordsEqual(first, second) {
    if (first.lat === second.lat && first.lng === second.lng) {
      return true;
    }

    return false;
  }

  function onSubmit() {
    if (coordStore.some((coord) => coordsEqual(coord, { lat: lat, lng: lng })) === false) {
      coordArray.update((value) => {
        return [...value, { lat: lat, lng: lng }];
      });
    } else {
      // TODO: alert user that points have already been added.
    }

    lat = '';
    lng = '';
  }

  function loadTestPoints() {
    coordArray.update((value) => {
      return [...value, ...testPoints];
    });
  }

  const unsubscribe = coordArray.subscribe((value) => {
    coordStore = value;
  });

  onDestroy(unsubscribe);
</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" bind:value={lat} name="lat" placeholder="latitude" autocomplete="off" />
  <input type="text" bind:value={lng} name="lng" placeholder="longitude" autocomplete="off" />
  <button type="submit">submit</button>
  <button type="button" on:click={loadTestPoints}>load test points</button>
</form>

<div class="storedPoints">
  {#each coordStore as coord}
    <h3>lat: {coord.lat}, lng: {coord.lng}</h3>
  {/each}
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 30vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }

  .storedPoints {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
