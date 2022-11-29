<!-- eslint-disable prettier/prettier -->
<template>
  <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">         
          <span class="mx-2 text-2xl font-semibold text-black">Schools List</span>
        </div>
      </div>
      <div class="flex items-center">

<div class="relative mx-4 lg:mx-0">      

  <input
    class="
      w-32
      pl-10
      pr-4
      py-2
      text-indigo-600
      border-gray-200
      rounded-md
      sm:w-64
      focus:border-indigo-600
      focus:ring
      focus:ring-opacity-40
      focus:ring-indigo-500
    "
    type="text"
    v-model="input"
    placeholder="Search"
  />        
  <button class="badge badge-success mr-2" @click="filteredList()">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
    <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</button>
</div>
</div>
<br/>
  <EasyDataTable
    v-model:server-options="serverOptions"
    :headers="headers"
    :items="items"
    :loading="loading"
    :server-items-length="totalNumberOfSchools"
    v-on:click="changeData(serverOptions.page, serverOptions.rowsPerPage)"
    buttons-pagination
  />
</template>

<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import type {
  Header,
  Item,
  ServerOptions,
  SortType,
} from "vue3-easy-data-table";
import studentservice from "@/studentservice";
import School from "@/types/school";

export default defineComponent({
  name: "edit-school",
  data() {
    return {
      input: ref(""),
      searchedSchools: [] as School[],
      schoolList: [] as School[],
      currentSchool: {} as School,
      message: "",
      headers: [] as Header[],
      items: [] as School[],
      teacherCountInschool: [] as number[],
      loading: ref(false),
      serverItemsLength: ref(0),
      serverOptions: ref<ServerOptions>({
        page: 1,
        rowsPerPage: 5,
      }),
      totalNumberOfSchools: ref(0),
    };
  },
  methods: {
    changeData(page: number, rowsPerPage: number) {
      this.serverOptions.page = page;
      this.serverOptions.rowsPerPage = rowsPerPage;
      studentservice
        .getAllSchoolPagination(
          this.serverOptions.page,
          this.serverOptions.rowsPerPage
        )
        .then((response) => {
          this.items = response.data.elements;
          this.totalNumberOfSchools = response.data.totalElements;
        });
    },
    async setup() {
      this.headers = [
        { text: "SchoolName", value: "schoolname" },
        { text: "Address", value: "address" }, 
      ];
      await studentservice
        .getAllSchoolPagination(
          this.serverOptions.page,
          this.serverOptions.rowsPerPage
        )
        .then((response) => {
          console.log(response.data.elements);
          this.schoolList = response.data;
          this.searchedSchools = this.schoolList;
          this.items = response.data.elements;
          this.totalNumberOfSchools = response.data.totalElements;
        });
        studentservice
        .getAllSchool()
        .then((response) => {
          this.schoolList = response.data;
          this.searchedSchools = this.schoolList;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    filteredList() {
      if (this.input != "") {
        this.schoolList = this.searchedSchools.filter((school) =>
          school.schoolname.toString().includes(this.input)
        );
      } else {
        this.schoolList = this.searchedSchools;
      }
    },
  },
  mounted() {
     this.setup();
  },
});
</script>
