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
        <label>School List: </label>
        <select  v-model="student.school" @change="onSchoolSelect($event)">
          <option>Select School</option>
          <option           
            placeholder="select school"           
            v-for="(school, index) in schools"
            :key="index"
            :value="school.schoolid"
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
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
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
  async  saveStudent() {
      const data = {
        studentid: this.student.studentid,
        studentname: this.student.studentname,
        address: this.student.address,
        phonenumber: this.student.phonenumber,
        email: this.student.email,
        gender: this.student.gender,
        dateofbirth:this.student.dateofbirth,
        school:this.student.school,
     };

    await  StudentService.createStudent(data)
        .then((response) => {
          this.student.studentid = response.data.studentid;
          console.log(response.data);
          this.submitted = true;
           this.$router.replace('/student');
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
        .then((response) => {
          this.schools = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
 
   onSchoolSelect(event: Event) { 
      const src = (event.target as HTMLInputElement).value;
      const data = this.schools.filter((s) => s.schoolid === +src);
     this.currentSchool = data[0];
     console.log(this.currentSchool);
    },  
  },
  mounted() {
    this.saveStudent();
    this.retrieveSchools()
  },
});
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
