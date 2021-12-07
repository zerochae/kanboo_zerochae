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
          id: 0,
          type: "container",
          name: "화면 미 구현",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "0-1",
              loading: false,
              startDate:"2021-12-07 15:00:10",
              endDate: "2021-12-4 15:30:30",
              day: "",
              badgeText: "front-end",
              badgeColor: "#4caf50",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 1,
          type: "container",
          name: "화면 구현 완료",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "1-1",
              loading: false,
              startDate:"2021-12-06 15:30:30",
              endDate: "2021-12-13 15:30:30",
              day: "",
              badgeText: "front-end",
              badgeColor: "#4caf50",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 2,
          type: "container",
          name: "API 개발 전",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "2-1",
              loading: false,
              startDate:"2021-12-05 15:30:30",
              endDate: "2021-12-14 15:30:30",
              badgeText: "back-end",
              badgeColor: "#FFC107",
              day: "",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 3,
          type: "container",
          name: "API 개발 중",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "3-1",
              loading: false,
              startDate:"2021-12-04 15:30:30",
              endDate: "2021-12-12 15:30:30",
              badgeText: "complete",
              badgeColor: "#FF9800",
              day: "",
              showCardInMenu: false,
              user_name: "zerochae",
            },
          ],
        },
        {
          id: 4,
          type: "container",
          name: "API 개발 완료",
          showInput: false,
          props: {
            orientation: "vertical",
          },
          cards: [
            {
              content: "test",
              id: "4-1",
              loading: false,
              startDate:"2021-12-07 14:35:43",
              endDate: "2021-12-12 15:30:30",
              badgeText: "Emergency",
              badgeColor: "#F44336",
              day: "",
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

      console.log(i,j,k,m)

      // if (k > -1 && !(i == k && j == m)) {
      //   state.kanban.columns[k].cards[m].showCardInMenu = false;
      // }
      
      state.kanban.columns[i].cards[j].showCardInMenu =
        !state.kanban.columns[i].cards[j].showCardInMenu;
      state.nowOpen = [i,j]
    },
    delete(state, payload) {
      
      let i = payload[0];
      let j = payload[1];
      console.log(i,j)
      let copyArr = [...state.kanban.columns[i].cards];
      copyArr.splice(j, 1);
      state.kanban.columns[i].cards = copyArr;

    },

    setDays(state, payload){
      let day = payload[0];
      let i = payload[1];
      let j = payload[2];

      state.kanban.columns[i].cards[j].day = day;

    }
    // updateCard(state, payload) {},
  },
  actions: {},
};

export default kanban;
