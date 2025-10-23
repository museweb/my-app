# Sanity CMS 설정 가이드

## 1. Sanity 프로젝트 생성

### 1단계: Sanity 계정 생성 및 프로젝트 생성

```bash
# Sanity CLI 설치 (선택사항)
npm install -g @sanity/cli

# Sanity 로그인 및 프로젝트 생성
npx sanity init --project-plan free
```

또는 웹사이트에서 직접 생성:
1. https://www.sanity.io/ 접속
2. 계정 생성 (GitHub, Google 등)
3. "Create new project" 클릭
4. 프로젝트 이름 입력 (예: MuseWorks)
5. Dataset 이름: `production` 사용

### 1단계 대안: 기존 프로젝트 사용

이미 Sanity 프로젝트가 있다면:
1. https://www.sanity.io/manage 접속
2. 프로젝트 선택
3. Settings → API → Project ID 확인

## 2. 환경 변수 설정

```bash
# .env.local.example 파일을 .env.local로 복사
cp .env.local.example .env.local
```

`.env.local` 파일 편집:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

**프로젝트 ID 찾기:**
- Sanity 대시보드: https://www.sanity.io/manage
- 프로젝트 선택 → Settings → API → Project ID

## 3. Sanity Studio 접속

개발 서버가 실행 중인 상태에서:

```
http://localhost:3002/studio
```

처음 접속 시:
1. Sanity 계정으로 로그인
2. 프로젝트 접근 권한 승인
3. Studio 관리 페이지 진입

## 4. 제품 데이터 추가

Studio에서:
1. 좌측 메뉴에서 "제품" 클릭
2. "Create new Product" 클릭
3. 다국어 데이터 입력:
   - 제품명 (한국어, English, 中文)
   - URL 슬러그 생성 (Generate 버튼)
   - 설명 (한국어, English, 中文)
   - 카테고리 선택
   - 주요 기능 추가 (다국어)
   - 기능 상세 설명 추가 (다국어)
   - 이점 추가 (다국어)
   - 제품 이미지 업로드
   - 정렬 순서 입력
4. "Publish" 클릭

## 5. Next.js에서 데이터 사용

### 제품 목록 페이지 예시

```typescript
// app/[locale]/products/page.tsx
import { client, queries } from '@/lib/sanity';

export default async function ProductsPage() {
  const products = await client.fetch(queries.allProducts);

  return (
    <div>
      {products.map((product: any) => (
        <div key={product._id}>
          <h2>{product.name.ko}</h2>
          <p>{product.description.ko}</p>
        </div>
      ))}
    </div>
  );
}
```

### 제품 상세 페이지 예시

```typescript
// app/[locale]/products/[slug]/page.tsx
import { client, queries } from '@/lib/sanity';

export default async function ProductDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const product = await client.fetch(queries.productBySlug, {
    slug: params.slug
  });

  if (!product) {
    return <div>제품을 찾을 수 없습니다</div>;
  }

  return (
    <div>
      <h1>{product.name.ko}</h1>
      <p>{product.description.ko}</p>
    </div>
  );
}
```

### 이미지 사용 예시

```typescript
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

export function ProductImage({ image }: { image: any }) {
  if (!image) return null;

  const imageUrl = urlFor(image).width(800).height(600).url();

  return (
    <Image
      src={imageUrl}
      alt="Product"
      width={800}
      height={600}
    />
  );
}
```

## 6. 스키마 확장

새로운 콘텐츠 타입 추가하기:

### 예: 회사 정보 스키마

```typescript
// sanity/schemas/company.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'company',
  title: '회사 정보',
  type: 'document',
  fields: [
    defineField({
      name: 'about',
      title: '회사 소개',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
    defineField({
      name: 'vision',
      title: '비전',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
  ],
});
```

스키마 등록:
```typescript
// sanity/schemas/index.ts
import product from './product';
import company from './company';

export const schemaTypes = [product, company];
```

## 7. CORS 설정

Sanity Studio에서 프로덕션 URL 추가:

1. https://www.sanity.io/manage 접속
2. 프로젝트 선택
3. Settings → API → CORS Origins
4. "Add CORS origin" 클릭
5. URL 입력:
   - `http://localhost:3002` (개발)
   - `https://yourdomain.com` (프로덕션)
6. "Allow credentials" 체크
7. Save

## 8. 배포 시 주의사항

### Vercel 배포

환경 변수 설정:
1. Vercel 프로젝트 → Settings → Environment Variables
2. 추가:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`

### Netlify 배포

환경 변수 설정:
1. Site settings → Build & deploy → Environment
2. 같은 환경 변수 추가

## 9. 유용한 팁

### 실시간 미리보기

```typescript
// lib/sanity.ts에 추가
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // 실시간 데이터
  token: process.env.SANITY_API_TOKEN, // Read token
});
```

### 데이터 캐싱

```typescript
// Next.js 15 revalidate
export const revalidate = 60; // 60초마다 재검증

// 또는 on-demand revalidation
import { revalidatePath } from 'next/cache';
```

### GROQ 쿼리 테스트

Studio의 Vision 도구 사용:
1. Studio → Vision 탭
2. GROQ 쿼리 입력 및 테스트
3. 결과 확인 후 코드에 적용

## 10. 문제 해결

### Studio가 로드되지 않을 때
- 환경 변수 확인 (.env.local)
- 프로젝트 ID 정확한지 확인
- 브라우저 콘솔 에러 확인

### 데이터가 표시되지 않을 때
- Studio에서 데이터가 Published 상태인지 확인
- CORS 설정 확인
- 쿼리 구문 확인 (Vision 도구 활용)

### 이미지가 표시되지 않을 때
- Sanity 프로젝트의 이미지 에셋 확인
- urlFor 함수 사용 확인
- CORS 설정 확인

## 다음 단계

1. ✅ Sanity 프로젝트 생성
2. ✅ 환경 변수 설정
3. ✅ Studio 접속 및 데이터 추가
4. ⬜ 기존 제품 데이터 Sanity로 마이그레이션
5. ⬜ Next.js 페이지를 Sanity 데이터 사용하도록 업데이트
6. ⬜ 추가 스키마 생성 (회사 정보, 팀, 등)
7. ⬜ 프로덕션 배포 및 테스트
