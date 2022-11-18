<!-- eslint-disable prettier/prettier -->
<template>
    <div class="submit-form">
     <form> <div v-if="!submitted">
        <div class="form-group">
          <label for="schoolname">school name</label>
          <input
            type="text"
            class="form-control"
            id="schoolname"
            required
            v-model="school.schoolname"
            name="schoolname"
          />
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <textarea
            class="form-control"
            id="address"
            required
            v-model="school.address"
            name="address"
            placeholder="address"
          ></textarea>
        </div> 
        <div class="form-group">
          <multiselect
            class="form-control"
            id="teacher"
            required
            v-model="selectedTeachers"
            name="teacher"
            :options="teacherData"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Teacher"
            label="teachername"
            track-by="teachername"
            :preselect-first="true"
          >
          </multiselect>
        </div>
        <div class="form-group">
          <multiselect
            class="form-control"
            id="student"
            required
            v-model="selectedStudents"
            name="student"
            :options="studentData"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Student"
            label="studentname"
            track-by="studentname"
            :preselect-first="true"
          >
          </multiselect>
        </div>
        <button @click="saveSchool" class="btn btn-success">Submit</button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newTutorial">Add</button>
      </div>  </form> 
    </div>
  </template>
  <!-- eslint-disable prettier/prettier -->
  <script lang="ts">
  import { defineComponent } from "vue";
  import studentservice from "@/services/studentservice";
  import { Student } from "@/types/student";
  import ResponseData from "@/types/ResponseData";
  import School from "@/types/school";
import { Teacher } from "@/types/teacher";
import Multiselect from "@suadelabs/vue3-multiselect";
  export default defineComponent({
    name: "add-student",
    components: { Multiselect },
    data() {
    return {
      school: {
        schoolname: "",
        address: "",
      } as School,
      teacherData: [] as Teacher[],
      studentData: [] as Student[],
      submitted: false,
      selectedTeachers: [] as Teacher[],
      selectedStudents: [] as Teacher[],
    };
  },
    methods: {
      saveSchool() {    
        let data = {
            schoolname: this.school.schoolname,
        address: this.school.address,
        teacher: this.selectedTeachers,
        student:this.selectedStudents
        };
  
        studentservice
          .createSchool(data)
          .then((response: ResponseData) => {
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },  
      retrieveTeachers() {
      studentservice
        .getAllTeacherss()
        .then((response: ResponseData) => {
          this.teacherData = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    retrieveStudents() {
      studentservice
        .getAllStudents()
        .then((response: ResponseData) => {
          this.studentData = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },  
  
      newTutorial() {
        this.submitted = false;
        this.school = {} as School;
      },
     
    },mounted() {
      this.retrieveStudents();
      this.retrieveTeachers()
    },
  });
  </script>
  <!-- eslint-disable prettier/prettier -->
  <style src="vue-multiselect/dist/vue-multiselect.min.css">
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  .body {
    padding: 1rem;
  }
  </style>
  