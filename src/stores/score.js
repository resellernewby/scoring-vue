import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useScore = defineStore('score', () => {
  const router = useRouter()
  const errors = reactive({})
  const loading = ref(false)
  const form = reactive({
    classroom_id: null,
    scoring_floor: null,
    scoring_table: null,
    scoring_equipment: null,
    scoring_date: null
  })

  function storeScore() {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    window.axios
      .post('scores', form)
      .then(() => {
        router.push({ name: 'score.index' })
      })
      .catch((err) => {
        if (err.response.status === 422) {
          errors.value = err.response.data.errors
        }
      })
      .finally(() => (loading.value = false))
  }

  function resetForm() {
    form.classroom_id = null
    form.scoring_floor = null
    form.scoring_table = null
    form.scoring_equipment = null
    form.scoring_date = null

    errors.value = {}
  }

  function startParking() {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    return window.axios
      .post('parkings/start', form)
      .then(() => {
        router.push({ name: 'parkings.active' })
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => (loading.value = false))
  }

  return { form, errors, loading, resetForm, storeScore }
})
