document.addEventListener('DOMContentLoaded', () => {
    // Custom Video Player Logic
    const playerFrame = document.getElementById('custom-player');
    const video = document.getElementById('yt-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const bigPlayBtn = document.getElementById('big-play-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fs-btn');

    if (video) {
        // Toggle Play/Pause
        function togglePlay() {
            if (video.paused || video.ended) {
                video.play();
                updatePlayIcons(true);
            } else {
                video.pause();
                updatePlayIcons(false);
            }
        }

        // Update Icons
        function updatePlayIcons(isPlaying) {
            if (isPlaying) {
                playerFrame.classList.remove('paused');
                playerFrame.classList.add('playing');
                playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
            } else {
                playerFrame.classList.remove('playing');
                playerFrame.classList.add('paused');
                playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M8 5v14l11-7z"></path></svg>';
            }
        }

        playPauseBtn.addEventListener('click', togglePlay);
        bigPlayBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        // Update Progress Bar
        video.addEventListener('timeupdate', () => {
            const percentage = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${percentage}%`;
        });

        // Click on Progress Bar
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        // Mute Toggle
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>';
            } else {
                muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';
            }
        });

        // Full Screen
        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
        });

        // Auto play handling (browser policies might block audio)
        video.play().then(() => {
            updatePlayIcons(true);
        }).catch(() => {
            updatePlayIcons(false);
            video.muted = true; // Fallback to muted autoplay
            video.play();
        });
    }

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

    // Unified Search Functionality
    const searchInputs = [
        document.getElementById('service-search'),
        document.getElementById('service-search-nav')
    ];
    const allCards = document.querySelectorAll('.pricing-card, .service-card');

    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
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
    });

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
    }
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

            // Trigger Confetti Celebration
            if (window.triggerConfetti) window.triggerConfetti();

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

    const paymentModal = document.getElementById('payment-modal');
    const closePaymentBtn = document.getElementById('close-payment');
    const paymentTotal = document.getElementById('payment-total');
    const methodOptions = document.querySelectorAll('.method-option');
    const finalCheckoutBtn = document.getElementById('final-checkout-btn');

    const directCardBtn = document.getElementById('direct-card-btn');
    if (directCardBtn) {
        directCardBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            paymentTotal.innerText = cartTotalValue.textContent;
            paymentModal.classList.add('active');
            toggleCart();

            // Auto-select card method
            const cardOption = document.querySelector('.method-option[data-method="card"]');
            if (cardOption) cardOption.click();
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            // Show Payment Modal instead of direct WhatsApp
            paymentTotal.innerText = cartTotalValue.textContent;
            paymentModal.classList.add('active');
            toggleCart(); // Close cart sidebar
        });
    }

    if (closePaymentBtn) {
        closePaymentBtn.addEventListener('click', () => {
            paymentModal.classList.remove('active');
        });
    }

    // Payment Method Selection Logic
    methodOptions.forEach(option => {
        option.addEventListener('click', () => {
            methodOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            const method = option.dataset.method;

            // Toggle Content Sections
            document.querySelectorAll('.method-content').forEach(content => {
                content.style.display = 'none';
            });
            const targetContent = document.getElementById(`method-${method}-details`);
            if (targetContent) targetContent.style.display = 'block';

            if (method === 'bank') {
                finalCheckoutBtn.innerText = 'Confirm & Send Receipt via WhatsApp';
            } else if (method === 'qr') {
                finalCheckoutBtn.innerText = 'Pay via LankaQR';
            } else {
                finalCheckoutBtn.innerText = 'Proceed to Card Payment';
            }
        });
    });

    if (finalCheckoutBtn) {
        finalCheckoutBtn.addEventListener('click', () => {
            const activeMethod = document.querySelector('.method-option.active').dataset.method;

            if (activeMethod === 'bank') {
                // Open Bank Details Popup first
                const bankPopup = document.getElementById('bank-popup');
                if (bankPopup) bankPopup.classList.add('active');
                paymentModal.classList.remove('active');
            } else if (activeMethod === 'card') {
                // Logic for Card Payment - Simulation
                const originalText = finalCheckoutBtn.innerText;
                finalCheckoutBtn.disabled = true;
                finalCheckoutBtn.innerHTML = '<span class="loader-spinner"></span> Processing Securely...';
                finalCheckoutBtn.style.opacity = '0.7';

                setTimeout(() => {
                    finalCheckoutBtn.innerHTML = '✅ Payment Successful!';
                    finalCheckoutBtn.style.background = '#25d366';

                    setTimeout(() => {
                        let message = "I have successfully paid via *Credit Card* for the following items:\n\n";
                        cart.forEach((item, i) => {
                            message += `${i + 1}. ${item.name} - ${item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price}\n`;
                        });

                        const total = cartTotalValue.textContent;
                        message += `\nTotal Paid: ${total}\nReference: CARD-SUCCESS-${Math.floor(Math.random() * 100000)}\n\nPlease verify and activate.`;

                        const whatsappUrl = `https://wa.me/94765494631?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');

                        // Reset button
                        finalCheckoutBtn.disabled = false;
                        finalCheckoutBtn.innerText = originalText;
                        finalCheckoutBtn.style.background = '';
                        finalCheckoutBtn.style.opacity = '1';
                        paymentModal.classList.remove('active');

                        // Clear cart
                        cart = [];
                        updateCartUI();
                    }, 1500);
                }, 2500);
            } else {
                // For QR, redirect to WhatsApp with order details
                let message = "I want to purchase the following items:\n\n";
                cart.forEach((item, i) => {
                    message += `${i + 1}. ${item.name} - ${item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price}\n`;
                });

                const total = cartTotalValue.textContent;
                message += `\nTotal: ${total}\nPayment Method: ${activeMethod.toUpperCase()}\n\nPlease confirm my order.`;

                const whatsappUrl = `https://wa.me/94765494631?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');

                // Clear cart locally
                cart = [];
                updateCartUI();

                paymentModal.classList.remove('active');
            }
        });
    }

    // Quotation Generation Logic
    const generateQuotationBtn = document.getElementById('generate-quotation');
    const quotationModal = document.getElementById('quotation-modal');
    const qItemsBody = document.getElementById('q-items-body');
    const qTotal = document.getElementById('q-total');
    const qDate = document.getElementById('q-date');
    const qNumber = document.getElementById('q-number');
    const closeQuotation = (quotationModal) ? quotationModal.querySelector('.close-popup') : null;

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
            if (quotationModal) {
                quotationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            // Close Cart Sidebar
            if (cartSidebar.classList.contains('active')) {
                toggleCart();
            }
        });

        if (closeQuotation) {
            closeQuotation.addEventListener('click', () => {
                quotationModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

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
});
