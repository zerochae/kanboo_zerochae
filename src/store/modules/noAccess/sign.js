const sign = {
  namespaced: true,
  state: {
    loginInfo: {
      access: "",
      data: {
        id: "",
        pw: "",
      },
    },
    signInfo: {
      access: "",
      data: {
        id: "",
        pw: "",
        nick: "",
        phone: "",
      },
    },
    findInfo: {
      access: "",
      data: [
        {
          token: "",
        },
      ],
    },
  },
  mutations: {
    login(state, payload) {
      state.loginInfo = payload;
    },
    sign(state, payload) {
      state.signInfo = payload;
    },
    find(state, payload) {
      state.findInfo = payload;
    },
  },
  actions: {},
};

export default sign;
