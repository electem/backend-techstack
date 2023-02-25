<!-- eslint-disable prettier/prettier -->
<template>
    <div class="submit-form">
      <Form @submit="saveSchool" :validation-schema="schema">
        <div v-if="!submitted">
          <div class="form-group">
            <label for="schoolname">Schoolname</label>
            <Field  type="text"
            class="form-control"
            id="schoolname"
            required
            v-model="school.schoolname" 
            placeholder="schoolname" 
            name="schoolname"/>
            <ErrorMessage name="schoolname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Address</label>
            <Field  class="form-control"
            id="address"
            required
            v-model="school.address"
            name="address"
            placeholder="address" />
            <ErrorMessage name="address" class="error-feedback" />
          </div>
          <div class="form-group">
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
        <div class="form-group">
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
          <div class="form-group">
            <button class="btn btn-success" >submit</button>           
          </div>
        </div>
        <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newTutorial">Add</button>
      </div>    
      <router-link 
          :to="'/school'"
          class="badge badge-warning"
          custom
      v-slot="{ navigate }"
          > <button  
          class="btn btn-danger" 
          @click="navigate"  
        role="link"
        >Cancel</button>
      </router-link
        >     
      </Form>     
    </div>
  </template>
<!-- eslint-disable prettier/prettier -->
  <script lang="ts">
  import { defineComponent } from "vue";
  import studentservice from "@/services/studentservice";
  import { Student } from "@/types/student";
  import School from "@/types/school";
import { Teacher } from "@/types/teacher";
import Multiselect from "@suadelabs/vue3-multiselect";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
  export default defineComponent({
    name: "add-student",
    components: {Multiselect, Form, Field, ErrorMessage },
    data() {
      const schema = yup.object().shape({
        schoolname: yup
        .string()
        .required("schoolname is required!")   
        .min(5,"minimun five charaters")     
        ,
        address: yup
        .string()
        .required("Address is required!")        
    });
    return {
      successful: false,    
      message: "",
      schema,
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
        schoolid:this.school.schoolid,
        schoolname: this.school.schoolname,
        address: this.school.address,
        teacher: this.selectedTeachers,
        students:this.selectedStudents
        };
  
        studentservice
          .createSchool(data)
          this.submitted = true;      
         
      },  
    async  retrieveTeachers() {
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
     
    },mounted() {
      this.retrieveStudents();
      this.retrieveTeachers()
    },
  });
  </script>
<!-- eslint-disable prettier/prettier -->
  <style src="vue-multiselect/dist/vue-multiselect.min.css">
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  .body {
    padding: 1rem;
  }
  label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
  </style>