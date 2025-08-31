// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Header functionality - Fixed position only
    const header = document.querySelector('.header');

    if (header) {
        // Only change background on scroll, no position changes
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Change background on scroll only
            if (scrollTop > 100) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 180, 216, 0.1)';
            } else {
                header.style.backgroundColor = 'transparent';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Access status typing effect
    const accessStatus = document.getElementById('accessStatus');
    if (accessStatus) {
        const texts = [
            '{ACCESS_GRANTED}',
            'C:\\@0xNajjar_',
            '{SYSTEM_READY}',
            'C:\\@0xNajjar_',
            '{SECURE_CONNECTION}',
            'C:\\@0xNajjar_'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeAccessStatus = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                accessStatus.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                accessStatus.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Add subtle glow effect during typing
            if (!isDeleting) {
                accessStatus.style.textShadow = '0 0 6px rgba(0, 180, 216, 0.5)';
            }
            
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
                // Add subtle completion glow
                accessStatus.style.textShadow = '0 0 8px rgba(0, 180, 216, 0.6)';
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
                accessStatus.style.textShadow = '0 0 4px rgba(0, 180, 216, 0.3)';
            }
            
            setTimeout(typeAccessStatus, typeSpeed);
        };
        
        setTimeout(typeAccessStatus, 1000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Add subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length > 0 && sections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Enhanced typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                
                // Add subtle typing effect
                heroTitle.style.textShadow = '0 0 8px rgba(0, 180, 216, 0.6)';
                setTimeout(() => {
                    heroTitle.style.textShadow = '0 0 6px rgba(0, 180, 216, 0.4)';
                }, 50);
                
                setTimeout(typeWriter, 80);
            } else {
                // Add subtle completion effect
                heroTitle.style.animation = '';
                heroTitle.style.textShadow = '0 0 10px rgba(0, 180, 216, 0.7)';
                setTimeout(() => {
                    heroTitle.style.textShadow = '0 0 6px rgba(0, 180, 216, 0.4)';
                }, 2000);
            }
        };
        
        // Start typing animation after page load
        setTimeout(typeWriter, 500);
    }

    // Simple typing animation for subtitle - Type, pause, delete, then next
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const specializations = [
            '[CYBER_SECURITY_ANALYST]',
            '[PENETRATION_TESTER]',
            '[DIGITAL_FORENSICS_EXPERT]',
            '[INCIDENT_RESPONSE_SPECIALIST]',
            '[THREAT_INTELLIGENCE_SPECIALIST]',
            '[SOC_ANALYST]'
        ];
        
        let currentSpecIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeEffect = () => {
            const currentSpec = specializations[currentSpecIndex];
            
            if (!isDeleting) {
                // Typing phase
                if (charIndex < currentSpec.length) {
                    typingText.textContent = currentSpec.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeEffect, 80);
                } else {
                    // Finished typing, wait then start deleting
                    setTimeout(() => {
                        isDeleting = true;
                        typeEffect();
                    }, 2000);
                }
            } else {
                // Deleting phase
                if (charIndex > 0) {
                    typingText.textContent = currentSpec.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(typeEffect, 50);
                } else {
                    // Finished deleting, move to next specialization
                    isDeleting = false;
                    currentSpecIndex = (currentSpecIndex + 1) % specializations.length;
                    setTimeout(typeEffect, 500);
                }
            }
        };
        
        setTimeout(typeEffect, 2000);
    }

    // Enhanced counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.hero-stats');

    if (statNumbers.length > 0 && statsSection) {
        const animateCounters = () => {
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.textContent);
                const increment = target / 50;
                let current = 0;
                
                // Add staggered animation
                setTimeout(() => {
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            stat.textContent = Math.ceil(current) + '+';
                            
                            // Add subtle pulse effect during counting
                            stat.style.transform = 'scale(1.02)';
                            stat.style.textShadow = '0 0 6px rgba(0, 180, 216, 0.5)';
                            
                            setTimeout(() => {
                                stat.style.transform = 'scale(1)';
                                stat.style.textShadow = '0 0 4px rgba(0, 180, 216, 0.3)';
                            }, 100);
                            
                            setTimeout(updateCounter, 30);
                        } else {
                            stat.textContent = target + '+';
                            // Final completion effect - subtle
                            stat.style.animation = '';
                            stat.style.textShadow = '0 0 8px rgba(0, 180, 216, 0.6)';
                            setTimeout(() => {
                                stat.style.textShadow = '0 0 4px rgba(0, 180, 216, 0.3)';
                            }, 1000);
                        }
                    };
                    
                    updateCounter();
                }, index * 200); // Stagger each counter
            });
        };

        // Intersection Observer for stats animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // Terminal typing effect
    const terminalCommands = document.querySelectorAll('.command');
    if (terminalCommands.length > 0) {
        terminalCommands.forEach(command => {
            const originalText = command.textContent;
            command.textContent = '';
            
            let i = 0;
            const typeCommand = () => {
                if (i < originalText.length) {
                    command.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeCommand, 50);
                }
            };
            
            // Start typing when terminal is visible
            const commandObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeCommand, 1000);
                        commandObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            commandObserver.observe(command);
        });
    }

    // Glitch effect for section titles - Subtle
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length > 0) {
        sectionTitles.forEach(title => {
            title.addEventListener('mouseenter', () => {
                title.style.textShadow = '0 0 8px rgba(0, 180, 216, 0.6)';
                title.style.transform = 'scale(1.01)';
            });
            
            title.addEventListener('mouseleave', () => {
                title.style.textShadow = '0 0 6px rgba(0, 180, 216, 0.4)';
                title.style.transform = 'scale(1)';
            });
        });
    }

    // Matrix rain effect (optional background) - Subtle
    const createMatrixRain = () => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.05';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 12;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00b4d8';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 50);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };

    // Initialize matrix rain
    setTimeout(createMatrixRain, 3000);

    // Enhanced glowing effect for project cards - Subtle
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.01)';
                this.style.boxShadow = '0 0 15px rgba(0, 180, 216, 0.4)';
                this.style.animation = '';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 0 10px rgba(0, 180, 216, 0.3)';
                this.style.animation = '';
            });
        });
    }

    // Terminal window interactions
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        const terminalControls = terminalWindow.querySelectorAll('.control');
        
        terminalControls.forEach(control => {
            control.addEventListener('click', () => {
                control.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    control.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    // File input simulation
    const fileBtn = document.querySelector('.file-btn');
    const fileText = document.querySelector('.file-text');
    if (fileBtn && fileText) {
        fileBtn.addEventListener('click', () => {
            fileText.textContent = 'security_report.pdf';
            fileText.style.color = '#00b4d8';
            
            setTimeout(() => {
                fileText.textContent = 'No file chosen';
                fileText.style.color = '#b0b0b0';
            }, 3000);
        });
    }

    // Project navigation
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentProject = 0;

    const projects = [
        {
            title: 'LinkGuardian',
            description: 'Advanced phishing URL detection system with real-time analysis and visual reporting. Uses machine learning algorithms to identify malicious links and protect users from cyber threats.',
            tech: ['Python', 'Machine Learning', 'Web Scraping', 'Flask']
        },
        {
            title: 'NetworkScanner',
            description: 'Comprehensive network reconnaissance tool for port scanning and device discovery.',
            tech: ['Python', 'Socket', 'Nmap']
        },
        {
            title: 'SecurePassManager',
            description: 'Encrypted password manager with advanced security features and breach monitoring.',
            tech: ['Python', 'Crypto', 'SQLite']
        }
    ];

    const updateProject = (index) => {
        const projectCard = document.querySelector('.project-card.featured');
        const project = projects[index];
        
        if (projectCard && project) {
            const titleElement = projectCard.querySelector('.project-title');
            const descElement = projectCard.querySelector('.project-description');
            const techContainer = projectCard.querySelector('.project-tech');
            
            if (titleElement) titleElement.textContent = project.title;
            if (descElement) descElement.textContent = project.description;
            
            if (techContainer) {
                techContainer.innerHTML = '';
                project.tech.forEach(tech => {
                    const techTag = document.createElement('span');
                    techTag.className = 'tech-tag';
                    techTag.textContent = tech;
                    techContainer.appendChild(techTag);
                });
            }
        }
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentProject = (currentProject - 1 + projects.length) % projects.length;
            updateProject(currentProject);
        });
        
        nextBtn.addEventListener('click', () => {
            currentProject = (currentProject + 1) % projects.length;
            updateProject(currentProject);
        });
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const subjectInput = this.querySelectorAll('input[type="text"]')[1];
            const messageInput = this.querySelector('textarea');
            
            if (!nameInput || !emailInput || !subjectInput || !messageInput) return;
            
            const name = nameInput.value;
            const email = emailInput.value;
            const subject = subjectInput.value;
            const message = messageInput.value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            if (submitBtn) {
                const btnText = submitBtn.querySelector('.btn-text');
                if (btnText) {
                    const originalText = btnText.textContent;
                    btnText.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        showNotification('Message sent successfully! I will get back to you soon.', 'success');
                        this.reset();
                        btnText.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            }
        });
    }

    // Enhanced fade-in animation to elements on scroll
    const fadeElements = document.querySelectorAll('.blog-post, .skill-tag, .tech-tag, .blog-tag');

    if (fadeElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Subtle staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                        entry.target.style.animationDelay = `${index * 0.05}s`;
                    }, index * 50);
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }

    // Add subtle typing effect to blog posts
    document.querySelectorAll('.blog-post').forEach((post, index) => {
        post.addEventListener('mouseenter', function() {
            const title = this.querySelector('h4');
            if (title) {
                title.style.textShadow = '0 0 6px rgba(0, 180, 216, 0.4)';
                title.style.transform = 'scale(1.01)';
            }
        });
        
        post.addEventListener('mouseleave', function() {
            const title = this.querySelector('h4');
            if (title) {
                title.style.textShadow = 'none';
                title.style.transform = 'scale(1)';
            }
        });
    });

    // Add subtle floating animation to skill tags
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            this.style.animation = '';
            this.style.transform = 'translateY(-2px)';
            this.style.textShadow = '0 0 4px rgba(0, 180, 216, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.animation = '';
            this.style.transform = 'translateY(0)';
            this.style.textShadow = 'none';
        });
    });

    // Add subtle typing effect to terminal inputs
    document.querySelectorAll('.terminal-body input').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--blue-bright)';
            this.style.boxShadow = '0 0 6px rgba(0, 180, 216, 0.3)';
            this.style.animation = '';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-color)';
            this.style.boxShadow = 'none';
            this.style.animation = '';
        });
    });

    // Back to top button functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--blue-dark);
        color: var(--blue-bright);
        border: 2px solid var(--blue-bright);
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add subtle hover effect to back to top button
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-2px)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(0, 180, 216, 0.4)';
        backToTopBtn.style.background = 'var(--blue-bright)';
        backToTopBtn.style.color = 'var(--black)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.boxShadow = '0 2px 8px rgba(0, 180, 216, 0.3)';
        backToTopBtn.style.background = 'var(--blue-dark)';
        backToTopBtn.style.color = 'var(--blue-bright)';
    });

    // Footer logo hover encryption effect - Same as navbar
    const footerLogo = document.querySelector('.footer-logo');

    if (footerLogo) {
        let encryptionInterval;
        let originalText = footerLogo.textContent;
        const encryptedChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEF';
        
        footerLogo.addEventListener('mouseenter', () => {
            // Start encryption effect - same as navbar
            let iterations = 0;
            const maxIterations = 15;
            
            encryptionInterval = setInterval(() => {
                footerLogo.textContent = originalText.split('').map((char, index) => {
                    // Keep some characters intact for better effect
                    if (char === 'C' || char === ':' || char === '\\' || char === '@' || char === 'N' || char === 'a' || char === 'j' || char === 'r') {
                        return char;
                    }
                    return encryptedChars[Math.floor(Math.random() * encryptedChars.length)];
                }).join('');
                
                iterations++;
                if (iterations >= maxIterations) {
                    clearInterval(encryptionInterval);
                    footerLogo.textContent = originalText;
                }
            }, 80);
        });
        
        footerLogo.addEventListener('mouseleave', () => {
            // Stop encryption and restore original text
            if (encryptionInterval) {
                clearInterval(encryptionInterval);
            }
            footerLogo.textContent = originalText;
        });
        
        // Click effect - enhanced cyberpunk style
        footerLogo.addEventListener('click', () => {
            // Add subtle particle effect
            for (let i = 0; i < 6; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    top: ${footerLogo.offsetTop + footerLogo.offsetHeight / 2}px;
                    left: ${footerLogo.offsetLeft + footerLogo.offsetWidth / 2}px;
                    width: 3px;
                    height: 3px;
                    background: var(--blue-bright);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    animation: particleExplosion 0.8s ease-out forwards;
                    opacity: 0.7;
                `;
                document.body.appendChild(particle);
                
                // Simple random direction
                const angle = (i / 6) * 2 * Math.PI;
                const distance = 30 + Math.random() * 40;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                particle.style.setProperty('--x', x + 'px');
                particle.style.setProperty('--y', y + 'px');
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 800);
            }
        });
    }

    // Enhanced button hover effects - Subtle
    document.querySelectorAll('.action-btn, .github-btn, .submit-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = '';
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 180, 216, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.animation = '';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 180, 216, 0.2)';
        });
        
        btn.addEventListener('click', function(e) {
            // Simple click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Preloader (if needed)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Add CSS for back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top:hover {
            background-color: var(--blue-accent) !important;
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 15px !important;
                left: 15px !important;
                width: 45px !important;
                height: 45px !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Add particle explosion animation to CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleExplosion {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--x), var(--y)) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Add ripple animation to CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Console welcome message
    console.log(`
%cWelcome to C:\\@0xNajjar's Portfolio!
%c
%c🔒 Cybersecurity Analyst Portfolio
%c💻 Built with modern web technologies
%c🚀 Ready to secure your digital assets
%c
%cContact: omar.alnajjar@example.com
%cGitHub: https://github.com/omaralnajjar
`,
'color: #00b4d8; font-size: 20px; font-weight: bold; font-family: "JetBrains Mono", monospace;',
'',
'color: #00b4d8; font-size: 14px; font-family: "JetBrains Mono", monospace;',
'color: #0096c7; font-size: 14px; font-family: "JetBrains Mono", monospace;',
'color: #0096c7; font-size: 14px; font-family: "JetBrains Mono", monospace;',
'',
'color: #b0b0b0; font-size: 12px; font-family: "JetBrains Mono", monospace;',
'color: #b0b0b0; font-size: 12px; font-family: "JetBrains Mono", monospace;'
    );
});

// Notification system
const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00b4d8' : '#ff4757'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};
