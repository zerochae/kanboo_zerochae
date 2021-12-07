<template>
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
      <div class="">
        <div class="kanban-title">
          <span class="text-lg">{{ column.name }} </span>
          <button @click="showInput(index)">+</button>
        </div>
        <Draggable class="kanban-column">
          <Container
            orientation="vertical"
            group-name="col-items"
            :shouldAcceptDrop="
              (e, payload) => e.groupName === 'col-items' && !payload.loading
            "
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
            <input
              type="text"
              v-model="input"
              v-if="kanban.columns[index].showInput == true"
              @keydown.enter="addCard(index)"
            />
          </Container>
        </Draggable>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapMutations } from "vuex";
import KanbanItem from "./KanbanItem.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from "@/utils/helpers";

export default {
  components: {
    Container,
    Draggable,
    KanbanItem,
  },
  data() {
    return {
      openInput: -1,
      input: "test",
      dropCheck: [],
      kanban: this.$store.state.kanban.kanban,
    };
  },
  computed: {
    // ...mapState({
    //   kanban: (state) => state.kanban.kanban,
    // }),
  },
  methods: {
    ...mapMutations({}),
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

      // check if element where ADDED or REMOVED in current column
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
          
        this.dropCheck.push(columnId);

        console.log(columnId);
        const kanban = Object.assign({}, this.kanban);
        const column = kanban.columns.filter((p) => p.id === columnId)[0];
        const itemIndex = kanban.columns.indexOf(column);
        const newColumn = Object.assign({}, column);
        // check if element was ADDED in current column
        // if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
        //   // your action / api call
        //   dropResult.payload.loading = true;
        //   // simulate api call
        //   setTimeout(function () {
        //     dropResult.payload.loading = false;
        //   }, Math.random() * 5000 + 1000);
        // }
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
    addCard(i) {
      var id = this.kanban.columns.length;

      this.kanban.columns[i].cards.push({
        type: "draggable",
        id: `${i}-${id}`,
        user_name: "zerochae",
        content: this.input,
      });
      this.input = "";
    },
    removeCard(i) {
      console.log(i);
    },
  },
};
</script>
<style>
.smooth-dnd-container.horizontal {
  display: flex !important;
}

.dragStart-enter {
  rotate: (0deg);
}
.dragStart-enter-active {
  transform: all 2s ease-in;
  background-color: coral;
}
.dragStart-enter-to {
  rotate: (25deg);
}
.dragStart-leave {
  rotate: (25deg);
}
.dragStart-leave-active {
  transform: all 2s ease-in;
  background-color: coral;
}
.dragStart-leave-to {
  rotate: (0deg);
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

.card-space {
  background-color: #414556;
  margin: 10px;
  border-radius: 20px;
  padding: 8px;
  position: relative;
}

.kanban-card {
  padding: 4px;
  width: 100%;
  height: 100%;
  display: inline;
  position: relative;
}
.card-in-menu {
  cursor: pointer;
  position: absolute;
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 10px;
  right: 0;
  top: 50%;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.card-in-menu .icons:hover {
  color: #ff8906;
}

.showMenu-enter-from {
  opacity: 0;
}
.showMenu-enter-active {
  transition: all 1s;
}
.showMenu-enter-to {
  opacity: 1;
}

.showMenu-leave-from {
  opacity: 1;
}
.showMenu-leave-active {
  transition: all 1s;
}
.showMenu-leave-to {
  opacity: 0;
}
.icons {
  width: 20px;
  vertical-align: sub;
}

.cardMenu {
}
.cardMenu-drop {
  display: block;
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
  /* transform: rotate(-20deg) scale(0.9); */
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