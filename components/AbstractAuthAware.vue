<template> </template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import User, { IToken, LoginPayload } from "@/models/User";

@Component({})
export default class AbstractAuthAware extends Vue {
  // INCLUDE HTTP CLIENT HERE, WHICH USES THE TOKEN.
  // Store token
  protected get token(): IToken | null {
    return this.$store.getters.token;
  }

  // Async Calls
  protected async login(payload: LoginPayload): Promise<IToken> {
    return await new User().login(payload);
  }

  protected async logout(): Promise<void> {
    if (!this.token) {
      return;
    }
    await new User().logout(this.token);
    this.deleteTokenFromLocalStorage();
    this.removeTokenFromStore();
    this.removeUserFromStore();
  }

  protected async fetchAndSetUser(): Promise<void> {
    const user = await this.fetchUser();
    if (!user) {
      return;
    }
    this.setUserToStore(user);
  }

  protected async fetchUser(): Promise<User | undefined> {
    if (!this.token) {
      return;
    }
    return await new User().fetchUser(this.token);
  }

  protected async createSession(): Promise<void> {
    await new User().createSession();
  }

  // Store Methods
  protected setTokenToStore(token: IToken): any {
    this.$store.dispatch("setToken", token);
  }

  protected removeTokenFromStore(): void {
    this.$store.dispatch("deleteToken");
  }

  protected setUserToStore(user: User): any {
    this.$store.dispatch("setAuth", user);
  }

  protected removeUserFromStore(): void {
    this.$store.dispatch("deleteAuth");
  }

  // Local Storage Methods
  protected setTokenToLocalStorage(): any {
    if (!this.token) {
      return;
    }
    localStorage.setItem("bearerToken", JSON.stringify(this.token));
  }

  protected readTokenFromLocalStorage(): any {
    const token = localStorage.getItem("bearerToken");
    if (!token) {
      return;
    }
    return JSON.parse(token);
  }

  protected deleteTokenFromLocalStorage(): any {
    localStorage.removeItem("bearerToken");
  }
}
</script>
