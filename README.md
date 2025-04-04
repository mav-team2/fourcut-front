# 인생네컷 프론트엔드

## 개발환경

- node.js v20
- react v19
- npm

## 시작

nodejs 환경을 구성하고 환경변수를 작성해야합니다.

### 로컬 실행

1. **실행 이전에 `src/assets` 경로에 'prompt.json' 파일을 추가해야 합니다.**
2. **cors 에러로 학교 내부망 접속해서 실행해야 합니다.**
3. 실행 경로에 .env파일을 추가해주세요.

```shell
npm install
npm run dev
```

## 코드 작성

`src/App.tsx` : 처음 보여지는 페이지 파일. 여기서 작업내용이 브라우저에서 바로 보여져요.
`src/pages` : 각각 페이지들을 pages폴더 아래에 작성하고 App.tsx에서 불러오면 프로젝트를 깔끔하게 정리할 수 있습니다.
`src/hooks` : 비즈니스 로직을 처리하는 각종 훅 작성.
