/**
 * 1.원의 넓이를 구하는 공식
 * 2.PI 정의
 * 3.공식을 통해 결과 얻기
 */
// const { getCircleArea } = require("./mathUtil")
const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const { getCircleArea, getSquareArea } = require("./mathUtil")
const { logInput, logResult, logFigureError } = require("./log")

rl.question(
  "넓이를 구하고자 하는 도형의 종류를 입력해주세요(정사각형 ,원 ) : ",
  fiqure => {
    console.log(`선택된 도형 ${fiqure}`)

    switch (fiqure) {
      case "정사각형":
        rl.question("변의길이를 입력해주세요 :", input => {
          console.log(logInput(input))
          console.log(logResult(input, getSquareArea(input)))
          rl.close()
        })
        break
      case "원":
        rl.question("반지름의 길이를 입력해주세요 : ", input => {
          console.log(logInput(input))
          console.log(logResult(input, getCircleArea(input)))
          rl.close()
        })
        break
      default:
        console.log(logFigureError)
        rl.close()
    }
  }
)
