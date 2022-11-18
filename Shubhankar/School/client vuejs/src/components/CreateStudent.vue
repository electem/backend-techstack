<!-- eslint-disable prettier/prettier -->
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="studentname">Name</label>
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
        <input
          class="form-control"
          id="address"
          required
          v-model="student.address"
          name="address"
        />
      </div>

      <div class="form-group">
        <label for="phonenumber">Contact</label>
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

      <div class="form-group">
        <label for="dateofbirth">Born </label>
        <input
          type="date"
          class="form-control"
          id="dateofbirth"
          required
          v-model="student.dateofbirth"
          name="dateofbirth"
        />
      </div>

    <div class="form-group">
    <label for="school">School List: </label>        
     <select  v-model="addedSchool"
     >
     <option >Select School</option>
      <option          
       placeholder="select school"
        v-for="(school, index) in schools"
         :key="index"
       >
        {{ school.schoolname }}
      </option>
        </select>
		</div>


      <button @click="saveStudent" class="btn btn-success">Submit</button>
       <button @click="listingPage" class="btn btn-danger">Cancel</button>
    </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import ResponseData from "@/types/ResponseData";
import Student from "@/types/Student";
import StudentService from "@/services/StudentService";
import SchoolService from "@/services/SchoolService";
import School from "@/types/School";

export default defineComponent({
  name: "student",

  data() {
    return {
     schools:  [] as School[],
      student: {
        studentname: "",
        address: "",
        email: "",
        gender: "",
        dateofbirth:"",
        
      } as Student,
      submitted: false,
       currentSchool: {} as School,
       
    };
  },
  methods: {
    saveStudent() {
      let data = {
        studentid: this.student.studentid,
        studentname: this.student.studentname,
        address: this.student.address,
        phonenumber: this.student.phonenumber,
        email: this.student.email,
        gender: this.student.gender,
        dateofbirth:this.student.dateofbirth,
     };

      StudentService.createStudent(data)
        .then((response: ResponseData) => {
          this.student.studentid = response.data.studentid;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

  listingPage(){
      this.$router.replace('/student');
    },

   retrieveSchools() {
      SchoolService.getAllSchool()
        .then((response: ResponseData) => {
          this.schools = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    selectedSchool(school: string) {
    console.log(school);
    const data = this.schools.filter((s) => s.schoolid === +school);
    this.currentSchool = data[0];
  },  
  },
  mounted() {
    this.saveStudent();
    this.retrieveSchools()
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
