<template>
  <div class="col">
    <div class="card_body">
      <h5>
        เครื่องที่: {{ machine.id }} ({{
          machine.size !== "normal"
            ? machine.size === "big"
              ? "ใหญ่"
              : " เครื่องอบ"
            : "ปกติ"
        }})
      </h5>

      <div class="card_item">
        <div>
          <div class="card_body_header">
            <p>สถานะ :</p>
            <p>
              {{ machine.status }}
            </p>
          </div>

          <div class="text_time">
            <span>เวลา:</span>
            <span>{{ machine.countdown }} </span>
            <span>วินาที</span>
          </div>
        </div>

        <div class="card_item_button">
          <button
            @click="startWashing(machine.id)"
            :disabled="machine.status === 'working'"
            class="btn btn-info start"
          >
            START
          </button>
          <button
            @click="stopWashing(machine.id)"
            :disabled="machine.status !== 'working'"
            class="btn btn-danger stop"
          >
            STOP
          </button>

          <button
            @click="openModal"
            class="btn btn-secondary end"
            :disabled="machine.status !== 'stopped'"
          >
            END
          </button>
        </div>

        <div class="text_money">
          <span>จำนวนเงิน: {{ machine.coins }}</span>
          <span>{{ textError }}</span>
        </div>
        <div class="coin-balance">
          <button
            @click="addCoins"
            class="btn btn-primary"
            :disabled="machine.status !== 'available'"
          >
            ADD
          </button>
          <button
            @click="clearCoins"
            class="btn btn-warning"
            :disabled="machine.status !== 'available'"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>

    <Modal ref="modal" @confirm="endWashing(machine.id)" />
  </div>
</template>

<script>
import { ref, watch, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "../Madal/Modal.vue";

export default {
  props: ["machine"],

  components: {
    Modal,
  },

  data() {
    return {
      timer: ref(null),
    };
  },

  methods: {
    beforeDestroy() {
      clearInterval(this.timer);
    },

    addCoins() {
      const newCoins = this.machine.coins + 10;
      this.$store.commit("setCoins", {
        machineId: this.machine.id,
        newCoins: newCoins,
      });
    },

    clearCoins() {
      this.$store.commit("setCoins", {
        machineId: this.machine.id,
        newCoins: 0,
      });
    },

    openModal() {
      this.$refs.modal.openModal();
    },
  },

  setup() {
    const store = useStore();
    const items = ref(Object.values(store.state.machines));
    const isModalVisible = ref(false);
    const textError = ref("");

    const startWashing = (machineId) => {
      const machine = items._rawValue.find((m) => m.id === machineId);
      if (!machine) {
        console.error("Item not found");
        return;
      }

      const coinsNormal = 20;
      const coinsDryer = 30;
      const coinsBig = 50;

      if (machine.status !== "stopped") {
        let thisCoin = 0;
        let countdown = 0;
        let status = "working";
        let newCoins = 0;

        // เงือนไขเครื่องปกติ
        if (machine.size === "normal" && machine.coins >= coinsNormal) {
          thisCoin = machine.coins / coinsNormal;
          countdown = parseInt(thisCoin) * 60;
          newCoins = machine.coins - parseInt(thisCoin) * coinsNormal;
        }
        // เงือนไขเครื่องอบ
        else if (machine.size === "dryer" && machine.coins >= coinsDryer) {
          thisCoin = machine.coins / coinsDryer;
          countdown = parseInt(thisCoin) * 60;
          newCoins = machine.coins - parseInt(thisCoin) * coinsDryer;
        }
        // เงือนไขเครื่องใหญ่
        else if (machine.size === "big" && machine.coins >= coinsBig) {
          thisCoin = machine.coins / coinsBig;
          countdown = parseInt(thisCoin) * 60;
          newCoins = machine.coins - parseInt(thisCoin) * coinsBig;
        } else {
          textError.value = "จำนวนเงินไม่เพียงพอ";
          return;
        }

        store.dispatch("startWashing", {
          machineId,
          countdown,
          newCoins,
          status,
        });

        textError.value = "";
      } else {
        console.log(machine);
        const countdown = machine.countdown;
        const newCoins = machine.coins;
        const status = "working";
        store.dispatch("startWashing", {
          machineId,
          countdown,
          newCoins,
          status,
        });
      }
    };

    const stopWashing = (machineId) => {
      console.log(machineId);
      store.dispatch("stopWashing", machineId);
    };

    const endWashing = (machineId) => {
      console.log(machineId);
      const machine = items._rawValue.find((m) => m.id === machineId);
      if (!machine) {
        console.error("Item not found");
        return;
      }

      const remaining = parseInt(machine.countdown / 30);
      const thisCoin = remaining * 10;

      store.dispatch("endWashing", { machineId, thisCoin });
    };

    watch(
      () => store.state.machines,
      (newItems) => {
        items.value = newItems;
      }
    );

    onBeforeUnmount(() => {
      items.value.forEach((item) => {
        if (item.intervalId) {
          clearInterval(item.intervalId);
        }
      });
    });

    return {
      items,
      startWashing,
      stopWashing,
      endWashing,
      textError,
    };
  },
};
</script>

<style scoped lang="scss">
.card_body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card_body_header {
  display: flex;
  align-items: flex-end;

  > *:first-child {
    margin-right: 7px;
  }

  > *:last-child {
    font-size: 20px;
  }
}

.card_item {
  background: linear-gradient(red, transparent),
    linear-gradient(to top left, lime, transparent),
    linear-gradient(to top right, blue, transparent);
  background-blend-mode: screen;
  color: black;
  padding: 14px;
  border-radius: 10px;
  width: 240px;
}

.card_item_button {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  button {
    width: 60px;
    cursor: pointer;
    // font-size: 12px;
    padding: 4px;
  }

  .start {
    &:disabled {
      background-color: #c5e8c4;
      pointer-events: none;
      border: none;
    }
  }

  .stop {
    &:disabled {
      background-color: #e6cece;
      pointer-events: none;
      border: none;
    }
  }

  .end {
    &:disabled {
      background-color: #c5e8c4;
      pointer-events: none;
      border: none;
    }
  }
}

.coin-balance {
  display: flex;
  justify-content: space-between;

  button {
    widows: 60px;
  }
}

.text_time {
  margin-bottom: 7px;
  span {
    font-size: 20px;
    font-weight: 600;
    color: #273746;
  }

  > *:first-child {
    margin-right: 4px;
    font-size: 18px;
    font-weight: 300;
    color: #2c3e50;
  }

  > *:last-child {
    margin-left: 4px;
    font-size: 18px;
    font-weight: 300;
    color: #2c3e50;
  }
}

.text_money {
  display: flex;
  flex-direction: column;
  height: 70px;

  > *:first-child {
    font-size: 20px;
    font-weight: 600;
  }

  > *:last-child {
    font-size: 14px;
    color: #b50000;
  }
}
</style>
