<script setup>
import { onBeforeUnmount } from 'vue'
import { useClassroom } from '@/stores/classroom'

const store = useClassroom()

onBeforeUnmount(store.resetForm)
</script>

<template>
  <form @submit.prevent="store.storeClassroom" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Add Classroom</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Class Name</label>
        <input
          v-model="store.form.name"
          id="name"
          name="name"
          type="text"
          class="form-input plate"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="name" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="flex gap-2 items-center hover:cursor-pointer">
          <input
            v-model="store.form.is_active"
            type="checkbox"
            class="w-4 h-4"
            :disabled="store.loading"
          />
          <span class="select-none">Is Active</span>
        </label>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
          <IconSpinner class="animate-spin" v-show="store.loading" />
          Save Classroom
        </button>
        <RouterLink :to="{ name: 'classrooms.index' }" class="btn btn-secondary">
          Cancel
        </RouterLink>
      </div>
    </div>
  </form>
</template>
