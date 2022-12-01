<!-- eslint-disable prettier/prettier -->
<template>
  <div class="list row">
    <div class="col-md-8"></div>
    <div class="col-md-6">
      <h4>Schools List</h4>
      <div class="searchBar">
        <!-- <div class="input-group mb-5">
          <input
            type="search"
            class="form-control"           
            placeholder="School Name"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            v-model="search"
          />
        </div> -->
      </div>

      <router-link
        :to="'/addschool'"
        class="badge badge-warning"
        custom
        v-slot="{ navigate }"
      >
        <button
          class="badge badge-secondary mr-2"
          @click="navigate"
          role="link"
        >
          ADD SCHOOL
        </button>
      </router-link>
      <br />
      <br />
      <input type="text" v-model="input" placeholder="Search schools..." />
      <button class="badge badge-success mr-2" @click="filteredList()">
        Search
      </button>
      <br />
      <br />
      <pagination
    v-model="page"
    :click-handler="clickCallback"
    :records="listings.total"
    :per-page="listings.per_page"
  />
      <table id="schools-list" class="table table-bordered table-striped">
        <thead>
          <tr>
            <th v-for="field in fields" :key="field">
              {{ field }}
              <i class="bi bi-sort-alpha-down" aria-label="Sort Icon"></i>
            </th>
          </tr>
        </thead>
        <tbody v-if="schoolList?.length != 0">
          <tr v-for="(entry, index) in schoolList" :key="index">
            <td>{{ entry.schoolid }}</td>
            <td>{{ entry.schoolname }}</td>
            <td>{{ entry.address }}</td>
            <td>{{ entry.teacher.length }}</td>
            <router-link
              :to="'/school/' + entry.schoolid"
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"         
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="page = 1; retrieveSchools();"
          >
            Search
          </button>
        </div>
      </div>
    </div> -->
  <!-- <div class="col-md-12">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination> -->
  <!-- </div>  -->
 
</template>
<script lang="ts">/* eslint-disable */

import { computed, ref } from "vue";
import { defineComponent } from "vue";
import studentservice from "@/services/studentservice";
import School from "@/types/school";
import Paginate from "vuejs-paginate";

export default defineComponent({
  name: "schools-list",
  el: "#pagination-app",
  components: {
    Paginate,
  },
  data() {
    return {
      schoolList: [] as School[],
      schoolname: "",
      input: ref(""),
      searchedSchools: [] as School[],
      page: 1,
      // count: 0,
      // pageSize: 3,

      pageSizes: [3, 6, 9],
      listings: {
        total: 100,
        per_page: 10,
      },
    };
  },
  methods: {
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

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
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.table th:hover {
  background: #f2f2f2;
  width: 100px;
}
</style>
