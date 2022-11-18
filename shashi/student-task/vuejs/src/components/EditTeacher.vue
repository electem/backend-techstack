<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import { Teacher } from "@/types/teacher";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "edit-teacher",
  data() {
    return {
      currentTeacher: {} as Teacher,
      message: "",
    };
  },
  methods: {
    getTeacherById(id: any) {
      studentservice
        .getTeacherById(id)
        .then((response: ResponseData) => {
          this.currentTeacher = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    updateTeacher() {
      studentservice
        .updateTeacher(this.currentTeacher)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The teacher was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTeacherById(this.$route.params.id);
  },
});
</script>
<template>
  <div v-if="currentTeacher.teacherid" class="edit-form">
    <h4>Edit-Teacher</h4>
    <form>
      <div class="form-group">
        <label for="teachername">teacher name</label>
        <input
          type="text"
          class="form-control"
          id="teachername"
          v-model="currentTeacher.teachername"
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
          v-model="currentTeacher.gender"
        />
      </div>
      <div class="form-group input center">
        <div class="form-group">
          <label for="options">School List:-</label>
          <div
            class="form-check"
            v-for="(entry, index) in currentTeacher.school"
            :key="index"
          >
            <label
              ><input
                name="options"
                type="checkbox"
                v-model="currentTeacher.school"
                 
              />{{ entry.schoolname }}</label
            >
          </div>
        </div>
      </div>
      <br />
    </form>
    <button class="badge badge-danger mr-2">Delete</button>

    <button
      type="submit"
      class="badge badge-success mr-2"
      @click="updateTeacher()"
    >
      Update
    </button>

    <router-link :to="'/teacherslist'" class="badge badge-success"
      >Back</router-link
    >
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
