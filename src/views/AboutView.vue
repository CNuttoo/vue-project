<template>
  <div class="about">
    <div id="app">
      <MachineStatus
        v-for="machine in machines"
        :key="machine.id"
        :machine="machine"
      />
      <!-- <CoinBalance /> -->
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import MachineStatus from "../components/HomePage/MachineStatus.vue";
import CoinBalance from "../components/HomePage/CoinBalance.vue";

export default {
  components: {
    MachineStatus,
    CoinBalance,
  },
  computed: {
    machines() {
      return this.$store.state.machines;
    },
  },
  created() {
    // You may want to dispatch an action to initialize the state here
  },
};
</script>
