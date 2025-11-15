CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logo_text VARCHAR(50) DEFAULT 'J.Sample',
    greeting VARCHAR(100) DEFAULT 'Hello, I am',
    name VARCHAR(100) DEFAULT 'John Sample',
    subtitle VARCHAR(200) DEFAULT 'UI/UX Designer & Software Developer',
    hero_image VARCHAR(255) DEFAULT 'img/hero/hero.png',
    about_text TEXT,
    cv_file VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    percentage INT NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year_from VARCHAR(20) NOT NULL,
    year_to VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS work_experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year_from VARCHAR(20) NOT NULL,
    year_to VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    year VARCHAR(20) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    image VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES ('admin', '$2y$10$YCAilqNBqCgChi.ivU3hU.MvNwhnEsyk6vqO2aSkjLMEdhP8EIHGS');

INSERT INTO profile (logo_text, greeting, name, subtitle, about_text) VALUES 
('J.Sample', 'Hello, I am', 'John Sample', 'UI/UX Designer & Software Developer', 
'Hi, I''m John Sample, a passionate designer and developer specializing in web development, graphic design and photography. With over 10 years of experience, I love transforming ideas into impactful creations that connect and inspire. Outside of work, I enjoy exploring new places, learning new skills and capturing life''s moments. Let''s collaborate and bring your vision to life!');

INSERT INTO social_links (platform, url, icon, display_order) VALUES
('github', '#!', 'img/social_icons/github.svg', 1),
('linkedin', '#!', 'img/social_icons/linkedin.svg', 2),
('xing', '#!', 'img/social_icons/xing.svg', 3),
('facebook', '#!', 'img/social_icons/facebook.svg', 4),
('instagram', '#!', 'img/social_icons/instagram.svg', 5);

INSERT INTO skills (name, percentage, display_order) VALUES
('Web Design', 95, 1),
('HTML/CSS', 90, 2),
('JavaScript', 65, 3),
('Photoshop', 80, 4);

INSERT INTO services (title, description, icon, display_order) VALUES
('UI/UX Design', 'Crafting intuitive and visually appealing user interfaces that enhance experiences through thoughtful, creative designs.', 'img/services/01.svg', 1),
('Frontend Development', 'Developing responsive, accessible, and dynamic websites using modern tools to create seamless, engaging experiences.', 'img/services/02.svg', 2),
('Content Writing', 'Creating compelling and audience-focused content that effectively communicates ideas and delivers meaningful value.', 'img/services/03.svg', 3);

INSERT INTO education (year_from, year_to, title, location, description, display_order) VALUES
('2020', '2024', 'University of Technology', 'Hanoi, Vietnam', 'Bachelor''s degree in Computer Science. Focused on web development and user interface design.', 1),
('2017', '2020', 'High School', 'Hanoi, Vietnam', 'Graduated with honors. Participated in extracurricular activities related to information technology.', 2);

INSERT INTO work_experience (year_from, year_to, title, company, location, description, display_order) VALUES
('2023', 'Present', 'Frontend Developer', 'ABC Company', 'Hanoi', 'Developing and maintaining modern web applications. Working with React, Vue.js and other frontend technologies.', 1),
('2021', '2023', 'UI/UX Designer', 'XYZ Company', 'Hanoi', 'Designing user interfaces for web and mobile applications. Creating wireframes, prototypes and design systems.', 2),
('2020', '2021', 'Web Developer Intern', 'Tech Startup', 'Hanoi', 'Web development internship. Learning and applying new technologies in a real work environment.', 3);

INSERT INTO achievements (title, year, description, image, display_order) VALUES
('Hackathon First Place', '2023', 'Won first place in a Hackathon competition for web application development with a personal finance management project.', 'img/achievements/trophy.jpg', 1),
('Google UX Design Certificate', '2022', 'Completed Google''s UX Design certificate program on Coursera with excellent scores.', 'img/achievements/certificate.jpg', 2),
('Employee of the Quarter', '2023', 'Recognized as the outstanding employee of the quarter with significant contributions to important projects.', 'img/achievements/award.jpg', 3),
('Graduated with Honors', '2024', 'Graduated from university with a 3.8/4.0 GPA and a thesis rated as excellent.', 'img/achievements/graduation.jpg', 4);

INSERT INTO projects (title, category, image, url, display_order) VALUES
('Finance Dashboard', 'UI/UX Design', 'img/works/01.jpg', '#!', 1),
('Product design', 'UI/UX Design', 'img/works/02.jpg', '#!', 2),
('Landing Page', 'UI/UX Design, Web Development', 'img/works/03.jpg', '#!', 3),
('Portfolio', 'Web Development', 'img/works/04.jpg', '#!', 4),
('Cosmic Sea', 'UI/UX Design, Web Development', 'img/works/05.jpg', '#!', 5),
('eCommerce', 'Web Development', 'img/works/06.jpg', '#!', 6);

