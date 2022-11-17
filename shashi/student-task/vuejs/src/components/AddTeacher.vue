<!-- eslint-disable prettier/prettier -->
<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="teachername">Teacher name</label>
          <input
            type="text"
            class="form-control"
            id="teachername"
            required
            v-model="teacher.teachername"
            name="teachername"
          />
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <textarea
            class="form-control"
            id="address"
            required
            v-model="teacher.address"
            name="address"
            placeholder="address"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            required
            v-model="teacher.email"
            name="email"
          />
        </div>       
        <div class="form-group">
          <label for="gender">Gender</label>
          <input
            type="text"
            class="form-control"
            id="gender"
            required
            v-model="teacher.gender"
            name="gender"
          />
        </div>        
        <button @click="saveTeacher" class="btn btn-success">Submit</button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newTutorial">Add</button>
      </div>
    </div>
  </template>
  <!-- eslint-disable prettier/prettier -->
  <script lang="ts">
  import { defineComponent } from "vue";
  import studentservice from "@/services/studentservice";
  import { Teacher } from "@/types/teacher";
  import ResponseData from "@/types/ResponseData";
  export default defineComponent({
    name: "add-teacher",
  
    data() {
      return {
        teacher: {
            teachername: "",
          address: "",
          email: "",
          gender: "",
        } as Teacher,
  
        submitted: false,      
      };
    },
    methods: {
      saveTeacher() {
        let data = {
            teachername: this.teacher.teachername,
          address: this.teacher.address,
          email: this.teacher.email,
          gender: this.teacher.gender,
        };
  
        studentservice
          .createTeacher(data)
          .then((response: ResponseData) => {
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },
  
      newTutorial() {
        this.submitted = false;
        this.teacher = {} as Teacher;
      },
    },
  });
  </script>
  <!-- eslint-disable prettier/prettier -->
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  .body {
    padding: 1rem;
  }
  </style>