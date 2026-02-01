# Quick Setup Guide

## Initial Setup

1. **Database Setup**
   ```sql
   -- Run this in MySQL
   CREATE DATABASE sgj_college;
   USE sgj_college;
   SOURCE sql/database.sql;
   ```

2. **Configure Database** (if not using defaults)
   - Edit `php/config.php`
   - Update `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` if needed
   - Defaults work with XAMPP: `localhost`, `sgj_college`, `root`, `` (empty)

3. **File Permissions**
   ```bash
   # Make log files writable
   touch php/download_log.txt
   chmod 666 php/download_log.txt
   ```

4. **Test the Website**
   - Open `http://localhost/sgj_web/` in browser
   - Test contact form submission
   - Test file downloads

## Production Deployment Checklist

- [ ] Update `SITE_URL` in `php/config.php`
- [ ] Set environment variables for database credentials
- [ ] Update `ALLOWED_ORIGINS` in `php/config.php` (remove localhost)
- [ ] Enable HTTPS and update `.htaccess` rewrite rules
- [ ] Add actual images: favicon.ico, logo.png, campus.jpg
- [ ] Test all forms and downloads
- [ ] Review security headers in `.htaccess`
- [ ] Set up database backups
- [ ] Configure error logging

## Troubleshooting

### Contact Form Not Working
- Check database connection in `php/config.php`
- Verify database exists and tables are created
- Check PHP error logs
- Ensure `php/download_log.txt` is writable

### Downloads Not Working
- Verify files exist in `assets/docs/`
- Check file permissions
- Review `php/download_handler.php` allowed files list

### CSRF Token Errors
- Clear browser cookies
- Check session configuration in PHP
- Verify `php/get_csrf_token.php` is accessible
