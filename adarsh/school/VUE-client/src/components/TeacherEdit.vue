<template>
  <div v-if="currentTeacher.id" class="edit-form">
    <h4>Teacher</h4>

    <form>
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentTeacher.name"
        />
      </div>
      <div class="form-group">
        <label for="address">Adresss</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="currentTeacher.address"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="currentTeacher.email"
        />
      </div>

      <label for="gender">GENDER</label>
      <div class="form-group">
        <input
          type="radio"
          id="MALE"
          value="MALE"
          v-model="currentTeacher.gender"
        />
        <label for="MALE">Male</label><br />
        <input
          type="radio"
          id="FEMALE"
          value="FEMALE"
          v-model="currentTeacher.gender"
        />
        <label for="FEMALE">Female</label><br />

        <br />
        <div class="form-group">
          <label for="schools">Select School</label><br />
          <li v-for="(school, index) in schools" :key="index">
            <input
              type="checkbox"
              :fieldId="school.name"
              :label="school.id"
              :checked="value.includes(school.id)"
              :key="school"
            />
            <span>{{ school.name }}</span>
          </li>
        </div>
      </div>
      
    </form>
     <button type="cancle" @click="updateTeacher" class="btn btn-success">
      Update
    </button>
    <button type="cancle" class="btn btn-danger" @click="onCancle">
      cancle
    </button>
        
    <p>{{ message }}</p>
   
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts">

import SchoolService from "@/services/SchoolService";
import { Teacher } from "@/types/teacher";
import { School } from "@/types/school";
import Vue from "vue/types/umd";


export default class TeacherEdit extends Vue {
  private message: string = "";
  currentTeacher: Teacher = {
    name: "",
    address: "",
    email: "",
    gender: "",
    schools: [],
  };
  value: number[] = [];
  genders: string[] = ["MALE", "FEMALE"];
  schoolList: School[] = [];
  schools: School[] = [];
  selectedSchool: School = new School();

  getTeacher(id: any) {
    SchoolService.getTeacher(id)
      .then((response) => {
        this.currentTeacher = response.data;
        for (const i of this.currentTeacher.schools!) {
          this.value.push(i.id!);
        }
      })
      .catch((e) => {});
  }
  updateTeacher() {
    SchoolService.updateTeacher(this.currentTeacher.id!, this.currentTeacher)
      .then((response) => {
        this.message = "The tutorial was updated successfully!";
      })
      .catch((e) => {});
  }

  retrieveSchools() {
    SchoolService.getAllSchools()
      .then((response) => {
        this.schools = response.data;
      })
      .catch((e) => {});
  }

  onCancle() {
    this.$router.replace("/teacher");
  }

  mounted() {
    this.message = "";
    this.getTeacher(this.$route.params.id);
    this.retrieveSchools();
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
