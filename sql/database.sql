-- SGJ Institute Database Schema
-- Create database and tables for the college website

-- Create database
CREATE DATABASE IF NOT EXISTS sgj_college 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE sgj_college;

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    course VARCHAR(50) NOT NULL,
    message TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'contacted', 'followup', 'closed') DEFAULT 'new',
    assigned_to VARCHAR(100),
    notes TEXT,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_course (course),
    INDEX idx_created (created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create users table for admin panel
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'viewer') DEFAULT 'staff',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(15),
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(10) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    course_type ENUM('undergraduate', 'postgraduate', 'diploma', 'certificate') DEFAULT 'undergraduate',
    duration_years INT DEFAULT 3,
    intake_capacity INT DEFAULT 60,
    eligibility TEXT,
    description TEXT,
    fees DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_course_code (course_code),
    INDEX idx_course_type (course_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create news/events table
CREATE TABLE IF NOT EXISTS news_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image VARCHAR(255),
    event_date DATE,
    event_time TIME,
    location VARCHAR(200),
    type ENUM('news', 'event', 'announcement') DEFAULT 'news',
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_type (type),
    INDEX idx_published (is_published),
    INDEX idx_event_date (event_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO courses (course_code, course_name, course_type, duration_years, intake_capacity, eligibility, description, fees) VALUES
('BCA', 'Bachelor of Computer Applications', 'undergraduate', 3, 60, '12th pass with Mathematics/Statistics/Computer Science', 'Comprehensive computer applications program covering programming, databases, and software development.', 45000.00),
('BBA', 'Bachelor of Business Administration', 'undergraduate', 3, 60, '12th pass in any stream', 'Business administration program focusing on management, marketing, and entrepreneurship.', 40000.00),
('BA', 'Bachelor of Arts', 'undergraduate', 3, 60, '12th pass in any stream', 'Liberal arts program covering humanities, social sciences, and communication skills.', 25000.00);

-- Create admin user (password should be hashed in production)
INSERT INTO users (username, email, password_hash, role, first_name, last_name) VALUES
('admin', 'admin@sgjcollege.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Admin', 'User');

-- Create indexes for better performance
CREATE INDEX idx_enquiries_composite ON enquiries (course, status, created_at);
CREATE INDEX idx_news_events_composite ON news_events (type, is_published, event_date);

-- Add some sample news/events
INSERT INTO news_events (title, slug, content, excerpt, type, is_published, published_at) VALUES
('Admission Open for 2024-25 Session', 'admission-open-2024-25', 'Applications are now open for the 2024-25 academic session. Apply now for BCA, BBA, and BA programs.', 'Admissions open for new academic session 2024-25', 'announcement', TRUE, NOW()),
('SSIP Innovation Workshop', 'ssip-innovation-workshop', 'Join our SSIP innovation workshop on emerging technologies and entrepreneurship.', 'Learn about innovation and startup development', 'event', TRUE, DATE_ADD(NOW(), INTERVAL 14 DAY));

COMMIT;