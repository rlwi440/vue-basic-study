const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question(
  "넓이를 구하고자 하는 도형의 종류를 입력해주세요(정사각형 ,원 ) : ",
  fiqure => {
    console.log(`선택된 도형 ${fiqure}`)

    switch (fiqure) {
      case "정사각형":
        rl.question("변의길이를 입력해주세요 :", input => {
          console.log(`입력받은 값 ${input}`)
          console.log(`정사각형의 넓이는 ${input * input} 입니다.`)
          rl.close()
        })
        break
      case "원":
        rl.question("반지름의 길이를 입력해주세요 : ", input => {
          console.log(`입력받은 값 ${input}`)
          console.log(`정사각형의 넓이는 ${input * input * 3.14} 입니다.`)
          rl.close()
        })
        break
      default:
        console.log(
          "지원되지 않는 도형입니다. '정사각형'  또는 '원' 을 입력해주세요."
        )
        rl.close()
    }
  }
)
