<template>
  <div v-if="currentSchool.id" class="edit-form">
    <h4>School</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentSchool.name"
        />
      </div>
      <div class="form-group">
        <label for="address">Adresss</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="currentSchool.address"
        />
      </div>
      <div class="form-group">
        <label for="teachers">Teachers</label>
        <ejs-multiselect
          :dataSource="this.teachers"
          :value="this.slectedValues"
          :fields="fields"
        ></ejs-multiselect>
      </div>
      <div class="form-group">
        <label for="students">Student</label>
        <ejs-multiselect
          :dataSource="this.students"
          :value="this.slectedValues"
          :fields="fields"
        ></ejs-multiselect>
      </div>
    </form>
    <button type="cancle" @click="updateSchool" class="btn btn-success">
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
import { School } from "@/types/school";
import SchoolService from "@/services/SchoolService";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";
import App from "@/App.vue"
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(MultiSelectPlugin);

@Component
export default class SchoolEdit extends Vue {
  schools: School[] = [];
  slectedValues: string[] = [];
  private message: string = "";
  currentSchool: School = {
    name: "",
    address: "",
    teachers: [],
    students: [],
  };
  teachers: Teacher[] = [];
  students: Student[] = [];
  components!: {

  };

  data() {
    return {
      fields: { text: "name", value: "id" },
    };
  }

  getSchool(id: any) {
    SchoolService.getSchool(id)
      .then((response) => {
        this.currentSchool = response.data;
        for (var teacher of this.currentSchool.teachers!) {
          this.slectedValues.push(teacher.name!);
         
        }
      })
      .catch((e) => {});
    this.data;
  }

  updateSchool() {
    SchoolService.updateSchool(this.currentSchool.id!, this.currentSchool)
      .then((response) => {
        this.message = "The tutorial was updated successfully!";
      })
      .catch((e) => {});
  }

  retrieveTeachers() {
    SchoolService.getAllTeachers()
      .then((response) => {
        this.teachers = response.data;
      })
      .catch((e) => {});
  }
  retrieveSchools() {
    SchoolService.getAllSchools()
      .then((response) => {
        this.schools = response.data;
      })
      .catch((e) => {});
  }
  retrieveStudent() {
    SchoolService.getAllStudents()
      .then((response) => {
        this.students = response.data;
      })
      .catch((e) => {});
  }
  onCancle() {
    this.$router.replace("/school");
  }

  mounted() {
    this.getSchool(this.$route.params.id);
    this.retrieveSchools();
    this.retrieveTeachers();
    this.message = "";
    this.retrieveStudent();
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
