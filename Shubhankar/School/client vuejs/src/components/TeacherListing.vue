<!-- eslint-disable prettier/prettier -->
<template>
 <input value="Add" @click="addTeacher" class="btn float-right btn-primary" />
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
    <button type="button" v-on:click="addMessage">Search</button>
    <input v-model="txtInput" @keyup.enter="addMessage()" />
  </div>

       <div class="col-md-6">
        <h4>Teacher</h4>
        <div class="list row">
    <b-table class="table table-striped ">
      <thead class="thead-dark">
        <tr class="active">
          <th class="text-center" scope="col">Name</th>
          <th class="text-center" scope="col">Address</th>
          <th class="text-center" scope="col">Email</th>
          <th class="text-center" scope="col">Contact</th>
          <th class="text-center" scope="col">Gender</th>
          <th class="text-center" scope="col">Option</th>
        </tr>
      </thead>
      <tbody
        :class="{ active: index == currentIndex }"
        v-for="(teacher, index) in teachers"
        :key="index"
      >
        <tr class="success">
          <th class="text-center" scope="row">{{ teacher.teachername }}</th>
          <th class="text-center" scope="row">{{ teacher.address }}</th>
          <th class="text-center" scope="row">{{ teacher.email }}</th>
          <th class="text-center" scope="row">{{ teacher.phonenumber }}</th>
          <th class="text-center" scope="row">{{ teacher.gender }}</th>
         <th> <router-link
            :to="'/teacher/' + teacher.teacherid"
            class="badge badge-warning"
            custom
            v-slot="{ navigate }"
          >
            <button
              class="badge badge-success mr-2"
              @click="navigate"
              role="link"
            >
              EDIT
            </button>
          </router-link>
           <button  class="badge badge-danger mr-2" @click="removeTeacher(teacher.teacherid)">Delete</button></th>
        </tr>
      </tbody>
    </b-table>
  </div>
    </div>
    </div>
  </div>
</template>

<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import Teacher from "@/types/Teacher";
import ResponseData from "@/types/ResponseData";
import getAllTeachers from "@/services/TeacherService";
import TeacherService from "@/services/TeacherService";

export default defineComponent({
  name: "teacher-list",
  data() {
    return {
      teachers: [] as Teacher[],
      currentTeachers: {} as Teacher,
      currentIndex: -1,
      title: "",
      txtInput: "",
      teachername: "",
      message: "",
    };
  },
  methods: {
    retrieveTeachers() {
      getAllTeachers
        .getAllTeachers()
        .then((response: ResponseData) => {
          this.teachers = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    addMessage() {
      console.log(this.txtInput);
      if (this.txtInput != "" && this.txtInput) {
        this.teachers = this.teachers.filter((obj) => {
          return obj.teachername
            .toLowerCase()
            .includes(this.txtInput.toLowerCase());
        });
      }
    },

    addTeacher() {
      this.$router.replace("/createteacher");
    },

    removeTeacher(id: any){
  TeacherService.deleteTeacher(id)
  .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "the teacher is deleted";
           this.$router.replace("/teacher");
        })
        .catch((e: Error) => {
          console.log(e);
        });
     this.retrieveTeachers()
},
  },

  mounted() {
    this.retrieveTeachers();
  },
});
</script>

<!-- eslint-disable prettier/prettier -->
<style>
.list {
  text-align: left;
  max-width: 830px;
  margin: auto;
}
</style>
