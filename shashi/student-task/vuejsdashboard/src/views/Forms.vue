<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb breadcrumb="Add School" />
    <div class="mt-3">
      <h4 class="text-gray-600">Add School</h4>
      <div class="mt-4">
        <div class="p-2 bg-white rounded-md shadow-md">
          <form>
            <div class="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-black-700" for="schoolname"
                  >School Name</label
                >
                <input
                  class="w-full mt-2 multiselect__tags"
                  type="text"
                  v-model="school.schoolname"
                  placeholder="Schoolname"
                />
              </div>
              <div>
                <label class="text-gray-700" for="address">School Address</label>
                <input
                  class="w-full mt-2 multiselect__tags"
                  type="text"
                  v-model="school.address"
                  placeholder="Address"
                />
              </div>
              <div>
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
              </div>
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
              <div class="col px-2 py-2 bg-light border rounded">
                <h6>Available Students</h6>
                <draggable
                  class="draggable-list"
                  :list="studentData"
                  group="my-group"
                >
                  <template #item="{ element }">
                    <div class="bg-white mt-2 p-1 shadow border rounded">
                      {{ element.studentname }}
                    </div>
                  </template>
                </draggable>
              </div>
              <div class="col px-2 py-2 bg-light border rounded">
                <h6>Drag to Add Students  ✅</h6>
                <draggable
                  class="flip-transition-move"
                  :list="dragAndDropStudentList"
                  group="my-group"
                >
                  <template #item="{ element }">
                    <div class="bg-white mt-2 p-1 shadow border rounded">
                      {{ element.studentname }}
                    </div>
                  </template>
                </draggable>
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <button
                class="px-3 py-1 mr-1 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 margin-left"
                @click="saveSchool"
              >
                Save
              </button>
              <router-link :to="'/school'" custom v-slot="{ navigate }">
                <button
                  class="px-2 py-1  text-gray-200 bg-red-800 rounded-md hover:bg-red-700 focus:outline-none margin-left"
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
import { defineComponent } from "vue";
import studentservice from "@/studentservice";
import { Student } from "@/types/student";
import School from "@/types/school";
import { Teacher } from "@/types/teacher";
import Multiselect from "@suadelabs/vue3-multiselect";
import Draggable from "vuedraggable";

export default defineComponent({
  name: "add-student",
  components: { Multiselect, Draggable },
  data() {
    return {
      successful: false,
      drag: ref(),
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
      dragAndDropStudentList: [] as Student[],
    };
  },
  methods: {
    getStudentById(id: number) {
      studentservice
        .getSchoolById(id)
        .then((response) => {
          this.school = response.data;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    saveSchool() {
      let data = {
        schoolid: this.school.schoolid,
        schoolname: this.school.schoolname,
        address: this.school.address,
        teacher: this.selectedTeachers,
        students: this.dragAndDropStudentList,
      };
      studentservice.createSchool(data);
      console.log(data);
    },
    async retrieveTeachers() {
      await studentservice
        .getAllTeacherss()
        .then((response) => {
          this.teacherData = response.data;
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
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    checkMove() {
      console.log("dksjdhash");
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
.draggable-list > div {
  cursor: pointer;
}
.list-item {
  margin: 10px;
  padding: 40px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  background: #f44336;
  display: inline-block;
}
.flip-transition-move {
  transition: all 0.7s;
}
.list-item {
  padding: 10px;
  border: 1px solid #ccc;
}

h6 {
  font-weight: 700;
}
.col {
  height: 50vh;
  overflow: auto;
}
.draggable-list {
  min-height: 8vh;
}
.draggable-list > div {
  cursor: pointer;
}
</style>
