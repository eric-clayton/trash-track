<script>
  import Toggle from 'svelte-toggle';
  import Map from '../components/Map.svelte';
  import InputForm from '../components/InputForm.svelte';
  import { coordArray } from '../stores.js';

  let clickedCoords = { lat: null, lng: null };
  let added = null;
  let status = null;
  let isRecycle = false;

  async function formSubmit(event) {
    if (!event.detail.lat || !event.detail.lng) {
      return;
    }

    let lat = event.detail.lat;
    let lng = event.detail.lng;

    console.log(JSON.stringify({ lat: Number(lat), lng: Number(lng) }));

    const binParameter = isRecycle ? 'recycle' : 'trash';

    let response = await fetch(`http://localhost:8080/api/add/${binParameter}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // TODO update recycle and username and descrition automatically
      body: JSON.stringify({
        lat: Number(lat), // latitude
        lng: Number(lng), // longitude
      }),
    });
    let responseObj = await response.json();
    let responseMessage = responseObj.message;

    console.log(responseMessage);

    if (response.status == 201) {
      coordArray.update((value) => {
        return [...value, { lat, lng }];
      });

      added = { lat, lng };
    } else {
      added = null;
    }

    status = response.status;
  }

  function mapClick(event) {
    clickedCoords.lat = event.detail.lat;
    clickedCoords.lng = event.detail.lng;
  }
</script>

<div class="find">
  <h1>Add a bin.</h1>
  <h3>Enter your coordinates.</h3>
  <h5>( click on the map to auto-fill form )</h5>

  <div class="toggle-wrapper">
    <img src="/assets/RemixIcon/delete-bin-line.svg" alt="" class="adjust-icon" />
    <span class="toggle"
      ><Toggle bind:toggled={isRecycle} hideLabel untoggledColor="teal" toggledColor="teal" /></span
    >
    <img src="/assets/RemixIcon/recycle-line.svg" alt="" class="adjust-icon" />
  </div>
  <InputForm
    lat={clickedCoords.lat}
    lng={clickedCoords.lng}
    buttonText="Add Bin!"
    on:formSubmit={formSubmit}
  />

  {#if added != null}
    <div class="added">
      <h4>Successfully added bin at:</h4>
      <p>Latitude: {added.lat}, Longitude: {added.lng}</p>
    </div>
  {/if}

  {#if status == 429}
    <div class="added error">
      <h4>Must wait 10 minutes between "add" requests.</h4>
    </div>
  {:else if status == 200}
    <div class="added neutral">
      <h4>Nearby bin already exists, try a different location.</h4>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .added {
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

  .neutral {
    color: cadetblue;
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
