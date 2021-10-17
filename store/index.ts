import User, { IToken } from "@/models/User";

export const state = () => ({
  Auth: null,
  completedAuthCheck: false,
  token: null,
  isShowingSignUpDialog: false
});

export const getters = {
  hasCompletedAuthCheck: (state: any) => {
    return state.completedAuthCheck;
  },
  isLoggedIn: (state: any) => {
    return !!(state.Auth && state.token);
  },
  user: (state: any) => {
    return state.Auth;
  },
  token: (state: any) => {
    return state.token;
  },
  isShowingSignUpDialog: (state: any) => {
    return !!state.isShowingSignUpDialog;
  }
};

export const mutations = {
  AUTH_CHECK_SET: (state: any) => {
    state.completedAuthCheck = true;
  },
  TOKEN_SET: (state: any, token: IToken) => {
    state.token = token;
  },
  TOKEN_DELETE: (state: any) => {
    state.token = null;
  },
  AUTH_SET: (state: any, user: User) => {
    state.Auth = user;
  },
  AUTH_DELETE: (state: any) => {
    state.Auth = null;
  },
  SIGN_UP_DIALOG_OPEN: (state: any) => {
    state.isShowingSignUpDialog = true;
  },
  SIGN_UP_DIALOG_CLOSE: (state: any) => {
    state.isShowingSignUpDialog = false;
  }
};

export const actions = {
  setCompletedAuthCheck: ({ commit }: any) => {
    commit("AUTH_CHECK_SET");
  },
  setToken: ({ commit }: any, token: IToken) => {
    commit("TOKEN_SET", token);
  },
  deleteToken: ({ commit }: any) => {
    commit("TOKEN_DELETE");
  },
  setAuth: ({ commit }: any, user: User) => {
    commit("AUTH_SET", user);
  },
  deleteAuth: ({ commit }: any) => {
    commit("AUTH_DELETE");
  },
  openSignUpDialog: ({ commit }: any) => {
    commit("SIGN_UP_DIALOG_OPEN");
  },
  closeSignUpDialog: ({ commit }: any) => {
    commit("SIGN_UP_DIALOG_CLOSE");
  }
};
