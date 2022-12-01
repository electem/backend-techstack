<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3"></div>
    </div>
    <div class="col-md-6">
      <h4 v-size="'big'">School List</h4>
      <ul class="list-group"></ul>
      <td>
        <input
          value="Add"
          @click="createschool"
          class="btn float-right btn-primary"
        />
      </td>
      <br />
    </div>
    <br />
    <div class="container">
      <table class="table table-bordered justify-content-center">
        <thead class="thead-light">
          <tr class="active">
            <th class="text-center" scope="col">NAME</th>
            <th class="text-center" scope="col">ADRESS</th>
            <th class="text-center" scope="col">NO STUDENT</th>
            <th class="text-center" scope="col">NO TESCHERS</th>
            <th class="text-center" scope="col">EDIT</th>
          </tr>
        </thead>
        <tbody v-for="(school, index) in schools" :key="index">
          <tr class="success">
            <th class="text-center" scope="row">{{ school.name }}</th>
            <th class="text-center" scope="row">{{ school.address }}</th>
            <th class="text-center" scope="row">
              {{ school.students.length }}
            </th>
            <th class="text-center" scope="row">
              {{ school.teachers.length }}
            </th>

            <th class="text-center" scope="row">
              <router-link
                :to="'/schools/' + school.id"
                class="badge badge-warning"
                custom
                v-slot="{ navigate }"
              >
                <button
                  type="button"
                  class="btn btn-info btn-sm mr-2"
                  @click="navigate"
                  role="link"
                >
                  EDIT
                </button>
              </router-link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { School } from "@/types/school";
import SchoolService from "@/services/SchoolService";


@Component
export default class SchoolList extends Vue {
  private schools: School[] = [];
  newSchool: School = {
    name: "",
    address: "",
    teachers: [],
    students: [],
  };
  private currentIndex: number = -1;
  private title: string = "";
  input?: string;
  searchSchool: School[] = [];


  retrieveSchools() {
    SchoolService.getAllSchools()
      .then((response) => {
        this.schools = response.data;
        this.searchSchool = this.schools;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSchools();
    this.newSchool = {} as School;
    this.currentIndex = -1;
  }

  setActiveSchool(school: School, index: number) {
    this.newSchool = school;
    this.currentIndex = index;
  }
  createschool() {
    this.$router.replace("/add");
  }

  addName() {
    console.log("adarsh");
  }

  mounted() {
    this.retrieveSchools();
  }
  
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
