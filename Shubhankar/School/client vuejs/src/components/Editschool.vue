<!-- eslint-disable prettier/prettier -->
<template>
   <div class="submit-form">   
    <div>
      <div class="form-group">
        <label for="schoolname">Name</label>
        <input
          type="text"
          class="form-control"
          id="schoolname"
          required
          v-model="selectedSchool.schoolname"
          name="schoolname"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="selectedSchool.address"
          name="address"
        />
      </div>
      
    <div class="form-group">
   <label for="teachers">Teacher</label>
    <multiselect
     class="form-control"
       id="teachers"
        required
      v-model="selectedSchool.teachers"
       name="teachers"
      :options="teacher"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false" 
      :preserve-search="true"
       placeholder="Pick some"
        label="teachername" 
        track-by="teachername" 
        :preselect-first="true" >
    </multiselect>
  </div>

  <div class="form-group">
   <label for="teachers">Student</label>
    <multiselect
     class="form-control"
       id="students"
        required
      v-model=" selectedSchool.students"
       name="students"
      :options="student"
      :multiple="true" 
      :close-on-select="false"
      :preserve-search="true"
       placeholder="Pick some"
        label="studentname" 
        track-by="studentname" 
        :preselect-first="true">
    </multiselect>
  </div>
  
   <button @click="updateSchool" class="btn btn-success">Update</button>
    <button @click="listingPage" class="btn btn-danger">Cancel</button>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import School from "@/types/School";
import SchoolService from "@/services/SchoolService";
import Multiselect from '@suadelabs/vue3-multiselect'
import TeacherService from "@/services/TeacherService";
import Teacher from "@/types/Teacher";
import StudentService from "@/services/StudentService";
import Student from "@/types/Student";

export default defineComponent({
  name: "edit-school", 
   components: { Multiselect },
  
  data() {
    return {
         teacher: [] as Teacher[],
         student:[] as Student[],
          selectedSchool:{} as School,
          message: "",
          submitted: false,
    };
},

methods: {
    updateSchool() {
     
     SchoolService.updateSchool(this.selectedSchool)
        .then((response) => {
          console.log(response);
            this.$router.replace('/school');
          this.message = "the school is updated";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    retrieveTeachers() {
      TeacherService.getAllTeachers()
        .then((response) => {
          this.teacher = response.data;
         })
        .catch((e: Error) => {
          console.log(e);
        });
    },

     retrieveStudents() {
      StudentService.getAllStudents()
        .then((response) => {
          this.student = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
      
      retrieveSchoolbyId(id :any){
         SchoolService.getSchoolbyId(id)
         .then((response) => {
          this.selectedSchool = response.data;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      },

      listingPage(){
      this.$router.replace('/school');
    }

    
},
   mounted() {
    this.retrieveTeachers();
    this.retrieveStudents();
    this.retrieveSchoolbyId(this.$route.params.id);
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
