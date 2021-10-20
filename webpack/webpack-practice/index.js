import "normalize.css"
import styles from "./index.css"
import $ from "jquery"

function component() {
  const element = document.createElement("div")
  element.innerHTML = "Hello Webpack"
  console.log(styles)

  element.classList = styles.helloWebpack

  return element
}
document.body.appendChild(component())

console.log($(`${styles.helloWebpack}`).length)

console.log(`IS_PRODUCTION: ${IS_PRODUCTION} `)
