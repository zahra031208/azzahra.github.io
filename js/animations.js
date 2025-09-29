// ===== ANIMATIONS JAVASCRIPT =====

// Parallax effect untuk hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroContent) {
        // Parallax effect pada hero content
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
    
    if (heroPattern) {
        // Slow down pattern animation on scroll
        heroPattern.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
    }
});

// Intersection Observer untuk fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            // Unobserve setelah animasi
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation ke gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(item);
});

// Apply fade-in animation ke stat boxes
document.querySelectorAll('.stat-box').forEach((box, index) => {
    box.style.transitionDelay = `${index * 0.15}s`;
    fadeInObserver.observe(box);
});

// Hover effect untuk gallery items - tambahan interaktivitas
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    const overlay = item.querySelector('.gallery-overlay');
    
    item.addEventListener('mouseenter', function() {
        // Tambah efek scale pada background
        const bg = this.querySelector('.gallery-item-bg');
        if (bg) {
            bg.style.transition = 'transform 0.4s ease';
            bg.style.transform = 'scale(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const bg = this.querySelector('.gallery-item-bg');
        if (bg) {
            bg.style.transform = 'scale(1)';
        }
    });
    
    // Parallax effect pada overlay
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        if (overlay) {
            overlay.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    item.addEventListener('mouseleave', function() {
        if (overlay) {
            overlay.style.transform = 'translate(0, 0)';
        }
    });
});

// Animated divider
const divider = document.querySelector('.divider');
if (divider) {
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '0';
                entry.target.style.transition = 'width 1s ease';
                
                setTimeout(() => {
                    entry.target.style.width = '100px';
                }, 100);
                
                dividerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    dividerObserver.observe(divider);
}

// Text reveal animation untuk section headers
const sectionHeaders = document.querySelectorAll('.section-header h2');

sectionHeaders.forEach(header => {
    const text = header.textContent;
    header.textContent = '';
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let index = 0;
                const interval = setInterval(() => {
                    if (index < text.length) {
                        header.textContent += text[index];
                        index++;
                    } else {
                        clearInterval(interval);
                    }
                }, 50);
                
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    headerObserver.observe(header);
});

// Button pulse animation
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
    setInterval(() => {
        exploreBtn.style.animation = 'none';
        setTimeout(() => {
            exploreBtn.style.animation = 'pulse 2s ease';
        }, 10);
    }, 5000);
}

// Add pulse keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .menu a.active {
        color: #DAA520;
        position: relative;
    }
    
    .menu a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #DAA520;
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from { width: 0; }
        to { width: 100%; }
    }
`;
document.head.appendChild(style);

// Floating animation untuk history visual emoji
const historyVisual = document.querySelector('.history-visual');
if (historyVisual) {
    let floatDirection = 1;
    let floatPosition = 0;
    
    setInterval(() => {
        floatPosition += 0.5 * floatDirection;
        
        if (floatPosition > 10 || floatPosition < -10) {
            floatDirection *= -1;
        }
        
        historyVisual.style.transform = `translateY(${floatPosition}px)`;
    }, 50);
}

// Smooth reveal untuk footer
const footer = document.querySelector('.footer');
if (footer) {
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 1s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    footerObserver.observe(footer);
}

// Social links hover effect
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'scale(1.3) rotate(10deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

console.log('🎨 Animations loaded successfully!');