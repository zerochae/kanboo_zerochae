<template>
  <div v-if="showAddForm" class="bg-container">
    <div class="white-container">
      <div class="color-picker-wrap">
        <input
          class="create-input"
          :v-model="inputBadge"
          type="text"
          placeholder="badge"
        />
        <div class="vertical-wrap">
          <label for="color" :style="{ background: pickColor }"></label>
          <input id="color" type="color" v-model="pickColor" />
          <CalendarIcon class="icons calendar" @click="showCal = true" />
        </div>
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
          @click="clickedMap"
          @dblclick="showCal = false"
          v-if="showCal"
        >
        </vue-cal>
        <div id="alert-cal" class="vue-cal-alert">
          <EmojiSadIcon class="icons" />
        </div>
      </div>

      <textarea
        class="create-input input-content"
        :v-model="inputContent"
        type="text"
        placeholder="content"
      />
      <div class="button-zone">
        <PencilAltIcon
          @click="addCard(addColumnIndex)"
          class="icons btn create-btn"
        />
        <ReplyIcon @click="showAddForm = false" class="icons btn return-btn" />
      </div>
    </div>
  </div>
  <Container
    group-name="cols"
    tag="div"
    orientation="horizontal"
    @drop="onColumnDrop($event)"
  >
    <div
      class="kanbanContainer"
      v-for="(column, index) in kanban.columns"
      :key="index"
    >
      <div>
        <div class="kanban-title">
          <span class="text-lg">{{ column.name }} </span>
          <DocumentAddIcon class="icons" @click="beforeShowAddForm(index)" />
        </div>
        <Draggable class="kanban-column">
          <Container
            orientation="vertical"
            group-name="col-items"
            :shouldAcceptDrop="(e, payload) => e.groupName === 'col-items'"
            :get-child-payload="getCardPayload(column.id)"
            :drop-placeholder="{
              className: `drop-placeholder`,
              animationDuration: '200',
              showOnTop: true,
            }"
            :dragClass="`cardGhostDrag`"
            :dropClass="`cardGhostDrop`"
            @drop="(e) => onCardDrop(column.id, e)"
          >
            <KanbanItem
              v-for="(item, cardIndex) in column.cards"
              :key="item.id"
              :columnIndex="index"
              :cardIndex="cardIndex"
              :item="item"
            />
          </Container>
        </Draggable>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapMutations } from "vuex";
import moment from "moment";
import KanbanItem from "./KanbanItem.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/ko.js";
import {
  DocumentAddIcon,
  PencilAltIcon,
  ReplyIcon,
  CalendarIcon,
  EmojiSadIcon,
} from "@heroicons/vue/outline";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from "@/utils/helpers";

export default {
  components: {
    Container,
    Draggable,
    KanbanItem,
    DocumentAddIcon,
    PencilAltIcon,
    ReplyIcon,
    CalendarIcon,
    VueCal,
    EmojiSadIcon,
  },
  data() {
    return {
      openInput: -1,
      input: "test",
      kanban: this.$store.state.kanban.kanban,
      showAddForm: false,
      showCal: false,
      pickColor: "#4caf50",
      addColumnIndex: "",
      inputBadge: "",
      inputContent: "",
      inputDate: "",
    };
  },
  methods: {
    ...mapMutations({
      add: "kanban/add",
    }),
    pickDate(data) {
      var today = moment().format("YYYY-MM-DD HH:mm:ss");
      var selectDate = moment(data.format("YYYY-MM-DD"))
        .add("21", "hours")
        .add("12", "minutes");

      if (selectDate.from(today).split(" ")[0] !== "in") {
        this.clickedMap();
        return;
      } else {
        console.log(selectDate);

        console.log(selectDate.from(today));

        this.inputDate = data;
      }
    },
    absPos(e) {
      this.x =
        e.clientX +
        (document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft);
      this.y =
        e.clientY +
        (document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop);
      return this;
    },
    clickedMap(e) {
      var target = document.querySelector("#alert-cal");

      var pos = this.absPos(e);

      target.style.left = pos.x - 20;
      target.style.top =  pos.y - 40;
    },
    showInput(i) {
      this.input = "";
      if (-1 !== this.openInput) {
        this.kanban.columns[this.openInput].showInput = false;
      }
      this.kanban.columns[i].showInput = true;
      this.openInput = i;
    },
    getColumnHeightPx() {
      let container = document.getElementById("kanbanContainer");
      return container ? container.offsetHeight - 122 : 0;
    },
    onColumnDrop(dropResult) {
      const kanban = Object.assign({}, this.kanban);
      kanban.columns = applyDrag(kanban.columns, dropResult);
      this.kanban = kanban;
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        this.dropCheck.push(columnId);
        console.log(columnId);
        const kanban = Object.assign({}, this.kanban);
        const column = kanban.columns.filter((p) => p.id === columnId)[0];
        const itemIndex = kanban.columns.indexOf(column);
        const newColumn = Object.assign({}, column);
        newColumn.cards = applyDrag(newColumn.cards, dropResult);
        kanban.columns.splice(itemIndex, 1, newColumn);
        this.kanban = kanban;
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.kanban.columns.filter((p) => p.id === columnId)[0].cards[
          index
        ];
      };
    },
    beforeShowAddForm(index) {
      this.addColumnIndex = index;
      this.showAddForm = true;
    },
    addCard(index) {
      let payload = [];
      payload.push(index);
      payload.push("2021-12-08");

      this.add(payload);
      this.showAddForm = false;
    },
  },
};
</script>
<style scoped>
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
  box-shadow: 0px 3px 7px rgba(255, 255, 255, 0.2) inset;
}

.create-input {
  background: #414556;
  border: none;
  outline: none;
  width: 70%;
  margin-bottom: 15px;
  font-size: 22px;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: 0px 5px 35px rgba(0, 0, 0, 0.5);
}

.color-picker-wrap {
  position: relative;
  /* width: fit-content; */
  display: flex;
  justify-content: space-between;
}

#color {
  z-index: -9999;
  width: 0;
  height: 0;
  top: 0;
  right: 0;
  position: absolute;
  visibility: hidden;
}

[for="color"] {
  width: 25px;
  height: 25px;
  margin-left: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 35px rgba(0, 0, 0, 0.3);
}

.vue-cal-alert {
  position: relative;
  left: 100%;
  top: 20%;
  display: flex;
  z-index: 10000;
}

.vuecal--date-picker {
  position: absolute;
  top: 20%;
  left: 100%;
  background: #2c2f3b;
  border-radius: 15px;
}

.smooth-dnd-container.horizontal {
  display: flex !important;
}

.kanbanContainer {
  display: flex;
  overflow-x: auto;
  gap: 8;
  border-collapse: 0;
  padding: 5px;
  margin: 10px auto;
  min-width: 300px;
  overflow-y: hidden;
}

.kanban-card-container {
  cursor: move;
  margin-top: 4px;
  margin-bottom: 8px;
}

.drop-placeholder {
  border: 2px dotted #ff8906;
  border-radius: 50px;
}
.kanban-title {
  height: 40px;
  width: 270px;
  margin: 15px;
  background-color: #2c2f3b;
  border-radius: 15px;
  text-align: center;
  position: relative;
  font-size: 18px;
}
.vertical-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
}

.input-content {
  width: 100%;
  height: 200px;
  resize: none;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 22px;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
}

.kanban-title .icons {
  position: absolute;
  right: 10%;
  width: 22px;
  margin-top: 7px;
}

.icons {
  margin-top: 5px;
  width: 20px;
  vertical-align: sub;
  display: inline-block;
}

.calendar {
  border-radius: 5px;
  box-shadow: 0 5px 35px rgba(0, 0, 0, 0.3);
  width: 28px;
  height: 28px;
  margin: 0;
  /* margin:5px 15px 5px 0; */
}

.button-zone {
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.btn {
  color: #fff;
  border-radius: 8px;
  width: 110px;
  height: 50px;
  box-shadow: 0px 5px 12px rgba(255, 255, 255, 0.2) inset;
}

.create-btn {
  background: #ff8906;
}

.return-btn {
  background: #bd1e19;
}

.kanban-title span {
  vertical-align: -webkit-baseline-middle;
}

.kanban-column {
  background-color: #2c2f3b;
  margin: 15px;
  border-radius: 15px;
  width: 270px;
  box-sizing: content-box;
  overflow-y: scroll;
}

.cardGhostDrag {
  transform: rotate(5deg) scale(1.1);
  transition: all 0.2s ease-in;
  border-radius: 50px;
  color: white;
}
.cardGhostDrop {
  transition: all 5s ease-in;
  transform: rotate(-20deg) scale(0.9);
}

.spin {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

::-webkit-scrollbar {
  width: 0px;
  height: 5px;
  /* border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial; */
}
</style>