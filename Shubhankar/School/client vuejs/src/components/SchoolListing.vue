<!-- eslint-disable prettier/prettier -->
<template>
  <h4>School List</h4>
  <div class="list row">
    <div class="col-md-6"></div>
    <table class="table table-striped table-bordered justify-content-center">
      <thead class="thead-light">
        <tr class="active">
          <th class="text-center" scope="col">Name</th>
          <th class="text-center" scope="col">Address</th>
          <th class="text-center" scope="col">Created At</th>
        </tr>
      </thead>
      <tbody
        :class="{ active: index == currentIndex }"
        v-for="(school, index) in schools"
        :key="index"
      >
        <tr class="success">
          <th class="text-center" scope="row">{{ school.schoolname }}</th>
          <th class="text-center" scope="row">{{ school.address }}</th>
          <th class="text-center" scope="row">{{ school.createdAt }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import School from "@/types/School";
import ResponseData from "@/types/ResponseData";
import SchoolService from "@/services/SchoolService";

export default defineComponent({
  name: "school-list",
  data() {
    return {
      schools: [] as School[],
      currentSchool: {} as School,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveSchools() {
      SchoolService.getAllSchool()
        .then((response: ResponseData) => {
          this.schools = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveSchools();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
  background-color: blanchedalmond;
}
</style>