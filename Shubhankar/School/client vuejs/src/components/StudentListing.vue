<!-- eslint-disable prettier/prettier -->
<template>
<h4>Student List</h4>
  <div class="list row">
    <div class="col-md-6">
      
    </div>
   <table class="table table-striped table-bordered justify-content-center">
  <thead class="thead-light">
    <tr class="active">
    
      <th class="text-center" scope="col">Name</th>
     <th class="text-center" scope="col">Address</th>
       <th class="text-center" scope="col">Contact</th>
       <th class="text-center" scope="col">Email</th>
     <th class="text-center" scope="col">Gender</th>
       <th class="text-center" scope="col">Born year</th>
    </tr>
  </thead>
  <tbody  
          :class="{ active: index == currentIndex }"
          v-for="(student, index) in students"
          :key="index">
      <tr class="success">
         <th class="text-center" scope="row">{{ student.studentname }}</th>
       <th class="text-center" scope="row">{{ student.address }}</th>
       <th class="text-center" scope="row">{{ student.phonenumber  }}</th>
       <th class="text-center" scope="row">{{ student.email }}</th>
       <th class="text-center" scope="row">{{ student.gender }}</th>
       <th class="text-center" scope="row">{{ student.dateofbirth}}</th>
       
      </tr>
   </tbody>
</table>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Student from "@/types/Student";
import ResponseData from "@/types/ResponseData";
import StudentService from "@/services/StudentService";

export default defineComponent({
  name: "school-list",
  data() {
    return {
      students: [] as Student[],
      currentStudent: {} as Student,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveStudents() {
      StudentService.getAllStudents()
        .then((response: ResponseData) => {
          this.students = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
},
  mounted() {
    this.retrieveStudents();
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