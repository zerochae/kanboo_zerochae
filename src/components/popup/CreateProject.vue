<template>
  <div>
    <!-- <button class="callModal" @click="모달눌렀니 = true">
      Create Project 버튼
    </button> -->
    <div class="bg-container">
      <div class="white-container">
        <h1 class="createProject-title">Create Project</h1>
        <div class="createProject-content">
          <input
            v-model="inputName"
            class="create-input"
            type="text"
            placeholder="Name"
            @click="showCalendar == true"
          />
          <input
            class="create-input"
            id="start"
            type="text"
            placeholder="Start"
            :value="pickDays[0]"
          />
          <input
            class="create-input"
            id="end"
            type="text"
            placeholder="End"
            :value="pickDays[1]"
          />
          <vue-cal
            locale="ko"
            class="vuecal--date-picker"
            xsmall
            hide-view-selector
            :time="false"
            :transitions="false"
            active-view="month"
            :disable-views="['years,week,days']"
            style="width: 210px; height: 230px"
            @cell-click="pickDate($event)"
          >
          </vue-cal>
        </div>
        <button @click="showCreateForm = false" class="createProject-btn">
          Create Project
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/ko.js";
import moment from "moment";
// import { CalendarIcon } from "@heroicons/vue/outline";

export default {
  data() {
    return {
      showCreateForm: true,
      inputName: "",
      pickDays: [],
      inputStartDay: "",
      inputEndDay: "",
      thisDay: "",
      showCalendar: false,
    };
  },
  components: {
    VueCal,
  },
  methods: {
    pickDate(data) {
      let today = moment().format("YYYY-MM-DD HH:mm");
      let todayWithOutTime = moment().format("YYYY-MM-DD");
      let selectDate = moment(data.format("YYYY-MM-DD"))._i;
      let temp = `${selectDate}`;

      selectDate = moment(temp, "YYYY-MM-DD");

      if (
        selectDate.from(today).split(" ")[0] !== "in" &&
        selectDate._i !== todayWithOutTime
      ) {
        let target = document.querySelector(
          ".vuecal__cell--selected .vuecal__cell-content"
        );
        target.style.background = "red";
        setTimeout(() => {
          target.style.background = "none";
        }, 1000);
        clearTimeout();
        return;
      } else {
        let flag = true;
        let target = selectDate._i;

        for (let i = 0; i < this.pickDays.length; i++) {
          if (this.pickDays[i] === target) {
            this.pickDays.splice(i, 1);
            flag = false;
            console.log("같음");
          }
        }

        if (flag) {
          if (this.pickDays.length < 2) {
            console.log("추가")
            this.pickDays.push(target);
          }
          
          if (this.pickDays.length === 2) {
            let day1 = moment(this.pickDays[0]);
            let day2 = moment(this.pickDays[1]);
              console.log(day1.from(day2))
            let temp = this.pickDays[1];
            this.pickDays[1] = this.pickDays[2];
            this.pickDays[2] = temp;
          }

        }
      }
    },
    showCal() {
      this.showCalendar = true;
    },
  },
};
</script>

<style scoped>
.callModal {
  font-size: 50px;
  background: cornflowerblue;
}

.bg-container {
  z-index: 1;
  width: 100%;
  height: calc(100% - 70px);
  background: rgba(0, 0, 0, 0.36);
  position: absolute;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.white-container {
  z-index: 2;
  width: 30vw;
  border-radius: 15px;
  background: #2c2f3b;
  padding: 25px;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.7);
  position: relative;
}

.createProject-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.createProject-title {
  font-size: 32px;
  margin-bottom: 35px;
}

.create-input {
  background: #414556;
  border: none;
  outline: none;
  margin-bottom: 15px;
  font-size: 22px;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: 0px 5px 35px rgba(0, 0, 0, 0.5);
}

.createProject-btn {
  display: block;
  background: #ff8906;
  font-size: 24px;
  color: white;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0px 5px 35px rgba(0, 0, 0, 0.3);
}

.vuecal--date-picker {
  position: absolute;
  top: 0%;
  left: 100%;
  background: #2c2f3b;
  border-radius: 15px;
}

.icons {
  margin-top: 5px;
  width: 20px;
  vertical-align: sub;
  display: inline-block;
}
</style>