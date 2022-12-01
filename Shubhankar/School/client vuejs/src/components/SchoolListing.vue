<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <input
    value="Add"
    @click="createschool"
    class="btn float-right btn-primary"
  />
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" v-model="input" placeholder="Search schools..." />
        <button class="badge badge-success mr-2" @click="searchSchool()">
          Search
        </button>
      </div>
      <div class="col-md-6">
        <h4>School</h4>
        <div class="list row">
          <MDBTable class="table table-striped">
            <thead class="thead-dark">
              <tr class="active">
                <th class="text-center" scope="col">Id</th>
                <th class="text-center" scope="col">Name</th>
                <th class="text-center" scope="col">Address</th>
                <th class="text-center" scope="col">Teacher Count</th>
                <th class="text-center" scope="col">Student Count</th>
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
                <th class="text-center" scope="row">{{ school.schoolid }}</th>
                <th class="text-center" scope="row">{{ school.schoolname }}</th>
                <th class="text-center" scope="row">{{ school.address }}</th>
                <th class="text-center" scope="row">
                  {{ school.teachers?.length }}
                </th>
                <th class="text-center" scope="row">
                  {{ school.students?.length }}
                </th>
                <th class="text-center" scope="row">{{ school.createdAt }}</th>

                <router-link
                  :to="'/school/' + school.schoolid"
                  class="badge badge-warning"
                  custom
                  v-slot="{ navigate }"
                >
                  <button
                    class="badge badge-success mr-2"
                    @click="navigate"
                    role="link"
                  >
                    EDIT
                  </button>
                </router-link>
                <button
                  class="badge badge-danger mr-2"
                  @click="removeSchool(school.schoolid)"
                >
                  Delete
                </button>
              </tr>
            </tbody>
          </MDBTable>
        </div>
      </div>
    </div>
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

    searchSchool() {
      if (this.input != "") {
        this.schools = this.searchedSchool.filter((school) =>
          school.schoolname.toString().includes(this.input)
        );
      } else {
        this.schools = this.searchedSchool;
      }
    },

    createschool() {
      this.$router.replace("/createschool");
    },

    removeSchool(id: number) {
      SchoolService.deleteSchool(id)
        .then((response) => {
          console.log(response);
          this.message = "the school is deleted";
          this.$router.replace("/school");
        })
        .catch((e: Error) => {
          console.log(e);
        });
      this.retrieveSchools();
    },
  },

  mounted() {
    this.retrieveSchools();
  },
});
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.list {
  text-align: left;
  max-width: 500px;
  margin: auto;
}
</style>
