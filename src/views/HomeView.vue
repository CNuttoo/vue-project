<template>
  <div class="container">
    <div class="text_header">
      <span class="title"> OHO Wash&Dry </span>
      <span class="sup_title"> ยินดีต้อนรับ </span>

      <div class="steps">
        <span class="steps_title">อัตราค่าบริการ </span>
        <ul>
          <li>เครื่องซักขนาดปกติ 20 บาท ใช้งานได้ 1 นาที</li>
          <li>เครื่องซักขนาดใหญ่ 50 บาท ใช้งานได้ 1 นาที</li>
          <li>เครื่องอบ 30 บาท ใช้งานได้ 1 นาที</li>
        </ul>
        <span class="steps_title">ขั้นตอนการใช้งาน</span>

        <ul>
          <li>
            กดปุ่ม
            <span style="color: blue">ADD</span> เพิ่มเงินลงในเครื่องครั้งและ 10
            บาท
          </li>
          <li>
            กดปุ่ม
            <span style="color: #0dcaf0">START</span> เพื่อเริ่มทำงาน
            เครื่องจะคำนวณจำนวนเงินออกมาเป็นระยะเวลาให้
          </li>
          <li>
            กดปุ่ม
            <span style="color: #bb2d3b">STOP</span>
            เพื่อหยุดการทำงานของเครื่อง
          </li>
          <li>
            กดปุ่ม
            <span style="color: #6c757d">END</span>
            กดจบการทำงานของเครื่อง
            <span style="color: red"
              >( เครื่องจะทำการคำนวณเวลาที่เหลือออกมาเป็นจำนวนเงินให้ 30
              วินาทีเท่ากับ 10 บาท)</span
            >
          </li>
          <li>
            กดปุ่ม
            <span style="color: #ffc107">CLEAR</span>
            เพื่อนำเงินออกจากเครื่อง
          </li>
        </ul>
      </div>
    </div>

    <div class="row gy-5">
      <MachineStatus
        v-for="machine in machines"
        :key="machine.id"
        :machine="machine"
      />
    </div>

    <div class="results">
      <div class="results_body">
        <div>
          <span>OHO Wash&Dry</span>

          <span
            >358 บ้านป่าไผ่เหนือ ซอย 1 ตำบล สันพระเนตร อำเภอสันทราย เชียงใหม่
            50210 ประเทศไทย</span
          >
        </div>
        <div class="icon">
          <a href="https://maps.app.goo.gl/GnNKzQLNPLpJHMqC8" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-box-arrow-in-up-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"
              />
              <path
                fill-rule="evenodd"
                d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="text_header">
      <span class="sup_title"> ขอบคุณที่ใช้บริการ </span>

      <div class="steps">
        <ul>
          <li>หากพบปัญหาติดต่อได้ที่ ศูนย์ช่วยเหลือ ลูกค้า</li>
          <li>สามารถติชมหรือต้องการให้ทางร้านปรับปรุงเพิ่มเติมส่วนไหนบาง</li>
          <li>ทางร้านกำลังอัพเดททำให้เครื่องสามารถตั้งเวลาได้</li>
          <li>ทางร้านกำลังอัพเดททำให้แจ้งเตือนเข้าไปใน line ของลูกค้าได้</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MachineStatus from "../components/HomePage/MachineStatus.vue";
import "bootstrap/dist/css/bootstrap.css";

export default {
  components: {
    MachineStatus,
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

<style scoped lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.text_header {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 48px;
  flex-direction: column;

  .title {
    font-size: 64px;
    font-weight: 600;
    text-align: center;
  }

  .sup_title {
    font-size: 34px;
    font-weight: 500;
    text-align: center;
  }

  .steps {
    margin-top: 14px;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    .steps_title {
      font-weight: 600;
    }
  }
}

.results {
  margin-bottom: 28px;
  margin-top: 140px;
  display: flex;
  width: 100%;
  justify-content: center;

  .results_body {
    border: 1px solid blue;
    padding: 7px;
    display: flex;
    width: 450px;
    border-radius: 10px;

    > *:first-child {
      display: flex;
      flex-direction: column;

      > *:first-child {
        margin-bottom: 14px;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .icon {
      cursor: pointer;
    }
  }
}
</style>
