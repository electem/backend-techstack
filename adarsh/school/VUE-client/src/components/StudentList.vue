<template>
  <div class="list row">
    <div class="col-md-8"></div>
    <div class="col-md-6">
      <h4 v-size="'big'">Student List</h4>
      <ul class="list-group"></ul>
      <td>
        <input
          value="Add"
          @click="createStudent"
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
            <th class="text-center" scope="col">EMAIL</th>
            <th class="text-center" scope="col">GENDER</th>
            <th class="text-center" scope="col">DATA</th>
            <th class="text-center" scope="col">EDIT</th>
          </tr>
        </thead>
        <tbody v-for="(student, index) in students" :key="index">
          <tr class="success">
            <th class="text-center" scope="row">{{ student.name }}</th>
            <th class="text-center" scope="row">{{ student.address }}</th>
            <th class="text-center" scope="row">{{ student.email }}</th>
            <th class="text-center" scope="row">{{ student.gender }}</th>
            <th class="text-center" scope="row">{{ student.dateOfBirth }}</th>

            <th class="text-center" scope="row">
              <router-link
                :to="'/students/' + student.id"
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
import { Student } from "@/types/student";

@Component
export default class StudentList extends Vue {
  students: Student[] = [];
  newStudent: Student = {
    name: "",
    address: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    schools: {},
  };
  private currentIndex: number = -1;
  private title: string = "";
  searchStudent: Student[] = [];

  retrieveStudent() {
    SchoolService.getAllStudents()
      .then((response) => {
        this.students = response.data;
        this.searchStudent = this.students;
      })
      .catch((e) => {});
  }
  createStudent() {
    this.$router.replace("/studentsAdd");
  }
  addName() {
    console.log("adarsh");
  }
  mounted() {
    this.retrieveStudent();
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
