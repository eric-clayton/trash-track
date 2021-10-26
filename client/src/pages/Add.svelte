<script>
  import Map from '../components/Map.svelte';
  import CoordinateInputForm from '../components/CoordinateInputForm.svelte';
</script>

<main>
  <div class="map-wrapper">
    <Map width="100%" height="400px" />
  </div>

  <CoordinateInputForm />
</main>

<style>
  .map-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
