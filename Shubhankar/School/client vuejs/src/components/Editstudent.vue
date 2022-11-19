<!-- eslint-disable prettier/prettier -->
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="studentname">Name</label>
        <input
          type="text"
          class="form-control"
          id="studentname"
          required
          v-model="selectedStudent.studentname"
          name="studentname"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="selectedStudent.address"
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
          v-model="selectedStudent.phonenumber"
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
          v-model="selectedStudent.email"
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
          v-model="selectedStudent.gender"
          name="gender"
        />
      </div>
        
      <div class="form-group">
        <label for="dateofbirth">Born </label>
        <input
          type="date"
          class="form-control"
          id="dateofbirth"
          required
          v-model="selectedStudent.dateofbirth"
          name="dateofbirth"
          
        />
      </div>

       <div class="form-group">
        <label>School List: </label>
        <select  v-model="selectedStudent.school.schoolid" @change="onSchoolSelect($event)">
          <option>Select School</option>
          <option           
            placeholder="select school"           
            v-for="(school, index) in schools"
            :key="index"
            :value="school.schoolid"
          >
            {{ school.schoolname }}
          </option>
        </select>
      </div>


      <button @click="updateStudent" class="btn btn-success">Update</button>
       <button @click="listingPage" class="btn btn-danger">Cancel</button>
    </div>
    </div>
</template>

<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import ResponseData from "@/types/ResponseData";
import School from "@/types/School";
import StudentService from "@/services/StudentService";
import Student from "@/types/Student";
import SchoolService from "@/services/SchoolService";

export default defineComponent({
  name: "edit-student", 

  
  data() {
    return {
          schools:  [] as School[],
         selectedStudent:{
          studentname: '',
          address: '',
          phonenumber: '',
          email: '',
          gender: '',
          dateofbirth: '',
          school: {},
  
         } as Student,
          message: "",
          submitted: false,
    };
},

methods: {
    updateStudent() {
     
     StudentService.updateStudent(this.selectedStudent)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "the school is updated";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    retrieveStudent(id:any) {
      StudentService.getStudentbyId(id)
        .then((response: ResponseData) => {
          this.selectedStudent = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
     retrieveSchools() {
      SchoolService.getAllSchool()
        .then((response: ResponseData) => {
          this.schools = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

     listingPage(){
      this.$router.replace('/student');
    },

},
   mounted() {
    this.retrieveStudent(this.$route.params.id);
    this.retrieveSchools();
 },
});
</script>

<!-- eslint-disable prettier/prettier -->
<style src="vue-multiselect/dist/vue-multiselect.min.css">
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
