# SGJ Institute of Management & IT - Website

A modern, responsive website for SGJ Institute of Management & IT, offering BCA, BBA, and BA programs in Kutch, Gujarat.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Security**: CSRF protection, input validation, secure file downloads
- **SEO Optimized**: Schema markup, meta tags, semantic HTML
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized assets, browser caching, compression

## Installation

### Requirements
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache with mod_rewrite enabled
- XAMPP/WAMP/LAMP or similar

### Setup Steps

1. **Clone/Download** the project to your web server directory
   ```bash
   cd C:\xampp\htdocs\sgj_web
   ```

2. **Database Setup**
   - Create database: `sgj_college`
   - Import schema: `sql/database.sql`
   - Update credentials in `php/config.php` (or use environment variables)

3. **Configuration**
   - Edit `php/config.php` with your database credentials
   - Update `SITE_URL` in `php/config.php` for production
   - For production, set environment variables instead of hardcoding

4. **File Permissions**
   - Ensure `php/download_log.txt` is writable

5. **Apache Configuration**
   - Ensure `.htaccess` is enabled
   - Enable mod_rewrite, mod_headers, mod_deflate

## Environment Variables (Production)

For production, set these environment variables:

```bash
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
SITE_URL=https://sgjcollege.in
```

## File Structure

```
sgj_web/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── docs/          # PDFs and downloadable files
│   ├── images/        # Images (logo, favicon, etc.)
│   └── js/
│       ├── layout.js
│       ├── main.js
│       └── tailwind-config.js
├── includes/
│   ├── footer.html
│   ├── head.html
│   └── header.html
├── courses/
│   ├── ba.html
│   ├── bba.html
│   └── bca.html
├── php/
│   ├── config.php          # Configuration file
│   ├── contact_process.php # Form handler
│   ├── db_connect.php      # Database connection
│   ├── download_handler.php # File downloads
│   └── get_csrf_token.php   # CSRF token generator
├── sql/
│   └── database.sql        # Database schema
├── .htaccess              # Apache configuration
├── index.html
├── about.html
├── contact.html
├── downloads.html
├── gallery.html
└── thank-you.html
```

## Security Features

- ✅ CSRF token protection
- ✅ Input validation and sanitization
- ✅ Rate limiting (30 seconds between submissions)
- ✅ Secure file downloads (whitelist-based)
- ✅ SQL injection prevention (prepared statements)
- ✅ XSS protection headers
- ✅ Secure CORS configuration

## Missing Assets

The following assets need to be added:

1. **Favicon**: `favicon.ico` (root directory)
2. **Logo**: `assets/images/logo.png`
3. **Campus Image**: `assets/images/campus.jpg`
4. **Gallery Images**: Add actual photos to gallery

## Development

### Local Development
- Use `http://localhost/sgj_web/` for local testing
- Database credentials in `php/config.php` default to XAMPP defaults

### Production Deployment
1. Update `SITE_URL` in `php/config.php`
2. Set environment variables for database credentials
3. Update CORS allowed origins in `php/config.php`
4. Enable HTTPS and update `.htaccess` rewrite rules
5. Remove localhost from allowed origins

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2024 SGJ Institute of Management & IT. All rights reserved.

## Support

For issues or questions, contact:
- Email: info@sgjcollege.in
- Phone: +91 9099987846
