<!-- eslint-disable prettier/prettier -->
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Student name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="name"
          required
          v-model="student.name"
          name="name"
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
          placeholder="email"
          required
          v-model="student.email"
          name="email"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone number</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          placeholder="phone"
          required
          v-model="student.phone"
          name="phone"
        />
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <input
          type="text"
          class="form-control"
          placeholder="gender"
          id="gender"
          required
          v-model="student.gender"
          name="gender"
        />
      </div>
      <label for="gender">Select Gender</label>
      <div class="form-group">
        <input type="radio" id="male" value="male" v-model="student.gender" />
        <label for="male">Male</label><br />
        <input
          type="radio"
          id="female"
          value="female"
          v-model="student.gender"
        />
        <label for="female">Female</label><br />
        <input
          type="radio"
          id="others"
          value="others"
          v-model="student.gender"
        />
        <label for="others">Others</label><br />
      </div>
      <div class="form-group">
        <label for="dateOfBirth">Date of birth</label>
        <input
          type="Date"
          class="form-control"
          id="dateOfBirth"
          required
          v-model="student.dateOfBirth"
          name="dateOfBirth"
        />
      </div>
      <div class="form-group">
        <label>School List: </label>
        <select v-model="student.schools" @change="onSchoolSelect($event)">
          <option>Select School</option>
          <option
            placeholder="select school"
            v-for="(entry, index) in schoolList"
            :key="index"
            :value="entry.id"
          >
            {{ entry.name }}
          </option>
        </select>
      </div>
    <div>      
      <input type="file" @change="handleFileUpload($event)"/>     
    </div>
  <br />     
      <button  @click="saveStudent" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>Form submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
    <br />
    <router-link
      :to="'/studentlist'"
      class="badge badge-warning"
      custom
      v-slot="{ navigate }"
    >

      <button class="btn btn-danger " @click="navigate" role="link">
        Cancel
      </button>
    </router-link>
  </div> 
  <!-- <button class="btn btn-danger " @click="downloadFile" >
        download
      </button> -->
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import { Student } from "@/types/student";
import ResponseData from "@/types/ResponseData";
import School from "@/types/school";
import http from "@/http-Studentcommon";

export default defineComponent({
  name: "add-student",
  data() {
    return {
      file: "",  
      image:File,       
      student: {        
        name: "",
        address: "",
        email: "",
        gender: "",
      } as Student,
      genderList: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      submitted: false,
      schoolList: [] as School[],
      currentSchool: {} as School,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },   
    downloadFile() {
      let formData = new FormData();
          formData.get(this.file)
     http.get(`'/photos'}/${formData}`, {  
      responseType: 'blob',
    });
  },
    saveStudent() {
      let data = {
        name: this.student.name,
        address: this.student.address,
        email: this.student.email,
        gender: this.student.gender,
        dateOfBirth: this.student.dateOfBirth,
        phone: this.student.phone,
        school: this.student.schools,
      };
      console.log("create url starts");
      studentservice
        .createStudent(data)
        .then((response: ResponseData) => {
          console.log(response.data);
          let formData = new FormData();
          formData.append("image", this.file);
          http.post("/photos", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          this.submitted = true;
          console.log("student created");
        })
        .catch((e: Error) => {
          console.log(e);
        });
      console.log("student not created");
    },
    retrieveSchools() {
      studentservice
        .getAllSchools()
        .then((response: ResponseData) => {
          this.schoolList = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    onSchoolSelect(event) {
      const src = event.target.value;
      const data = this.schoolList.filter((s) => s.id === +src);
      this.currentSchool = data[0];
      console.log(this.currentSchool);
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
.flex {
    display: flex;
}
</style>
