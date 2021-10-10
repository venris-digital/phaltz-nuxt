export const state = () => ({
  counter: 0,
  isShowingSignUpDialog: false
});

export const getters = {
  isShowingSignUpDialog: (state: any) => {
    return !!state.isShowingSignUpDialog;
  }
};

export const mutations = {
  COUNTER_INCREMENT: (state: any) => {
    state.counter++;
  },
  SIGN_UP_DIALOG_OPEN: (state: any) => {
    state.isShowingSignUpDialog = true;
  },
  SIGN_UP_DIALOG_CLOSE: (state: any) => {
    state.isShowingSignUpDialog = false;
  }
};

export const actions = {
  incrementCounter: ({ commit }: any) => {
    commit("COUNTER_INCREMENT");
  },
  openSignUpDialog: ({ commit }: any) => {
    commit("SIGN_UP_DIALOG_OPEN");
  },
  closeSignUpDialog: ({ commit }: any) => {
    commit("SIGN_UP_DIALOG_CLOSE", "cat");
  }
};
