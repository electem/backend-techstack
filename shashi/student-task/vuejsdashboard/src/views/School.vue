<template>
  <div>
    <div class="flex justify-end mt-4">
      <router-link
        :to="'/forms'"
        class="badge badge-warning"
        custom
        v-slot="{ navigate }"
      >
        <button
          class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          @click="navigate"
          role="link"
        >
        
          Add School
        </button>
      </router-link>      
    </div>
    <div class="flex items-center">
      <div class="relative mx-4 lg:mx-0">
        <input
          class="w-32 pl-10 pr-4 py-2 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          type="text"
          v-model="input"
          v-on:keyup="filteredList"
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
    <div class="mt-8"></div>
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 text"
                >
                  School Name
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 text"
                >
                  Address
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 text"
                >
                  Total Number Of Teachers
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 text"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(u, index) in schoolList" :key="index">
                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text"
                >
                  <div class="flex items-center text">
                    <div class="ml-4">
                      <div
                        class="text-sm font-medium leading-5 text-gray-900 text"
                      >
                        {{ u.schoolname }}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text"
                >
                  <div class="text-sm leading-5 text-gray-900">
                    {{ u.address }}
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text"
                >
                  <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                    >{{ u.teacher.length }}</span
                  >
                </td>
                <td
                  class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="flex justify-around">
                    <span class="text-yellow-500 flex justify-center">
                      <a href="#" class="mx-2 px-2 rounded-md"
                        > <router-link
              :to="('/editschool/' + u.schoolid)"
              class="badge badge-warning"
              custom
              v-slot="{ navigate }"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-700"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="navigate"              
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
            </router-link>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import studentservice from "../studentservice";
import School from "@/types/school";

export default defineComponent({
  name: "schools-list",
  el: "#pagination-app",
  data() {
    return {
      schoolList: [] as School[],
      schoolname: "",
      searchValue : ref(""),
      input: ref(""),
      searchedSchools: [] as School[],
      page: 1,

      pageSizes: [3, 6, 9],
      listings: {
        total: 100,
        per_page: 10,
      },
    };
  },
  methods: {
    retrieveSchools() {
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
    this.retrieveSchools();
  },
  setup() {
    const fields = [
      "ID",
      "SCHOOL_NAME",
      "ADDRESS",
      "TOTAL_TEACHERS",
      "ACTIONS",
    ];
    return { fields };
  },
});
</script>
<style>
.text {
  text-align: center;
}
</style>
