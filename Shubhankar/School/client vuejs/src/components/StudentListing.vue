<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <input value="Add" @click="addStudent" class="btn float-right btn-primary" />
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" v-model="input" placeholder="Search students..." />
        <button class="badge badge-success mr-2" @click="searchStudent()">
          Search
        </button>
      </div>

      <div class="col-md-6">
        <h4>Student</h4>
        <div class="list row">
          <b-table class="table table-striped">
            <thead class="thead-dark">
              <tr class="active">
                <th class="text-center" scope="col">Name</th>
                <th class="text-center" scope="col">Address</th>
                <th class="text-center" scope="col">Contact</th>
                <th class="text-center" scope="col">Email</th>
                <th class="text-center" scope="col">Gender</th>
                <th class="text-center" scope="col">Born year</th>
                <th class="text-center" scope="col">Option</th>
              </tr>
            </thead>
            <tbody
              :class="{ active: index == currentIndex }"
              v-for="(student, index) in students"
              :key="index"
            >
              <tr class="success">
                <th class="text-center" scope="row">
                  {{ student.studentname }}
                </th>
                <th class="text-center" scope="row">{{ student.address }}</th>
                <th class="text-center" scope="row">
                  {{ student.phonenumber }}
                </th>
                <th class="text-center" scope="row">{{ student.email }}</th>
                <th class="text-center" scope="row">{{ student.gender }}</th>
                <th class="text-center" scope="row">
                  {{ student.dateofbirth }}
                </th>
                <router-link
                  :to="'/student/' + student.studentid"
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
                  @click="removeStudent(student.studentid)"
                >
                  Delete
                </button>
              </tr>
            </tbody>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import Student from "@/types/Student";
import ResponseData from "@/types/ResponseData";
import StudentService from "@/services/StudentService";

export default defineComponent({
  name: "school-list",
  data() {
    return {
      input: "",
      students: [] as Student[],
      searchedStudent: [] as Student[],
      currentStudent: {} as Student,
      currentIndex: -1,
      title: "",
      show: true,
      studentname: "",
      message: "",
    };
  },
  methods: {
    retrieveStudents() {
      StudentService.getAllStudents()
        .then((response) => {
          this.students = response.data;
          this.searchedStudent = this.students;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchStudent() {
      if (this.input != "") {
        this.students = this.searchedStudent.filter((student) =>
          student.studentname.toString().includes(this.input)
        );
      } else {
        this.students = this.searchedStudent;
      }
    },

    addStudent() {
      this.$router.replace("/createstudent");
    },

    removeStudent(id: number) {
      StudentService.deleteStudent(id)
        .then((response) => {
          console.log(response);
          this.message = "the student is deleted";
          this.$router.replace("/student");
        })
        .catch((e: Error) => {
          console.log(e);
        });
      this.retrieveStudents();
    },
  },
  mounted() {
    this.retrieveStudents();
  },
});
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.list {
  text-align: left;
  max-width: 860px;
  margin: auto;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
