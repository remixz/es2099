function main () {
  const foo = new Monad(function (fulfill) {
    fulfill('the future')
  })
  foo.then(function (status) {
    console.log(status)
  })

  console.log(typeof null)
}
