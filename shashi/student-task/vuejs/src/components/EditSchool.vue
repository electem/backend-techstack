<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import School from "@/types/school";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "edit-school",
  data() {
    return {
      currentSchool: {} as School,
      message: "",
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
  },
  mounted() {
    this.message = "";
    this.getSchool(this.$route.params.id);
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
      <label for="address">Teachers List:-</label>
      <div
        class="col-md-6"
        v-for="(entry, index) in currentSchool.teacher"
        :key="index"
      >
        <li>
          {{ entry.teachername }}
        </li>
      </div>
      <br />
      <label for="address">Students List:-</label>
      <div
        class="col-md-6"
        v-for="(entry, index) in currentSchool.students"
        :key="index"
      >
        <li>
          {{ entry.studentname }}
        </li>
      </div>
    </form>
    <button class="badge badge-danger mr-2">Delete</button>

    <button type="submit" class="badge badge-success mr-2" @click="updateSchool()">Update</button>

    <router-link :to="'/school'" class="badge badge-success">Back</router-link>
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
