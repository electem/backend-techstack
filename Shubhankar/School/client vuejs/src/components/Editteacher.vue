<!-- eslint-disable prettier/prettier -->
<template>
<div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="teachername">Name</label>
        <input
          type="text"
          class="form-control"
          id="teachername"
          required
          v-model="selectedTeacher.teachername"
          name="teachername"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="selectedTeacher.address"
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
          v-model="selectedTeacher.phonenumber"
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
          v-model="selectedTeacher.email"
          name="email"
        />
      </div>

   <div class="form-group">
    <label for="gender">Gender</label><br>
  <input type="radio" id="Male" value="Male" v-model="selectedTeacher.gender">
  <label for="Male">Male</label><br>
  <input type="radio" id="Female" value="Female" v-model="selectedTeacher.gender">
  <label for="Female">Female</label><br>
  <input type="radio" id="Others" value="Others" v-model="selectedTeacher.gender">
  <label for="Female">Others</label><br>
  <span>Picked: {{ picked }}</span><br>
   </div>
      
<br />
       <div  class="form-group">
            <label for="schools">Select School</label><br>
            <li v-for="(school, index) in schools"
                  :key="index">
            <input type="checkbox" 
              :fieldId="school.schoolname"
              :label="school.schoolname"
              :checked="value.includes(school.schoolid)"
              v-on:change="addSchooltoTeacher(school)"
              :key="school"
              
               />
              <span>{{ school.schoolname }}</span>
              </li>
          </div>
        </div>
      </div>
      <button @click="updateTeacher" class="btn btn-success">Update</button>
      <button @click="listingPage" class="btn btn-danger">Cancel</button>
 
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import ResponseData from "@/types/ResponseData";
import School from "@/types/School";
import SchoolService from "@/services/SchoolService";
 import TeacherService from "@/services/TeacherService";
import Teacher from "@/types/Teacher";

export default defineComponent({
  name: "edit-teacher", 
  
  
  data() {
    return {
        schools:[] as School[],
         selectedTeacher: {} as Teacher,
          message: "",
          submitted: false,
          value : [] as number[],
          SelectedSchool:[] as School[],
          currentSchool: {} as School,
    };
},

methods: {
    updateTeacher() {  
       
     TeacherService.updateTeacher(this.selectedTeacher)
        .then((response: ResponseData) => {
          console.log(response.data);
           this.$router.replace('/teacher');
          this.message = "the teacher is updated";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    retrieveTeachers(id: number) {
      TeacherService.createTeacherbyId(id)
        .then((response: ResponseData) => {
          this.selectedTeacher = response.data;
          for(const i of this.selectedTeacher.schools){
            this.value.push(i.schoolid);
          }
       
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    async addSchooltoTeacher(school: School): Promise<void> {
      if (!this.value.includes(school.schoolid)){
      this.currentSchool = school;
      this.selectedTeacher.schools?.push(this.currentSchool);
      }else{
     this.selectedTeacher.schools.splice(this.schools.indexOf(this.currentSchool), 1);
      }
    },
  
   retrieveSchools() {
      SchoolService.getAllSchool()
        .then((response: ResponseData) => {
          this.schools = response.data;
          
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
 listingPage(){
      this.$router.replace('/teacher');
    }
    
},
   mounted() {
    this.retrieveTeachers(this.$route.params.id);
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
