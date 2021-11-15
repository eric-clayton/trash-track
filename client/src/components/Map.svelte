<script>
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import * as L from 'leaflet';
  import { coordArray } from '../stores.js';

  const dispatch = createEventDispatcher();
  export let width;
  export let height;
  let coordStore;
  let map;
  let markers = L.layerGroup();

  const coordUnsubscribe = coordArray.subscribe((value) => {
    coordStore = value;
  });

  onDestroy(() => {
    coordUnsubscribe();
  });

  onMount(() => {
    map = L.map('map').setView([29.6436, -82.3549], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', (e) => {
      dispatch('mapClick', { lat: e.latlng.lat.toPrecision(7), lng: e.latlng.lng.toPrecision(7) });
    });

    markers.addTo(map);
  });

  const trashIcon = L.icon({
    iconUrl: '/trash.png',

    iconSize: [32, 32],
    iconAnchor: [17, 0], // the anchor point of the icon
    popupAnchor: [0, 34],
  });

  $: (() => {
    markers.clearLayers();
    coordStore.forEach((coord) => {
      markers.addLayer(
        L.marker([coord.lat, coord.lng] /* { icon: trashIcon }*/).on('click', (event) => {
          window.location.href = `https://www.google.com/maps/place/${event.latlng.lat}+${event.latlng.lng}`;
        })
      );
    });
  })();
</script>

<div id="map" style="width: {width}; height: {height}" />

<style>
</style>
