<script>
  import Map from '../components/Map.svelte';
  import CoordinateInputForm from '../components/CoordinateInputForm.svelte';
</script>

<div class="find">
  <h1>Find nearby bins.</h1>
  <h3>Enter your coordinates.</h3>

  <CoordinateInputForm />

  <div class="map-wrapper">
    <Map width="100%" height="400px" />
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
</style>
