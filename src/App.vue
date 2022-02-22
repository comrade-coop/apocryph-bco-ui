<template>
  <suspense>
    <div class="container">
      <main>
        <router-view />
        <hr />
      </main>
    </div>
  </suspense>
</template>

<script>
export default {
  name: "App",
  async created() {
    if (!window.ethereum) {
      alert("Please install MetaMask browser extension");
    }
  },
};
</script>

<style>

:root {
  --page-width: 40em !important;
}

.components-grid {
  display: grid;
  grid-column-gap: 1.4em;
  grid-template-columns: auto;
  grid-template-rows: auto;
}

.button-grid {
  display: grid;
  grid-template-rows: auto;
  grid-gap: 1em;
  grid-template-columns: repeat(
    auto-fit,
    minmax(calc(var(--page-width) / 12), 1fr)
  );
}

@media only screen and (min-width: 70em) {
  .components-grid {
    grid-template-columns: 3fr 9fr;
  }
}
</style>
