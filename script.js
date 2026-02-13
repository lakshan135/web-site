document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Header Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card, .service-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    // Text Slideshow
    const textSlides = document.querySelectorAll('.text-slide');
    if (textSlides.length > 0) {
        let currentTextSlide = 0;
        setInterval(() => {
            textSlides[currentTextSlide].classList.remove('active');
            currentTextSlide = (currentTextSlide + 1) % textSlides.length;
            textSlides[currentTextSlide].classList.add('active');
        }, 4000); // Change text every 4 seconds
    }

    // Search Functionality
    const searchInput = document.getElementById('service-search');
    const allCards = document.querySelectorAll('.pricing-card, .service-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            allCards.forEach(card => {
                const cardText = card.innerText.toLowerCase();
                const isMatch = cardText.includes(searchTerm);

                if (isMatch) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.display = 'none';
                }
            });

            // Auto-scroll to pricing section on search start
            if (searchTerm.length > 0) {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            // Handle section visibility if no results
            document.querySelectorAll('section').forEach(section => {
                const hasVisibleCards = Array.from(section.querySelectorAll('.pricing-card, .service-card'))
                    .some(card => card.style.display !== 'none');

                if (searchTerm !== "" && !hasVisibleCards && (section.id === 'pricing' || section.id === 'other-services')) {
                    section.style.display = 'none';
                } else {
                    section.style.display = 'block';
                }
            });
        });
    }

    // Bank Details Popup Logic
    const bankCards = document.querySelectorAll('#bank-transfer-card, #direct-deposit-card');
    const popup = document.getElementById('bank-details-popup');
    const closeBtn = document.querySelector('.close-popup');

    if (bankCards && popup) {
        bankCards.forEach(card => {
            card.addEventListener('click', () => {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closePopup = () => {
            popup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }

        // Close when clicking outside the content
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
        // Shopping Cart Logic
        let cart = [];
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.querySelector('.cart-count');
        const cartNavbarValue = document.querySelector('.cart-navbar-value');
        const cartTotalValue = document.getElementById('cart-total-value');
        const cartTriggers = document.querySelectorAll('.cart-trigger');
        const closeCartBtn = document.querySelector('.close-cart');
        const checkoutBtn = document.querySelector('.checkout-btn');

        const updateCartUI = () => {
            cartCount.textContent = cart.length;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
                cartTotalValue.textContent = 'Rs. 0';
                if (cartNavbarValue) cartNavbarValue.textContent = 'Rs. 0';
            } else {
                cartItemsContainer.innerHTML = '';
                let total = 0;

                cart.forEach((item, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-item';
                    itemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item" data-index="${index}">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                `;
                    cartItemsContainer.appendChild(itemDiv);

                    if (item.price !== 'Enquire for Price') {
                        total += parseInt(item.price);
                    }
                });

                cartTotalValue.textContent = `Rs. ${total}`;
                if (cartNavbarValue) cartNavbarValue.textContent = `Rs. ${total}`;

                // Add remove listeners
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const index = e.currentTarget.dataset.index;
                        cart.splice(index, 1);
                        updateCartUI();
                    });
                });
            }
        };

        const toggleCart = () => {
            cartSidebar.classList.toggle('active');
            cartOverlay.classList.toggle('active');
            document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
        };

        cartTriggers.forEach(trigger => trigger.addEventListener('click', toggleCart));
        if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
        if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                const price = e.target.dataset.price;
                const period = e.target.dataset.period;

                cart.push({ name, price, period });
                updateCartUI();

                // Animation effect
                e.target.textContent = 'Added! ✓';
                e.target.classList.add('btn-success');
                setTimeout(() => {
                    e.target.textContent = 'Add to Cart';
                    e.target.classList.remove('btn-success');
                }, 2000);

                // Directly show cart
                if (!cartSidebar.classList.contains('active')) {
                    toggleCart();
                }
            });
        });

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) return;

                let message = "I want to purchase the following items:\n\n";
                cart.forEach((item, i) => {
                    message += `${i + 1}. ${item.name} - ${item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price}\n`;
                });

                const total = cartTotalValue.textContent;
                message += `\nTotal Estimate: ${total}\n\nPlease confirm my order.`;

                const whatsappUrl = `https://wa.me/94765494631?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }

        // Auth Modal Logic
        const loginBtn = document.getElementById('login-btn');
        const authModal = document.getElementById('auth-modal');
        const closeAuthBtn = document.getElementById('close-auth');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const showRegister = document.getElementById('show-register');
        const showLogin = document.getElementById('show-login');

        if (loginBtn && authModal) {
            loginBtn.addEventListener('click', () => {
                authModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const closeAuth = () => {
                authModal.classList.remove('active');
                document.body.style.overflow = '';
            };

            if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuth);

            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) closeAuth();
            });

            // Form Switching
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                authModal.querySelector('h3').innerHTML = 'Create <span class="gradient-text">Account</span>';
                authModal.querySelector('p').textContent = 'Join BuyItems.lk today';
            });

            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                registerForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                authModal.querySelector('h3').innerHTML = 'Welcome <span class="gradient-text">Back</span>';
                authModal.querySelector('p').textContent = 'Sign in to your BuyItems.lk account';
            });

            // Mock Form Submission
            const handleAuth = (e) => {
                e.preventDefault();
                const btn = e.target.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Processing...';
                btn.disabled = true;

                setTimeout(() => {
                    alert('Success! Note: This is a frontend demo. Integration with a backend is required for real accounts.');
                    btn.textContent = originalText;
                    btn.disabled = false;
                    closeAuth();
                }, 1500);
            };

            loginForm.addEventListener('submit', handleAuth);
            registerForm.addEventListener('submit', handleAuth);

            // Google Login Simulation
            document.querySelectorAll('.btn-google').forEach(btn => {
                btn.addEventListener('click', () => {
                    alert('Connecting to Google accounts...');
                    setTimeout(() => {
                        alert('Logged in successfully with Google!');
                        closeAuth();
                    }, 1000);
                });
            });
        }

        // Quotation Generation Logic
        const generateQuotationBtn = document.getElementById('generate-quotation');
        const quotationModal = document.getElementById('quotation-modal');
        const qItemsBody = document.getElementById('q-items-body');
        const qTotal = document.getElementById('q-total');
        const qDate = document.getElementById('q-date');
        const qNumber = document.getElementById('q-number');
        const closeQuotation = quotationModal.querySelector('.close-popup');

        if (generateQuotationBtn) {
            generateQuotationBtn.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('Your cart is empty! Add items to generate a quotation.');
                    return;
                }

                // Populate Items
                qItemsBody.innerHTML = '';
                let total = 0;
                cart.forEach(item => {
                    const row = document.createElement('tr');
                    const priceDisplay = item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price;
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td class="text-right">${priceDisplay}</td>
                    `;
                    qItemsBody.appendChild(row);

                    if (item.price !== 'Enquire for Price') {
                        total += parseInt(item.price);
                    }
                });

                qTotal.textContent = `Rs. ${total}`;

                // Set Date and Random Invoice Number
                const today = new Date();
                qDate.textContent = today.toLocaleDateString();
                qNumber.textContent = 'QT-' + Math.floor(Math.random() * 900000 + 100000);

                // Open Modal
                quotationModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Close Cart Sidebar
                if (cartSidebar.classList.contains('active')) {
                    toggleCart();
                }
            });

            closeQuotation.addEventListener('click', () => {
                quotationModal.classList.remove('active');
                document.body.style.overflow = '';
            });

            quotationModal.addEventListener('click', (e) => {
                if (e.target === quotationModal) {
                    quotationModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Countdown Timer Logic
        const countdown = () => {
            const STORAGE_KEY = 'dealEndTime';
            const CYCLE_HOURS = 19;
            const getNewEndTime = () => new Date().getTime() + (CYCLE_HOURS * 3600000);

            let endTime = localStorage.getItem(STORAGE_KEY);
            if (!endTime || new Date().getTime() > parseInt(endTime)) {
                endTime = getNewEndTime();
                localStorage.setItem(STORAGE_KEY, endTime);
            }

            const updateTimer = () => {
                const now = new Date().getTime();
                let gap = parseInt(endTime) - now;

                if (gap <= 0) {
                    endTime = getNewEndTime();
                    localStorage.setItem(STORAGE_KEY, endTime);
                    gap = parseInt(endTime) - now;
                }

                const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
                const d = Math.floor(gap / day), h = Math.floor((gap % day) / hour), m = Math.floor((gap % hour) / minute), s = Math.floor((gap % minute) / second);

                const setEl = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.innerText = val.toString().padStart(2, '0');
                };

                setEl('days', d);
                setEl('hours', h);
                setEl('minutes', m);
                setEl('seconds', s);
            };

            setInterval(updateTimer, 1000);
            updateTimer();
        };
        countdown();

        // Scroll to Top Logic
        const scrollTopBtn = document.getElementById('scroll-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
