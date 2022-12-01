<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="students.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="students.address"
          name="address"
        />
        <br />
      </div>
      <div class="form-group">
        <label for="email">EMAIL</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="students.email"
          name="email"
        />
        <br />
      </div>
      <div class="form-group">
        <label for="dateOfBirth">DATE</label>
        <input
          class="form-control"
          id="dateOfBirth"
          type="date"
          required
          v-model="students.dateOfBirth"
          name="dateOfBirth"
        />
        <br />
      </div>
      <div class="form-group">
        <label for="phone">PHONE</label>
        <input
          class="form-control"
          id="phone"
          required
          v-model="students.phone"
          name="phone"
        />
        <br />
      </div>
      <label for="gender">Select Gender</label>
      <div class="form-group" v-for="(gender, index) in genders" :key="index">
        <input type="radio" v-model="students.gender" name="gender" />{{
          gender
        }}
      </div>
      <br />
      <div class="form-group">
        <label>School List: </label>
        <select  v-model="students.schools" @change="onSchoolSelect($event)">
          <option>Select School</option>
          <option           
            placeholder="select school"           
            v-for="(school, index) in schools"
            :key="index"
            :value="school.id"
          >
            {{ school.name }}
          </option>
        </select>
      </div>
      <br />

      <button @click="saveStudent" class="btn btn-success">Submit</button>

      <button @click="saveStudent" class="btn btn-danger">cancle</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { School } from "@/types/school";
import SchoolService from "@/services/SchoolService";
import App from "@/App.vue";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";


@Component
export default class AddStudent extends Vue {
  genders: string[] = ["MALE", "FEMALE"];
  students: Student = {
    name: "",
    address: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    schools: {},
  };
 
  teachers: Teacher[] = [];
 currentSchool: School={};



  private submitted: boolean = false;
  schools: School[] = [];

  retrieveStudent() {
    SchoolService.getAllStudents()
      .then((response) => {
        this.students = response.data;
      })
      .catch((e) => {});
  }
  retrieveSchools() {
    SchoolService.getAllSchools()
      .then((response) => {
        this.schools = response.data;
      })
      .catch((e) => {
    
      });
  }
  saveStudent() {
    let data = {
      name: this.students.name,
      address: this.students.address,
      email: this.students.email,
      gender: this.students.gender,
      dateOfBirth: this.students.dateOfBirth,
      schools:  this.currentSchool,
    };

    SchoolService.createStudent(data)
      .then((response) => {
        this.students = response.data;
        this.submitted = true;
      })
      .catch((e) => {
      });
  }

  
     onSchoolSelect(event:any) { 
      const sourc = event.target.value;
      const data = this.schools.filter((s) => s.id === +sourc);
     this.currentSchool = data[0];

    } 

  onCancle() {
    this.$router.replace("/");
  }

  mounted() {
    this.retrieveStudent();
    this.retrieveSchools();
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
