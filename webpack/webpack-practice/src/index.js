import "normalize.css"
import styles from "./index.scss"
import $ from "jquery"
import sampleImg from "./assets/sample.jpg"
import sampleSvg from "./assets/sample.svg"
import "@babel/polyfill"

function component() {
  const element = document.createElement("div")
  element.innerHTML = "Hello Webpack"

  const imgElenment = document.createElement("img")
  imgElenment.src = sampleSvg
  imgElenment.classList = styles.sampleImg

  console.log(sampleImg)
  console.log(styles)

  element.appendChild(imgElenment)

  element.classList = styles.helloWebpack

  return element
}
document.body.appendChild(component())

console.log($(`${styles.helloWebpack}`).length)

console.log(`IS_PRODUCTION: ${IS_PRODUCTION} `)
