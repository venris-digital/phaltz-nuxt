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
          <span class="mb-4">Sign Up</span>
        </v-card-title>
        <v-card-text>
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
            v-model="userDetails.passwordConfirmation"
            :clearable="false"
            :label="'Password Confirmation'"
            :type="'password'"
            :required="true"
            :prepend-inner-icon="'mdi-lock-check'"
          />

          <TextInput
            v-model="userDetails.displayName"
            :clearable="false"
            :label="'Display Name'"
            :prepend-inner-icon="'mdi-account-circle'"
          />

          <div class="flex items-center max-h-8">
            <v-checkbox required></v-checkbox> Click to confirm that you have
            read and agreed to the site's terms of use.
          </div>
          <div class="flex items-center max-h-8">
            <v-checkbox required></v-checkbox> Click to confirm that you have
            read and agreed to the site's privacy policy.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <Button :secondary="true" @click="closeDialog()">
            Cancel
          </Button>
          <Button @click="onClickSignIn">
            Submit
          </Button>
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

  protected userDetails = {
    email: "samueljhwhite@gmail.com",
    password: "0ShadowG949",
    passwordConfirmation: "0ShadowG949",
    displayName: "Phaltz"
  };

  protected async onClickSignIn(): Promise<void> {
    this.createSession();
    const token = await this.login(this.loginPayload);
    if (!this.token) {
      return;
    }
    this.setTokenToStore(token);
    this.fetchAndSetUser();
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
