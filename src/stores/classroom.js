import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useClassroom = defineStore('classroom', () => {
  const router = useRouter()
  const errors = reactive({})
  const loading = ref(false)
  const classrooms = ref([])
  const form = reactive({
    name: '',
    is_active: true
  })

  function resetForm() {
    form.name = ''
    form.is_active = true

    errors.value = {}
  }

  function getClassrooms() {
    return window.axios
      .get('classrooms')
      .then((response) => (classrooms.value = response.data.data))
  }

  function storeClassroom() {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    window.axios
      .post('classrooms', form)
      .then(() => {
        router.push({ name: 'classrooms.index' })
      })
      .catch((err) => {
        if (err.response.status === 422) {
          errors.value = err.response.data.errors
        }
      })
      .finally(() => (loading.value = false))
  }

  function updateClassroom(classroom) {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    window.axios
      .put(`classrooms/${classroom.id}`, form)
      .then(() => {
        router.push({ name: 'classrooms.index' })
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => (loading.value = false))
  }

  function getClassroom(classroom) {
    window.axios.get(`classrooms/${classroom.id}`).then((response) => {
      form.name = response.data.data.name
      form.is_active = response.data.data.is_active == 'active' ? true : false
    })
  }

  function deleteClassroom(classroom) {
    window.axios.delete(`classrooms/${classroom.id}`).then(getClassrooms())
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    storeClassroom,
    classrooms,
    getClassrooms,
    updateClassroom,
    getClassroom,
    deleteClassroom
  }
})
