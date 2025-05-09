
        // Script pour le smooth scrolling et l'activation des liens de navigation
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Active nav links on scroll
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-link');
                
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    
                    if (window.pageYOffset >= sectionTop - navbarHeight - 100) {
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
        });


