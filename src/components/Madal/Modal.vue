<template>
  <div :class="{ show: showModal }" class="modal-background">
    <div class="modal_body">
      <div class="header">
        <h5>คุณต้องการจบการทำงานหรือไม่</h5>
      </div>
      <div>
        <p>เครื่องจะคำนวณเวลาที่เหลือและนำออกมาเป็นจำนวนเงินให้</p>
      </div>
      <div class="footer">
        <button class="btn btn-success" @click="confirmAction">ยืนยัน</button>
        <button class="btn btn-secondary" @click="closeModal">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      console.log(this.showModal);
    },
    closeModal() {
      this.showModal = false;
      console.log(this.showModal);
    },

    confirmAction() {
      this.$emit("confirm");
      this.showModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.modal-background {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: #343a408a; // ให้โปร่งใสเป็น 70%
  top: 0;
  left: 0;
}

.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal_body {
  background-color: white;
  width: 350px;
  height: 200px;
  padding: 14px;
  border-radius: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
