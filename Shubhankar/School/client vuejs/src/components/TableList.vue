<!-- eslint-disable prettier/prettier -->
<template>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Breeze Admin</title>
   </head>
  <body>
  <div class="container-scroller">
      

      <div class="container-fluid page-body-wrapper">
        <div id="theme-settings" class="settings-panel">
          <i class="settings-close mdi mdi-close"></i>
          <p class="settings-heading">SIDEBAR SKINS</p>
          <div class="sidebar-bg-options selected" id="sidebar-default-theme">
            <div class="img-ss rounded-circle bg-light border mr-3"></div> Default
          </div>
          <div class="sidebar-bg-options" id="sidebar-dark-theme">
            <div class="img-ss rounded-circle bg-dark border mr-3"></div> Dark
          </div>
          <p class="settings-heading mt-2">HEADER SKINS</p>
          <div class="color-tiles mx-0 px-4">
            <div class="tiles light"></div>
            <div class="tiles dark"></div>
          </div>
        </div>
         <div class="main-panel">
          <div class="content-wrapper center">
            <div class="page-header">
               <input
                value="Add"
                @click="createschool"
                 class="btn float-right btn-primary"
                />
              <h4 class="page-title">School Listing</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Tables</a></li>
                  <li class="breadcrumb-item active" aria-current="page"> School </li>
                </ol>
              </nav>
            </div>
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                   <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>SchoolId</th>
                            <th>School Name</th>
                            <th>Address</th>
                             <th>Student Count</th>
                             <th>Teacher Count</th>
                             <th>Action</th>
                            </tr>
                        </thead>
                        <tbody :class="{ active: index == currentIndex }"
                         v-for="(school, index) in schools"
                          :key="index">
                        <tr>
                            <td>{{ school.schoolid }}</td>
                            <td>{{ school.schoolname }}</td>
                            <td>{{ school.address }}</td>
                            <td>{{ school.students?.length }}</td>
                            <td>{{  school.teachers?.length }}</td>
                            <router-link
                  :to="'/forms/' + school.schoolid"
                  class="badge badge-warning"
                  custom
                  v-slot="{ navigate }"
                >
                  <button
                    class="btn btn-outline-primary"
                    @click="navigate"
                    role="link"
                  >
                    View
                  </button>
                </router-link>
                          
                        </tr>
                       </tbody>
                      </table>
                    </div>
                  </div>
                 </div>
              </div>
              </div>
             </div>
         
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    
  </body>
</html>
        </template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">

    
import { defineComponent } from "vue";
import School from "@/types/School";
import SchoolService from "@/services/SchoolService";

export default defineComponent({
  name: "App",
  components: {
    
  },

   data() {
    return {
      input: "",
      schools: [] as School[],
      searchedSchool: [] as School[],
      currentSchool: {} as School,
      currentIndex: -1,
      schoolname: "",
      message: "",
    };
   },
  methods: {

   setActiveSchool(school: School, index = -1) {
      this.currentSchool = school;
      this.currentIndex = index;
    },

    retrieveSchools() {
      SchoolService.getAllSchool()
        .then((response) => {
          this.schools = response.data;
          this.searchedSchool = this.schools;
         })
        .catch((e: Error) => {
          console.log(e);
        });
    },

   goToForm() {
      this.$router.push('/dashboard'); 
    },

   createschool() {
      this.$router.replace("/forms");
    },

    searchSchool(){
      if (this.input != "") {
        this.schools = this.searchedSchool.filter((school) =>
          school.schoolname.toString().includes(this.input)
        );
      } else {
        this.schools = this.searchedSchool;
      }
    },
  },

  mounted() {
  this.retrieveSchools();
  },


 });
</script>
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<style >
@import "assets/css/Tablelist.css";
@import "assets/vendors/mdi/css/materialdesignicons.min.css";
@import "assets/vendors/flag-icon-css/css/flag-icon.min.css";
@import "assets/vendors/css/vendor.bundle.base.css" ;
@import "assets/vendors/font-awesome/css/font-awesome.min.css"
</style>