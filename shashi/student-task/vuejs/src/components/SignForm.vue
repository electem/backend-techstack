<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable no-undef -->

<script setup lang="ts">
import { Field, useValidation } from "vue3-form-validation";
import { computed, PropType } from "vue";
import { rules } from "../rules";

interface FormData {
  name: Field<string>;
  email: Field<string>;
  password: Field<string>;
  confirmPassword: Field<string>;
}
const props = defineProps({
  validating: {
    type: Boolean,
    required: true,
  },
  submitting: {
    type: Boolean,
    required: true,
  },
  hasError: {
    type: Boolean,
    required: true,
  },
  errors: {
    type: Object as PropType<string[]>,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});
const formJson = computed(() =>
  JSON.stringify(
    props.form,
    (key, value) => {
      if (value === undefined) {
        return "undefined";
      }

      if (typeof value === "function") {
        return "function";
      }

      if (value instanceof File) {
        return `File { name: ${value.name} }`;
      }

      return value;
    },
    2
  )
);

const { validateFields, resetFields } = useValidation<FormData>({
  name: {
    $value: "",
    $rules: [
      [
        (name: any) => {
          if (name.length === 0) {
            return "Please enter your name";
          }

          return new Promise<void | string>((resolve) => {
            setTimeout(() => {
              if (["alice", "bob", "oscar"].includes(name.toLowerCase())) {
                resolve();
              } else {
                resolve(`Name '${name}' is not available`);
              }
            }, 400);
          });
        },
        300,
      ],
    ],
  },
  email: {
    $value: "",
    $rules: [rules.email("Please enter a valid email address")],
  },
  password: {
    $value: "",
    $rules: [rules.min(9)("Password has to be longer than 8 characters")],
  },
  confirmPassword: {
    $value: "",
    $rules: [rules.min(9)("Password has to be longer than 8 characters")],
  },
});

async function handleSubmit() {
  try {
    const formData = await validateFields();
    console.log(formData);
  } catch (e) {
    console.log(e);
  }
}
</script>
<!-- eslint-disable prettier/prettier -->
<template>
  <FormProvider
    title="Signup Form"
    class="form"
    :validating="validating"
    :submitting="submitting"
    :has-error="hasError"
    :errors="errors"
    :form="form"
    @submit="handleSubmit()"
  >
    <div class="name">
      <FormInput
        placeholder="Alice, Bob, or Oscar"
        :label="{ value: 'Name', for: 'name' }"
        :errors="form.name.$errors"
        :validating="form.name.$validating"
        v-model="form.name.$value"
        @blur="form.name.$validate()"
      />
    </div>
    <div class="email">
      <FormInput
        :label="{ value: 'Email', for: 'email' }"
        :errors="form.email.$errors"
        v-model="form.email.$value"
        @blur="form.email.$validate()"
      />
    </div>
    <div class="password">
      <FormInput
        type="password"
        :label="{ value: 'Password', for: 'password' }"
        :errors="form.password.$errors"
        v-model="form.password.$value"
        @blur="form.password.$validate()"
      />
    </div>
    <div class="confirm-password">
      <FormInput
        type="password"
        :label="{ value: 'Confirm Password', for: 'confirm-password' }"
        :errors="form.confirmPassword.$errors"
        v-model="form.confirmPassword.$value"
        @blur="form.confirmPassword.$validate()"
      />
    </div>
    <FormButtons
      class="col-span-full mt-6"
      :submitting="submitting"
      @reset="resetFields()"
    />
  </FormProvider>
</template>
<!-- eslint-disable prettier/prettier -->
<style lang="postcss" scoped>
:deep(.form) {
  @apply grid max-w-2xl gap-x-8 gap-y-6;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "name email"
    "password password"
    "confirm-password confirm-password";
}

.name {
  grid-area: name;
}

.email {
  grid-area: email;
}

.password {
  grid-area: password;
}

.confirm-password {
  grid-area: confirm-password;
}
</style>
