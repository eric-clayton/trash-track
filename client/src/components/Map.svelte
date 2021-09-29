<script>
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import * as L from 'leaflet';
  import { coordArray } from '../stores.js';

  export let width;
  export let height;
  let coordStore;
  let map;
  let markers = L.layerGroup();

  const unsubscribe = coordArray.subscribe((value) => {
    coordStore = value;
  });

  onDestroy(unsubscribe);

  onMount(() => {
    map = L.map('map').setView([29.6436, -82.3549], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markers.addTo(map);
  });

  $: (() => {
    markers.clearLayers();
    coordStore.forEach((coord) => {
      markers.addLayer(L.marker([coord.lat, coord.lng]));
    });
  })();
</script>

<div id="map" style="width: {width}; height: {height}" />

<style>
</style>
