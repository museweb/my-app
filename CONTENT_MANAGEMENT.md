# 콘텐츠 관리 가이드

## 현재 구조 이해하기

### 📁 주요 파일 위치

```
my-app/
├── messages/              # 번역 파일 (텍스트 수정)
│   ├── ko.json           # 한국어
│   ├── en.json           # 영어
│   └── zh.json           # 중국어
│
├── data/                 # 데이터 파일
│   └── products/         # 제품 정보
│       └── index.ts
│
├── app/[locale]/         # 페이지 파일
│   ├── page.tsx         # 홈페이지
│   ├── products/        # 제품 페이지
│   ├── company/         # 회사 페이지
│   └── support/         # 문의 페이지
│
└── components/           # 재사용 컴포넌트
    ├── layout/          # 헤더, 푸터
    └── sections/        # 섹션 컴포넌트
```

## 💡 콘텐츠 수정 방법

### 방법 1: 직접 파일 수정 (현재 방식)

#### 텍스트 수정
1. `messages/ko.json` 열기
2. 수정할 텍스트 찾기 (Ctrl+F)
3. 텍스트 수정
4. 저장
5. 브라우저에서 자동 새로고침 확인

**예시:**
```json
{
  "home": {
    "hero": {
      "title": "여기를 수정하세요"  // ← 이 부분만 수정
    }
  }
}
```

#### 제품 추가/수정
1. `data/products/index.ts` 열기
2. products 배열에 추가/수정
3. `messages/*.json`에 번역 추가

### 방법 2: GitHub에서 웹으로 수정

1. GitHub 저장소 접속
2. 파일 클릭 (예: messages/ko.json)
3. 연필 아이콘(편집) 클릭
4. 수정 후 "Commit changes" 클릭
5. 자동 배포 (Vercel/Netlify 연동 시)

### 방법 3: 헤드리스 CMS 사용 (추천)

관리자 페이지에서 WordPress처럼 쉽게 수정할 수 있습니다.

## 🚀 추천: Sanity CMS 설치

### 1단계: 설치
```bash
npm install sanity @sanity/client next-sanity
npx sanity init
```

### 2단계: 스키마 정의
```javascript
// sanity/schemas/product.ts
export default {
  name: 'product',
  title: '제품',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '제품명',
      type: 'string',
    },
    {
      name: 'description',
      title: '설명',
      type: 'text',
    },
    {
      name: 'price',
      title: '가격',
      type: 'number',
    },
  ],
}
```

### 3단계: 관리 페이지 접속
```bash
cd sanity-studio
npm run dev
```
→ http://localhost:3333 에서 관리

### 4단계: Next.js에서 데이터 가져오기
```typescript
import { client } from '@/lib/sanity'

const products = await client.fetch('*[_type == "product"]')
```

## 📊 다른 CMS 옵션 비교

| CMS | 난이도 | 비용 | 특징 |
|-----|--------|------|------|
| **Sanity** | ⭐⭐ | 무료 | 실시간 미리보기, 한국어 지원 |
| **Strapi** | ⭐⭐⭐ | 무료 | 완전 오픈소스, 자체 호스팅 |
| **Contentful** | ⭐⭐ | 유료 | 강력한 기능, 기업용 |
| **TinaCMS** | ⭐⭐ | 무료 | Git 기반, 마크다운 |
| **WordPress + REST API** | ⭐ | 무료 | 익숙한 관리자, 무겁다 |

## 🎯 상황별 추천

### 비개발자가 자주 수정해야 한다면
→ **Sanity CMS** 또는 **Strapi**

### 가끔 수정 (월 1-2회)
→ **GitHub 웹 편집** 또는 **VS Code**

### 개발자만 관리
→ **현재 방식 유지** (JSON 직접 수정)

### 블로그 기능 필요
→ **TinaCMS** (마크다운) 또는 **Sanity**

## 🛠️ 현재 프로젝트에 CMS 추가하기

### Quick Start: Sanity CMS

```bash
# 1. 패키지 설치
npm install sanity @sanity/client next-sanity

# 2. Sanity Studio 초기화
npx sanity init

# 3. 스키마 생성
# sanity/schemas/index.ts 파일 생성

# 4. Studio 실행
cd sanity-studio
npm run dev

# 5. Next.js에 연결
# lib/sanity.ts 파일 생성
```

### 완성되면:
- ✅ 웹 기반 관리 페이지
- ✅ 실시간 미리보기
- ✅ 이미지 업로드
- ✅ 다국어 지원
- ✅ 버전 관리

## 📝 현재 방식으로 쉽게 관리하는 팁

### 1. JSON 파일 구조 이해
```json
{
  "navigation": {     // 메뉴
    "home": "홈"
  },
  "home": {          // 홈페이지
    "hero": {        // 상단 섹션
      "title": "제목"
    }
  },
  "products": {      // 제품 페이지
    "title": "제품"
  }
}
```

### 2. VS Code 확장 프로그램
- **i18n Ally**: JSON 번역 관리
- **JSON Editor**: JSON 시각적 편집

### 3. 검색으로 빠르게 찾기
- Ctrl+Shift+F: 전체 파일 검색
- 예: "회사 소개" 검색 → 해당 위치 바로 수정

### 4. 변경사항 확인
- 개발 서버가 실행 중이면 저장 즉시 반영
- http://localhost:3002 에서 확인

## ❓ FAQ

### Q: 텍스트만 수정하고 싶어요
**A:** `messages/*.json` 파일만 수정하면 됩니다.

### Q: 이미지는 어떻게 추가하나요?
**A:**
1. `public/images/` 폴더에 이미지 추가
2. 코드에서 `/images/파일명.jpg` 참조

### Q: 새 페이지를 추가하려면?
**A:**
1. `app/[locale]/새페이지/page.tsx` 생성
2. `messages/*.json`에 번역 추가
3. Navigation에 링크 추가

### Q: 실수로 잘못 수정했어요
**A:**
```bash
git checkout messages/ko.json  # 파일 되돌리기
```

### Q: CMS 없이 관리자 페이지 만들 수 있나요?
**A:** 가능하지만 개발 시간이 많이 필요합니다. CMS 사용을 권장합니다.

## 🎓 학습 리소스

- [Sanity 공식 문서](https://www.sanity.io/docs)
- [Strapi 튜토리얼](https://docs.strapi.io/)
- [Next.js + CMS 가이드](https://nextjs.org/docs/basic-features/cms)

## 💬 도움이 필요하다면

1. `http://localhost:3002/admin` 페이지 참고
2. 이 파일(CONTENT_MANAGEMENT.md) 참고
3. Claude에게 질문하기
