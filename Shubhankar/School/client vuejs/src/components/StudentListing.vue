<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
<h4>Student List</h4>
<input  value="Add" @click="addStudent" class="btn float-right btn-primary">
 <div class="col-md-6">
      <button
           type="button"
            v-on:click='addMessage'>
          Search
          </button>
     <input v-model="txtInput" @keyup.enter="addMessage()"/>
    </div>
  <div class="list row">
   <table class="table table-striped table-bordered justify-content-center">
  <thead class="thead-light">
    <tr class="active">
    
      <th class="text-center" scope="col">Name</th>
     <th class="text-center" scope="col">Address</th>
       <th class="text-center" scope="col">Contact</th>
       <th class="text-center" scope="col">Email</th>
     <th class="text-center" scope="col">Gender</th>
       <th class="text-center" scope="col">Born year</th>
        <th class="text-center" scope="col">Option</th>
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
       <router-link
      :to="'/student/' + student.studentid"
       class="badge badge-warning"
       custom
       v-slot="{ navigate }"
      > <button  
      class="badge badge-success mr-2"
       @click="navigate"  
     role="link"
     >EDIT</button>

      </router-link>
       
      </tr>
   </tbody>
</table>
</div>
 <button @click="show = !show">Message</button>
<Transition name="slide-fade">
  <p v-if="show">hello,This is the list of all student present</p>
</Transition>

</template>

<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import Student from "@/types/Student";
import ResponseData from "@/types/ResponseData";
import StudentService from "@/services/StudentService";

export default defineComponent({
  name: "school-list",
  data() {
    return {
      txtInput: '',
      students: [] as Student[],
      currentStudent: {} as Student,
      currentIndex: -1,
      title: "",
      show: true,
        studentname: "",
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
    
    addMessage() {
    console.log(this.txtInput);
    if (this.txtInput != '' && this.txtInput) {
     this.students = this.students.filter((obj) => {
       return obj.studentname.toLowerCase()
       .includes(this.txtInput.toLowerCase());
  })
  }},

addStudent(){
    this.$router.replace('/createstudent');
  }

},
  mounted() {
    this.retrieveStudents();
  },
});

</script>

<!-- eslint-disable prettier/prettier -->
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
 background-color: blanchedalmond;
}
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>