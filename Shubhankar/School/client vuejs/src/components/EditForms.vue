<!-- eslint-disable prettier/prettier -->
<template>
  <!DOCTYPE html>
  <html lang="en">
    <body>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper">
          <div class="main-panel">
            <div class="content-wrapper">
              <div class="page-header">
                <h4 class="page-title">EDIT SCHOOL</h4>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Forms</a></li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Form elements
                    </li>
                  </ol>
                </nav>
              </div>
              <div class="row">
                <div class="col-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                     <form class="forms-sample">
                        <div class="form-group">
                          <label for="schoolname">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="schoolname"
                            required
                            placeholder="Name"
                            v-model="selectedSchool.schoolname"
                          />
                        </div>
                        <div class="form-group">
                          <label for="address">Address</label>
                          <input
                            type="text"
                            class="form-control"
                            id="address"
                            placeholder="address"
                            v-model="selectedSchool.address"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword4">Teacher</label>
                          <multiselect
                            class="teachers"
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
                            :preselect-first="true"
                          >
                          </multiselect>
                        </div>
                        <div class="form-group">
                          <label for="exampleSelectGender">Student</label>
                          <multiselect
                            class="js-example-basic-multiple"
                            id="students"
                            required
                            v-model="selectedSchool.students"
                            name="students"
                            :options="student"
                            :multiple="true"
                            :close-on-select="false"
                            :preserve-search="true"
                            placeholder="Pick some"
                            label="studentname"
                            track-by="studentname"
                            :preselect-first="true"
                          >
                          </multiselect>
                        </div>
                        <button
                          @click="updateSchool"
                          class="btn btn-primary mr-2"
                        >
                          Update
                        </button>
                        <button class="btn btn-danger" @click="listingPage">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import TeacherService from "@/services/TeacherService";
import Teacher from "@/types/Teacher";
import StudentService from "@/services/StudentService";
import Student from "@/types/Student";
import School from "@/types/School";
import SchoolService from "@/services/SchoolService";
import Multiselect from "@suadelabs/vue3-multiselect";

export default defineComponent({
  name: "App",
  components: { Multiselect },
  data() {
    return {
      teacher: [] as Teacher[],
      student: [] as Student[],
      selectedSchool: {} as School,
      message: "",
      submitted: false,
    };
  },

  methods: {
    updateSchool() {
      SchoolService.updateSchool(this.selectedSchool)
        .then((response) => {
          console.log(response);
          this.$router.replace("/tablelist");
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
          console.log(response.data);
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

    retrieveSchoolbyId(id: any) {
      SchoolService.getSchoolbyId(id)
        .then((response) => {
          this.selectedSchool = response.data;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    listingPage() {
      this.$router.replace("/tablelist");
    },
  },

  mounted() {
    this.retrieveTeachers();
    this.retrieveStudents();
    this.retrieveSchoolbyId(this.$route.params.id);
  },
});
</script>
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<style>
@import "assets/css/Tablelist.css";
@import "assets/vendors/mdi/css/materialdesignicons.min.css";
@import "assets/vendors/flag-icon-css/css/flag-icon.min.css";
@import "assets/vendors/css/vendor.bundle.base.css";
@import "assets/vendors/font-awesome/css/font-awesome.min.css";
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
