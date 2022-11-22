<script lang="ts">/* eslint-disable */
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import { Student } from "@/types/student";
import ResponseData from "@/types/ResponseData";

import { Teacher } from "@/types/teacher";
import School from "@/types/school";
export default defineComponent({

  name: "edit-student",
  data() {
    return {
      currentStudent: {} as Student,
      message: "",  
      schoolList: [] as School[],
      currentSchool: {} as School,
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
    retrieveSchools() {
      studentservice
        .getAll()
        .then((response: ResponseData) => {
          this.schoolList = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    onSchoolSelect(event:any) { 
      const src = event.target.value;
      const data = this.schoolList.filter((s) => s.schoolid === +src);
     this.currentSchool = data[0];
     console.log(this.currentSchool);
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
    deleteStudent() {
      studentservice.deleteStudent(this.currentStudent.studentid)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "studentlist" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }, 
  },
  mounted() {
    this.message = "";
    this.getStudentById(this.$route.params.id);
    this.retrieveSchools()
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
      <label for="gender">Select Gender</label>      
      <div class="form-group">
  <input type="radio" id="male" value="male" v-model="currentStudent.gender">
  <label for="male">Male</label><br>
  <input type="radio" id="female" value="female" v-model="currentStudent.gender">
  <label for="female">Female</label><br>
  <input type="radio" id="others" value="others" v-model="currentStudent.gender"> 
  <label for="others">Others</label><br>
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
          {{ entry}}
      </div>
      <br />
      <div class="form-group">
        <label>School List: </label>      
        <select  v-model="currentStudent.school.schoolid" @change="onSchoolSelect($event)">
          <option>Select School</option>
          <option           
            placeholder="select school"           
            v-for="(entry, index) in schoolList"
            :key="index"
            :value="entry.schoolid"
          >
            {{ entry.schoolname }}
          </option>
        </select>


      </div>  
    </form>
    <button class="badge badge-danger mr-2" @click="deleteStudent">Delete</button>

    <button type="submit" class="badge badge-success mr-2" @click="updateStudent()">Update</button>

    <router-link 
          :to="'/studentlist'"
          class="badge badge-warning"
          custom
      v-slot="{ navigate }"
          > <button  
          class="badge badge-primary mr-2" 
          @click="navigate"  
        role="link"
        >Back</button>
      </router-link
        >   
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
