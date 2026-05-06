You are a senior full-stack engineer and SEO specialist working on 
"Cutmage" — a free AI background removal web app. I need you to 
fix, improve, and optimise the entire codebase in one pass. 
Read my full HTML/CSS/JS files first, then apply every change below.

My project is at: [YOUR PROJECT PATH e.g. /var/www/cutmage or C:/cutmage]

---

## PART 1 — TRUST & CREDIBILITY FIXES (do first, highest priority)

1. REMOVE ALL FAKE SOCIAL PROOF:
   - Delete the "Trusted by 2M+ creators and brands" line entirely
   - Delete the Shopify, Etsy, Adobe, Canva, Amazon logo/brand strip 
     entirely — we are NOT partners with these companies and using 
     their logos without permission is a legal risk
   - Replace the three fake testimonials (Jane D., Mark S., Priya R.) 
     with a simple real-usage counter widget instead:
     Show a dark pill badge: "✓ [X] backgrounds removed today" where 
     X is fetched from your metrics endpoint or hardcoded as a 
     reasonable real number from your Grafana data
   - Remove the line comparing Cutmage to any other named tool or 
     brand. Never mention competitor brand names anywhere on the page.
     Delete this entire paragraph: "Cutmage vs remove.bg: Cutmage is 
     100% free with no credit limits..." — remove it completely.
   - Search the entire HTML for any other competitor brand mentions 
     (remove.bg, PhotoRoom, Clipdrop, Canva, Adobe etc) and remove 
     or genericise them. Replace with "other tools" or "alternatives"

2. REMOVE NAVIGATION ITEMS:
   - Remove "Log in" link from navbar entirely
   - Remove "Sign up free" button from navbar entirely  
   - Replace both with a single blue CTA button: 
     "Remove Background Free" that smooth-scrolls to the upload tool
   - Remove the Pricing section/link from the nav entirely
   - Remove the entire Pricing section from the page body entirely
     (the $0/$9/$29 plans section) — delete it completely
   - Update the nav links to: Features | How It Works | API | FAQ

3. FIX ALL DEAD LINKS:
   - About Us → create a simple inline modal or a /about page with:
     "Cutmage is built by a small team obsessed with making 
     professional image editing tools free and accessible to everyone. 
     Launched in 2024, we process thousands of images daily for 
     photographers, e-commerce sellers, and developers worldwide."
   - Blog → create /blog page or redirect to a "coming soon" page 
     with an email signup: "Articles and guides coming soon. 
     Get notified:" + email input + subscribe button
   - Help Center → make FAQ section the anchor target, 
     smooth scroll to #faq

---

## PART 2 — HERO SECTION COMPLETE REBUILD (highest visual priority)

The hero section needs to be completely rebuilt. Currently it is flat 
and dead. Make it the best thing on the page:

LAYOUT: Full viewport height (100vh minimum). Single focused column 
on mobile, two columns on desktop (content left, demo right).

HEADLINE: 
- Change H1 to: "Remove Any Background. Instantly Free."
- Style: Large (clamp(40px, 6vw, 80px)), Newsreader italic, black
- The word "Free." on its own line in blue (#2355f5)
- Animate: on page load, words fade+slide up with 80ms stagger 
  per word using CSS animation classes added via JS on DOMContentLoaded

UPLOAD ZONE — make it the star of the page:
- Move the upload tool to IMMEDIATELY below the navbar — first 
  thing user sees without scrolling on mobile
- Large, prominent upload zone card (white, rounded-3xl, soft shadow)
- Animated dashed border: CSS @keyframes that animates 
  stroke-dashoffset to create "marching ants" effect 
  (use outline with animated background-position trick since 
  CSS border-image doesn't animate easily):
  
  .upload-zone {
    background-image: repeating-linear-gradient(
      0deg, #2355f5, #2355f5 10px, transparent 10px, transparent 20px
    ), repeating-linear-gradient(
      90deg, #2355f5, #2355f5 10px, transparent 10px, transparent 20px
    ), repeating-linear-gradient(
      180deg, #2355f5, #2355f5 10px, transparent 10px, transparent 20px
    ), repeating-linear-gradient(
      270deg, #2355f5, #2355f5 10px, transparent 10px, transparent 20px
    );
    background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
    background-position: 0 0, 0 0, 100% 0, 0 100%;
    background-repeat: no-repeat;
    animation: marchingAnts 1s linear infinite;
  }
  @keyframes marchingAnts {
    0% { background-position: 0 0, 0 0, 100% 0, 0 100%; }
    100% { background-position: 0 -20px, 20px 0, 100% 20px, -20px 100%; }
  }

- On drag-enter: zone background shifts to #EEF2FF, border glows 
  blue, show large upload icon with bounce, text changes to "Drop it!"
- On drag-leave: revert to normal state
- On wrong file type drop: border flashes red (#ef4444) for 600ms, 
  gentle horizontal shake animation (CSS keyframes), show error: 
  "Please upload a JPG, PNG, or WebP image"
- Large blue CTA button inside zone: "Remove Background Free" 
  full width, rounded-full, bold, with upload icon
- Below button: three small trust chips: "✓ No Watermark" 
  "✓ Instant Results" "✓ Free Forever"

PROCESSING ANIMATION (when image is uploading/processing):
- Show overlay inside upload zone with:
  - Animated spinner (CSS, blue, not a GIF)
  - Progress bar that fills from 0→100% over 2.5 seconds
  - Cycling text every 600ms: 
    "🔍 Detecting subject..." → "✂️ Removing background..." → 
    "✨ Refining edges..." → "✅ Done!"
  - Percentage counter that counts up 0%→100%

HERO BACKGROUND:
- Off-white (#FAFAFA) base
- Very subtle radial dot grid pattern (pure CSS, ::before pseudo):
  background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
- Two very soft color orbs (::after pseudo, position absolute):
  Top-left: rgba(35, 85, 245, 0.06) blurred 120px circle
  Top-right: rgba(139, 92, 246, 0.06) blurred 120px circle

---

## PART 3 — MOBILE RESPONSIVENESS (critical — currently broken)

This is urgent. The mobile layout is completely broken. Fix everything:

GLOBAL MOBILE RULES (apply to all elements at max-width: 768px):

Typography scaling — use clamp() everywhere:
- H1: clamp(32px, 8vw, 80px)
- H2: clamp(24px, 6vw, 48px)  
- H3: clamp(18px, 4vw, 28px)
- Body: clamp(14px, 3.5vw, 18px)
- Never let text overflow its container
- Add: word-break: break-word; overflow-wrap: break-word; globally

Navigation mobile:
- Collapse to hamburger menu at 768px
- Hamburger: three lines → X animation on open
- Full-width dropdown panel slides down below nav
- All nav links stacked vertically, large touch targets (min 48px tall)
- Close panel when link is clicked

Hero mobile:
- Single column (no side-by-side)
- Upload zone comes FIRST, before headline text
- Upload zone: full width, min-height 200px, large touch-friendly
- Demo card: hidden on mobile (display: none below 768px)
- Headline: centered, below upload zone
- All padding reduced to 16px horizontal

Gallery/cards mobile:
- All multi-column grids collapse to single column
- Cards: full width, no horizontal overflow
- Images: max-width: 100%, height: auto always

Use-case cards (currently showing as broken columns):
- Stack vertically on mobile
- Each card full width
- Image on top, text below
- No side-by-side layout below 768px

How It Works steps:
- Stack vertically on mobile
- Large step numbers above each card
- Full width cards

FAQ mobile:
- Full width
- Larger tap targets on accordion headers
- Min 52px height on each FAQ header row

Footer mobile:
- Stack all columns vertically
- Center align everything
- Logo on top, links below, copyright at bottom

API code block mobile:
- Horizontal scroll (overflow-x: auto)
- Don't break the code layout

TABLET (768px - 1024px):
- Two column max for grids (not three)
- Hero: two columns but tighter spacing
- Nav: keep full nav but reduce font size

TOUCH INTERACTIONS:
- All hover effects: also trigger on :focus and :active for touch
- Remove cursor-dependent effects on touch devices
- Add: @media (hover: none) { /* disable hover-only effects */ }
- Minimum tap target size: 44x44px for all interactive elements

---

## PART 4 — ANIMATIONS & MICRO-INTERACTIONS (smooth everything)

Current animations are janky. Fix all of them:

GLOBAL ANIMATION PRINCIPLES:
- All transitions: use cubic-bezier(0.16, 1, 0.3, 1) for snappy feel
- Never animate width/height (causes layout reflow = jank)
- Only animate: transform, opacity, box-shadow, background-color
- Add will-change: transform to elements that animate on scroll
- Remove will-change after animation completes (via JS)

SCROLL REVEAL (IntersectionObserver — no libraries):
- All sections start at: opacity: 0; transform: translateY(32px);
- When 15% in viewport: transition to opacity: 1; transform: none;
- Duration: 500ms with cubic-bezier(0.16, 1, 0.3, 1)
- Children stagger: each child delays by index * 80ms
- Implementation:

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Stagger children
      entry.target.querySelectorAll('.stagger-child').forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
        child.classList.add('revealed');
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-section').forEach(el => {
  observer.observe(el);
});

BUTTON ANIMATIONS:
- All blue buttons: 
  - Hover: translateY(-2px), box-shadow increases, brightness(1.05)
  - Active/click: translateY(0), scale(0.97), transition 80ms
  - Ripple effect on click: JS-generated ::after pseudo expanding circle
- Transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1)

CARD HOVER:
- Transform: translateY(-4px)
- Box-shadow: increase spread + opacity
- Border: shift to rgba(35, 85, 245, 0.2)
- Transition: 200ms cubic-bezier(0.16, 1, 0.3, 1)
- NO layout shifts — use padding to account for shadow space

FAQ ACCORDION (fix completely):
- Remove any display:none/block toggling
- Use max-height transition instead:

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 400ms cubic-bezier(0.16, 1, 0.3, 1),
              padding 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.faq-item.open .faq-answer {
  max-height: 300px; /* larger than any answer */
}

- Arrow icon: rotate(0deg) → rotate(180deg) on open
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1)
- Only one FAQ open at a time (close others when new one opens)
- Left border: transition from transparent → #2355f5 on open

BEFORE/AFTER SLIDER:
- Make the drag handle smoother: use pointer events (not mouse events)
  so it works on touch too
- Add momentum: on pointer-up, don't snap, ease to final position
- Handle: add subtle scale(1.1) on grab, scale(1) on release

NAVBAR SCROLL:
- On scroll > 60px: 
  - Reduce padding: py-4 → py-2
  - Increase backdrop-blur: blur(8px) → blur(20px)  
  - Add stronger border: border-opacity increases
  - box-shadow appears
  - All transitions: 300ms ease
- Progress bar at very top of page:
  - 3px tall, blue (#2355f5), position fixed top 0 left 0
  - Width updates on scroll: (scrollY / (docHeight - winHeight)) * 100 + '%'

MARQUEE:
- Pause on hover (pointer-events + animation-play-state: paused)
- Ensure seamless loop (duplicate content so no gap appears)
- Speed: 30s linear infinite (not too fast, not too slow)

NUMBER COUNTERS:
- Any statistic numbers (processing time, accuracy %) 
- Count up from 0 when they enter viewport
- Use easeOutQuart easing for natural deceleration
- Duration: 1500ms

---

## PART 5 — ADVANCED SEO AUDIT & FIXES

Do a complete SEO overhaul. Check and fix every item:

### META & HEAD:
- Title tag: "Free AI Background Remover — No Watermark, No Sign-Up | Cutmage"
  (max 60 chars, primary keyword first)
- Meta description: "Remove image backgrounds instantly with AI. Free forever — 
  no watermark, no sign-up, no limits. Perfect for portraits, products, pets. 
  Download transparent PNG in seconds." (max 155 chars)
- Canonical tag: ensure <link rel="canonical" href="https://cutmage.com/"> exists
- Add hreflang for English: <link rel="alternate" hreflang="en" href="https://cutmage.com/">
- robots meta: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
- Theme color: <meta name="theme-color" content="#2355f5">

### OPEN GRAPH (check all exist and are correct):
- og:title, og:description, og:image (1200x630), og:url, og:type, og:site_name
- og:image:width="1200" og:image:height="630" og:image:alt

### TWITTER CARD:
- twitter:card="summary_large_image"
- twitter:site, twitter:creator, twitter:title, twitter:description, twitter:image

### STRUCTURED DATA — ADD ALL OF THESE:

1. WebApplication schema:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cutmage",
  "url": "https://cutmage.com",
  "description": "Free AI background remover. Remove background from any image instantly. No watermark, no sign-up, free forever.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AI background removal",
    "Transparent PNG export",
    "No watermark",
    "No sign-up required",
    "Background replacement",
    "Bulk API access"
  ]
}
</script>

2. FAQPage schema (add ALL FAQ items):
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this background remover really free with no watermarks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, completely. Cutmage is 100% free with no watermarks, no sign-up, and no usage limits."
      }
    },
    {
      "@type": "Question", 
      "name": "What image formats does the background remover support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cutmage accepts JPEG, PNG, and WebP images up to 10MB. Output is a full-resolution transparent PNG."
      }
    },
    {
      "@type": "Question",
      "name": "How fast is the AI background removal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most images are processed in under 5 seconds with precise edge detection for hair, fur, and complex edges."
      }
    },
    {
      "@type": "Question",
      "name": "Are my images stored after background removal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Images are processed in real-time and immediately returned. Nothing is stored on our servers."
      }
    }
  ]
}
</script>

3. BreadcrumbList schema:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://cutmage.com"
  }]
}
</script>

### H1/H2/H3 HIERARCHY — fix this completely:
- ONE H1 per page: "Remove Any Background. Instantly Free."
- H2 for main sections:
  - "Free AI Background Remover Tool"
  - "Background Removal for Every Image Type" 
  - "How It Works — Three Simple Steps"
  - "Remove Background from Any Subject"
  - "Developer API for Background Removal"
  - "Frequently Asked Questions"
- H3 for sub-items within sections (features, use cases etc.)
- Never skip heading levels (no H1 → H3)
- All headings must contain target keywords naturally

### KEYWORD TARGETS — ensure these appear naturally in content:
Primary: "background remover" "remove background from image" 
         "free background remover" "AI background remover"
Secondary: "transparent background" "remove white background" 
           "background eraser" "cut out image online"
           "remove background from photo" "transparent PNG"
Long-tail: "free background remover no watermark"
           "remove background from image free online"
           "AI background removal tool"
           "background remover no sign up"
           "remove background from product photo"

### IMAGE SEO:
- Every <img> tag must have descriptive alt text containing keywords
- Example alts:
  - Before images: "Original photo before AI background removal"
  - After images: "Photo with background removed — transparent PNG result"
  - Hero: "AI background remover tool — free online, no watermark"
- Add width and height attributes to all images (prevents CLS)
- Add loading="lazy" to all images below the fold
- Add fetchpriority="high" to the hero/LCP image

### PERFORMANCE SEO (Core Web Vitals):
- Add <link rel="preload"> for the hero image and main font
- Add <link rel="preconnect"> for Google Fonts domain
- Inline critical CSS (above-fold styles) in <style> tag in <head>
- Defer all non-critical JS: add defer attribute to script tags
- Add <link rel="dns-prefetch" href="//api.cutmage.com">

### INTERNAL LINKING:
- Add internal links between sections using descriptive anchor text
- In the API section, link to "#tool" with text 
  "Try the free background remover"
- In FAQ answers, link to relevant sections

### CONTENT — REMOVE SPAMMY KEYWORD DUMP:
- Delete the "Also known as: background eraser online · remove bg free..." 
  paragraph at the bottom entirely — this is keyword stuffing and 
  Google penalises it. It also looks terrible to real users.
- The SEO value of those keywords should come from proper H2/H3 
  headings and natural content instead

### SITEMAP & ROBOTS:
- Ensure /sitemap.xml exists and is submitted to Google Search Console
- Ensure /robots.txt allows all crawlers with: 
  User-agent: * 
  Allow: /
  Sitemap: https://cutmage.com/sitemap.xml

---

## PART 6 — BACKEND: RATE LIMITING & QUEUE

Add these to your API backend (Node.js/Express or equivalent):

### RATE LIMITER:
npm install express-rate-limit

const rateLimit = require('express-rate-limit');

// Per-IP rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // max 10 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please wait a moment before trying again.',
    retryAfter: 60
  },
  skip: (req) => {
    // Skip rate limiting for requests with valid API key
    return req.headers['x-api-key'] && isValidApiKey(req.headers['x-api-key']);
  }
});

// Apply to background removal endpoint only
app.use('/v1/remove-background', limiter);

// Stricter limit for anonymous users
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // 30 free uses per hour per IP
  message: { error: 'Hourly limit reached. Sign up for more.' }
});
app.use('/v1/remove-background', strictLimiter);

### REQUEST QUEUE:
npm install bull redis

const Queue = require('bull');
const imageQueue = new Queue('image-processing', {
  redis: { host: 'localhost', port: 6379 }
});

// Add job to queue instead of processing immediately
app.post('/v1/remove-background', async (req, res) => {
  const job = await imageQueue.add({
    imageData: req.file.buffer.toString('base64'),
    apiKey: req.headers['x-api-key']
  }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    timeout: 30000 // 30s timeout
  });
  
  // Wait for result (for sync API response)
  const result = await job.finished();
  res.json({ result });
});

// Process queue with concurrency limit
imageQueue.process(3, async (job) => { // max 3 concurrent
  return await processImage(job.data.imageData);
});

### RESPONSE TIME MONITORING:
// Add to every route
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > 3000) {
      console.warn(`Slow request: ${req.path} took ${duration}ms`);
      // Send alert to your monitoring
    }
  });
  next();
});

### TIMEOUT PROTECTION:
// Add timeout middleware
app.use('/v1/remove-background', (req, res, next) => {
  req.setTimeout(25000, () => {
    res.status(408).json({ 
      error: 'Processing timeout. Please try again with a smaller image.' 
    });
  });
  next();
});

---

## PART 7 — CONTENT IMPROVEMENTS

### REPLACE FAKE TESTIMONIALS WITH THIS SECTION:
Instead of fake testimonials, add a "Built for" section with 3 
use-case cards (no fake names or quotes needed):

Card 1: "E-Commerce Sellers"
Icon: shopping bag
Text: "Remove backgrounds from product photos in seconds. 
Get marketplace-ready images for your store instantly."

Card 2: "Photographers & Designers"
Icon: camera/palette
Text: "Cut out subjects with pixel-perfect precision. 
Complex hair, fur, and transparent edges handled automatically."

Card 3: "Developers & Teams"
Icon: code
Text: "Automate your image pipeline with our REST API. 
Process thousands of images programmatically."

### ADD A REAL STATS BAND:
Pull from your actual metrics (or use conservative real numbers):

"500+ images processed today" (update this manually weekly)
"< 5 seconds average processing time"
"Free forever — no hidden limits"

### ABOUT PAGE (create /about or a modal):
"Cutmage is a free AI-powered background removal tool built for 
creators, sellers, and developers who need professional results 
without expensive software or complicated workflows. 
Built in 2024. Processing thousands of images daily."

---

## FINAL CHECKLIST — verify all of these before finishing:

[ ] No competitor brand names appear anywhere on the page
[ ] No fake logos (Shopify/Adobe/Canva/Amazon) anywhere  
[ ] No fake user counts ("2M+") anywhere
[ ] No fake testimonials
[ ] Login/signup removed from nav
[ ] Pricing section removed entirely
[ ] Upload zone is the FIRST thing visible on mobile
[ ] All dead links fixed (About, Blog, Help Center)
[ ] FAQ accordion opens/closes smoothly
[ ] All animations use transform/opacity only (no width/height)
[ ] Mobile layout tested at 375px, 414px, 768px widths
[ ] All images have descriptive alt text
[ ] H1 is unique and contains primary keyword
[ ] All structured data (JSON-LD) is present and valid
[ ] Keyword stuffing paragraph removed from bottom
[ ] Rate limiter applied to /v1/remove-background
[ ] No console errors in browser dev tools
[ ] Page loads in under 3 seconds (check with Lighthouse)

Run Lighthouse audit after all changes and aim for:
- Performance: 90+
- Accessibility: 95+  
- Best Practices: 95+
- SEO: 100