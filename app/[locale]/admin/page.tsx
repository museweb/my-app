import { getTranslations } from 'next-intl/server';

export default async function AdminPage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">콘텐츠 관리</h1>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">현재 구조</h2>
            <div className="space-y-2 text-sm">
              <p><strong>번역 파일:</strong> messages/ko.json, en.json, zh.json</p>
              <p><strong>제품 데이터:</strong> data/products/index.ts</p>
              <p><strong>페이지:</strong> app/[locale]/*/page.tsx</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">✨ 더 쉽게 관리하는 방법</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg mb-2">1. 헤드리스 CMS (추천)</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Sanity: 무료, 웹 편집기, 실시간 미리보기</li>
                  <li>Strapi: 오픈소스, 자체 호스팅</li>
                  <li>Contentful: 강력한 기능, 유료</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">2. Git 기반 CMS</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>TinaCMS: Git + 웹 편집기</li>
                  <li>Netlify CMS: GitHub 연동</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">3. 현재 방식 유지 시</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>VS Code로 JSON 파일 직접 수정</li>
                  <li>GitHub에서 웹으로 파일 수정</li>
                  <li>간단한 관리 UI 개발 (추가 개발 필요)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-bold mb-2">💡 추천 방법</h3>
            <p className="text-sm mb-4">
              비개발자도 쉽게 수정하려면 <strong>Sanity CMS</strong>를 추천합니다.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>설치:</strong> npm install sanity @sanity/client</p>
              <p><strong>초기화:</strong> npx sanity init</p>
              <p><strong>결과:</strong> studio.example.com 같은 관리 페이지 생성</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
