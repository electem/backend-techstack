<script lang="ts">/* eslint-disable */
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import { Teacher } from "@/types/teacher";
import ResponseData from "@/types/ResponseData";
import School from "@/types/school";

export default defineComponent({
  name: "edit-teacher",
  data() {
    return {
      currentTeacher: {} as Teacher,
      schoolList: [] as School[],
      message: "",
      currentSchool: {} as School,
      removeSchool: {} as School,
      value: [] as number[],
    };
  },
  methods: {
    getTeacherById(id: any) {
      studentservice
        .getTeacher(id)
        .then((response: ResponseData) => {
          this.currentTeacher = response.data;
          console.log(response.data);
          for (const i of this.currentTeacher.schools) {
            this.value.push(i.id!);
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
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
    updateTeacher() {
      studentservice
        .updateTeacher(this.currentTeacher.id,this.currentTeacher)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The teacher was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    async removeSchoolInSchoolList(school: School): Promise<void> {
      this.currentSchool = school;
      this.currentTeacher.schools?.push(this.currentSchool);
      this.schoolList.splice(this.schoolList.indexOf(this.currentSchool), 1);
    },
    async removeSelectedSchoolFromTeacher(school: School): Promise<void> {
      this.removeSchool = school;
      this.schoolList.push(this.removeSchool);
      this.currentTeacher.schools?.splice(
        this.currentTeacher.schools?.indexOf(this.removeSchool),
        1
      );
    },
  //   deleteTeacher() {
  //     studentservice.deleteTeacher(this.currentTeacher.teacherid)
  //       .then((response: ResponseData) => {
  //         console.log(response.data);
  //         this.$router.push({ name: "teacherslist" });
  //       })
  //       .catch((e: Error) => {
  //         console.log(e);
  //       });
  //   }, 
  // },
  mounted() {
    this.message = "";
    this.getTeacherById(this.$route.params.id);
    this.retrieveSchools();
  },
  }
});
</script>
<template>
  <div v-if="currentTeacher.teacherid" class="edit-form">
    <h4>Edit-Teacher</h4>
    <form>
      <div class="form-group">
        <label for="name">teacher name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentTeacher.name"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <textarea
          class="form-control"
          id="address"
          required
          v-model="currentTeacher.address"
        ></textarea>
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
      <div class="form-group">
        <label for="gender">Gender</label>
        <input
          type="text"
          class="form-control"
          id="gender"
          v-model="currentTeacher.gender"/>        
      </div>
      <label for="gender">Select Gender</label>      
      <div class="form-group">
  <input type="radio" id="Male" value="male" v-model="currentTeacher.gender">
  <label for="male">Male</label><br>
  <input type="radio" id="Female" value="female" v-model="currentTeacher.gender">
  <label for="female">Female</label><br>
  <input type="radio" id="others" value="others" v-model="currentTeacher.gender">
  <label for="Female">Others</label><br>
      </div>
      <h5>PRESENT SCHOOL LISTING:-</h5>
      <div
        class="form-check"
        v-for="(entry, index) in currentTeacher.school"
        :key="index"
      >
        <input
          type="checkbox"
          class="form-check-input"
          :fieldId="entry.name"
          :label="entry.name"          
          :checked="value.includes(entry.id)"
          @click="removeSelectedSchoolFromTeacher(entry)"
        />{{ entry.name }}
      </div>
      <br />
      <h5>CLICK TO ADD SCHOOL:-</h5>
      <div class="form-check" v-for="(entry, index) in schoolList" :key="index">
        <input
          type="checkbox"
          class="form-check-input"
          :fieldId="entry.name"
          :label="entry.name"
          :disabled="value.includes(entry.id)"
          :checked="value.includes(entry.id)"
          @click="removeSchoolInSchoolList(entry)"
        />{{ entry.name }}
      </div>
      <!-- <div class="form-group">
        <label for="schools">Select School</label><br />
        <li v-for="(school, index) in schoolList" :key="index">
          <input
            type="checkbox"
            :fieldId="school.schoolname"
            :label="school.schoolname"
            :checked="value.includes(school.schoolid)"
          />
          <span>{{ school.schoolname }}</span>
        </li>
      </div> -->
    </form>
    <button class="badge badge-danger mr-2" @click="deleteTeacher">Delete</button>

    <button
      type="submit"
      class="badge badge-success mr-2"
      @click="updateTeacher()"
    >
      Update
    </button>

    <router-link
      :to="'/teacherslist'"
      class="badge badge-warning"
      custom
      v-slot="{ navigate }"
    >
      <button class="badge badge-primary mr-2" @click="navigate" role="link">
        Back
      </button>
    </router-link>
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
