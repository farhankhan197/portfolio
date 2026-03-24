# Portfolio Improvement Phases

## Phase 1: Critical Bug Fixes ✅ (Completed)
**Date:** March 24, 2026

| # | Issue | File | Status |
|---|-------|------|--------|
| 1 | Navbar scroll detection broken (`5000000` threshold) | `components/Navbar.tsx` | ✅ Fixed |
| 2 | Contact form doesn't submit | `app/contact/page.tsx` | ✅ Integrated Resend |
| 3 | Discord icon links to resume (temporary) | `app/page.tsx` | ⚠️ Deferred |

### Changes Made:
- Fixed navbar scroll threshold from `5000000` to `50`
- Created `/api/contact` route with Resend integration
- Added loading states and success/error feedback to contact form
- Created `.env.example` for environment variable documentation

### Next Steps:
- Add your Resend API key to `.env.local`
- Test the contact form

---

## Phase 2: UI Polish & Consistency (Pending)
**Est: 45-60 mins**

| # | Change | Details |
|---|--------|---------|
| 1 | **Standardize card styling** | Add `backdrop-blur-lg` + consistent border/shadow to Work Experience cards |
| 2 | **Typography consistency** | Use consistent font sizes/weights (e.g., all section headers `text-2xl font-semibold`) |
| 3 | **Hover states** | Add hover effects to Work Experience cards (scale/glow) |
| 4 | **Mobile menu spacing** | Add gap between links in mobile nav |
| 5 | **Add Footer component** | Create reusable `Footer.tsx` with social links + copyright |

---

## Phase 3: Code Architecture (Pending)
**Est: 60-90 mins**

| # | Change | New File |
|---|--------|----------|
| 1 | **Create shared data layer** | `lib/data.ts` - Move skills, projects, work experience, social links here |
| 2 | **Extract type definitions** | `lib/types.ts` - Create `Project`, `WorkExperience`, `Skill`, `SocialLink` interfaces |
| 3 | **Create reusable components** | `components/ProjectCard.tsx`, `components/ExperienceCard.tsx`, `components/SkillBadge.tsx` |
| 4 | **Remove duplicate code** | Update all pages to import from `lib/data.ts` |
| 5 | **Clean up imports** | Remove unused imports (`Menu`, `LogOut` from `page.tsx`) |

---

## Phase 4: UI/UX Enhancements (Pending)
**Est: 45-60 mins**

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Project images in /projects** | Add thumbnail images to project cards |
| 2 | **Skills with icons** | Replace plain pills with icon-based badges |
| 3 | **Page transition animations** | Add Framer Motion page transitions |
| 4 | **Loading skeletons** | Add loading states for better UX |
| 5 | **Accessibility** | Add skip-to-content link, proper ARIA labels |

---

## Phase 5: Functionality & SEO (Pending)
**Est: 45-60 mins**

| # | Feature | Implementation |
|---|---------|-----------------|
| 1 | **SEO optimization** | Add Open Graph tags, Twitter cards to `layout.tsx` |
| 2 | **Error boundary** | Create `app/error.tsx` |
| 3 | **404 page** | Enhance `app/not-found.tsx` |
| 4 | **Resume download** | Add proper resume button (deferred from Phase 1) |
| 5 | **sitemap.xml** | Add for SEO |

---

## Environment Variables

```bash
# .env.local (create this file)
RESEND_API_KEY=re_xxxxxxxxx
```

Get your Resend API key from https://resend.com

---

## Notes

- Main page color scheme preserved
- All existing pages maintained during refactoring
- Mobile-first responsive design maintained