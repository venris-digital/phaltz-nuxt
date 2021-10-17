<template>
  <v-row justify="center">
    <v-dialog v-model="display" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <div class="flex items-center justify-between">
            <span class="mb-4">{{
              isRegistering ? "Register" : "Sign In"
            }}</span>

            <v-switch v-if="!isUploading" v-model="isRegistering"></v-switch>
          </div>
        </v-card-title>
        <v-card-text v-if="isUploading">
          <Loader />
        </v-card-text>
        <v-card-text v-else>
          <TextInput
            v-model="userDetails.email"
            :clearable="false"
            :type="'email'"
            :label="'Email'"
            :required="true"
            :prepend-inner-icon="'mdi-email'"
          />

          <TextInput
            v-model="userDetails.password"
            :clearable="false"
            :label="'Password'"
            :type="'password'"
            :required="true"
            :prepend-inner-icon="'mdi-lock'"
          />

          <TextInput
            v-if="isRegistering"
            v-model="userDetails.passwordConfirmation"
            :clearable="false"
            :label="'Password Confirmation'"
            :type="'password'"
            :required="true"
            :prepend-inner-icon="'mdi-lock-check'"
          />

          <TextInput
            v-if="isRegistering"
            v-model="userDetails.displayName"
            :clearable="false"
            :label="'Display Name'"
            :prepend-inner-icon="'mdi-account-circle'"
          />

          <div v-if="isRegistering" class="flex items-center max-h-8">
            <v-checkbox required></v-checkbox> Click to confirm that you have
            read and agreed to the site's terms of use.
          </div>
          <div v-if="isRegistering" class="flex items-center max-h-8">
            <v-checkbox required></v-checkbox> Click to confirm that you have
            read and agreed to the site's privacy policy.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="!isUploading">
            <Button :secondary="true" @click="closeDialog()">
              Cancel
            </Button>
            <Button @click="handleSubmit">
              Submit
            </Button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import User, { LoginPayload, RegistrationPayload } from "@/models/User";
import AbstractAuthAware from "./AbstractAuthAware.vue";

@Component({})
export default class SignUpDialog extends AbstractAuthAware {
  @Prop({ default: false })
  protected display!: boolean;

  protected isRegistering = false;

  protected isUploading = false;

  protected userDetails = {
    email: "samueljhwhite@gmail.com",
    password: "0ShadowG949",
    passwordConfirmation: "0ShadowG949",
    displayName: "Phaltz"
  };

  protected async handleSubmit(): Promise<void> {
    this.isUploading = true;
    this.isRegistering
      ? await this.handleRegistration()
      : await this.handleSignIn();
    this.isUploading = false;
    if (!this.$store.getters.user) {
      return;
    }
    this.$store.dispatch("closeSignUpDialog");
  }

  protected async handleSignIn(): Promise<void> {
    await this.createSession();
    const token = await this.login(this.loginPayload);
    if (!token) {
      return;
    }
    this.setTokenToStore(token);
    await this.fetchAndSetUser();
    this.setTokenToLocalStorage();
  }

  protected async handleRegistration(): Promise<void> {
    console.log("handle reg");
    await this.createSession();
    const token = await this.register(this.registrationPayload);
    console.log("token: ", token);
    if (!token) {
      return;
    }
    this.setTokenToStore(token);
    await this.fetchAndSetUser();
    this.setTokenToLocalStorage();
  }

  protected closeDialog() {
    this.$store.dispatch("closeSignUpDialog");
  }

  protected get registrationPayload(): RegistrationPayload {
    return {
      display_name: this.userDetails.displayName || "",
      email: this.userDetails.email || "",
      password: this.userDetails.password || "",
      password_confirmation: this.userDetails.passwordConfirmation || ""
    };
  }

  protected get loginPayload(): LoginPayload {
    return {
      email: this.userDetails.email || "",
      password: this.userDetails.password || ""
    };
  }
}
</script>
