export default {
  nextStep: () => ({
    type: 'NEXT'
  }),
  prevStep: () => ({
    type: 'PREVIOUS'
  }),
  setLocation: (router) => ({
    type: 'LOCATION_CHANGE',
    router
  })
}
