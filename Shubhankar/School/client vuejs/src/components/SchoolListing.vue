<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->

<template>
  <h4>School List</h4>
   <input  value="Add" @click="createschool" class="btn float-right btn-primary">
    
   <div class="input-group mb-3">
        <button
           type="button"
            v-on:click='addMessage'
          >
          Search
          </button>
        <input v-model="txtInput" @keyup.enter="addMessage()"/>
      </div>
  <div class="list row">
    <div class="col-md-6"></div>
    <table class="table table-striped table-bordered justify-content-center">
      <thead class="thead-light">
        <tr class="active">
          <th class="text-center" scope="col">Name</th>
          <th class="text-center" scope="col">Address</th>
          <th class="text-center" scope="col">Created At</th>
           <th class="text-center" scope="col">Option</th>
        </tr>
      </thead>
      <tbody
        :class="{ active: index == currentIndex }"
        v-for="(school, index) in schools"
        :key="index"
      >
        <tr class="success">
          <th class="text-center" scope="row">{{ school.schoolname }}</th>
          <th class="text-center" scope="row">{{ school.address }}</th>
          <th class="text-center" scope="row">{{ school.createdAt }}</th>
          <router-link
      :to="'/school/' + school.schoolid"
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

</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import School from "@/types/School";
import ResponseData from "@/types/ResponseData";
import SchoolService from "@/services/SchoolService";

export default defineComponent({
  name: "school-list",
  data() {
    return {
      txtInput: '',
      schools: [] as School[],
      currentSchool: {} as School,
      currentIndex: -1,
      schoolname: "",
    };
    
  },
  methods: {
   
    setActiveSchool(school: School, index = -1) {
      this.currentSchool = school;
      this.currentIndex = index;
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
    addMessage() {
    console.log(this.txtInput);
    if (this.txtInput != '' && this.txtInput) {
     this.schools = this.schools.filter((obj) => {
       return obj.schoolname.toLowerCase()
       .includes(this.txtInput.toLowerCase());
  })
  }},

  createschool(){
    this.$router.replace('/createschool');
  },



  },

  mounted() {
    this.retrieveSchools();
  }
  
})
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
  background-color: blanchedalmond;
}
</style>