<script>
  import Map from '../components/Map.svelte';
  import AddInputForm from '../components/AddInputForm.svelte';
</script>

<main>
  <div class="map-wrapper">
    <Map width="100%" height="400px" />
  </div>

  <AddInputForm />
</main>

<style>
  .map-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
