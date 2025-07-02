// Portfolio Dashboard App - 2025 Advanced Features

// Application Data
const portfolioData = {
    totalValue: 125420.50,
    dailyChange: 2840.25,
    dailyChangePercent: 2.32,
    totalReturn: 25420.50,
    totalReturnPercent: 25.42,
    allocation: {
        stocks: 65.2,
        bonds: 15.8,
        crypto: 12.5,
        cash: 6.5
    }
};

const marketData = [
    {"symbol": "AAPL", "price": 195.84, "change": 2.34, "changePercent": 1.21},
    {"symbol": "GOOGL", "price": 142.56, "change": -1.23, "changePercent": -0.85},
    {"symbol": "MSFT", "price": 378.91, "change": 4.67, "changePercent": 1.25},
    {"symbol": "TSLA", "price": 248.73, "change": -3.21, "changePercent": -1.27},
    {"symbol": "NVDA", "price": 567.12, "change": 12.45, "changePercent": 2.24},
    {"symbol": "BTC-USD", "price": 67234.56, "change": 1823.45, "changePercent": 2.78}
];

const teamMembers = [
    {
        "name": "Shivam Vijai Sharma",
        "role": "Team Lead",
        "description": "Leading the team with vision and clarity, bringing strong technical insight into quantitative finance and algorithmic trading.",
        "expertise": ["Quantitative Finance", "Algorithmic Trading", "Python", "LaTeX", "Team Leadership"]
    },
    {
        "name": "Aditya Dave", 
        "role": "Financial Strategy Developer",
        "description": "A meticulous thinker with a knack for market behavior, focusing on shaping financial logic and trading models.",
        "expertise": ["Market Analysis", "Trading Models", "Python", "Financial Logic", "Algorithm Development"]
    },
    {
        "name": "Vidushi Rajhans",
        "role": "Design & Analytics Lead", 
        "description": "Combining creative design with data-driven thinking, ensuring the platform is both functional and visually compelling.",
        "expertise": ["UI/UX Design", "Data Analytics", "Backtesting", "Frontend Development"]
    },
    {
        "name": "Mohit Patil",
        "role": "Full Stack Developer",
        "description": "Crafting digital interfaces and backend flow, translating ideas into seamless user experiences.",
        "expertise": ["Full Stack Development", "Web Technologies", "Machine Learning", "Backend Systems"]
    }
];

const news = [
    {
        "title": "AI Revolution Drives Tech Stocks to New Highs",
        "summary": "Major technology companies see unprecedented growth as AI adoption accelerates across industries.",
        "sentiment": "positive",
        "time": "2h ago"
    },
    {
        "title": "Federal Reserve Signals Potential Rate Adjustments", 
        "summary": "Market analysts anticipate policy changes following latest economic indicators and inflation data.",
        "sentiment": "neutral",
        "time": "4h ago"
    }
];

// Global variables for charts
let allocationChart = null;
let performanceChart = null;
let trendsChart = null;

// DOM Elements - Initialize after DOM is loaded
let hamburgerBtn, sidebar, mainContent, themeToggle, chatbotFab, chatbotModal, closeChatbot, loadingScreen;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    hamburgerBtn = document.getElementById('hamburgerBtn');
    sidebar = document.getElementById('sidebar');
    mainContent = document.getElementById('mainContent');
    themeToggle = document.getElementById('themeToggle');
    chatbotFab = document.getElementById('chatbotFab');
    chatbotModal = document.getElementById('chatbotModal');
    closeChatbot = document.getElementById('closeChatbot');
    loadingScreen = document.getElementById('loadingScreen');
    
    initializeApp();
});

function initializeApp() {
    // Show loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Initialize components
        initializeHamburgerMenu();
        initializeThemeToggle();
        initializeNavigation();
        initializeChatbot();
        initializeVoiceSearch();
        
        // Load data
        loadPortfolioData();
        loadMarketTicker();
        loadWatchlist();
        loadTeamMembers();
        loadNews();
        
        // Initialize charts
        initializeCharts();
        
        // Start real-time updates
        startRealTimeUpdates();
    }, 1500);
}

// Hamburger Menu Functionality
function initializeHamburgerMenu() {
    if (!hamburgerBtn || !sidebar || !mainContent) return;
    
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        sidebar.classList.toggle('open');
        
        // Add overlay for mobile
        if (window.innerWidth <= 1024) {
            if (sidebar.classList.contains('open')) {
                createOverlay();
            } else {
                removeOverlay();
            }
        } else {
            mainContent.classList.toggle('sidebar-open');
        }
    });
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
        backdrop-filter: blur(5px);
    `;
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
}

function removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function closeSidebar() {
    if (hamburgerBtn && sidebar && mainContent) {
        hamburgerBtn.classList.remove('active');
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
        removeOverlay();
    }
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light
    const savedTheme = 'light'; // Removed localStorage to comply with strict instructions
    applyTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    if (themeToggle) {
        themeToggle.classList.toggle('dark-mode', theme === 'dark');
    }
}

// Navigation Functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section with smooth transition
            sections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.style.display = 'block';
                setTimeout(() => {
                    targetElement.classList.add('active');
                }, 10);
            }
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
            
            // Reinitialize charts if switching to sections with charts
            if (targetSection === 'dashboard' || targetSection === 'analytics') {
                setTimeout(() => {
                    initializeCharts();
                }, 300);
            }
        });
    });
}

// Chatbot Functionality
function initializeChatbot() {
    if (!chatbotFab || !chatbotModal || !closeChatbot) return;
    
    chatbotFab.addEventListener('click', function() {
        chatbotModal.classList.add('open');
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbotModal.classList.remove('open');
    });
    
    // Close modal when clicking outside
    chatbotModal.addEventListener('click', function(e) {
        if (e.target === chatbotModal) {
            chatbotModal.classList.remove('open');
        }
    });
    
    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatMessages = document.getElementById('chatMessages');
    
    function sendMessage() {
        if (!chatInput || !chatMessages) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I can help you analyze your portfolio performance. What specific metrics would you like to explore?",
                "Based on your current allocation, I recommend considering rebalancing your crypto exposure.",
                "Your portfolio is performing well with a 25.42% return. Would you like insights on optimization strategies?",
                "I notice increased volatility in your tech holdings. Shall we discuss risk management options?",
                "Your diversification looks good. Consider adding some defensive stocks for stability."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage(randomResponse, 'bot');
        }, 1000);
    }
    
    function addChatMessage(message, sender) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    if (sendChat) {
        sendChat.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Voice Search Functionality
function initializeVoiceSearch() {
    const voiceBtn = document.querySelector('.voice-search-btn');
    if (!voiceBtn) return;
    
    voiceBtn.addEventListener('click', function() {
        // Simulate voice search activation
        this.style.background = 'linear-gradient(135deg, #1FB8CD, #32b8c8)';
        this.style.color = 'white';
        this.innerHTML = '🎙️';
        
        // Simulate listening
        setTimeout(() => {
            this.style.background = '';
            this.style.color = '';
            this.innerHTML = '🎤';
            
            // Show mock voice result
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                const mockQueries = ['AAPL stock price', 'Bitcoin news', 'Portfolio performance', 'Market trends'];
                searchInput.value = mockQueries[Math.floor(Math.random() * mockQueries.length)];
                searchInput.focus();
            }
        }, 2000);
    });
}

// Portfolio Data Loading
function loadPortfolioData() {
    animateValue('portfolioValue', 0, portfolioData.totalValue, 2000, (value) => `$${value.toLocaleString()}`);
    
    const changeElement = document.getElementById('portfolioChange');
    if (changeElement) {
        const changeAmount = changeElement.querySelector('.change-amount');
        const changePercent = changeElement.querySelector('.change-percent');
        
        if (changeAmount) {
            animateValue(changeAmount, 0, portfolioData.dailyChange, 2000, (value) => `+$${value.toLocaleString()}`);
        }
        if (changePercent) {
            changePercent.textContent = `(+${portfolioData.dailyChangePercent}%)`;
        }
    }
    
    const totalReturnElement = document.getElementById('totalReturn');
    if (totalReturnElement) {
        animateValue(totalReturnElement, 0, portfolioData.totalReturn, 2000, (value) => `$${value.toLocaleString()}`);
    }
}

function animateValue(element, start, end, duration, formatter) {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (endValue - startValue) * easeOutQuart;
        
        const targetElement = typeof element === 'string' ? document.getElementById(element) : element;
        if (targetElement) {
            targetElement.textContent = formatter ? formatter(currentValue) : currentValue.toFixed(2);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Market Ticker
function loadMarketTicker() {
    const tickerContent = document.getElementById('marketTicker');
    if (!tickerContent) return;
    
    const tickerItems = marketData.map(stock => {
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = stock.change >= 0 ? '+' : '';
        
        return `
            <div class="ticker-item">
                <span class="ticker-symbol">${stock.symbol}</span>
                <span class="ticker-price">$${stock.price.toFixed(2)}</span>
                <span class="ticker-change ${changeClass}">${changeSymbol}${stock.change.toFixed(2)} (${changeSymbol}${stock.changePercent.toFixed(2)}%)</span>
            </div>
        `;
    }).join('');
    
    tickerContent.innerHTML = tickerItems;
}

// Watchlist
function loadWatchlist() {
    const watchlist = document.getElementById('watchlist');
    if (!watchlist) return;
    
    const watchlistItems = marketData.slice(0, 5).map(stock => {
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = stock.change >= 0 ? '+' : '';
        
        return `
            <div class="watchlist-item">
                <div>
                    <div class="watchlist-symbol">${stock.symbol}</div>
                    <div class="watchlist-price">$${stock.price.toFixed(2)}</div>
                </div>
                <div class="watchlist-change ${changeClass}">
                    ${changeSymbol}${stock.change.toFixed(2)} (${changeSymbol}${stock.changePercent.toFixed(2)}%)
                </div>
            </div>
        `;
    }).join('');
    
    watchlist.innerHTML = watchlistItems;
}

// Team Members
function loadTeamMembers() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;
    
    const teamCards = teamMembers.map(member => {
        const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        const expertiseTags = member.expertise.map(skill => 
            `<span class="expertise-tag">${skill}</span>`
        ).join('');
        
        return `
            <div class="card glass-card team-card">
                <div class="team-avatar">${initials}</div>
                <div class="team-name">${member.name}</div>
                <div class="team-role">${member.role}</div>
                <div class="team-description">${member.description}</div>
                <div class="team-expertise">${expertiseTags}</div>
            </div>
        `;
    }).join('');
    
    teamGrid.innerHTML = teamCards;
}

// News Feed
function loadNews() {
    const newsFeed = document.getElementById('newsFeed');
    if (!newsFeed) return;
    
    const newsItems = news.map(article => `
        <div class="card glass-card news-item">
            <div class="news-header">
                <div>
                    <div class="news-title">${article.title}</div>
                    <div class="news-time">${article.time}</div>
                </div>
                <span class="news-sentiment ${article.sentiment}">${article.sentiment}</span>
            </div>
            <div class="news-summary">${article.summary}</div>
        </div>
    `).join('');
    
    newsFeed.innerHTML = newsItems;
}

// Chart Initialization
function initializeCharts() {
    // Destroy existing charts if they exist
    if (allocationChart) {
        allocationChart.destroy();
        allocationChart = null;
    }
    if (performanceChart) {
        performanceChart.destroy();
        performanceChart = null;
    }
    if (trendsChart) {
        trendsChart.destroy();
        trendsChart = null;
    }
    
    // Portfolio Allocation Chart
    const allocationCanvas = document.getElementById('allocationChart');
    if (allocationCanvas) {
        const allocationCtx = allocationCanvas.getContext('2d');
        allocationChart = new Chart(allocationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Stocks', 'Bonds', 'Crypto', 'Cash'],
                datasets: [{
                    data: [
                        portfolioData.allocation.stocks,
                        portfolioData.allocation.bonds,
                        portfolioData.allocation.crypto,
                        portfolioData.allocation.cash
                    ],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                }
            }
        });
    }
    
    // Performance Chart
    const performanceCanvas = document.getElementById('performanceChart');
    if (performanceCanvas) {
        const performanceCtx = performanceCanvas.getContext('2d');
        const performanceData = Array.from({length: 30}, (_, i) => ({
            x: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
            y: 100000 + Math.random() * 30000 + i * 800
        }));
        
        performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Portfolio Value',
                    data: performanceData,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Trends Chart
    const trendsCanvas = document.getElementById('trendsChart');
    if (trendsCanvas) {
        const trendsCtx = trendsCanvas.getContext('2d');
        const trendsData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Market Trend',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        trendsChart = new Chart(trendsCtx, {
            type: 'line',
            data: trendsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Real-time Updates
function startRealTimeUpdates() {
    // Update market data every 5 seconds
    setInterval(() => {
        updateMarketData();
    }, 5000);
    
    // Update portfolio value every 10 seconds
    setInterval(() => {
        updatePortfolioValue();
    }, 10000);
}

function updateMarketData() {
    marketData.forEach(stock => {
        // Simulate price changes
        const changePercent = (Math.random() - 0.5) * 0.02; // ±1% max change
        const priceChange = stock.price * changePercent;
        stock.price += priceChange;
        stock.change += priceChange;
        stock.changePercent = (stock.change / (stock.price - stock.change)) * 100;
    });
    
    // Update ticker
    loadMarketTicker();
    loadWatchlist();
}

function updatePortfolioValue() {
    // Simulate portfolio value changes
    const changePercent = (Math.random() - 0.5) * 0.01; // ±0.5% max change
    const valueChange = portfolioData.totalValue * changePercent;
    portfolioData.totalValue += valueChange;
    portfolioData.dailyChange += valueChange;
    portfolioData.dailyChangePercent = (portfolioData.dailyChange / (portfolioData.totalValue - portfolioData.dailyChange)) * 100;
    
    // Update display
    const portfolioValueElement = document.getElementById('portfolioValue');
    const changeAmountElement = document.querySelector('.change-amount');
    const changePercentElement = document.querySelector('.change-percent');
    
    if (portfolioValueElement) {
        portfolioValueElement.textContent = `$${portfolioData.totalValue.toLocaleString()}`;
    }
    if (changeAmountElement) {
        changeAmountElement.textContent = `${portfolioData.dailyChange >= 0 ? '+' : ''}$${Math.abs(portfolioData.dailyChange).toLocaleString()}`;
    }
    if (changePercentElement) {
        changePercentElement.textContent = `(${portfolioData.dailyChangePercent >= 0 ? '+' : ''}${portfolioData.dailyChangePercent.toFixed(2)}%)`;
    }
    
    // Update color based on change
    const changeElement = document.getElementById('portfolioChange');
    if (changeElement) {
        changeElement.className = `portfolio-change ${portfolioData.dailyChange >= 0 ? 'positive' : 'negative'}`;
    }
}

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        removeOverlay();
        if (sidebar && sidebar.classList.contains('open') && mainContent) {
            mainContent.classList.add('sidebar-open');
        }
    } else {
        if (mainContent) {
            mainContent.classList.remove('sidebar-open');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Toggle sidebar with Ctrl+B
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        if (hamburgerBtn) hamburgerBtn.click();
    }
    
    // Toggle theme with Ctrl+T
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        if (themeToggle) themeToggle.click();
    }
    
    // Open chatbot with Ctrl+Space
    if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        if (chatbotFab) chatbotFab.click();
    }
});

console.log('Portfolio Dashboard Pro initialized successfully! 🚀');