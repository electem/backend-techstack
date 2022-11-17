<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import { Student } from "@/types/student";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "edit-student",
  data() {
    return {
      currentStudent: {} as Student,
      message: "",
    };
  },
  methods: {
    getStudentById(id: any) {
      studentservice
        .getStudentById(id)
        .then((response: ResponseData) => {
          this.currentStudent = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    updateStudent() {
        studentservice.updateStudent(this.currentStudent)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The student was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });       
    },
  },
  mounted() {
    this.message = "";
    this.getStudentById(this.$route.params.id);
  },
});
</script>
<template>
  <div v-if="currentStudent.studentid" class="edit-form">
    <h4>Edit-Student</h4>
    <form>
      <div class="form-group">
        <label for="studentname">student name</label>
        <input
          type="text"
          class="form-control"
          id="studentname"
          v-model="currentStudent.studentname"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <textarea
          class="form-control"
          id="address"
          required
          v-model="currentStudent.address"     
        ></textarea>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="currentStudent.email"
        />
      </div>
      <div class="form-group">
        <label for="phonenumber">Phone-Number</label>
        <input
          type="text"
          class="form-control"
          id="phonenumber"
          v-model="currentStudent.phonenumber"
        />
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <input
          type="text"
          class="form-control"
          id="gender"
          v-model="currentStudent.gender"
        />
      </div>
      <div class="form-group">
        <label for="dob">Date of birth</label>
        <input
          type="Date"
          class="form-control"
          id="dob"
          required
          v-model="currentStudent.dob"
          name="dob"
        />
      </div>
      <label for="school">School List:-</label>
      <div
        class="col-md-6"
        v-for="(entry, index) in currentStudent.school"
        :key="index"       
      >   
          {{ entry.schoolname }}
      </div>
      <br />
    </form>
    <button class="badge badge-danger mr-2">Delete</button>

    <button type="submit" class="badge badge-success mr-2" @click="updateStudent()">Update</button>

    <router-link :to="'/studentlist'" class="badge badge-success">Back</router-link>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
