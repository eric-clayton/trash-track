<script>
  import Toggle from 'svelte-toggle';
  import Map from '../components/Map.svelte';
  import InputForm from '../components/InputForm.svelte';
  import { coordArray } from '../stores.js';

  let clickedCoords = {lat: null, lng: null};
  let near = null;
  let message = false;
  let isRecycle = false;
  let binParameter;

  async function formSubmit (event) {
    if (!event.detail.lat || !event.detail.lng) {
      return;
    }

    message = false;

    let lat = event.detail.lat;
    let lng = event.detail.lng;

    binParameter = (isRecycle) ? 'recycle' : 'trash';

    let response = await fetch(`http://localhost:8080/api/nearby/${binParameter}?lat=${lat}&lng=${lng}`);
    let responseObj = await response.json();

    if (responseObj != null) {
      let responseBin = responseObj.bin;
      near = responseObj;
      console.log(`Distance: ${responseObj.distance}`);

      coordArray.update((_value) => {
        return [{lat: responseBin.lat, lng: responseBin.lng}];
      });
    } else {
      message = true;
      /* coordArray.update((_value) => { */
      /*   return []; */
      /* }) */
      near = null;
    }

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
  <h5>( click on the map to auto-fill form )</h5>

  <div class="toggle-wrapper">
    <img src="/assets/RemixIcon/delete-bin-line.svg" alt="" class="adjust-icon"/>
    <span class="toggle"><Toggle bind:toggled={isRecycle} hideLabel untoggledColor="teal" toggledColor="teal" /></span>
    <img src="/assets/RemixIcon/recycle-line.svg" alt="" class="adjust-icon"/>
  </div>
  <InputForm lat={clickedCoords.lat} lng={clickedCoords.lng} buttonText='Find Bin!' on:formSubmit={formSubmit} />

  {#if near != null}
    <div class="message">
      <h4>Distance to nearest {binParameter} bin:</h4>
      <p>~{Math.round(near.distance * 111139)} Meters</p>
      <h4>Coordinates of nearest {binParameter} bin:</h4>
      <p>Latitude: {near.bin.lat}, Longitude: {near.bin.lng}</p>
      <h5>Uploader: {near.bin.username}</h5>
    </div>
  {:else if message == true}
    <div class="message error">
      <h4>No nearby {binParameter} bins found :(</h4>
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

  .message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  .error {
    color: darkred;
  }

  .toggle-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .toggle {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .adjust-icon {
    position: relative;
    bottom: 0.2rem;
  }

  h5 {
    margin-top: 0.1rem;
  }
</style>
