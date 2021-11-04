<script>
  import Map from '../components/Map.svelte';
  import InputForm from '../components/InputForm.svelte';
  import { coordArray } from '../stores.js';

  let clickedCoords = {lat: null, lng: null};
  let near = null;

  async function formSubmit (event) {
    let lat = event.detail.lat;
    let lng = event.detail.lng;

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

  function mapClick (event) {
    clickedCoords.lat = event.detail.lat;
    clickedCoords.lng = event.detail.lng;
  }
</script>

<div class="find">
  <h1>Find nearby bins.</h1>
  <h3>Enter your coordinates.</h3>

  <InputForm lat={clickedCoords.lat} lng={clickedCoords.lng} on:formSubmit={formSubmit} />

  {#if near != null}
    <div class="near">
      <h4>Distance to nearest trash bin:</h4>
      <p>~{Math.round(near.distance * 111139)} Meters</p>
      <h4>Coordinates of nearest trash bin:</h4>
      <p>Latitude: {near.coordinates.lat}, Longitude: {near.coordinates.lng}</p>
    </div>
  {/if}

  <div class="map-wrapper">
    <Map width="90%" height="400px" on:mapClick={mapClick} />
  </div>

</div>

<style>
  .find {
    text-align: center;
  }

  .map-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
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
