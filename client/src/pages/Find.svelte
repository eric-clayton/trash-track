<script>
  import Map from '../components/Map.svelte';
  import FindInputForm from '../components/FindInputForm.svelte';
</script>

<div class="find">
  <h1>Find nearby bins.</h1>
  <h3>Enter your coordinates.</h3>

  <FindInputForm />

  <div class="map-wrapper">
    <Map width="90%" height="400px" />
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
