const kanban = {
  namespaced: true,
  state: {
    kanban: {
      type: "container",
      props: {
        orientation: "horizontal",
      },
      columns: [
        {
          id: 1,
          type: "container",
          name: "화면 미 구현",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "1-1",
              loading: false,
              startDate:"2021-12-12",
              endDate: "2021-12-12",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 2,
          type: "container",
          name: "화면 구현 완료",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "2-1",
              loading: false,
              startDate:"2021-12-12",
              endDate: "2021-12-12",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 3,
          type: "container",
          name: "API 개발 전",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "3-1",
              loading: false,
              startDate:"2021-12-12",
              endDate: "2021-12-12",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 4,
          type: "container",
          name: "API 개발 중",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "4-1",
              loading: false,
              startDate:"2021-12-12",
              endDate: "2021-12-12",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 5,
          type: "container",
          name: "API 개발 완료",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "5-1",
              loading: false,
              startDate:"2021-12-12",
              endDate: "2021-12-12",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
      ],
    },
    nowOpen: [-1, -1],
  },
  mutations: {
    showCardMenu(state, payload) {
      let i = payload[0];
      let j = payload[1];
      let k = state.nowOpen[0];
      let m = state.nowOpen[1];

      if (k > -1 && !(i == k && j == m)) {
        state.kanban.columns[k].cards[m].showCardInMenu = false;
      }
      state.kanban.columns[i].cards[j].showCardInMenu =
        !state.kanban.columns[i].cards[j].showCardInMenu;
      state.nowOpen = [i,j]
    },
    deleteCard(state, payload) {
      let i = payload[0];
      let j = payload[1];
      state.kanban.columns[i].splice(j, 1);
    },
    // updateCard(state, payload) {},
  },
  actions: {},
};

export default kanban;
