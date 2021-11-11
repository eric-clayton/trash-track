<script>
  import Map from '../components/Map.svelte';
  import InputForm from '../components/InputForm.svelte';
  import { coordArray } from '../stores.js';

  let clickedCoords = { lat: null, lng: null };
  let added = null;
  let status = null;

  async function formSubmit(event) {
    let lat = event.detail.lat;
    let lng = event.detail.lng;

    console.log(JSON.stringify({ lat: Number(lat), lng: Number(lng) }));

    let response = await fetch(`http://localhost:8080/api/add/trash`, {
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

  <InputForm lat={clickedCoords.lat} lng={clickedCoords.lng} on:formSubmit={formSubmit} />

  {#if added != null}
    <div class="added">
      <h4>Successfully added bin at:</h4>
      <p>Latitude: {added.lat}, Longitude: {added.lng}</p>
    </div>
  {/if}

  {#if status == 429}
    <div class="added error">
      <h4>Must wait 30 minutes between "add" requests.</h4>
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
    color: red;
  }

  .neutral {
    color: cadetblue;
  }
</style>
