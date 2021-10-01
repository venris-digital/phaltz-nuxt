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
          <span class="mb-16">Sign Up</span>
        </v-card-title>
        <v-card-text>
          <TextInput
            v-model="userDetails.email"
            :clearable="false"
            :type="'email'"
            :label="'Email'"
            :required="true"
          />

          <TextInput
            v-model="userDetails.password"
            :clearable="false"
            :label="'Password'"
            :type="'password'"
            :required="true"
          />

          <TextInput
            v-model="userDetails.passwordConfirmation"
            :clearable="false"
            :label="'Password Confirmation'"
            :type="'password'"
            :required="true"
          />

          <TextInput
            v-model="userDetails.displayName"
            :clearable="false"
            :label="'Display Name'"
          />

          <div class="flex items-center">
            <v-checkbox required></v-checkbox> Something something, over 18.*
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <Button :secondary="true" @click="closeDialog()">
            Cancel
          </Button>
          <Button @click="onClickRegister">
            Submit
          </Button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import User, { RegistrationPayload } from "@/models/User";

@Component({})
export default class SignUpDialog extends Vue {
  @Prop({ default: false })
  protected display!: boolean;

  protected userDetails = {
    email: "",
    password: "",
    passwordConfirmation: "",
    displayName: ""
  };

  protected csrf: any = "";

  protected response: any = {};

  protected async onClickRegister(): Promise<void> {
    this.$auth.loginWith("laravelSanctum", {
      data: this.registrationPayload
    });

    // try {
    //   console.log("function called");
    //   // this.csrf = await new User().createSession();

    //   this.response = await new User()
    //     .register()
    //     .create(this.registrationPayload);
    // } catch (error) {
    //   //
    // }
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
}
</script>

<style>
.v-input {
  font-family: "Hind", "system-ui";
}
.v-list {
  font-family: "Hind", "system-ui";
}
</style>
