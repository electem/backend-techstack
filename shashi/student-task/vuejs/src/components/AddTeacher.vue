<!-- eslint-disable prettier/prettier -->
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="teachername">Teacher name</label>
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
        <textarea
          class="form-control"
          id="address"
          required
          v-model="teacher.address"
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
      <label for="gender">Select Gender</label>
      <div class="form-group" v-for="(entry, index) in genderList" :key="index">
        <input type="radio" v-model="teacher.gender" name="gender" />{{
          entry.label
        }}
      </div>
      <label>schoolsList:</label>
      <div class="form-check" v-for="(entry, index) in schoolList" :key="index">
        <input
          type="checkbox"
          class="form-check-input"
          @click="selectedSchoolMethod(entry)"
        />{{ entry.schoolname }}
      </div>
      <button @click="saveTeacher" class="btn btn-success">Submit</button>
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
import { Teacher } from "@/types/teacher";
import School from "@/types/school";
import ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: "add-teacher",  
  data() {
    return {
      teacher: {
        teachername: "",
        address: "",
        email: "",
        gender: "",
      } as Teacher,
      schoolList: [] as School[],
      submitted: false,
      currentSchool: {} as School,
      selectedSchools: [] as School[],
      genderList: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
  
    };
  },
  methods: {
    saveTeacher() {
      let data = {
        teachername: this.teacher.teachername,
        address: this.teacher.address,
        email: this.teacher.email,
        gender: this.teacher.gender,
        school: this.selectedSchools,
      };
      studentservice
        .createTeacher(data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    selectedSchoolMethod(school: School) {
      this.currentSchool = school;
      this.selectedSchools?.push(this.currentSchool);
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

    newTutorial() {
      this.submitted = false;
      this.teacher = {} as Teacher;
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
