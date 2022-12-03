<!-- eslint-disable prettier/prettier -->
<template>
  <!DOCTYPE html>
  <html lang="en">
    <body>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper">
          <div class="main-panel">
            <div class="content-wrapper center">
              <div class="page-header">
                <h4 class="page-title">School Listing</h4>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Tables</a></li>
                    <li class="breadcrumb-item active" aria-current="page">
                      School
                    </li>
                  </ol>
                </nav>
              </div>
              <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      v-model="seachedkeyword"
                      v-on:keyup="keyHandler()"
                      placeholder="Search "
                    />
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <div class="table-responsive">
                        <EasyDataTable
                          v-model:server-options="serverOptions"
                          header-text-direction="center"
                          body-text-direction="center"
                          :loading="loading"
                          buttons-pagination
                          :headers="headers"
                          :items="items"
                          border-cell
                          show-index
                          multi-sort
                         :server-items-length="totalNumberOfSchools"
                         :search-value="searchValue"
                          v-on:click="
                          changeSchool(
                          serverOptions.page,
                          serverOptions.rowsPerPage,
                          seachedkeyword)"
                          :rows-items="rowsItemsComputed"
                          v-model:items-selected="itemsSelected"
                           />
                            <br />
                           items selected:<br />
                          {{ itemsSelected }}
                      </div>
                    </div>
                    <button class="btn btn-primary mr-2" @click="deleteRow(itemsSelected)">Delete Selected</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts">
import { defineComponent, ref } from "vue";
import SchoolService from "@/services/SchoolService";
import { Header, Item, ServerOptions } from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import School from "@/types/School";

export default defineComponent({
  name: "App",
  components: {},

  data() {
    return {
      enable: true,
      input: ref(""),
      headers: [] as Header[],
      items: [] as Item[],
      schoollist: [] as School[],
      seachedkeyword: "",
      searchValue: ref(""),
      loading: ref(false),
      serverItemsLength: ref(0),
      dataTable: ref(),
      rowsItemsComputed: [5, 20],
      searchedSchool: [] as School[],
      serverOptions: ref<ServerOptions>({
        page: 1,
        rowsPerPage: 5,
      }),
      totalNumberOfSchools: ref(0),
      itemsSelected: ref<School[]>([]),
    };
  },

  methods: {

    deleteRow() {
      console.log(this.itemsSelected);

      var data = this.itemsSelected.map(t=>t.schoolid);
      console.log(data);
       SchoolService.deleteselectedSchool(data)
      .then((response) => {
          console.log(response);
         })
         this.setup();
       },

    nextPage() {
      this.dataTable.value.nextPage();
    },
    prevPage() {
      this.dataTable.value.prevPage();
    },

    keyHandler() {
        console.log(this.seachedkeyword);
          SchoolService.getPaginatedSchool(
        this.serverOptions.page,
        this.serverOptions.rowsPerPage,
        this.seachedkeyword
      ).then((response) => {
        this.items = response.data.elements;
        this.totalNumberOfSchools = response.data.totalElements;
      });
    },

    
    changeSchool(page: number, rowsPerPage: number, seachedkeyword: string) {
      (this.serverOptions.page = page),
        (this.serverOptions.rowsPerPage = rowsPerPage);
      this.seachedkeyword = seachedkeyword;
      SchoolService.getPaginatedSchool(
        this.serverOptions.page,
        this.serverOptions.rowsPerPage,
        this.seachedkeyword
      ).then((response) => {
        this.items = response.data.elements;
        this.totalNumberOfSchools = response.data.totalElements;
      });
    },

    async setup() {
      this.headers = [
        { text: "SchoolId", value: "schoolid", sortable: true },
        { text: "Name", value: "schoolname" },
        { text: "Address", value: "address", sortable: true },
        { text: "Established", value: "createdAt", sortable: true },
      ];

      await SchoolService.getPaginatedSchool(
        this.serverOptions.page,
        this.serverOptions.rowsPerPage,
        this.seachedkeyword
      )
        .then((response) => {
          this.items = response.data.elements;
          this.totalNumberOfSchools = response.data.totalElements;
          console.log(this.totalNumberOfSchools);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.setup();
  },
});
</script>
<!-- eslint-disable prettier/prettier -->
<style>
@import "assets/css/Tablelist.css";
@import "assets/vendors/mdi/css/materialdesignicons.min.css";
@import "assets/vendors/flag-icon-css/css/flag-icon.min.css";
@import "assets/vendors/css/vendor.bundle.base.css";
@import "assets/vendors/font-awesome/css/font-awesome.min.css";
</style>
