import { createStore } from "vuex";

const store = createStore({
  state: {
    machines: [
      {
        id: 1,
        status: "available",
        countdown: 0,
        coins: 0,
        isRunning: false,
        size: "normal",
      },
      {
        id: 2,
        status: "available",
        countdown: 0,
        coins: 0,
        isRunning: false,
        size: "normal",
      },
      {
        id: 3,
        status: "available",
        countdown: 0,
        coins: 0,
        isRunning: false,
        size: "normal",
      },
      {
        id: 4,
        status: "available",
        countdown: 0,
        coins: 0,
        isRunning: false,
        size: "dryer",
      },
      {
        id: 5,
        status: "available",
        countdown: 0,
        coins: 0,
        isRunning: false,
        size: "big",
      },
      {
        id: 6,
        status: "available",
        countdown: 0,
        coins: 0,
        isRunning: false,
        size: "big",
      },
    ],
  },
  mutations: {
    updateMachineAvailability(state, { machineId, status }) {
      const machine = state.machines.find((m) => m.id === machineId);
      if (machine) {
        machine.status = status;
        console.log("Machine Availability Updated:", machine);
      }
    },

    updateMachine(state, { machineId, countdown, status }) {
      const machine = state.machines.find((m) => m.id === machineId);

      if (machine) {
        machine.countdown = countdown;
        machine.status = status;
      }
    },

    countTime(state, { machineId }) {
      const machine = state.machines.find((m) => m.id === machineId);
      if (machine.countdown > 0) {
        machine.countdown = machine.countdown - 1;
      } else {
        machine.status = "finished";
      }
    },

    updateCoins(state, coins) {
      state.coins = coins;
    },
    setCoins(state, { machineId, newCoins }) {
      console.log("Coins updated:", machineId, newCoins);
      const machine = state.machines.find((m) => m.id === machineId);
      if (machine) machine.coins = newCoins;
    },
    setItemRunning(state, { machineId, isRunning }) {
      const machine = state.machines.find((m) => m.id === machineId);
      if (machine) {
        machine.isRunning = isRunning;
      }
    },
    setIntervalId(state, { machineId, intervalId }) {
      const machine = state.machines.find((m) => m.id === machineId);
      if (machine) {
        machine.intervalId = intervalId;
      }
    },
  },
  actions: {
    async sendSignalToLineGroup({ state }, machineId) {
      const machine = state.machines.find((m) => m.id === machineId);
      if (machine && machine.countdown < 60) {
        console.log(`Sending signal for machine ${machineId}`);
      }
    },

    startWashing({ commit }, { machineId, countdown, newCoins, status }) {
      console.log(machineId, countdown, newCoins);

      commit("setCoins", { machineId, newCoins });
      commit("setItemRunning", { machineId, isRunning: true });
      commit("updateMachine", { machineId, countdown, status });

      const intervalId = setInterval(() => {
        commit("countTime", { machineId });
      }, 1000);

      commit("setIntervalId", { machineId, intervalId });
    },
    stopWashing({ commit, state }, machineId) {
      console.log(machineId);
      commit("setItemRunning", { machineId, isRunning: false });

      const machine = state.machines.find((m) => m.id === machineId);
      if (machine && machine.intervalId) {
        machine.status = "stopped";
        clearInterval(machine.intervalId);
      }

      commit("setItemRunning", { machineId, isRunning: false });
    },

    endWashing({ commit, state }, { machineId, thisCoin }) {
      const machine = state.machines.find((m) => m.id === machineId);

      machine.coins = machine.coins + thisCoin;
      machine.countdown = 0;
      machine.status = "available";

      console.log(machine);
    },
  },
  getters: {
    getMachineById: (state) => (machineId) => {
      return state.machines.find((m) => m.id === machineId);
    },
  },
  modules: {},
});

export default store;
