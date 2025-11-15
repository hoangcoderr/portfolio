const API_BASE = 'api/';

async function fetchData(endpoint) {
    try {
        const response = await fetch(API_BASE + endpoint);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function loadProfile() {
    const profile = await fetchData('profile/get.php');
    if (profile) {
        const logo = document.querySelector('.logo');
        if (logo) logo.textContent = profile.logo_text || 'J.Sample';
        
        const greeting = document.querySelector('.hero-greeting');
        if (greeting) greeting.textContent = profile.greeting || 'Hello, I am';
        
        const name = document.querySelector('.hero-heading');
        if (name) name.textContent = profile.name || 'John Sample';
        
        const subtitle = document.querySelector('.hero-heading-subtitle');
        if (subtitle) subtitle.textContent = profile.subtitle || 'UI/UX Designer & Software Developer';
        
        const heroImg = document.querySelector('.hero-img img');
        if (heroImg && profile.hero_image) heroImg.src = profile.hero_image;
        
        const aboutText = document.querySelector('.about-descr');
        if (aboutText && profile.about_text) {
            aboutText.innerHTML = profile.about_text.replace(/\n/g, '<br>');
        }
    }
}

async function loadSocialLinks() {
    const links = await fetchData('social-links/get.php');
    if (links && links.length > 0) {
        const socialContainers = document.querySelectorAll('.social-links-row');
        socialContainers.forEach(container => {
            container.innerHTML = links.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                    <img src="${link.icon}" alt="Link to ${link.platform} profile" />
                </a>
            `).join('');
        });
    }
}

async function loadSkills() {
    const skills = await fetchData('skills/get.php');
    if (skills && skills.length > 0) {
        const skillsContainer = document.querySelector('.about-skills');
        if (skillsContainer) {
            skillsContainer.innerHTML = skills.map(skill => `
                <div class="skill">
                    <div class="skill-title">${skill.name}</div>
                    <div class="skill-percent">${skill.percentage}%</div>
                    <div class="skill-bar__progress">
                        <div class="skill-bar__fill" data-progress="${skill.percentage}"></div>
                    </div>
                </div>
            `).join('');
            
            setTimeout(() => {
                const skillBars = document.querySelectorAll(".skill");
                skillBars.forEach((skillBar) => {
                    const fill = skillBar.querySelector(".skill-bar__fill");
                    const percentage = skillBar.querySelector(".skill-percent");
                    const progress = parseInt(fill.getAttribute("data-progress"), 10);
                    fill.style.width = `${progress}%`;
                    
                    let counter = 0;
                    const interval = setInterval(() => {
                        if (counter <= progress) {
                            percentage.textContent = `${counter}%`;
                            counter++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 1500 / progress);
                });
            }, 100);
        }
    }
}

async function loadServices() {
    const services = await fetchData('services/get.php');
    if (services && services.length > 0) {
        const servicesContainer = document.querySelector('.services-row');
        if (servicesContainer) {
            servicesContainer.innerHTML = services.map((service, index) => `
                <div class="service-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${(index + 1) * 150}">
                    <img class="service-card-img" src="${service.icon}" alt="" />
                    <h3 class="service-card-title">${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `).join('');
        }
    }
}

async function loadEducation() {
    const education = await fetchData('education/get.php');
    if (education && education.length > 0) {
        const educationColumn = document.querySelector('.timeline-column:first-of-type .timeline-items');
        if (educationColumn) {
            educationColumn.innerHTML = education.map(edu => `
                <div class="timeline-item">
                    <div class="timeline-item-year">${edu.year_from} - ${edu.year_to}</div>
                    <div class="timeline-item-content">
                        <h4 class="timeline-item-title">${edu.title}</h4>
                        <p class="timeline-item-location">${edu.location}</p>
                        <p class="timeline-item-description">${edu.description || ''}</p>
                    </div>
                </div>
            `).join('');
        }
    }
}

async function loadWorkExperience() {
    const work = await fetchData('work-experience/get.php');
    if (work && work.length > 0) {
        const workColumn = document.querySelector('.timeline-column:last-of-type .timeline-items');
        if (workColumn) {
            workColumn.innerHTML = work.map(w => `
                <div class="timeline-item">
                    <div class="timeline-item-year">${w.year_from} - ${w.year_to}</div>
                    <div class="timeline-item-content">
                        <h4 class="timeline-item-title">${w.title}</h4>
                        <p class="timeline-item-location">${w.company}, ${w.location}</p>
                        <p class="timeline-item-description">${w.description || ''}</p>
                    </div>
                </div>
            `).join('');
        }
    }
}

async function loadAchievements() {
    const achievements = await fetchData('achievements/get.php');
    if (achievements && achievements.length > 0) {
        const achievementsContainer = document.querySelector('.achievements-row');
        if (achievementsContainer) {
            achievementsContainer.innerHTML = achievements.map((ach, index) => `
                <div class="achievement-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${(index + 1) * 150}">
                    <div class="achievement-icon">
                        <img src="${ach.image}" alt="${ach.title}" />
                    </div>
                    <h3 class="achievement-title">${ach.title}</h3>
                    <p class="achievement-year">${ach.year}</p>
                    <p class="achievement-description">${ach.description || ''}</p>
                </div>
            `).join('');
        }
    }
}

async function loadProjects() {
    const projects = await fetchData('projects/get.php');
    if (projects && projects.length > 0) {
        const projectsContainer = document.querySelector('.projects-row');
        if (projectsContainer) {
            projectsContainer.innerHTML = projects.map((project, index) => `
                <div class="project-box" data-aos="fade-zoom-in" data-aos-easing="ease-in-out" data-aos-delay="${index * 300}" data-aos-duration="1000">
                    <a href="${project.url || '#!'}">
                        <img class="project-img" src="${project.image}" alt="${project.title}" />
                        <div class="project-mask">
                            <div class="project-caption">
                                <h5 class="white">${project.title}</h5>
                                <p class="white">${project.category}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `).join('');
        }
    }
}

async function loadAllData() {
    await Promise.all([
        loadProfile(),
        loadSocialLinks(),
        loadSkills(),
        loadServices(),
        loadEducation(),
        loadWorkExperience(),
        loadAchievements(),
        loadProjects()
    ]);
}

document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
});

