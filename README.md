# CW Custom Works Website

Professional static website for CW Custom Works Glass & Door - Expert window, door, and glass installation in Boise, Idaho.

## Features

- 🪟 **Mobile-First Design** - Optimized for all devices
- 📧 **Serverless Contact Forms** - No third-party dependencies
- 🔒 **Security Headers** - CSP, Referrer Policy, and more
- 🚀 **Performance Optimized** - Aggressive caching, lazy loading
- 📊 **SEO Optimized** - Complete schema.org markup, sitemap
- 🎨 **Professional Design** - StoryBrand flow, smooth animations
- 📱 **PWA Ready** - Add to home screen capability

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/edw4rdsinc/cwcustomworks.git
   cd cwcustomworks
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variable: `RESEND_API_KEY` (you already have this!)
   - Deploy!

3. **That's it!** Forms will automatically work.

## How Forms Work

### Contact Form (`/contact.html`)
- User fills out quote request form
- JavaScript sends data to `/api/contact.js` (serverless function)
- Serverless function uses **Resend API** to email you
- You receive email at `colew@cwcustomworks.com`

### Newsletter Form (Footer on all pages)
- User enters email
- JavaScript sends data to `/api/newsletter.js`
- You receive notification email

### No Third-Party Services Needed!
- ✅ Uses your existing Resend API key
- ✅ Serverless functions run on Vercel (free tier)
- ✅ No Web3Forms, Formspree, or other services
- ✅ Complete control over your data

## Environment Variables

Set this in your Vercel project settings:

```
RESEND_API_KEY=re_JgqiiJdh_5SBPNDVZEmK5acfWdp2kLm8M
```

*(You already have this configured from your other projects!)*

## File Structure

```
cwcustomworks/
├── api/
│   ├── contact.js          # Contact form handler
│   └── newsletter.js       # Newsletter signup handler
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Main JavaScript (form handling, animations)
│   └── gallery.js          # Image lightbox component
├── images/
│   ├── cw-custom-works-logo.svg
│   └── cw-custom-works-logo-white.svg
├── index.html              # Homepage
├── services.html           # Services page
├── about.html              # About Cole page
├── contact.html            # Contact/quote page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── 404.html                # Error page
├── favicon.svg             # Favicon
├── site.webmanifest        # PWA manifest
├── robots.txt              # Search engine instructions
├── sitemap.xml             # Sitemap for SEO
└── vercel.json             # Vercel configuration
```

## Serverless Functions Explained

The `/api/*.js` files are **Vercel Serverless Functions**:

- They run on Vercel's servers (not in the browser)
- They execute only when forms are submitted
- They have access to environment variables (like RESEND_API_KEY)
- They're completely free on Vercel's hobby plan

### How They Work:

1. **User submits form** → JavaScript captures the data
2. **JavaScript sends POST request** → `/api/contact` or `/api/newsletter`
3. **Serverless function runs** → Validates data, formats email
4. **Resend API sends email** → You get the email at colew@cwcustomworks.com
5. **Success response** → User sees "Thank you" message

## Benefits of This Approach

**vs. Web3Forms/Formspree:**
- ✅ No third-party account needed
- ✅ No API key to manage separately
- ✅ Uses your existing Resend setup
- ✅ Full control over email format
- ✅ Can add custom logic (spam filtering, auto-responses, etc.)
- ✅ Free on Vercel

**vs. Backend Server:**
- ✅ No server to maintain
- ✅ Scales automatically
- ✅ Zero-config deployment
- ✅ Runs close to users (edge network)

## Testing Forms Locally

```bash
# Install Vercel CLI
npm i -g vercel

# Run development server
vercel dev

# Visit http://localhost:3000
# Forms will work with your environment variables
```

## Updating Content

- **Text/Copy**: Edit HTML files directly
- **Styles**: Edit `css/style.css`
- **Functionality**: Edit `js/main.js`
- **Images**: Add to `/images/` folder and update HTML references

## Schema.org Markup Included

- ✅ LocalBusiness
- ✅ FAQ
- ✅ Service
- ✅ Review (4 testimonials)
- ✅ Person (Cole Watson)
- ✅ Breadcrumb
- ✅ Organization

## Performance Features

- Aggressive caching (1 year for static assets)
- Lazy loading images
- Optimized fonts (preconnect)
- Minimal JavaScript
- No heavy frameworks

## Security Features

- Content Security Policy (CSP)
- Referrer Policy
- Permissions Policy
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

## Browser Support

- Chrome/Edge (modern)
- Firefox (modern)
- Safari (modern)
- Mobile browsers (all major)

## License

© 2025 CW Custom Works Glass & Door LLC. All rights reserved.

## Questions?

The serverless functions are super simple - they just:
1. Receive form data
2. Validate it
3. Send you an email using Resend
4. Return success/error to the user

No complex setup, no third-party accounts, just works!
