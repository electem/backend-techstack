<!-- eslint-disable no-useless-escape -->
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    onSubmit(event:any) {
      console.log(event)
    }
  },
  validateEmail(email:string) {
      if (  /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3}))$/.test(email)) {
        return
      } else {
        alert("Email invalid!")
      }
    }
  ,
  watch: {
    email(value:any){
      this.email = value;
     // this.validateEmail(value);
    }
},
}
</script>
<!-- eslint-disable prettier/prettier -->
<template>
    <v-form @submit="onSubmit" class="add-form">
      <label for="email">
        <h2>Email</h2>
      </label>
      <input placeholder="Enter your email" v-model="email" required type="email">
      <p>{{ email }}</p>
      <input type="submit" value="Submit" class="btn-btn-block"/>
    </v-form>
  </template>
