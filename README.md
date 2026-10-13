# D voice 랜딩 페이지 — 핸드오프

브라우저에서 `Landing.dc.html` 을 바로 열면 동작한다(로컬 서버 권장: `npx serve .`).

## 파일
- `Landing.dc.html` — 페이지 전체. 템플릿(인라인 스타일) + `class Component extends DCLogic` 로직(스크롤/전환/인터랙션 전부 `frame()` rAF 루프).
- `support.js` — DC 런타임(React 포함). 수정 금지.
- `calc3d.bundle.js` — Three.js r160 + 3D 계산기(`mountCalc(canvas, opts)`) 한 파일. 소재·조명·버튼 눌림·디스플레이 캔버스 텍스처·숫자 롤링.
- `dv-ui.js` — `<dv-ui screen="...">` 웹 컴포넌트. 제품 UI 목업(콜레코드 explorer, 대시보드, 3분 요약 등), 순차 등장 `seq()`, 콜레코드 자동 원형 커서.
- `data.js` — 목업 데이터.
- `assets/` — 로고(일반/화이트), `case.mp4`. `fonts/` — Pretendard Variable.

## 페이지 구조(순서 고정, 카피 변경 금지)
0. 메인 히어로(`#top`) — 두 줄 요약 + 2주 콜 진단 CTA + 맥 프레임 제품 화면(`<dv-ui screen="app">`). 좌측 메뉴 클릭으로 화면 전환, 8초마다 자동 순환(클릭 후 15초 정지), 우측 상단 실시간 통화 알림.
1. Hero — "어제도 울렸던 전화, 몇 통이 그냥 끊겼을까요?" 화면에 들어오면 글자 등장.
2. Hero → 계산기 — 흰 시트가 스프링(약간 오버슈트)으로 올라와 Hero를 덮음, Hero는 scale 0.94 + 라운드.
3. 놓친 전화 계산기 — 타이틀 좌측, 3D 계산기 우측. +/− 물리 버튼, 결과 롤링 + 디스플레이 라이트 스윕.
4. 이후 기존 섹션들(전화·상담, 환자 이해, 콜레코드, 도입 효과, 도입 사례 가로 카드 …).
5. 도입 사례(영상 타임라인) → 도입 효과 글래스 박스. 이어지는 `#cases-h` 는 도입 인터뷰(영상 카드 + 인용)로 분리, 수치 중복 없음.
6. 최종 CTA(네이비) — 같은 스프링 시트 전환, 큰 원형 리플, 계산기(계산기 섹션과 동일 상태 동기화), 버튼 테두리 빛 1회.
7. 푸터(네이비) — 화이트 로봇컴 로고.

## 인터랙션 규칙
- 버튼: 진입 시 테두리 스펙큘러 1회, hover scale 1.015 / 화살표 +6px / 커서 추적 하이라이트(느리게 1.6s 스윕). 네온·강한 glow·바운스 금지.
- 리빌: `[data-reveal]` 블러+상승, 큰 패널은 scale 0.955→1. dv-ui 내부 요소 55ms 간격 순차 등장.
- 헤더: 어두운 영역 위에서 화이트 로고/텍스트로 자동 전환.
- 900×700 미만 / `prefers-reduced-motion` — sticky·모핑·스프링 전환 해제, 정적 표시.

## 톤
white / light gray / blue(#3D6FE3 계열) + navy(#0A1434). clean · premium · calm. 과한 futuristic·AI 느낌 금지.

## 배포
- `index.html` 은 `Landing.dc.html` 로 즉시 이동(링크 화면 없음).

## 서브페이지 (추가)
- `Features.dc.html` — 기능 소개. 상단 토글 [3분 요약 | 기능 상세]. 3분 요약은 7단계 스텝(← → 키 지원), 기능 상세는 6개 모듈(dv-ui mk-* 체험 화면) + 안심과 보안 링크. 해시: `#summary`, `#summary-3`, `#detail`, `#f-call` 등.
- `Cases.dc.html` — 도입 사례. 진료과 필터, A피부과 대표 사례, 사례 카드, 게재 후기.
- `SafeHospital.dc.html` — 안심병원. 네 가지 약속, 발급 기준 5개, 안심과 보안, 관련 FAQ.
- `Pricing.dc.html` — 요금. 2주 콜 진단, STANDARD/PREMIUM 구성, 상담실장 비교, 요금 FAQ.
- `Insights.dc.html` — 인사이트(도입 사례·뉴스·블로그 아카이브). 분류 탭, 검색, 대표 글, 더 보기. 목록은 예시 데이터(`data()`).
- `Article.dc.html?id=` — 뉴스·블로그 상세(공통 포맷). `CaseStudy.dc.html?id=a|b|c|d` — 도입 사례 상세(남색 히어로·인터뷰 영상·주차별 기록). 데이터는 `posts.js`(`DV_POSTS`, `DV_CASES`).
- `SiteHeader.dc.html` / `SiteFooter.dc.html` — 서브페이지 공통 헤더(`active` prop)·푸터. `site.js` — 공통 리빌/스크롤 헬퍼.
- `Contact.dc.html` — 도입 문의(2주 콜 진단 신청) 폼. 모든 "2주 콜 진단 신청" 링크가 이 페이지로 연결.
