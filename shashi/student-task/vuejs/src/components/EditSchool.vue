<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import School from "@/types/school";
import ResponseData from "@/types/ResponseData";
import Multiselect from "@suadelabs/vue3-multiselect";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";

export default defineComponent({
  components: { Multiselect },
  name: "edit-school",
  data() {
    return {
      currentSchool: {} as School,
      message: "",
      teacherData: [] as Teacher[],
      studentData: [] as Student[],
      selectedTeachers: [] as Teacher[],
      selectedStudents: [] as Teacher[],
    };
  },
  methods: {
    getSchool(id: any) {
      studentservice
        .getSchoolById(id)
        .then((response: ResponseData) => {
          this.currentSchool = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    updateSchool() {
        studentservice.updateSchool(this.currentSchool)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
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
    deleteSchool() {
      studentservice.deleteSchool(this.currentSchool.schoolid)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "schoolist" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }, 
  },
  mounted() {
    this.message = "";
    this.getSchool(this.$route.params.id);
    this.retrieveStudents();
      this.retrieveTeachers()
  },
});
</script>
<template>
  <div v-if="currentSchool.schoolid" class="edit-form">
    <h4>Edit-School</h4>
    <form>
      <div class="form-group">
        <label for="schoolname">Schoolname</label>
        <input
          type="text"
          class="form-control"
          id="schoolname"
          v-model="currentSchool.schoolname"
        />
      </div>
      <div class="form-group">
        <label for="address">address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="currentSchool.address"
        />
      </div>      
      <div class="form-group">
          <multiselect
            class="form-control"
            id="teacher"
            required
            v-model="currentSchool.teacher"
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
            id="students"
            required
            v-model="currentSchool.students"
            name="students"
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
    </form>
    <button class="badge badge-danger mr-2" @click="deleteSchool">Delete</button>

    <button type="submit" class="badge badge-success mr-2" @click="updateSchool()">Update</button>

    <router-link 
          :to="'/school'"
          class="badge badge-warning"
          custom
      v-slot="{ navigate }"
          > <button  
          class="badge badge-primary mr-2" 
          @click="navigate"  
        role="link"
        >Back</button>
      </router-link
        >   
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
