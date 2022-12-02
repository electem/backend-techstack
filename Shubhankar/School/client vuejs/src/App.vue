<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <div class="container-fluid page-body-wrapper">
      <nav class="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div
          class="navbar-menu-wrapper d-flex align-items-stretch justify-content-between"
        >
          <ul class="navbar-nav">
            <li
              class="nav-item nav-search border-0 ml-1 ml-md-3 ml-lg-5 d-none d-md-flex"
            ></li>
          </ul>
          <ul class="navbar-nav navbar-nav-right ml-lg-auto">
            <li class="nav-item nav-profile dropdown border-0">
              <a
                class="nav-link dropdown-toggle"
                id="profileDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <span class="profile-name">Shubhankar Singh</span>
              </a>
              <div
                class="dropdown-menu navbar-dropdown w-100"
                aria-labelledby="profileDropdown"
              >
                <a class="dropdown-item" href="#">
                  <i class="mdi mdi-cached mr-2 text-success"></i> Activity Log
                </a>
                <a class="dropdown-item" href="#">
                  <i class="mdi mdi-logout mr-2 text-primary"></i> Signout
                </a>
              </div>
            </li>
          </ul>
          <button
            class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>

      <nav
        class="sidebar sidebar-offcanvas"
        id="sidebar"
       
      >
        <div
          class="text-center sidebar-brand-wrapper d-flex align-items-center"
        >
          <a class="sidebar-brand brand-logo">Your School App </a>
          <a class="sidebar-brand brand-logo-mini pl-4 pt-3"></a>
        </div>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8081">
              <i class="mdi mdi-home menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8081/forms">
              <i class="mdi mdi-format-list-bulleted menu-icon"></i>
              <span class="menu-title">Forms</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8081/tablelist">
              <i class="mdi mdi-table-large menu-icon"></i>
              <span class="menu-title">SchoolList</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8081/datatableapp">
              <i class="mdi mdi-file-document-box menu-icon"></i>
              <span class="menu-title">DataTable</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
 <div class="container mt-3">
    <router-view />
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import SchoolService from "./services/SchoolService";
import School from "./types/School";
export default defineComponent({
  name: "App",

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

    searchSchool() {
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
<style>
@import "components/assets/css/Tablelist.css";
@import "components/assets/vendors/mdi/css/materialdesignicons.min.css";
@import "components/assets/vendors/flag-icon-css/css/flag-icon.min.css";
@import "components/assets/vendors/css/vendor.bundle.base.css";
@import "components/assets/vendors/font-awesome/css/font-awesome.min.css";
</style>
