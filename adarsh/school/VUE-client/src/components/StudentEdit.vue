<template>
  <div v-if="currentStudent.id" class="edit-form">
    <h4>Student</h4>
    <form>
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentStudent.name"
        />
      </div>
      <div class="form-group">
        <label for="address">Adresss</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="currentStudent.address"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="currentStudent.email"
        />
      </div>

      <div class="form-group">
        <label for="dateOfBirth">DATE</label>
        <input
          type="date"
          class="form-control"
          id="dateOfBirth"
          v-model="currentStudent.dateOfBirth"
        />
      </div>

      <label for="gender">GENDER</label>
      <div class="form-group">
        <input
          type="radio"
          id="MALE"
          value="MALE"
          v-model="currentStudent.gender"
        />
        <label for="MALE">Male</label><br />
        <input
          type="radio"
          id="FEMALE"
          value="FEMALE"
          v-model="currentStudent.gender"
        />
        <label for="FEMALE">Female</label><br />
      </div>

      <div class="form-group col-md-4">
        <label for="name">School : </label>
        <select
          class="select-option"
          required
          v-model="currentStudent.schools.id"
          @change="onSelectedSchool($event)"
        >
          <option
            class="option"
            v-for="(school, index) in schools"
            :key="index"
            :value="school.id"
          >
            {{ school.name }}
          </option>
        </select>
      </div>
      <br />
    </form>
    <button type="cancle" @click="updateStudent" class="btn btn-success">
      Update
    </button>
    <button type="cancle" class="btn btn-danger" @click="onCancle">
      cancle
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SchoolService from "@/services/SchoolService";
import { Student } from "@/types/student";
import { School } from "@/types/school";

@Component
export default class StudentEdit extends Vue {
  private message: string = "";
  currentSchool: School = new School();
  currentStudent: Student = {
    name: "",
    address: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    schools: {},
  };

  genders: string[] = ["MALE", "FEMALE"];
  schools: School[] = [];
  schoolId: number[] = [];
  teacherId: number[] = [];

  getStudent(id: any) {
    SchoolService.getStudent(id)
      .then((response) => {
        this.currentStudent = response.data;
      })
      .catch((e) => {});
  }

  retrieveSchools() {
    SchoolService.getAllSchools()
      .then((response) => {
        this.schools = response.data;
      })
      .catch((e) => {});
    this.schoolId = this.schools.map((item) => {
      return item.id!;
    });
    const teacherId = this.schools.map((item) =>
      item.teachers?.map((item) => item.id)
    );
  }

  updateStudent() {
    SchoolService.updateStudent(this.currentStudent.id!, this.currentStudent)
      .then((response) => {
        this.message = "The tutorial was updated successfully!";
      })
      .catch((e) => {});
  }

  async onSelectedSchool(school: string) {
    const data = this.schools.filter((s) => s.id === +school);
    this.currentSchool = data[0];
  }

  onCancle() {
    this.$router.replace("/student");
  }

  mounted() {
    this.message = "";
    this.getStudent(this.$route.params.id);
    this.retrieveSchools();
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
