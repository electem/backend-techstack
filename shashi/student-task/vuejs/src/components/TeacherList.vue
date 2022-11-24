<!-- eslint-disable prettier/prettier -->
<template>
    <div class="list row">
      <div class="col-md-8"></div>
      <div class="col-md-6">
        <h4>Teachers List</h4>
        <!-- <div class="searchBar">
          <div class="input-group mb-5">
            <input
              type="search"
              class="form-control"           
              placeholder="Teacher's Name"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>
        </div>     -->
        <router-link 
          :to="'/addteacher'"
          class="badge badge-warning"
          custom
      v-slot="{ navigate }"
          > <button  
          class="badge badge-secondary mr-2" 
          @click="navigate"  
        role="link"
        >ADD TEACHER</button>
      </router-link
        > 
        <br />
        <br />
        <input type="text" v-model="input" placeholder="Search Teachers..." />
        <button  
          class="badge badge-success mr-2" 
          @click="filteredList()"          
        >Search</button>
        <br />
        <br />
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
            <tr v-for="(entry, index) in teacherData" :key="index">    
                 <td>{{ entry.teacherid }}</td>
              <td>{{ entry.teachername }}</td>
              <td>{{ entry.email }}</td>
              <td>{{ entry.school.length }}</td>
              <router-link 
          :to="'/teacher/' + entry.teacherid"
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
<script lang="ts">/* eslint-disable */
  
  import { computed, ref } from "vue";
  import { defineComponent } from "vue";
  import studentservice from "@/services/studentservice";
  import ResponseData from "@/types/ResponseData"; 
  import { Teacher } from "@/types/teacher";
  import type { Header, Item } from "vue3-easy-data-table";
  
  export default defineComponent({
    name: "teachers-list",
    data() {
      return {        
        teacherData: [] as Teacher[],
        teachername: "",
        input : ref(""),
       searchedTeachers: [] as Teacher[],
      };
    },
    methods: {
      retrieveTeachers() {
        studentservice
          .getAllTeacherss()
          .then((response: ResponseData) => {
            this.teacherData = response.data;
            this.searchedTeachers= this.teacherData
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      },
      filteredList() {
      if(this.input != ""){
        this.teacherData = this.searchedTeachers.filter((teacher) =>
        teacher.teachername.toString().includes(this.input))  
      } else {
        this.teacherData = this.searchedTeachers;
      }
      
    },
      searchTitle() {
        studentservice
          .findByTitle(this.teachername)
          .then((response: ResponseData) => {
            this.teacherData = response.data;
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
    setup() {
      const fields = ["ID", "TEACHER_NAME", "E-MAIL","TOTAL_SCHOOLS","ACTIONS"];
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
  