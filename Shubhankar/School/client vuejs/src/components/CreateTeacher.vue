<!-- eslint-disable prettier/prettier -->
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="teachername">Name</label>
        <input
          type="text"
          class="form-control"
          id="teachername"
          required
          v-model="teacher.teachername"
          name="teachername"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="teacher.address"
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
          v-model="teacher.phonenumber"
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
          v-model="teacher.email"
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
          v-model="teacher.gender"
          name="gender"
        />
      </div>

      <ul class="object administrator-checkbox-list">
          <li  :class="{ active: index == currentIndex }"
           v-for="(school, index) in schools"
        :key="index">
             <label v-bind:for="school.schoolid">
        <div  >
          <input type="checkbox" v-model="teacher.school" v-bind:value="school.schoolid" v-bind:schoolid="school.schoolid">
            <span>{{ school.schoolname }}</span>
        </div>
        </label>
    </li>
      </ul>
          
        </div>
      </div>

      <button @click="saveTeacher" class="btn btn-success">Submit</button>
 
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import ResponseData from "@/types/ResponseData";
import Teacher from "@/types/Teacher";
import TeacherService from "@/services/TeacherService";
import SchoolService from "@/services/SchoolService";
import School from "@/types/School";

export default defineComponent({
  name: "teacher",

  data() {
    return {
      schools : [] as School[],
       currentSchool: {} as School,
      teacher: {
        teachername: "",
        address: "",
        email: "",
        gender: "",
      } as Teacher,
      submitted: false,
    };
  },
  methods: {
    saveTeacher() {
      let data = {
        teacherid: this.teacher.teacherid,
        teachername: this.teacher.teachername,
        address: this.teacher.address,
        phonenumber: this.teacher.phonenumber,
        email: this.teacher.email,
        gender: this.teacher.gender,
      };

      TeacherService.createTeacher(data)
        .then((response: ResponseData) => {
          this.teacher.teacherid = response.data.teacherid;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
     retrieveSchools() {
      SchoolService.getAllSchool()
        .then((response: ResponseData) => {
          this.schools = response.data;
          
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  
 
  mounted() {
    this.saveTeacher();
    this.retrieveSchools();
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
