<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="school.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="school.address"
          name="address"
        />
        <br />
      </div>
      <div class="form-group">
        <label for="teacher">Teachers</label>
        <div class="control_wrapper">
          <ejs-multiselect
            id="multiselect"
            :dataSource="this.teachers"
            :fields="fields"
            placeholder="'Select Teachers'"
            @change="onSelectedTeacher(this.teachers)"
          ></ejs-multiselect>
        </div>
        <br />
      </div>
      <div class="form-group">
        <label for="description">Student</label>
        <div class="control_wrapper">
          <ejs-multiselect
            id="multiselect"
            :dataSource="this.students"
            :fields="fields"
            placeholder="'Select Students'"
          ></ejs-multiselect>
        </div>
      </div>
      <br />
      <button @click="saveSchool" class="btn btn-success">Submit</button>
      <button @click="onCancle" class="btn btn-danger">cancle</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { School } from "@/types/school";
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import SchoolService from "@/services/SchoolService";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";
import App from "@/App.vue";
Vue.use(MultiSelectPlugin);

@Component
export default class AddSchool extends Vue {
  students: Student[] = [];
  private school: School = {
    name: "",
    address: "",
    teachers: [],
    students: [],
  };
  components!: {
    App:"ejs-multiselect";
  };
  teachers: Teacher[] = [];
  slectedStudent: Student[] = [];
  studentSelected: Student = new Student();
  slectedTeacher: Teacher[] = [];
  teacherSelected: Teacher = new Teacher();

  data() {
    return {
      fields: { text: "name", value: "id" },
      index: 2,
    };
  }

  private submitted: boolean = false;
  schools: School[] = [];

  retrieveStudent() {
    SchoolService.getAllStudents()
      .then((response) => {
        this.students = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  retrieveTeachers() {
    SchoolService.getAllTeachers()
      .then((response) => {
        this.teachers = response.data;
      })
      .catch((e) => {});
  }
  saveSchool() {
    let data = {
      name: this.school.name,
      address: this.school.address,
    };

    SchoolService.createSchool(data)
      .then((response) => {
        this.school = response.data;
        this.submitted = true;
      })
      .catch((e) => {});
  }

  onCancle() {
    this.$router.replace("/school");
  }

  mounted() {
    this.retrieveStudent();
    this.retrieveTeachers();
  }
  onSelectedStudent(student: Student) {
    this.studentSelected = student;
    this.slectedStudent.push(this.studentSelected);
  }
  onSelectedTeacher(teacher: Teacher) {
    this.teacherSelected = teacher;
    this.slectedTeacher.push(this.teacherSelected);
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
