# Sanity Studio CORS 오류 해결 방법

## 문제 상황
Studio에 접속하면 `CorsOriginError` 발생

## 해결 방법

### 방법 1: Sanity 웹사이트에서 설정 (권장)

1. **Sanity 관리 페이지 접속**
   ```
   https://www.sanity.io/manage
   ```

2. **프로젝트 선택**
   - 프로젝트 ID: `zvhqvwdi`
   - 프로젝트 이름: MuseWorks (또는 생성한 프로젝트 이름)

3. **CORS 설정 추가**
   - 좌측 메뉴에서 **API** 클릭
   - **CORS Origins** 섹션 찾기
   - **Add CORS origin** 버튼 클릭

4. **Origin 추가**
   ```
   Origin: http://localhost:3002
   ```
   - ✅ **Allow credentials** 체크
   - "Add" 버튼 클릭

5. **추가 Origin (선택사항)**
   ```
   Origin: http://localhost:3000
   Origin: http://localhost:3001
   ```
   - 개발 서버 포트가 변경될 수 있으므로 미리 추가

6. **브라우저 새로고침**
   - Studio 페이지 새로고침 (Ctrl + Shift + R 또는 Cmd + Shift + R)

### 방법 2: Sanity CLI 사용 (대안)

터미널에서:

```bash
# Sanity CLI로 로그인
npx sanity login

# CORS origin 추가
npx sanity cors add http://localhost:3002 --credentials
```

## 프로덕션 배포 시

배포 후 프로덕션 도메인도 추가해야 합니다:

```
https://yourdomain.com
https://www.yourdomain.com
```

### Vercel 배포 시

```
https://your-app.vercel.app
https://your-app-*.vercel.app  (프리뷰 배포용)
```

### Netlify 배포 시

```
https://your-app.netlify.app
https://deploy-preview-*.your-app.netlify.app  (프리뷰 배포용)
```

## 확인 사항

설정 완료 후 다음을 확인하세요:

1. ✅ CORS origin에 `http://localhost:3002` 추가됨
2. ✅ "Allow credentials" 체크됨
3. ✅ 브라우저 새로고침
4. ✅ CorsOriginError 사라짐
5. ✅ Studio 정상 로드

## 여전히 문제가 있다면

1. **브라우저 캐시 삭제**
   - 개발자 도구 열기 (F12)
   - Application 탭 → Clear storage → Clear site data

2. **브라우저 시크릿 모드로 테스트**
   - Ctrl + Shift + N (Chrome)
   - Ctrl + Shift + P (Firefox)

3. **프로젝트 ID 확인**
   - `.env.local` 파일의 `NEXT_PUBLIC_SANITY_PROJECT_ID` 값 확인
   - Sanity 관리 페이지의 프로젝트 ID와 일치하는지 확인

## 참고 자료

- [Sanity CORS 문서](https://www.sanity.io/docs/cors)
- [Sanity 관리 대시보드](https://www.sanity.io/manage)
