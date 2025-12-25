# Design Tokens - GG POKER Heritage Mall

GG POKER Heritage Mall 디자인 시스템 토큰 정의

> **참조**: `web/src/app/globals.css`
> **VIP 티어**: Silver, Gold (2단계)

---

## 1. 색상 토큰

### 1.1 기본 색상

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--stone-light` | `#FAFAFA` | 페이지 배경 |
| `--surface` | `#FFFFFF` | 카드, 모달 배경 |
| `--luxury-black` | `#0A0A0A` | 주요 텍스트, 버튼 배경 |
| `--luxury-charcoal` | `#333333` | 보조 텍스트 |

### 1.2 골드 팔레트

| 토큰 | 값 | OKLCH | 용도 |
|------|-----|-------|-----|
| `--gold` | `#C5A059` | `oklch(0.72 0.12 85)` | 주요 강조색 |
| `--gold-light` | `#E0C895` | `oklch(0.82 0.08 85)` | 밝은 배경, 호버 |
| `--gold-dark` | `#947638` | `oklch(0.55 0.10 85)` | 어두운 악센트, 텍스트 |

### 1.3 상태 색상

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--success` | `#22c55e` | 성공, 확인 |
| `--error` | `#ef4444` | 오류, 경고 |
| `--info` | `#3b82f6` | 정보 |

### 1.4 테두리

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--border-default` | `#e5e5e5` | 기본 테두리 |
| `--border-hover` | `#d4d4d4` | 호버 테두리 |
| `--border-focus` | `#C5A059` | 포커스 테두리 (골드) |

---

## 2. 타이포그래피 토큰

### 2.1 폰트 패밀리

```css
:root {
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Montserrat', 'Helvetica Neue', sans-serif;
  --font-luxury: 'Cormorant Garamond', 'Times New Roman', serif;
  --font-manrope: 'Manrope', system-ui, sans-serif;
}
```

| 토큰 | 폰트 | 용도 |
|------|------|-----|
| `--font-serif` | Playfair Display | 제목, 헤딩 |
| `--font-sans` | Montserrat | 본문, UI 텍스트 |
| `--font-luxury` | Cormorant Garamond | 럭셔리 강조, 이탤릭 설명 |
| `--font-manrope` | Manrope | 모던 UI, 수치 |

### 2.2 Letter Spacing

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--tracking-luxury` | `0.2em` | 럭셔리 기본 자간 |
| `--tracking-widest-xl` | `0.25em` | 강조 텍스트 |
| `--tracking-widest-2xl` | `0.35em` | 최대 자간 (레이블) |

### 2.3 폰트 크기

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--text-xs` | `10px` | 레이블, 캡션 |
| `--text-sm` | `11px` | 버튼 텍스트 |
| `--text-base` | `14px` | 본문 |
| `--text-lg` | `16px` | 큰 본문 |
| `--text-xl` | `20px` | 부제목 |
| `--text-2xl` | `28px` | 제목 |
| `--text-3xl` | `36px` | 큰 제목 |

---

## 3. Shadow 토큰

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--shadow-glow` | `0 0 100px -20px rgba(197, 160, 89, 0.15)` | 골드 빛 배경 효과 |
| `--shadow-sharp` | `0 0 0 1px rgba(0,0,0,0.03), 0 30px 60px -15px rgba(0,0,0,0.08)` | 카드 경계 + 깊이 |
| `--shadow-elegant` | `0 2px 15px rgba(0,0,0,0.02)` | 미묘한 그림자 |
| `--shadow-pristine` | `0 20px 40px -10px rgba(0, 0, 0, 0.05)` | 깔끔한 카드 그림자 |

### 3.1 사용 예시

```css
/* 기본 카드 */
.card {
  box-shadow: var(--shadow-pristine);
}

/* 호버 시 */
.card:hover {
  box-shadow: var(--shadow-sharp);
}

/* 배경 글로우 */
.hero-section {
  box-shadow: var(--shadow-glow);
}
```

---

## 4. 애니메이션 토큰

### 4.1 Duration

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--duration-fast` | `0.15s` | 빠른 마이크로 인터랙션 |
| `--duration-normal` | `0.3s` | 기본 전환 |
| `--duration-slow` | `0.5s` | 느린 전환 |
| `--duration-slower` | `0.7s` | 럭셔리 애니메이션 |
| `--duration-slowest` | `1s` | 배경 전환 |

### 4.2 Easing

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--ease-elegant` | `cubic-bezier(0.16, 1, 0.3, 1)` | 우아한 감속 |
| `--ease-warp` | `cubic-bezier(0.77, 0, 0.175, 1)` | 빠른 가속-감속 |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | 부드러운 전환 |

---

## 5. 간격 토큰

### 5.1 Padding/Margin

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--space-1` | `4px` | 최소 간격 |
| `--space-2` | `8px` | 작은 간격 |
| `--space-3` | `12px` | 기본 간격 |
| `--space-4` | `16px` | 중간 간격 |
| `--space-6` | `24px` | 섹션 내 간격 |
| `--space-8` | `32px` | 카드 패딩 |
| `--space-10` | `40px` | 큰 카드 패딩 |
| `--space-12` | `48px` | 섹션 간격 |

---

## 6. Border Radius 토큰

| 토큰 | 값 | 용도 |
|------|-----|-----|
| `--radius-none` | `0` | 각진 모서리 |
| `--radius-sm` | `2px` | 미세한 라운드 |
| `--radius-md` | `4px` | 기본 라운드 |
| `--radius-lg` | `8px` | 카드, 모달 |
| `--radius-full` | `9999px` | 원형 (배지) |

---

## 7. CSS 변수 정의 (적용 코드)

```css
/* ============================================
   New Design System - Light Mode
   GGP Heritage Mall v2.0
   ============================================ */

:root {
  /* ===== Colors ===== */
  /* Base */
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text-primary: #0A0A0A;
  --color-text-secondary: #333333;
  --color-text-muted: #9ca3af;

  /* Gold Palette */
  --color-gold: #C5A059;
  --color-gold-light: #E0C895;
  --color-gold-dark: #947638;

  /* VIP Tiers */
  --color-silver: #A8A8A8;
  --color-gold: #C5A059; /* same as gold palette */

  /* Borders */
  --color-border: #e5e5e5;
  --color-border-hover: #d4d4d4;
  --color-border-focus: var(--color-gold);

  /* Status */
  --color-success: #22c55e;
  --color-error: #ef4444;

  /* ===== Typography ===== */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Montserrat', 'Helvetica Neue', sans-serif;
  --font-luxury: 'Cormorant Garamond', 'Times New Roman', serif;
  --font-manrope: 'Manrope', system-ui, sans-serif;

  --tracking-luxury: 0.2em;
  --tracking-widest-xl: 0.25em;
  --tracking-widest-2xl: 0.35em;

  /* ===== Shadows ===== */
  --shadow-glow: 0 0 100px -20px rgba(197, 160, 89, 0.15);
  --shadow-sharp: 0 0 0 1px rgba(0,0,0,0.03), 0 30px 60px -15px rgba(0,0,0,0.08);
  --shadow-elegant: 0 2px 15px rgba(0,0,0,0.02);
  --shadow-pristine: 0 20px 40px -10px rgba(0, 0, 0, 0.05);

  /* ===== Animation ===== */
  --duration-fast: 0.15s;
  --duration-normal: 0.3s;
  --duration-slow: 0.5s;
  --duration-slower: 0.7s;
  --duration-slowest: 1s;

  --ease-elegant: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-warp: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);

  /* ===== Spacing ===== */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* ===== Border Radius ===== */
  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-full: 9999px;
}
```

---

## 8. Tailwind 설정

`tailwind.config.js`에 추가할 설정:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "gold": "#C5A059",
        "gold-light": "#E0C895",
        "gold-dark": "#947638",
        "luxury-black": "#0A0A0A",
        "luxury-charcoal": "#333333",
        "stone-light": "#FAFAFA",
        "silver": "#A8A8A8",
      },
      fontFamily: {
        "serif": ["Playfair Display", "serif"],
        "sans": ["Montserrat", "sans-serif"],
        "luxury": ["Cormorant Garamond", "serif"],
        "manrope": ["Manrope", "sans-serif"]
      },
      boxShadow: {
        'glow': '0 0 100px -20px rgba(197, 160, 89, 0.15)',
        'sharp': '0 0 0 1px rgba(0,0,0,0.03), 0 30px 60px -15px rgba(0,0,0,0.08)',
        'elegant': '0 2px 15px rgba(0,0,0,0.02)',
        'pristine': '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
        'widest-luxury': '0.2em',
      }
    },
  },
}
```

---

## 9. Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## 10. 컴포넌트 패턴

### 10.1 Floating Label Input

```css
.floating-group {
  position: relative;
  margin-bottom: var(--space-6);
}

.floating-input {
  width: 100%;
  padding: var(--space-3) 0;
  font-family: var(--font-sans);
  font-size: 16px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  transition: border-color var(--duration-slow) var(--ease-elegant);
}

.floating-input:focus {
  outline: none;
  border-bottom-color: var(--color-gold);
}

.floating-label {
  position: absolute;
  left: 0;
  top: var(--space-3);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-luxury);
  color: var(--color-text-muted);
  pointer-events: none;
  transition: all var(--duration-normal) var(--ease-elegant);
}

.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  top: -16px;
  color: var(--color-gold-dark);
}
```

### 10.2 Luxury Card

```css
.luxury-card {
  position: relative;
  background: var(--color-surface);
  padding: var(--space-10);
  box-shadow: var(--shadow-pristine);
  transition: transform var(--duration-slow) var(--ease-elegant);
}

.luxury-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-text-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-slower) var(--ease-elegant);
}

.luxury-card:hover {
  transform: translateY(-4px);
}

.luxury-card:hover::before {
  transform: scaleX(1);
}
```

### 10.3 Luxury Button

```css
.btn-luxury {
  position: relative;
  overflow: hidden;
  background: var(--color-text-primary);
  color: var(--color-surface);
  padding: 16px 40px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-luxury);
  border: none;
  cursor: pointer;
  transition: box-shadow var(--duration-slow) var(--ease-elegant);
}

.btn-luxury::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: translateX(-100%);
  transition: transform var(--duration-slowest) var(--ease-elegant);
}

.btn-luxury:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.btn-luxury:hover::before {
  transform: translateX(100%);
}
```

---

## 11. 참조

| 파일 | 용도 |
|------|------|
| `web/src/app/globals.css` | CSS 변수 정의 (실제 구현) |
| `web/src/lib/motion.ts` | Framer Motion 설정 |
| `stitch/pages/*.tsx` | 컴포넌트 패턴 참조 **(디자인만 참조)** |
| `DESIGN_COMPARISON.md` | 현재 vs 새 디자인 비교 |

> **stitch 폴더 참조 시 주의**:
> stitch는 Google AI Studio로 생성된 별도 프로젝트입니다.
> **레이아웃, 컴포넌트 스타일, 색상만 참조**하고,
> 브랜드명(VIP LOUNGE), 티어명(Diamond/Platinum), 상품 카테고리는 무시하세요.
> 실제 구현: **GG POKER**, **Silver/Gold 티어**, **Accessories/Apparel/Electronics/Lifestyle**

---

**마지막 업데이트**: 2025-12-25
