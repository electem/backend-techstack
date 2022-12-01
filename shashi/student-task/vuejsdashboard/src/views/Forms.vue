<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb breadcrumb="Add School" />
    <div class="mt-8">
      <h4 class="text-gray-600">Add School</h4>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <form>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-black-700" for="schoolname"
                  >School Name</label
                >
                <input
                  class="w-full mt-2 border-black-200 rounded-md border-black-600 ring ring-opacity-40 ring-black-500"
                  type="text"
                />
              </div>

              <div>
                <label class="text-gray-700">School Address</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md border-indigo-600 ring ring-opacity-40 ring-indigo-500"
                  type="text"
                />
              </div>

              <multiselect
                class="form-control"
                id="teacher"
                required
                v-model="selectedTeachers"
                name="teacher"
                :options="teacherData"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Select Teacher"
                label="teachername"
                track-by="teachername"
                :preselect-first="true"
              >
              </multiselect>
              <div>
                <multiselect
                  class="form-control"
                  id="student"
                  required
                  v-model="selectedStudents"
                  name="student"
                  :options="studentData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder="Select Student"
                  label="studentname"
                  track-by="studentname"
                  :preselect-first="true"
                >
                </multiselect>
              </div>            
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 margin-left"
              >
                Save
              </button>
              <router-link :to="'/school'" custom v-slot="{ navigate }">
                <button
                  class="px-2 py-2 text-gray-200 bg-red-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 margin-left"
                  @click="navigate"
                  role="link"
                >
                  Cancel
                </button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Breadcrumb from "../partials/Breadcrumb.vue";
import { defineComponent } from "vue";
import studentservice from "@/studentservice";
import { Student } from "@/types/student";
import School from "@/types/school";
import { Teacher } from "@/types/teacher";
import Multiselect from "@suadelabs/vue3-multiselect";
export default defineComponent({
  name: "add-student",
  components: { Multiselect },
  data() {
    return {
      successful: false,
      message: "",

      school: {
        schoolname: "",
        address: "",
      } as School,
      teacherData: [] as Teacher[],
      studentData: [] as Student[],
      submitted: false,
      selectedTeachers: [] as Teacher[],
      selectedStudents: [] as Student[],
    };
  },
  methods: {
    saveSchool() {
      let data = {
        schoolid: this.school.schoolid,
        schoolname: this.school.schoolname,
        address: this.school.address,
        teacher: this.selectedTeachers,
        students: this.selectedStudents,
      };     
    },
    async retrieveTeachers() {
      await studentservice
        .getAllTeacherss()
        .then((response) => {
          this.teacherData = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    retrieveStudents() {
      studentservice
        .getAllStudents()
        .then((response) => {
          this.studentData = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.school = {} as School;
    },
  },
  mounted() {
    this.retrieveStudents();
    this.retrieveTeachers();
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
.margin-left {
  margin-left: 80px !important;
}
</style>
