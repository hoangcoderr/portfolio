# Simple Developer Portfolio Template

![Project Preview](portfolio_preview.jpg)

## Description

This is a simple, elegant responsive portfolio template built using plain JavaScript, HTML, CSS, and PHP with MySQL database. It features a complete admin panel for content management, allowing you to easily update your portfolio information without editing code.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [License](#license)

## Features

- Responsive Design
- Single-page layout
- MySQL Database Integration
- Admin Panel for content management
- Image Upload functionality
- Dark Mode Toggle
- PHP Mailer Integration
- RESTful API Architecture

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- PHP extensions: PDO, PDO_MySQL

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/hhlitval/simple-portfolio-template.git
cd simple-portfolio-template
```

### Step 2: Database Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Import the database schema:
   ```bash
   mysql -u root -p portfolio_db < database.sql
   ```
   
   Or using phpMyAdmin:
   - Open phpMyAdmin
   - Select the `portfolio_db` database
   - Go to Import tab
   - Choose `database.sql` file and click Go

### Step 3: Configure Database Connection

Edit `config/database.php` and update the database credentials:

```php
private $host = 'localhost';
private $db_name = 'portfolio_db';
private $username = 'root';        // Your MySQL username
private $password = '';             // Your MySQL password
```

### Step 4: Configure Email (Optional)

Edit `mail.php` and update with your SMTP credentials:

```php
$mail->Host       = 'smtp.example.com';
$mail->Username   = 'user@example.com';
$mail->Password   = 'secret';
$mail->Port       = 465;
$mail->setFrom('from@example.com', $title);
$mail->addAddress('youraddress@mail.me');
```

### Step 5: Set Permissions

Make sure the `uploads/` and `img/` directories are writable:

```bash
chmod -R 755 uploads/
chmod -R 755 img/
```

### Step 6: Access the Application

1. **Frontend**: Open `http://localhost/simple-portfolio-template/` in your browser
2. **Admin Panel**: Navigate to `http://localhost/simple-portfolio-template/admin/`

**Default Login Credentials:**
- Username: `admin`
- Password: `admin123` (Please change this after first login)

## Configuration

### Changing Admin Password

1. Generate a new password hash:
   ```php
   <?php
   echo password_hash('your_new_password', PASSWORD_DEFAULT);
   ?>
   ```

2. Update the password in `database.sql` or directly in MySQL:
   ```sql
   UPDATE users SET password = 'your_hashed_password' WHERE username = 'admin';
   ```

### Database Structure

The application uses the following main tables:
- `users` - Admin user accounts
- `profile` - Portfolio profile information
- `social_links` - Social media links
- `skills` - Skills with percentages
- `services` - Services offered
- `education` - Education history
- `work_experience` - Work experience
- `achievements` - Achievements and awards
- `projects` - Portfolio projects

## Usage

### Admin Panel

1. Login at `/admin/` with your credentials
2. Navigate through different sections using the sidebar
3. Add, edit, or delete content items
4. Upload images directly through the admin interface
5. Preview images by clicking the eye icon in tables

### Image Upload

- Images are automatically organized into folders:
  - Hero images → `img/hero/`
  - Service icons → `img/services/`
  - Achievement images → `img/achievements/`
  - Project images → `img/works/`
  - Social icons → `img/social_icons/`

### Frontend Customization

- Edit `index.html` for HTML structure
- Modify `css/main.css` for styling
- Update `js/main.js` for frontend functionality

## Admin Panel

The admin panel provides a user-friendly interface to manage all portfolio content:

- **Profile**: Update personal information, hero image, and about text
- **Social Links**: Manage social media links and icons
- **Skills**: Add/edit skills with percentage values
- **Services**: Manage services offered
- **Education**: Add education history
- **Work Experience**: Manage work experience entries
- **Achievements**: Add achievements with images
- **Projects**: Manage portfolio projects

All changes are saved to the MySQL database and reflected immediately on the frontend.

## Security Notes

- Change the default admin password immediately
- Keep database credentials secure
- Use prepared statements (already implemented) to prevent SQL injection
- Ensure proper file permissions on upload directories
- Consider using HTTPS in production

## License

This project is licensed under the MIT License.
