<!-- eslint-disable prettier/prettier -->
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="teachername">Name</label>
        <input
          type="text"
          class="form-control"
          id="teachername"
          required
          v-model="teacher.teachername"
          name="teachername"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="teacher.address"
          name="address"
        />
      </div>

      <div class="form-group">
        <label for="phonenumber">Contact</label>
        <input
          type="text"
          class="form-control"
          id="phonenumber"
          required
          v-model="teacher.phonenumber"
          name="phonenumber"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          required
          v-model="teacher.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="gender">Gender</label><br />
        <input type="radio" id="Male" value="Male" v-model="picked" />
        <label for="Male">Male</label><br />
        <input type="radio" id="Female" value="Female" v-model="picked" />
        <label for="Female">Female</label><br />
        <input type="radio" id="Others" value="Others" v-model="picked" />
        <label for="Female">Others</label><br />
        <span>Picked: {{ picked }}</span
        ><br />
      </div>

      <div class="form-group">
        <label for="schools">Select School</label><br />
        <ul class="object administrator-checkbox-list">
          <li
            :class="{ active: index == currentIndex }"
            v-for="(school, index) in schools"
            :key="index"
          >
            <label v-bind:for="school.schoolid">
              <div>
                <input
                  type="checkbox"
                  v-model="selectedSchool"
                  v-bind:value="school"
                />
                <span>{{ school.schoolname }}</span>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <button @click="saveTeacher" class="btn btn-success">Submit</button>
  <button @click="listingPage" class="btn btn-danger">Cancel</button>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent } from "vue";
import ResponseData from "@/types/ResponseData";
import Teacher from "@/types/Teacher";
import TeacherService from "@/services/TeacherService";
import SchoolService from "@/services/SchoolService";
import School from "@/types/School";

export default defineComponent({
  name: "teacher",

  data() {
    return {
      schools: [] as School[],
      selectedSchool: [],
      currentSchool: {} as School,
      teacher: {
        teachername: "",
        address: "",
        email: "",
        gender: "",
      } as Teacher,
      submitted: false,
      picked: "",
    };
  },

  methods: {
    saveTeacher() {
      let data = {
        teacherid: this.teacher.teacherid,
        teachername: this.teacher.teachername,
        address: this.teacher.address,
        phonenumber: this.teacher.phonenumber,
        email: this.teacher.email,
        gender: this.picked,
        schools: this.selectedSchool,
      };

      TeacherService.createTeacher(data)
         this.submitted = true;    
    },
    retrieveSchools() {
      SchoolService.getAllSchool()
        .then((response) => {
          this.schools = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    listingPage() {
      this.$router.replace("/teacher");
    },
  },

  mounted() {
    this.saveTeacher();
    this.retrieveSchools();
  },
});
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
