/* ==========================================================================
   UMOJA FOUNDATION - MULTI-PAGE STICKY NAVIGATION & INTERACTIVE ENGINE (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initImpactMap();
    initDonationForm();
    initTeamBios();
    initLoginForm();
    initSignupForm();
    initSafeSchoolsSearch();
});

/* --- 1. ACTIVE LINK HIGHLIGHTER --- */
function initNavigation() {
    const currentUrl = window.location.href;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Highlight active link matching current filename
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else if (currentUrl.endsWith('/') && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
}

/* --- 2. HOME IMPACT MAP ZONE HIGHLIGHTER --- */
function initImpactMap() {
    const regionItems = document.querySelectorAll('.region-item');
    const mapDisplay = document.getElementById('map-display-card');
    
    if (!regionItems.length || !mapDisplay) return;

    // Data corresponding to different regions in East Africa
    const regionData = {
        kibera: {
            title: "Kibera, Nairobi - Urban Wash Initiative",
            impact: "Established 14 high-throughput sanitation centers and provided direct emergency water treatment supplies to 22 separate primary schools.",
            metric: "Over 8,200 Children Reached"
        },
        turkana: {
            title: "Turkana County - Deep Well Projects",
            impact: "Completed drilling of 4 deep-aquifer solar-powered boreholes, bringing reliable clean water access to arid schools and surrounding pastoralist communities.",
            metric: "Clean Water for 4,500 Students"
        },
        mukuru: {
            title: "Mukuru, Nairobi - School Sanitation Grid",
            impact: "Constructed comprehensive climate-resilient water networks and modern handwashing systems to prevent waterborne outbreak risks.",
            metric: "Water Access Restored for 12 Schools"
        }
    };

    regionItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active classes
            regionItems.forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Extract the selected region key
            const regionKey = item.dataset.region;
            const data = regionData[regionKey];
            
            if (data) {
                // Animate change with fade
                mapDisplay.style.opacity = '0';
                setTimeout(() => {
                    mapDisplay.innerHTML = `
                        <div style="display: inline-block; background-color: rgba(165,90,63,0.1); color: var(--color-terracotta); font-weight: 700; font-size: 0.75rem; padding: 4px 12px; border-radius: 99px; margin-bottom: 16px;">
                            ${data.metric}
                        </div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 16px;">${data.title}</h3>
                        <p style="color: var(--color-text-muted); line-height: 1.6;">${data.impact}</p>
                    `;
                    mapDisplay.style.opacity = '1';
                }, 150);
            }
        });
    });
}

/* --- 3. DYNAMIC DONATION PILLS & DURATION SELECTOR --- */
function initDonationForm() {
    const pills = document.querySelectorAll('.amount-pill');
    const otherInput = document.getElementById('other-amount');
    const impactText = document.getElementById('dynamic-impact-desc');
    const donationForm = document.getElementById('donation-interactive-form');
    
    if (!pills.length || !impactText) return;

    // Define mock impact metrics for selected amounts
    const amountImpacts = {
        "25": "Your $25 contribution equips one student with permanent clean hygiene supplies and drinking cups for an entire academic calendar year.",
        "50": "Your $50 contribution finances complete chemical chlorine treatment supplies to provide clean drinking water for a school of 150 kids for a month.",
        "100": "Your $100 contribution finances the full installation of durable, high-throughput handwashing fixtures inside a primary school classroom.",
        "250": "Your $250 contribution fund sponsors the physical construction of a modern water collection tank and filtration unit to gather rainy climate runoff.",
        "500": "Your $500 contribution completely finances a professional sanitation audit and emergency pipeline repair for a vulnerable remote school."
    };

    function updateImpactDescription(amountValue) {
        const val = parseInt(amountValue);
        if (isNaN(val) || val <= 0) {
            impactText.innerText = "Please specify or select a contribution amount to view the direct real-world humanitarian impact of your donation.";
            return;
        }

        // Determine matching category
        if (val < 40) {
            impactText.innerText = amountImpacts["25"];
        } else if (val < 80) {
            impactText.innerText = amountImpacts["50"];
        } else if (val < 200) {
            impactText.innerText = amountImpacts["100"];
        } else if (val < 400) {
            impactText.innerText = amountImpacts["250"];
        } else {
            impactText.innerText = amountImpacts["500"];
        }
    }

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            const amt = pill.dataset.amount;
            if (otherInput) {
                otherInput.value = ''; // Reset custom input
            }
            updateImpactDescription(amt);
        });
    });

    if (otherInput) {
        otherInput.addEventListener('input', (e) => {
            // Remove active pills
            pills.forEach(p => p.classList.remove('active'));
            updateImpactDescription(e.target.value);
        });
    }

    if (donationForm) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let finalAmount = '';
            const activePill = document.querySelector('.amount-pill.active');
            if (activePill) {
                finalAmount = activePill.dataset.amount;
            } else if (otherInput && otherInput.value) {
                finalAmount = otherInput.value;
            }

            if (!finalAmount || parseFloat(finalAmount) <= 0) {
                alert("Please select or enter a valid donation amount.");
                return;
            }

            // Simulate direct payment processing
            const submitBtn = donationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = "Authorizing Safe Transaction...";

            setTimeout(() => {
                alert(`Thank you so much! Your generous contribution of $${finalAmount} has been processed successfully. A tax receipt was generated.`);
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                donationForm.reset();
                pills.forEach(p => p.classList.remove('active'));
                if (pills[1]) pills[1].click(); // Reset to default pill ($50)
            }, 1500);
        });
    }
}

/* --- 4. EXPANDABLE TEAM BIO DRAWER PANEL --- */
function initTeamBios() {
    const teamCards = document.querySelectorAll('.team-card');
    const bioPanel = document.getElementById('team-bio-panel');
    const bioContent = document.getElementById('team-bio-content');
    
    if (!teamCards.length || !bioPanel || !bioContent) return;

    // Team Bios Dataset
    const bios = {
        caroline: {
            name: "Dr. Caroline K. Ndwiga",
            role: "Founder & Executive Director",
            text: "Dr. Caroline Ndwiga has over 15 years of experience in public health epidemiology and community-led international development. She founded Umoja Foundation in 2012 with a core focus on expanding clean drinking water networks and implementing sustainable sanitation systems to eliminate waterborne illness vectors from vulnerable schools."
        },
        amos: {
            name: "Amos O. Kiprop",
            role: "Chief Water Sanitation Engineer",
            text: "Amos Kiprop holds a Master's degree in Hydrology and Environmental Engineering. He leads the ground operations team, managing drilling operations, deep solar borehole system layouts, and supervising complex water piping retrofits across arid rural communities."
        },
        brenda: {
            name: "Brenda M. Wambui",
            role: "Community Relations Lead",
            text: "Brenda Wambui coordinates directly with local parent-teacher groups and community elders. She ensures that all school sanitation interventions are managed sustainably, training local committees to inspect, repair, and maintain the hygiene infrastructure."
        },
        david: {
            name: "David O. Otieno",
            role: "Program Monitoring Manager",
            text: "David Otieno designs our field data collection pipelines and directs the 'Safe Schools' sanitation audit network. His rigorous audits measure progress, track chlorine replenishment levels, and provide transparent dashboards for donor stewardship."
        }
    };

    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            const memberKey = card.dataset.member;
            const details = bios[memberKey];
            
            if (details) {
                bioPanel.style.display = 'block';
                bioContent.innerHTML = `
                    <h3 style="font-size: 1.2rem; margin-bottom: 4px;">${details.name}</h3>
                    <p style="color: var(--color-terracotta); font-weight: 600; font-size: 0.85rem; margin-bottom: 12px;">${details.role}</p>
                    <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6;">${details.text}</p>
                `;
                // Smooth scroll to panel
                bioPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

/* --- 5. ADMIN / COORDINATOR PORTAL LOGIN --- */
function initLoginForm() {
    const loginForm = document.getElementById('admin-login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        
        if (!email || !pass) {
            alert("Please provide both email and password credentials.");
            return;
        }

        // Mock authorization
        const btn = loginForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = "Securing session...";

        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = "Access Dashboard";
            
            // Successful demo login
            alert(`Welcome back to the Umoja Coordinator Dashboard! Dynamic session initiated for coordinator: ${email}`);
            window.location.href = 'safe-schools.html';
        }, 1200);
    });
}

/* --- 6. MEMBER SIGNUP FORM --- */
function initSignupForm() {
    const signupForm = document.getElementById('member-signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const volunteer = document.getElementById('signup-volunteer').checked;

        if (!name || !email) {
            alert("Name and email are required to sign up.");
            return;
        }

        const btn = signupForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = "Registering...";

        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = "Join Our Mission";
            
            alert(`Congratulations, ${name}! Your membership with Umoja Foundation has been registered successfully. We have sent an onboarding manual and welcome kit to ${email}.`);
            signupForm.reset();
        }, 1200);
    });
}

/* --- 7. SAFE SCHOOLS SEARCH & INTERACTIVE LOGS --- */
function initSafeSchoolsSearch() {
    const searchInput = document.getElementById('school-search-input');
    const items = document.querySelectorAll('.audit-selector-item');
    const detailBox = document.getElementById('audit-detail-box');
    
    if (!searchInput && !items.length) return;

    // Filter items based on search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            items.forEach(item => {
                const schoolName = item.querySelector('h4').innerText.toLowerCase();
                const regionName = item.querySelector('p').innerText.toLowerCase();
                
                if (schoolName.includes(query) || regionName.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Handle clicking audit to display full details
    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
            // Extract attributes
            const name = item.dataset.name;
            const region = item.dataset.region;
            const status = item.dataset.status;
            const students = item.dataset.students;
            const washRating = item.dataset.wash;
            const waterSource = item.dataset.source;
            const date = item.dataset.date;
            const findings = item.dataset.findings;

            if (detailBox) {
                let statusBadgeColor = '#D1FAE5'; // completed green
                let statusTextColor = '#065F46';
                if (status === 'Critical Attention Required') {
                    statusBadgeColor = '#FEE2E2'; // red
                    statusTextColor = '#991B1B';
                } else if (status === 'Pending Improvements') {
                    statusBadgeColor = '#FEF3C7'; // yellow
                    statusTextColor = '#92400E';
                }

                detailBox.style.opacity = '0';
                setTimeout(() => {
                    detailBox.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                            <div>
                                <h3 style="font-size: 1.6rem; color: var(--color-dark-blue);">${name}</h3>
                                <p style="color: var(--color-text-muted); font-size: 0.9rem;">${region} Region</p>
                            </div>
                            <span style="background-color: ${statusBadgeColor}; color: ${statusTextColor}; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border-radius: 99px;">
                                ${status}
                            </span>
                        </div>
                        
                        <div style="grid-template-columns: repeat(3, 1fr); display: grid; gap: 16px; margin-bottom: 24px; padding: 16px; background-color: var(--color-sand-bg); border-radius: 8px;">
                            <div>
                                <p style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted);">Enrollment</p>
                                <p style="font-size: 1.15rem; font-weight: 700; color: var(--color-dark-blue);">${students} Students</p>
                            </div>
                            <div>
                                <p style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted);">Water System</p>
                                <p style="font-size: 1.15rem; font-weight: 700; color: var(--color-dark-blue);">${waterSource}</p>
                            </div>
                            <div>
                                <p style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted);">W.A.S.H. Rating</p>
                                <p style="font-size: 1.15rem; font-weight: 700; color: var(--color-terracotta);">${washRating} / 100</p>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 24px; text-align: left;">
                            <h4 style="font-size: 1rem; margin-bottom: 8px;">Field Audit Diagnosis Findings</h4>
                            <p style="color: var(--color-text-dark); font-size: 0.9rem; line-height: 1.6;">${findings}</p>
                        </div>
                        
                        <div style="font-size: 0.8rem; color: var(--color-text-muted); border-top: 1px solid var(--color-clay); padding-top: 16px; display: flex; justify-content: space-between;">
                            <span>Audit Reference Date: ${date}</span>
                            <span>Inspection ID: WASH-2026-${Math.floor(Math.random() * 9000) + 1000}</span>
                        </div>
                    `;
                    detailBox.style.opacity = '1';
                }, 150);
            }
        });
    });
}
