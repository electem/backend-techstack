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
          v-model="teachers.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="teachers.address"
          name="address"
        />
        <br />
      </div>
      <div class="form-group">
        <label for="email">EMAIL</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="teachers.email"
          name="email"
        />
        <br />
      </div>
      <div class="form-group">
        <label for="phone">PHONE</label>
        <input
          class="form-control"
          id="phone"
          type="number"
          required
          v-model="teachers.phone"
          name="phone"
        />
        <br />
      </div>

      <label for="gender">Select Gender</label>
      <div class="form-group" v-for="(gender, index) in genders" :key="index">
        <input type="radio" v-model="teachers.gender" name="gender" />{{
          gender
        }}
      </div>
      <br />

      <div id="demo">
        <label for="Schools">School</label>
        <ul>
          <li v-for="(school, index) in schools" :key="index">
            <input
              type="checkbox"
              :value="school.name"
              :id="school.id"
              @change="onSelectedSchool(school)"
            />
            {{ school.name }}
          </li>
        </ul>

        <br />

        <button @click="saveStudent" class="btn btn-success">Submit</button>
        <br />
        <button type="cancle" @click="onCancle" class="btn btn-danger">
          cancle
        </button>
      </div>
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
import { Teacher } from "@/types/teacher";
import App from "@/App.vue";
Vue.use(MultiSelectPlugin);

@Component
export default class AddTeacher extends Vue {
  genders: string[] = ["MALE", "FEMALE"];
  schools: School[] = [];
  teachers: Teacher = {
    name: "",
    address: "",
    email: "",
    gender: "",
    schools: [],
  };


  schoolList: School[] = [];
  schoolSelected: School = new School();
  slectedSchool: School[] = [];

  data() {
    return {
      fields: { text: "name", value: "id" },
      index: 2,
    };
  }

  private submitted: boolean = false;

  retrieveSchools() {
    SchoolService.getAllSchools()
      .then((response) => {
        this.schools = response.data;
      })
      .catch((e) => {});
    this.schoolList = this.schools;
  }
  retrieveTeachers() {
    SchoolService.getAllTeachers()
      .then((response) => {
        this.teachers = response.data;
      })
      .catch((e) => {});
  }
  saveStudent() {
    let data = {
      name: this.teachers.name,
      address: this.teachers.address,
      email: this.teachers.email,
      gender: this.teachers.gender,
      schools: this.slectedSchool,
    };

    SchoolService.createTeacher(data)
      .then((response) => {
        this.teachers = response.data;
        this.submitted = true;
      })
      .catch((e) => {});
  }
  onCancle() {
    this.$router.replace("/teacher");
  }
  onSelectedSchool(schools: School) {
    this.schoolSelected = schools;
    this.slectedSchool.push(this.schoolSelected);
  }

  mounted() {
    this.retrieveSchools();
    this.retrieveTeachers();
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
