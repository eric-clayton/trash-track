<script>
  import { onDestroy } from 'svelte';
  import { coordArray } from '../stores.js';
  import { clickedCoords } from '../stores.js';

  let lat = '';
  let lng = '';
  let coordStore;
  let clickedStore;
  let near = null;

  const clickedUnsubscribe = clickedCoords.subscribe((value) => {
    clickedStore = value;
  });

  const coordUnsubscribe = coordArray.subscribe((value) => {
    coordStore = value;
  });

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

  async function onSubmit() {
    let response = await fetch(`http://localhost:8080/api/nearby?lat=${lat}&lng=${lng}`);
    let responseObj = await response.json();
    let responseCoord = responseObj.coordinates;
    near = responseObj;

    console.log(`Distance: ${responseObj.distance}`);

    coordArray.update((value) => {
      return [{lat: responseCoord.lat, lng: responseCoord.lng}];
    });

    lat = '';
    lng = '';
  }

  function loadTestPoints() {
    coordArray.update((value) => {
      return [...value, ...testPoints];
    });
  }

  function updateFormWithClicked() {
    if (clickedStore) {
      lat = clickedStore.lat;
      lng = clickedStore.lng;
    }
  }

  $: clickedStore, updateFormWithClicked();

  onDestroy(() => {
    coordUnsubscribe();
    clickedUnsubscribe();
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <button type="button" on:click={() => console.log('implement me!')}>geolocation</button>
  <input type="text" bind:value={lat} name="lat" placeholder="latitude" autocomplete="off" />
  <input type="text" bind:value={lng} name="lng" placeholder="longitude" autocomplete="off" />
  <button type="submit">submit</button>
</form>

<!--
<div class="storedPoints">
  {#each coordStore as coord}
    <h3>lat: {coord.lat}, lng: {coord.lng}</h3>
  {/each}
</div>
-->

{#if near != null}
  <div class="near">
    <h4>Distance to nearest trash bin:</h4>
    <p>~{Math.round(near.distance * 111139)} Meters</p>
    <h4>Coordinates of nearest trash bin:</h4>
    <p>Latitude: {near.coordinates.lat}, Longitude: {near.coordinates.lng}</p>
  </div>
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }

  .near {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

</style>
