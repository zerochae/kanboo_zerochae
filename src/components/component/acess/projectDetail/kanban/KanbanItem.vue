<template>
  <Draggable v-if="item">
    <div class="kanban-card-container">
      <div v-if="item.loading" class="">
        <RefreshIcon class="icons spin" viewBox="0 0 24 24" />
        <span>Processing...</span>
      </div>
      <div class="card-space">
        <div class="kanban-card">
          <p>
            {{ emoji }} {{ item.user_name }}
            <DotsHorizontalIcon
              @click="showMenu(columnIndex, cardIndex)"
              class="icons"
              style="float: right"
            />
          </p>
        </div>
        <transition name="showMenu">
          <div
            class="card-in-menu"
            v-if="item.showCardInMenu == true"
            :id="`cardMenu${columnIndex}${cardIndex}`"
          >
            <p>
              <PencilIcon
                @click="updateCard(columnIndex, cardIndex)"
                class="icons"
              />
              수정
            </p>
            <p @click="deleteCard(columnIndex, cardIndex)">
              <TrashIcon class="icons" /> 삭제
            </p>
          </div>
        </transition>
        <p>{{ item.content }}</p>
      </div>
    </div>
  </Draggable>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getRandomEmoji } from "@/utils/helpers";
import { Draggable } from "vue3-smooth-dnd";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilIcon,
  RefreshIcon,
} from "@heroicons/vue/outline";
export default {
  name: "KanbanItem",
  components: {
    Draggable,
    DotsHorizontalIcon,
    TrashIcon,
    PencilIcon,
    RefreshIcon,
  },


  computed: {
    ...mapState({
      nowOpen: (state) => state.kanban.nowOpen,
    }),
  },
  data() {
    return {
      emoji: getRandomEmoji(),
    };
  },
  props: {
    item: Object,
    columnIndex: Number,
    cardIndex: Number,
  },
  methods: {
    ...mapMutations({
      showCardMenu: "kanban/showCardMenu",
      // sign: "kanban/sign",
      // find: "kanban/find",
    }),
  showMenu(i,j){
    var indexArr = [i,j];
    this.showCardMenu(indexArr);
  }
  },
};
</script>