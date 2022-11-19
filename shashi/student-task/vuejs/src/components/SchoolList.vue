<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="list row">
    <div class="col-md-8"></div>
    <div class="col-md-6">
      <h4>Schools List</h4>
      <div class="searchBar">
        <!-- <div class="input-group mb-5">
          <input
            type="search"
            class="form-control"           
            placeholder="School Name"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            v-model="search"
          />
        </div> -->
      </div>   
     
      <router-link 
          :to="'/addschool'"
          class="badge badge-warning"
          custom
      v-slot="{ navigate }"
          > <button  
          class="badge badge-secondary mr-2" 
          @click="navigate"  
        role="link"
        >ADD SCHOOL</button>
      </router-link
        >   
        <br />
        <br />   
        <input type="text" v-model="input" placeholder="Search schools..." />
        <button  
          class="badge badge-success mr-2" 
          @click="filteredList()"          
        >Search</button>
  <!-- <div class="item fruit" v-for="fruit in filteredList()" :key="fruit">
    <p>{{ fruit }}</p>
  </div> -->
      
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
        <tbody v-if="schoolList?.length !=0">
          <tr v-for="(entry, index) in schoolList" :key="index">
            <td>{{ entry.schoolid }}</td>
            <td>{{ entry.schoolname }}</td>
            <td>{{ entry.address }}</td>
            <td>{{ entry.teacher.length }}</td>           
            <router-link 
          :to="'/school/' + entry.schoolid"
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
import School from "@/types/school";
import type { Header, Item } from "vue3-easy-data-table";

export default defineComponent({
  name: "schools-list",
  data() {
    return {   
      schoolList: [] as School[],
      schoolname: "",
       input : ref(""),
       fruits : ["apple", "banana", "orange"],
       searchedSchools: [] as School[],
       search:''
    };
  },
  methods: {  
   
    retrieveSchools() {
      studentservice
        .getAll()
        .then((response: ResponseData) => {
          this.schoolList = response.data;
          this.searchedSchools =this.schoolList
          console.log(response.data);
         
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    filteredList() {
      if(this.input != ""){
        this.schoolList = this.searchedSchools.filter((school) =>
      school.schoolname.toString().includes(this.input))  
      } else {
        this.schoolList = this.searchedSchools;
      }
      
    },
  },
  mounted() {
    this.retrieveSchools();   
  },
  setup() {
    const fields = ["ID", "SCHOOL_NAME", "ADDRESS","TOTAL_TEACHERS","ACTIONS"];
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
