<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable prettier/prettier -->
<template>
    <div class="list row">
      <div class="col-md-8"></div>
      <div class="col-md-6">
        <h4>students List</h4>
        <div class="searchBar">
          <div class="input-group mb-5">
            <input
              type="search"
              class="form-control"           
              placeholder="Student's Name"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>
        </div>
        <router-link 
          :to="'/addstudent'"
          class="badge badge-warning"
          custom
      v-slot="{ navigate }"
          > <button  
          class="badge badge-secondary mr-2" 
          @click="navigate"  
        role="link"
        >ADD STUDENT</button>
      </router-link
        >  
        <br />
        <br />
        <div class="search-wrapper panel-heading col-sm-12">
    <input type="text" v-model="search" placeholder="Search" /> <br> <br>
  </div> 
        <table id="schools-list" class="table table-bordered table-striped">
          <thead>
            <tr>
              <!-- loop through each value of the fields to get the table header -->
              <th v-for="field in fields" :key="field">
                {{ field }}
                <i class="bi bi-sort-alpha-down" aria-label="Sort Icon"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in studentData" :key="index">             
              <td>{{ entry.studentname }}</td>
              <td>{{ entry.email }}</td>
              <td>{{ entry.dob }}</td>
              <router-link 
          :to="'/student/' + entry.studentid"
          class="badge badge-warning"
          custom
      v-slot="{ navigate }"
          > <button  
          class="badge badge-success mr-2" 
          @click="navigate"  
        role="link"
        >EDIT</button>
      </router-link
        >
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script lang="ts">

  /* eslint-disable */
  
  import { computed, ref } from "vue";
  import { defineComponent } from "vue";
  import studentservice from "@/services/studentservice";
  import ResponseData from "@/types/ResponseData"; 
  import { Student } from "@/types/student";
  import type { Header, Item } from "vue3-easy-data-table";
  
  export default defineComponent({
    name: "students-list",    
    data() {
      return {        
        studentData: [] as Student[],
        studentname: "",
        search: ""
      };
    },
    methods: {
      retrieveStudents() {
        studentservice
          .getAllStudents()
          .then((response: ResponseData) => {
            this.studentData = response.data;
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },
      filteredProducts() {
       this.studentData.filter(p => {      
        return p.studentname.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
    },
      searchTitle() {
        studentservice
          .findByTitle(this.studentname)
          .then((response: ResponseData) => {
            this.studentData = response.data;
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
    setup() {
      const fields = ["STUDENT_NAME", "E-MAIL", "DATE_OF_BIRTH","ACTIONS"];
      return { fields };
    },
  });
  </script>
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  .table th:hover {
    background: #f2f2f2;
    width: 100px;
  }
  </style>
  