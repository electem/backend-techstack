<!-- eslint-disable prettier/prettier -->
<template>
  <div class="flex items-center justify-center mt-5">
    <div class="flex items-center">
      <span class="mx-2 text-2xl font-bold text-black">Schools List</span>
    </div>
  </div>
  <div class="flex justify-end mt-4">
    <button
      class="px-2 py-1 text-gray-200 bg-red-800 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
      @click="DeleteSelectedSchools()"
    >
      DELETE
    </button>
  </div>
  <div class="flex items-center">
    <div class="relative mx-4 lg:mx-0">
      <input
        class="w-32 pl-10 pr-4 py-2 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
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
 
  <br />
  <EasyDataTable
    v-model:server-options="serverOptions"
    v-model:items-selected="itemsSelected"
    header-text-direction="center"
    body-text-direction="center"
    :headers="headers"  
    :prev-text="'Prev'"
    :next-text="'Next'"
    :items="items"
    :loading="loading"
    :server-items-length="totalNumberOfSchools"
    v-on:click="changeData(serverOptions.page, serverOptions.rowsPerPage,seachedString)"
    :rows-items="rowsItemsComputed"
    buttons-pagination
    must-sort
  >
    <template #item-operation>
      <div>
        <div class="flex justify-around">
          <span class="text-yellow-500 flex justify-center">
            <a href="#" class="mx-2 px-2 rounded-md"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <form method="POST">
              <button class="mx-2 px-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </span>
        </div>
      </div>
    </template>
  </EasyDataTable>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import studentservice from "@/studentservice";
import School from "@/types/school";
import DeleteSchool from "@/types/school";

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
      rowsItemsComputed: [5, 10, 15, 20],
      itemsSelected: ref<School[]>([]),
      selectedSchoolIDs: [] as number[],
      seachedString:{} as string
    };
  },
  methods: {
    changeData(page: number, rowsPerPage: number,seachedString: string) {
      this.serverOptions.page = page;
      this.serverOptions.rowsPerPage = rowsPerPage;
      studentservice
        .getAllSchoolPagination(
          this.serverOptions.page,
          this.serverOptions.rowsPerPage,
         this.seachedString
        )
        .then((response) => {
          this.items = response.data.elements;
          this.totalNumberOfSchools = response.data.totalElements;
        });
    },
    async setup() {
      this.headers = [
        { text: "School-ID", value: "schoolid", sortable: true },
        { text: "SchoolName", value: "schoolname" },
        { text: "Address", value: "address" },
        { text: "Operation", value: "operation" },
      ];
      await studentservice
        .getAllSchoolPagination(
          this.serverOptions.page,
          this.serverOptions.rowsPerPage,
          this.seachedString
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
    async DeleteSelectedSchools() {
      const result = this.itemsSelected.map((school) => school.schoolid);
      console.log(this.selectedSchoolIDs);
      await studentservice.deleteSelectedSchool(result);
    },
    DeleteSchoolById(id: number) {
      studentservice.deleteSchool(id);
    },
  },
  mounted() {
    this.setup();
  },
});
</script>
<style>
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.player-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.avator {
  margin-right: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}
</style>
