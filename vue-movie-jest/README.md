# 단위 테스트(Unit test)

단위(Unit) 테스트란 상태, 메소드, 컴포넌트 등의 정의된 프로그램 최소 단위들이 독립적으로 정상 동작하는지 확인하는 것을 말합니다.<br>
이를 통해 프로그램 전체의 신뢰도를 향상하고 코드 리팩터링(Code refactoring)의 부담을 줄일 수 있습니다.

CLI에서 Jest를 직접 실행하기 위해 전역 설치합니다.

```bash
$ npm install -g jest
```

테스트를 위해 프로젝트에 다음 모듈들을 설치합니다.

```bash
$ npm install -D jest @vue/test-utils vue-jest babel-jest babel-core@bridge
```

모듈 | 설명
--|--
jest | 페이스북에서 만든 테스트 프레임워크로 Vue Test Utils에서 권장하는 테스트 러너입니다.
@vue/test-utils | Vue.js 환경에서 단위 테스트를 하기 위한 공식(Official) 라이브러리 입니다.
vue-jest | Vue 파일을 Jest가 실행할 수 있는 자바스크립트로 컴파일합니다.
babel-jest | JS/JSX 파일을 Jest가 실행할 수 있는 자바스크립트로 컴파일합니다.
babel-core@bridge | Babel 6버전과의 호환을 위해 설치합니다. [관련 이슈](https://github.com/facebook/jest/issues/6913#issuecomment-417637086)가 있습니다.

`jest.config.js` 파일을 생성하고 다음과 같이 Jest 구성 옵션을 추가합니다.

```js
module.exports = {
  // 파일 확장자를 지정하지 않은 경우, Jest가 검색할 확장자 목록입니다.
  // 일반적으로 많이 사용되는 모듈의 확장자를 지정합니다.
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  // `@` 같은 경로 별칭을 매핑합니다.
  // E.g. `import SearchBar from '@/components/SearchBar'`
  // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있습니다.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // 일치하는 경로에서는 모듈을 가져오지 않습니다.
  // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있습니다.
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/build',
    '<rootDir>/dist'
  ],
  // 정규식과 일치하는 파일의 변환 모듈을 지정합니다.
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  // 각 테스트 파일이 실행되기 전,
  // 테스트 프레임워크를 구성하거나 설정하기 위해,
  // 일부 코드 실행 모듈의 경로를 지정합니다.
  // Vuetify UI 프레임워크를 사용하는 경우 필요합니다.
  // https://github.com/vuetifyjs/vuetify/issues/4964
  setupFilesAfterEnv: [
    './jest.setup.js'
  ]
}
```

`jest.setup.js` 파일을 추가하고 다음과 같이 Vuetify 설정을 추가합니다.
https://github.com/vuetifyjs/vuetify/issues/4964

```js
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

`package.json` 파일에 `eslintConfig`에 다음과 같이 Jest 옵션을 추가합니다.

```json
{
  "eslintConfig": {
    "env": {
      "jest": true
    }
  }
}
```
