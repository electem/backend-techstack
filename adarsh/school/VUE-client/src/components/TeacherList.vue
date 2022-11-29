<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" v-model="input" placeholder="Search teachers..." />
        <button class="badge badge-success mr-2" @click="searchTeachers()">
          Search
        </button>
      </div>
    </div>
    <div class="col-md-6">
      <h4 v-size="'big'">Teacher List</h4>
      <ul class="list-group"></ul>
      <td>
        <input
          value="Add"
          @click="createTeacher"
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
            <th class="text-center" scope="col">PHON</th>
            <th class="text-center" scope="col">EDIT</th>
          </tr>
        </thead>
        <tbody v-for="(teacher, index) in teachers" :key="index">
          <tr class="success">
            <th class="text-center" scope="row">{{ teacher.name }}</th>
            <th class="text-center" scope="row">{{ teacher.address }}</th>
            <th class="text-center" scope="row">{{ teacher.email }}</th>
            <th class="text-center" scope="row">{{ teacher.gender }}</th>
            <th class="text-center" scope="row">{{ teacher.phone }}</th>

            <th class="text-center" scope="row">
              <router-link
                :to="'/teachers/' + teacher.id"
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
import { Teacher } from "@/types/teacher";

@Component
export default class TeacherList extends Vue {
  students: Student[] = [];
  teachers: Teacher[] = [];
  newTeachers: Teacher = {
    name: "",
    address: "",
    email: "",
    gender: "",
    schools: [],
  };
  private currentIndex: number = -1;
  private title: string = "";
  teacherName: string[] = [];
  input?: string;
  searchTeacher: Teacher[] = [];

  retrieveTeachers() {
    SchoolService.getAllTeachers()
      .then((response) => {
        this.teachers = response.data;
        this.searchTeacher = this.teachers;
        this.teacherName = this.teachers.map((item) => {
          return item.name!;
        });
      })
      .catch((e) => {});
  }
  searchTitle() {
    return this.teacherName;
  }

  createTeacher() {
    this.$router.replace("/AddTeacher");
  }

  addName() {
    console.log("adarsh");
  }
  searchTeachers() {
    if (this.input != "") {
      this.teachers = this.searchTeacher.filter((teacher) =>
        teacher.name!.toString().includes(this.input!)
      );
    } else {
      this.teachers = this.searchTeacher;
    }
  }

  mounted() {
    this.retrieveTeachers();
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
