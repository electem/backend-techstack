<!-- eslint-disable prettier/prettier -->
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="studentname">Student name</label>
        <input
          type="text"
          class="form-control"
          id="studentname"
          required
          v-model="student.studentname"
          name="studentname"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <textarea
          class="form-control"
          id="address"
          required
          v-model="student.address"
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
          v-model="student.email"
          name="email"
        />
      </div>
      <div class="form-group">
        <label for="phonenumber">Phone number</label>
        <input
          type="text"
          class="form-control"
          id="phonenumber"
          required
          v-model="student.phonenumber"
          name="phonenumber"
        />
      </div>
      <div class="form-group" v-for="(entry, index) in genderList" :key="index">     
        <input
          type="radio"
          class="form-control"
          id="gender" 
          required
          v-model="entry.value"
          name="gender"
        />{{entry.label}}
      </div>
      <div class="form-group">
        <label for="dob">Date of birth</label>
        <input
          type="Date"
          class="form-control"
          id="dob"
          required
          v-model="student.dob"
          name="dob"
        />
      </div>
      <button @click="saveStudent" class="btn btn-success">Submit</button>
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
import { Student } from "@/types/student";
import ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: "add-student",

  data() {
    return {
      student: {
        studentname: "",
        address: "",
        email: "",
        gender: "",
      } as Student,
      genderList:[{ value: "male", label: "Male" },
{ value: "female", label: "Female" }],
      submitted: false,      
    };
  },
  methods: {
    saveStudent() {
      let data = {
        studentname: this.student.studentname,
        address: this.student.address,
        email: this.student.email,
        gender: this.student.gender,
        dob: this.student.dob,
        phonenumber: this.student.phonenumber,
      };

      studentservice
        .createStudent(data)
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
      this.student = {} as Student;
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
