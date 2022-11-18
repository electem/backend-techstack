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
      <div class="form-group">
        <label for="gender">Gender</label>
        <input
          type="text"
          class="form-control"
          id="gender"
          required
          v-model="student.gender"
          name="gender"
        />
      </div>   
      <label for="gender">Select Gender</label>
      <div class="form-group" v-for="(entry, index) in genderList" :key="index">
        <input type="radio" v-model="student.gender" name="gender" />{{
          entry.label
        }}
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
      <div class="form-group">
        <label>School List: </label>        
        <select  v-model="student.school">
          <option :value=null disabled>Select School</option>
          <option           
            placeholder="select school"
           
            v-for="(entry, index) in schoolList"
            :key="index"
          >
            {{ entry.schoolname }}
          </option>
        </select>
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
import School from "@/types/school";
export default defineComponent({
  name: "add-student",
  data() {
    return {
      student: {
        studentname: "",
        address: "",
        email: "",
        gender: "",
        school: {},
      } as Student,
      genderList: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      submitted: false,
      schoolList: [] as School[],
      currentSchool: {} as School,
      selectedSchools: [] as School[],
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
console.log('create url starts')
      studentservice
        .createStudent(data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.submitted = true;
          console.log('student created')
        })
        
        .catch((e: Error) => {
          console.log(e);
        });
        console.log('student not created')
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
    selectedSchoolMethod(school: School) {
      this.currentSchool = school;
      //this.selectedSchools?.push(this.currentSchool);
    },

    newTutorial() {
      this.submitted = false;
      this.student = {} as Student;
    },
  },
  mounted() {
    this.retrieveSchools();
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
