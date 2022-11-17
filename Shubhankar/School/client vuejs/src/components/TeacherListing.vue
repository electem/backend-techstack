<!-- eslint-disable prettier/prettier -->
<template>
    <h4>Teacher List</h4>
  <div class="list row">
    <div class="col-md-6">
   </div>
   <table class="table table-striped table-bordered justify-content-center">
  <thead class="thead-light">
    <tr class="active">
    
      <th class="text-center" scope="col">Name</th>
     <th class="text-center" scope="col">Address</th>
       <th class="text-center" scope="col">Email</th>
       <th class="text-center" scope="col">Contact</th>
       <th class="text-center" scope="col">Gender</th>
    </tr>
  </thead>
  <tbody  
          :class="{ active: index == currentIndex }"
          v-for="(teacher, index) in teachers"
          :key="index">
      <tr class="success">
         <th class="text-center" scope="row">{{ teacher.teachername }}</th>
       <th class="text-center" scope="row">{{ teacher.address }}</th>
       <th class="text-center" scope="row">{{ teacher.email }}</th>
        <th class="text-center" scope="row">{{ teacher.phonenumber }}</th>
       <th class="text-center" scope="row">{{ teacher.gender }}</th>
      </tr>
   </tbody>
</table>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Teacher from "@/types/Teacher";
import ResponseData from "@/types/ResponseData";
import getAllTeachers from "@/services/TeacherService";

export default defineComponent({
  name: "teacher-list",
  data() {
    return {
      teachers: [] as Teacher[],
      currentTeachers: {} as Teacher,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveTeachers() {
      getAllTeachers.getAllTeachers()
        .then((response: ResponseData) => {
          this.teachers = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
},
  mounted() {
    this.retrieveTeachers();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
  background-color: blanchedalmond;
}
</style>