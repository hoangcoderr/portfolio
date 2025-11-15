<?php
require_once '../config/auth.php';

if (!isLoggedIn()) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-wrapper">
        <div class="mobile-overlay" id="mobile-overlay" onclick="toggleSidebar()"></div>
        <aside class="admin-sidebar" id="admin-sidebar">
            <div class="admin-sidebar-header">
                <h1>Admin Panel</h1>
                <p style="font-size: 12px; opacity: 0.8;">Portfolio Management</p>
            </div>
            <ul class="admin-sidebar-nav">
                <li><a href="#" onclick="showSection('profile'); return false;" class="active">Profile</a></li>
                <li><a href="#" onclick="showSection('social'); return false;">Social Links</a></li>
                <li><a href="#" onclick="showSection('skills'); return false;">Skills</a></li>
                <li><a href="#" onclick="showSection('services'); return false;">Services</a></li>
                <li><a href="#" onclick="showSection('education'); return false;">Education</a></li>
                <li><a href="#" onclick="showSection('work'); return false;">Work Experience</a></li>
                <li><a href="#" onclick="showSection('achievements'); return false;">Achievements</a></li>
                <li><a href="#" onclick="showSection('projects'); return false;">Projects</a></li>
            </ul>
        </aside>
        
        <main class="admin-content">
            <div id="profile" class="admin-section active">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Profile Settings</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <div class="admin-table-wrapper">
                    <form id="profile-form" onsubmit="saveProfile(event)">
                        <div style="padding: 30px;">
                            <div class="form-group">
                                <label>Logo Text</label>
                                <input type="text" id="profile-logo" placeholder="Logo Text" required>
                            </div>
                            <div class="form-group">
                                <label>Greeting</label>
                                <input type="text" id="profile-greeting" placeholder="Greeting" required>
                            </div>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" id="profile-name" placeholder="Name" required>
                            </div>
                            <div class="form-group">
                                <label>Subtitle</label>
                                <input type="text" id="profile-subtitle" placeholder="Subtitle" required>
                            </div>
                            <div class="form-group">
                                <label>About Text</label>
                                <textarea id="profile-about" placeholder="About Text" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Hero Image</label>
                                <input type="text" id="profile-hero" placeholder="Hero Image Path">
                                <div style="margin-top: 5px;">
                                    <input type="file" id="profile-hero-upload" accept="image/*" style="display: none;" onchange="handleImageUpload('profile-hero')">
                                    <button type="button" class="btn-upload" onclick="document.getElementById('profile-hero-upload').click()">Upload Image</button>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn-save">Save Profile</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div id="social" class="admin-section">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Social Links</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <button class="btn-add" onclick="showAddForm('social')">+ Add New Social Link</button>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Platform</th>
                                <th>URL</th>
                                <th>Icon</th>
                                <th>Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="social-table"></tbody>
                    </table>
                </div>
            </div>

            <div id="skills" class="admin-section">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Skills</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <button class="btn-add" onclick="showAddForm('skills')">+ Add New Skill</button>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Percentage</th>
                                <th>Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="skills-table"></tbody>
                    </table>
                </div>
            </div>

            <div id="services" class="admin-section">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Services</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <button class="btn-add" onclick="showAddForm('services')">+ Add New Service</button>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Icon</th>
                                <th>Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="services-table"></tbody>
                    </table>
                </div>
            </div>

            <div id="education" class="admin-section">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Education</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <button class="btn-add" onclick="showAddForm('education')">+ Add New Education</button>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Year From</th>
                                <th>Year To</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="education-table"></tbody>
                    </table>
                </div>
            </div>

            <div id="work" class="admin-section">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Work Experience</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <button class="btn-add" onclick="showAddForm('work')">+ Add New Work Experience</button>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Year From</th>
                                <th>Year To</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="work-table"></tbody>
                    </table>
                </div>
            </div>

            <div id="achievements" class="admin-section">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Achievements</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <button class="btn-add" onclick="showAddForm('achievements')">+ Add New Achievement</button>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Year</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="achievements-table"></tbody>
                    </table>
                </div>
            </div>

            <div id="projects" class="admin-section">
                <div class="admin-content-header">
                    <div style="display: flex; align-items: center;">
                        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
                        <h2>Projects</h2>
                    </div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
                <button class="btn-add" onclick="showAddForm('projects')">+ Add New Project</button>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="projects-table"></tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <div id="modal-overlay" class="modal-overlay" onclick="if(event.target === this) closeModal()">
        <div class="modal" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3 id="modal-title"></h3>
                <button class="btn-close" onclick="closeModal()">&times;</button>
            </div>
            <form id="modal-form" onsubmit="saveItem(event)">
                <div id="modal-content"></div>
                <div class="form-actions">
                    <button type="submit" class="btn-save">Save</button>
                    <button type="button" class="btn-cancel" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <div id="image-preview-modal" class="image-preview-modal" onclick="if(event.target === this) closeImagePreview()">
        <div class="image-preview-content" onclick="event.stopPropagation()">
            <button class="btn-close" onclick="closeImagePreview()">&times;</button>
            <img id="image-preview-img" src="" alt="Preview">
        </div>
    </div>

    <script src="../js/admin.js"></script>
</body>
</html>
