let currentSection = 'profile';
let editingItem = null;
let editingType = null;

const API_BASE = '../api/';

async function fetchData(endpoint) {
    const response = await fetch(API_BASE + endpoint);
    return await response.json();
}

async function postData(endpoint, data) {
    const response = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function putData(endpoint, data) {
    const response = await fetch(API_BASE + endpoint, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function deleteData(endpoint, id) {
    const response = await fetch(API_BASE + endpoint + '?id=' + id, {
        method: 'DELETE'
    });
    return await response.json();
}

function showSection(section) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-sidebar-nav a').forEach(a => a.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    event.target.classList.add('active');
    currentSection = section;
    loadSectionData(section);
    
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

async function loadSectionData(section) {
    switch(section) {
        case 'profile':
            await loadProfile();
            break;
        case 'social':
            await loadSocialLinks();
            break;
        case 'skills':
            await loadSkills();
            break;
        case 'services':
            await loadServices();
            break;
        case 'education':
            await loadEducation();
            break;
        case 'work':
            await loadWorkExperience();
            break;
        case 'achievements':
            await loadAchievements();
            break;
        case 'projects':
            await loadProjects();
            break;
    }
}

async function loadProfile() {
    const profile = await fetchData('profile/get.php');
    if (profile) {
        document.getElementById('profile-logo').value = profile.logo_text || '';
        document.getElementById('profile-greeting').value = profile.greeting || '';
        document.getElementById('profile-name').value = profile.name || '';
        document.getElementById('profile-subtitle').value = profile.subtitle || '';
        document.getElementById('profile-about').value = profile.about_text || '';
        document.getElementById('profile-hero').value = profile.hero_image || '';
    }
}

async function saveProfile(e) {
    e.preventDefault();
    const data = {
        logo_text: document.getElementById('profile-logo').value,
        greeting: document.getElementById('profile-greeting').value,
        name: document.getElementById('profile-name').value,
        subtitle: document.getElementById('profile-subtitle').value,
        about_text: document.getElementById('profile-about').value,
        hero_image: document.getElementById('profile-hero').value
    };
    await putData('profile/update.php', data);
    alert('Profile saved successfully!');
}

async function loadSocialLinks() {
    const links = await fetchData('social-links/get.php');
    const tbody = document.getElementById('social-table');
    tbody.innerHTML = links.map(link => {
        const iconPath = (link.icon || '').replace(/'/g, "\\'");
        return `
        <tr>
            <td>${link.platform}</td>
            <td>${link.url}</td>
            <td>
                ${link.icon ? `<button class="btn-view" onclick="previewImage('${iconPath}')" title="View Image"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>` : '-'}
            </td>
            <td>${link.display_order}</td>
            <td>
                <button class="btn-edit" onclick="editItem('social', ${link.id})">Edit</button>
                <button class="btn-delete" onclick="deleteItem('social', ${link.id})">Delete</button>
            </td>
        </tr>
    `;
    }).join('');
}

async function loadSkills() {
    const skills = await fetchData('skills/get.php');
    const tbody = document.getElementById('skills-table');
    tbody.innerHTML = skills.map(skill => `
        <tr>
            <td>${skill.name}</td>
            <td>${skill.percentage}%</td>
            <td>${skill.display_order}</td>
            <td>
                <button class="btn-edit" onclick="editItem('skills', ${skill.id})">Edit</button>
                <button class="btn-delete" onclick="deleteItem('skills', ${skill.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function loadServices() {
    const services = await fetchData('services/get.php');
    const tbody = document.getElementById('services-table');
    tbody.innerHTML = services.map(service => {
        const iconPath = (service.icon || '').replace(/'/g, "\\'");
        return `
        <tr>
            <td>${service.title}</td>
            <td>${service.description.substring(0, 50)}...</td>
            <td>
                ${service.icon ? `<button class="btn-view" onclick="previewImage('${iconPath}')" title="View Image"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>` : '-'}
            </td>
            <td>${service.display_order}</td>
            <td>
                <button class="btn-edit" onclick="editItem('services', ${service.id})">Edit</button>
                <button class="btn-delete" onclick="deleteItem('services', ${service.id})">Delete</button>
            </td>
        </tr>
    `;
    }).join('');
}

async function loadEducation() {
    const education = await fetchData('education/get.php');
    const tbody = document.getElementById('education-table');
    tbody.innerHTML = education.map(edu => `
        <tr>
            <td>${edu.year_from}</td>
            <td>${edu.year_to}</td>
            <td>${edu.title}</td>
            <td>${edu.location}</td>
            <td>
                <button class="btn-edit" onclick="editItem('education', ${edu.id})">Edit</button>
                <button class="btn-delete" onclick="deleteItem('education', ${edu.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function loadWorkExperience() {
    const work = await fetchData('work-experience/get.php');
    const tbody = document.getElementById('work-table');
    tbody.innerHTML = work.map(w => `
        <tr>
            <td>${w.year_from}</td>
            <td>${w.year_to}</td>
            <td>${w.title}</td>
            <td>${w.company}</td>
            <td>
                <button class="btn-edit" onclick="editItem('work', ${w.id})">Edit</button>
                <button class="btn-delete" onclick="deleteItem('work', ${w.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function loadAchievements() {
    const achievements = await fetchData('achievements/get.php');
    const tbody = document.getElementById('achievements-table');
    tbody.innerHTML = achievements.map(ach => {
        const imagePath = (ach.image || '').replace(/'/g, "\\'");
        return `
        <tr>
            <td>${ach.title}</td>
            <td>${ach.year}</td>
            <td>
                ${ach.image ? `<button class="btn-view" onclick="previewImage('${imagePath}')" title="View Image"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>` : '-'}
            </td>
            <td>
                <button class="btn-edit" onclick="editItem('achievements', ${ach.id})">Edit</button>
                <button class="btn-delete" onclick="deleteItem('achievements', ${ach.id})">Delete</button>
            </td>
        </tr>
    `;
    }).join('');
}

async function loadProjects() {
    const projects = await fetchData('projects/get.php');
    const tbody = document.getElementById('projects-table');
    tbody.innerHTML = projects.map(project => {
        const imagePath = (project.image || '').replace(/'/g, "\\'");
        return `
        <tr>
            <td>${project.title}</td>
            <td>${project.category}</td>
            <td>
                ${project.image ? `<button class="btn-view" onclick="previewImage('${imagePath}')" title="View Image"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>` : '-'}
            </td>
            <td>
                <button class="btn-edit" onclick="editItem('projects', ${project.id})">Edit</button>
                <button class="btn-delete" onclick="deleteItem('projects', ${project.id})">Delete</button>
            </td>
        </tr>
    `;
    }).join('');
}

function createFormField(label, id, type = 'text', value = '', required = false, placeholder = '', isImage = false) {
    const inputTag = type === 'textarea' ? 'textarea' : 'input';
    let inputAttrs = '';
    
    if (type === 'textarea') {
        inputAttrs = `id="${id}" placeholder="${placeholder}" ${required ? 'required' : ''}`;
    } else {
        inputAttrs = `type="${type}" id="${id}" placeholder="${placeholder}" ${value !== '' && value !== null ? `value="${value}"` : ''} ${required ? 'required' : ''}`;
        if (type === 'number') {
            inputAttrs += ' min="0"';
            if (id === 'form-percentage') {
                inputAttrs += ' max="100"';
            }
        }
    }
    
    let uploadButton = '';
    if (isImage) {
        uploadButton = `
            <div style="margin-top: 5px;">
                <input type="file" id="${id}-upload" accept="image/*" style="display: none;" onchange="handleImageUpload('${id}')">
                <button type="button" class="btn-upload" onclick="document.getElementById('${id}-upload').click()">Upload Image</button>
            </div>
        `;
    }
    
    return `
        <div class="form-group">
            <label>${label}</label>
            <${inputTag} ${inputAttrs}>${type === 'textarea' ? (value || '') : ''}</${inputTag}>
            ${uploadButton}
        </div>
    `;
}

function showAddForm(type) {
    editingItem = null;
    editingType = type;
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    
    title.textContent = 'Add New ' + type.charAt(0).toUpperCase() + type.slice(1);
    
    let formHTML = '';
    switch(type) {
        case 'social':
            formHTML = createFormField('Platform', 'form-platform', 'text', '', true, 'Platform name') +
                       createFormField('URL', 'form-url', 'text', '', true, 'https://...') +
                       createFormField('Icon Path', 'form-icon', 'text', '', true, 'img/social_icons/icon.svg') +
                       createFormField('Display Order', 'form-order', 'number', '0', false, '0');
            break;
        case 'skills':
            formHTML = createFormField('Skill Name', 'form-name', 'text', '', true, 'Skill Name') +
                       createFormField('Percentage', 'form-percentage', 'number', '', true, '0-100') +
                       createFormField('Display Order', 'form-order', 'number', '0', false, '0');
            break;
        case 'services':
            formHTML = createFormField('Title', 'form-title', 'text', '', true, 'Service Title') +
                       createFormField('Description', 'form-description', 'textarea', '', true, 'Service Description') +
                       createFormField('Icon Path', 'form-icon', 'text', '', true, 'img/services/icon.svg', true) +
                       createFormField('Display Order', 'form-order', 'number', '0', false, '0');
            break;
        case 'education':
            formHTML = createFormField('Year From', 'form-year-from', 'text', '', true, '2020') +
                       createFormField('Year To', 'form-year-to', 'text', '', true, '2024') +
                       createFormField('Title', 'form-title', 'text', '', true, 'University Name') +
                       createFormField('Location', 'form-location', 'text', '', true, 'City, Country') +
                       createFormField('Description', 'form-description', 'textarea', '', false, 'Description') +
                       createFormField('Display Order', 'form-order', 'number', '0', false, '0');
            break;
        case 'work':
            formHTML = createFormField('Year From', 'form-year-from', 'text', '', true, '2020') +
                       createFormField('Year To', 'form-year-to', 'text', '', true, '2024 or Present') +
                       createFormField('Title', 'form-title', 'text', '', true, 'Job Title') +
                       createFormField('Company', 'form-company', 'text', '', true, 'Company Name') +
                       createFormField('Location', 'form-location', 'text', '', true, 'City, Country') +
                       createFormField('Description', 'form-description', 'textarea', '', false, 'Job Description') +
                       createFormField('Display Order', 'form-order', 'number', '0', false, '0');
            break;
        case 'achievements':
            formHTML = createFormField('Title', 'form-title', 'text', '', true, 'Achievement Title') +
                       createFormField('Year', 'form-year', 'text', '', true, '2023') +
                       createFormField('Image Path', 'form-image', 'text', '', true, 'img/achievements/image.jpg', true) +
                       createFormField('Description', 'form-description', 'textarea', '', false, 'Description') +
                       createFormField('Display Order', 'form-order', 'number', '0', false, '0');
            break;
        case 'projects':
            formHTML = createFormField('Title', 'form-title', 'text', '', true, 'Project Title') +
                       createFormField('Category', 'form-category', 'text', '', true, 'UI/UX Design') +
                       createFormField('Image Path', 'form-image', 'text', '', true, 'img/works/image.jpg', true) +
                       createFormField('URL', 'form-url', 'text', '', false, 'Project URL') +
                       createFormField('Display Order', 'form-order', 'number', '0', false, '0');
            break;
    }
    
    content.innerHTML = formHTML;
    document.getElementById('modal-overlay').classList.add('active');
}

function getEndpointPath(type, action) {
    const typeMap = {
        'social': 'social-links',
        'skills': 'skills',
        'services': 'services',
        'education': 'education',
        'work': 'work-experience',
        'achievements': 'achievements',
        'projects': 'projects'
    };
    const path = typeMap[type] || type;
    return action === 'get' ? `${path}/get.php` : `${path}/crud.php`;
}

async function editItem(type, id) {
    editingItem = id;
    editingType = type;
    const endpoint = getEndpointPath(type, 'get');
    const items = await fetchData(endpoint);
    const item = items.find(i => i.id == id);
    
    if (!item) return;
    
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    
    title.textContent = 'Edit ' + type.charAt(0).toUpperCase() + type.slice(1);
    
    let formHTML = `<input type="hidden" id="form-id" value="${item.id}">`;
    switch(type) {
        case 'social':
            formHTML += createFormField('Platform', 'form-platform', 'text', item.platform, true, 'Platform name') +
                       createFormField('URL', 'form-url', 'text', item.url, true, 'https://...') +
                       createFormField('Icon Path', 'form-icon', 'text', item.icon, true, 'img/social_icons/icon.svg') +
                       createFormField('Display Order', 'form-order', 'number', item.display_order, false, '0');
            break;
        case 'skills':
            formHTML += createFormField('Skill Name', 'form-name', 'text', item.name, true, 'Skill Name') +
                       createFormField('Percentage', 'form-percentage', 'number', item.percentage, true, '0-100') +
                       createFormField('Display Order', 'form-order', 'number', item.display_order, false, '0');
            break;
        case 'services':
            formHTML += createFormField('Title', 'form-title', 'text', item.title, true, 'Service Title') +
                       createFormField('Description', 'form-description', 'textarea', item.description, true, 'Service Description') +
                       createFormField('Icon Path', 'form-icon', 'text', item.icon, true, 'img/services/icon.svg', true) +
                       createFormField('Display Order', 'form-order', 'number', item.display_order, false, '0');
            break;
        case 'education':
            formHTML += createFormField('Year From', 'form-year-from', 'text', item.year_from, true, '2020') +
                       createFormField('Year To', 'form-year-to', 'text', item.year_to, true, '2024') +
                       createFormField('Title', 'form-title', 'text', item.title, true, 'University Name') +
                       createFormField('Location', 'form-location', 'text', item.location, true, 'City, Country') +
                       createFormField('Description', 'form-description', 'textarea', item.description || '', false, 'Description') +
                       createFormField('Display Order', 'form-order', 'number', item.display_order, false, '0');
            break;
        case 'work':
            formHTML += createFormField('Year From', 'form-year-from', 'text', item.year_from, true, '2020') +
                       createFormField('Year To', 'form-year-to', 'text', item.year_to, true, '2024 or Present') +
                       createFormField('Title', 'form-title', 'text', item.title, true, 'Job Title') +
                       createFormField('Company', 'form-company', 'text', item.company, true, 'Company Name') +
                       createFormField('Location', 'form-location', 'text', item.location, true, 'City, Country') +
                       createFormField('Description', 'form-description', 'textarea', item.description || '', false, 'Job Description') +
                       createFormField('Display Order', 'form-order', 'number', item.display_order, false, '0');
            break;
        case 'achievements':
            formHTML += createFormField('Title', 'form-title', 'text', item.title, true, 'Achievement Title') +
                       createFormField('Year', 'form-year', 'text', item.year, true, '2023') +
                       createFormField('Image Path', 'form-image', 'text', item.image || '', true, 'img/achievements/image.jpg', true) +
                       createFormField('Description', 'form-description', 'textarea', item.description || '', false, 'Description') +
                       createFormField('Display Order', 'form-order', 'number', item.display_order, false, '0');
            break;
        case 'projects':
            formHTML += createFormField('Title', 'form-title', 'text', item.title, true, 'Project Title') +
                       createFormField('Category', 'form-category', 'text', item.category, true, 'UI/UX Design') +
                       createFormField('Image Path', 'form-image', 'text', item.image, true, 'img/works/image.jpg', true) +
                       createFormField('URL', 'form-url', 'text', item.url || '', false, 'Project URL') +
                       createFormField('Display Order', 'form-order', 'number', item.display_order, false, '0');
            break;
    }
    
    content.innerHTML = formHTML;
    document.getElementById('modal-overlay').classList.add('active');
}

async function saveItem(e) {
    e.preventDefault();
    if (!editingType) return;
    
    const formData = {};
    const formId = document.getElementById('form-id');
    if (formId) formData.id = parseInt(formId.value);
    
    switch(editingType) {
        case 'social':
            formData.platform = document.getElementById('form-platform').value;
            formData.url = document.getElementById('form-url').value;
            formData.icon = document.getElementById('form-icon').value;
            formData.display_order = parseInt(document.getElementById('form-order').value) || 0;
            break;
        case 'skills':
            formData.name = document.getElementById('form-name').value;
            formData.percentage = parseInt(document.getElementById('form-percentage').value);
            formData.display_order = parseInt(document.getElementById('form-order').value) || 0;
            break;
        case 'services':
            formData.title = document.getElementById('form-title').value;
            formData.description = document.getElementById('form-description').value;
            formData.icon = document.getElementById('form-icon').value;
            formData.display_order = parseInt(document.getElementById('form-order').value) || 0;
            break;
        case 'education':
            formData.year_from = document.getElementById('form-year-from').value;
            formData.year_to = document.getElementById('form-year-to').value;
            formData.title = document.getElementById('form-title').value;
            formData.location = document.getElementById('form-location').value;
            formData.description = document.getElementById('form-description').value;
            formData.display_order = parseInt(document.getElementById('form-order').value) || 0;
            break;
        case 'work':
            formData.year_from = document.getElementById('form-year-from').value;
            formData.year_to = document.getElementById('form-year-to').value;
            formData.title = document.getElementById('form-title').value;
            formData.company = document.getElementById('form-company').value;
            formData.location = document.getElementById('form-location').value;
            formData.description = document.getElementById('form-description').value;
            formData.display_order = parseInt(document.getElementById('form-order').value) || 0;
            break;
        case 'achievements':
            formData.title = document.getElementById('form-title').value;
            formData.year = document.getElementById('form-year').value;
            formData.image = document.getElementById('form-image').value;
            formData.description = document.getElementById('form-description').value;
            formData.display_order = parseInt(document.getElementById('form-order').value) || 0;
            break;
        case 'projects':
            formData.title = document.getElementById('form-title').value;
            formData.category = document.getElementById('form-category').value;
            formData.image = document.getElementById('form-image').value;
            formData.url = document.getElementById('form-url').value;
            formData.display_order = parseInt(document.getElementById('form-order').value) || 0;
            break;
    }
    
    const endpoint = getEndpointPath(editingType, 'crud');
    if (formData.id) {
        await putData(endpoint, formData);
    } else {
        await postData(endpoint, formData);
    }
    
    closeModal();
    loadSectionData(editingType);
    alert('Saved successfully!');
}

async function deleteItem(type, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const endpoint = getEndpointPath(type, 'crud');
    await deleteData(endpoint, id);
    loadSectionData(type);
    alert('Deleted successfully!');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    editingItem = null;
    editingType = null;
    document.getElementById('modal-form').reset();
}

async function logout() {
    await fetch(API_BASE + 'auth/logout.php');
    window.location.href = 'login.php';
}

function toggleSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-hidden');
        overlay.classList.toggle('active');
    }
}

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-hidden');
        overlay.classList.remove('active');
    } else {
        sidebar.classList.add('mobile-hidden');
        overlay.classList.remove('active');
    }
});

async function handleImageUpload(inputId) {
    const fileInput = document.getElementById(inputId + '-upload');
    const pathInput = document.getElementById(inputId);
    
    if (!fileInput.files || !fileInput.files[0]) return;
    
    let uploadType = 'general';
    if (inputId === 'profile-hero') {
        uploadType = 'hero';
    } else if (inputId === 'form-icon') {
        if (editingType === 'services') {
            uploadType = 'service';
        } else if (editingType === 'social') {
            uploadType = 'social';
        }
    } else if (inputId === 'form-image') {
        if (editingType === 'achievements') {
            uploadType = 'achievement';
        } else if (editingType === 'projects') {
            uploadType = 'project';
        }
    }
    
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('type', uploadType);
    
    try {
        const response = await fetch(API_BASE + 'upload/image.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            pathInput.value = result.path;
            alert('Image uploaded successfully!');
        } else {
            alert('Upload failed: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        alert('Upload failed: ' + error.message);
    }
}

function previewImage(imagePath) {
    if (!imagePath) return;
    
    const modal = document.getElementById('image-preview-modal');
    const img = document.getElementById('image-preview-img');
    
    img.src = '../' + imagePath;
    modal.classList.add('active');
}

function closeImagePreview() {
    const modal = document.getElementById('image-preview-modal');
    modal.classList.remove('active');
}

window.onload = function() {
    loadProfile();
    
    const sidebar = document.getElementById('admin-sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile-hidden');
    } else {
        sidebar.classList.remove('mobile-hidden');
    }
};

