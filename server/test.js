const errFn = () => {
  try {
    throw new Error('asdas')
  } catch (error) {
    console.log(typeof error)
    console.log(error.message)
  }
}
errFn()