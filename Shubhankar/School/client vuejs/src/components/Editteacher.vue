<!-- eslint-disable prettier/prettier -->
<template>
<h1>hello</h1>
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
  
         <div class="form-group">
    <label for="schools">Select School</label><br>
      <ul class="object administrator-checkbox-list">
          <li  :class="{ active: index == currentIndex }"
           v-for="(school, index) in schools"
        :key="index">
             <label v-bind:for="school.schoolid">
        <div  >
          <input type="checkbox" v-model="selectedTeacher.school" v-bind:value="school">
            <span>{{ school.schoolname }}</span>
        </div>
        </label>
    </li>
      </ul>
         </div>
          
        </div>
      </div>

      <button @click="updateSchool" class="btn btn-success">Update</button>
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
         selectedTeacher:{} as Teacher,
          message: "",
          submitted: false,
    };
},

methods: {
    updateSchool() {
     
     TeacherService.updateTeacher(this.selectedTeacher)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "the teacher is updated";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    retrieveTeachers(id: any) {
      TeacherService.createTeacherbyId(id)
        .then((response: ResponseData) => {
          this.selectedTeacher = response.data;
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
          
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    
    
    
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
