// Application Data
const appData = {
  teamMembers: [
    {
      name: "Shivam Vijai Sharma",
      role: "Team Lead", 
      description: "Leading the team with vision and clarity, Shivam brings strong technical insight into quantitative finance and algorithmic trading. With hands-on skills in Python and LaTeX, he ensures strategic coordination and effective execution across all modules.",
      expertise: ["Quantitative Finance", "Algorithmic Trading", "Python", "LaTeX", "Team Leadership"],
      photo: "Shivam.jpg"
    },
    {
      name: "Aditya Dave",
      role: "Financial Strategy Developer",
      description: "A meticulous thinker with a knack for market behavior, Aditya focuses on shaping our financial logic and trading models. His background in Python and finance helps bridge quantitative insights with practical algorithms.",
      expertise: ["Market Analysis", "Trading Models", "Python", "Financial Logic", "Algorithm Development"],
      photo: "Aditya.jpg"
    },
    {
      name: "Vidushi Rajhans", 
      role: "Design & Analytics Lead",
      description: "Combining creative design with data-driven thinking, Vidushi ensures our platform is not only functional but also visually compelling. Her cross-domain skills—from Canva to backtesting—make her an integral part of both front-end and financial analytics.",
      expertise: ["UI/UX Design", "Data Analytics", "Canva", "Backtesting", "Frontend Development"],
      photo: "Vidushi.jpg"
    },
    {
      name: "Mohit Patil",
      role: "Full Stack Developer", 
      description: "Mohit crafts the digital interface and backend flow, translating ideas into seamless user experiences. With a strong command of web technologies and machine learning tools, he builds the bridge between data and user interaction.",
      expertise: ["Full Stack Development", "Web Technologies", "Machine Learning", "Backend Systems", "User Experience"],
      photo: "Mohit.jpg"
    }
  ],
  portfolioData: {
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
  },
  marketData: [
    {"symbol": "AAPL", "price": 195.84, "change": 2.34, "changePercent": 1.21},
    {"symbol": "GOOGL", "price": 142.56, "change": -1.23, "changePercent": -0.85},
    {"symbol": "MSFT", "price": 378.91, "change": 4.67, "changePercent": 1.25},
    {"symbol": "TSLA", "price": 248.73, "change": -3.21, "changePercent": -1.27},
    {"symbol": "NVDA", "price": 567.12, "change": 12.45, "changePercent": 2.24},
    {"symbol": "AMZN", "price": 186.41, "change": 1.89, "changePercent": 1.03},
    {"symbol": "META", "price": 512.33, "change": -5.67, "changePercent": -1.09},
    {"symbol": "BTC-USD", "price": 67234.56, "change": 1823.45, "changePercent": 2.78}
  ],
  news: [
    {
      title: "AI Revolution Drives Tech Stocks to New Highs",
      summary: "Major technology companies see unprecedented growth as AI adoption accelerates across industries.",
      sentiment: "positive",
      time: "2h ago"
    },
    {
      title: "Federal Reserve Signals Potential Rate Adjustments",
      summary: "Market analysts anticipate policy changes following latest economic indicators and inflation data.",
      sentiment: "neutral", 
      time: "4h ago"
    },
    {
      title: "Cryptocurrency Market Shows Strong Recovery",
      summary: "Bitcoin and major altcoins rally as institutional adoption continues to grow worldwide.",
      sentiment: "positive",
      time: "6h ago"
    }
  ],
  tradingStrategies: [
    {
      name: "Moving Average Crossover",
      description: "Buy when short MA crosses above long MA, sell when it crosses below",
      returns: "18.4%",
      sharpeRatio: 1.32,
      maxDrawdown: "-8.7%"
    },
    {
      name: "RSI Momentum", 
      description: "Trade based on RSI overbought/oversold conditions with trend confirmation",
      returns: "22.1%",
      sharpeRatio: 1.48,
      maxDrawdown: "-12.3%"
    },
    {
      name: "Bollinger Band Breakout",
      description: "Enter positions on breakouts from Bollinger Band boundaries",
      returns: "15.8%", 
      sharpeRatio: 1.15,
      maxDrawdown: "-6.9%"
    }
  ]
};

// Global Variables
let currentSection = 'dashboard';
let currentTeamIndex = 0;
let marketDataInterval;
let portfolioChart;
let tradingChart;
let sentimentChart;
let sectorChart;
let backtestChart;
let orderHistory = [];
let isAuthenticated = false;
let currentUser = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupAuthTabs();
  setupFormHandlers();
  
  // Show auth page by default
  showAuthPage();
}

// Setup form event handlers
function setupFormHandlers() {
  // Login form handler
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const loginBtn = loginForm.querySelector('.btn--primary');
    if (loginBtn) {
      loginBtn.addEventListener('click', handleLogin);
    }
  }
  
  // Signup form handler
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    const signupBtn = signupForm.querySelector('.btn--primary');
    if (signupBtn) {
      signupBtn.addEventListener('click', handleSignup);
    }
  }
  
  // Guest access buttons
  const guestBtns = document.querySelectorAll('.auth-alternatives .btn');
  guestBtns.forEach(btn => {
    btn.addEventListener('click', enterPlatform);
  });
}

// Authentication Functions
function setupAuthTabs() {
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetForm = tab.getAttribute('data-tab');
      
      // Update active tab
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active form
      authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `${targetForm}-form`) {
          form.classList.add('active');
        }
      });
    });
  });
}

function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Show loading state
  const loginBtn = event.target;
  const originalText = loginBtn.textContent;
  loginBtn.textContent = 'Signing In...';
  loginBtn.disabled = true;
  
  // Simulate authentication delay
  setTimeout(() => {
    // Reset button state
    loginBtn.textContent = originalText;
    loginBtn.disabled = false;
    
    // Always successful - no actual validation
    isAuthenticated = true;
    currentUser = {
      email: email || 'user@quantfinpro.com',
      name: email ? email.split('@')[0] : 'Guest User'
    };
    
    showNotification('Login successful! Welcome to QuantFin Pro');
    enterPlatform();
  }, 1000);
}

function handleSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
  // Show loading state
  const signupBtn = event.target;
  const originalText = signupBtn.textContent;
  signupBtn.textContent = 'Creating Account...';
  signupBtn.disabled = true;
  
  // Simulate authentication delay
  setTimeout(() => {
    // Reset button state
    signupBtn.textContent = originalText;
    signupBtn.disabled = false;
    
    // Always successful - no actual validation
    isAuthenticated = true;
    currentUser = {
      email: email || 'user@quantfinpro.com',
      name: name || 'New User'
    };
    
    showNotification('Account created successfully! Welcome to QuantFin Pro');
    enterPlatform();
  }, 1000);
}

function enterPlatform() {
  // Hide auth section
  const authSection = document.getElementById('auth');
  if (authSection) {
    authSection.style.display = 'none';
  }
  
  // Show platform elements
  const platformElements = document.querySelectorAll('.platform-element');
  platformElements.forEach(element => {
    element.style.display = 'block';
  });
  
  // Initialize platform
  setupNavigation();
  initializeMarketTicker();
  setTimeout(() => {
    initializeCharts();
  }, 100);
  populateData();
  initializeTeamCarousel();
  startRealTimeUpdates();
  
  // Show dashboard by default
  showSection('dashboard');
  
  // Set authentication state
  isAuthenticated = true;
}

function logout() {
  // Reset authentication state
  isAuthenticated = false;
  currentUser = null;
  
  // Stop real-time updates
  if (marketDataInterval) {
    clearInterval(marketDataInterval);
  }
  
  // Hide platform elements
  const platformElements = document.querySelectorAll('.platform-element');
  platformElements.forEach(element => {
    element.style.display = 'none';
  });
  
  // Show auth section
  showAuthPage();
  
  // Reset forms
  document.querySelectorAll('.form-control').forEach(input => {
    input.value = '';
  });
  
  showNotification('Logged out successfully');
}

// Navigation System
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      showSection(section);
    });
  });
  
  // Setup logout button
  const logoutBtn = document.querySelector('.nav-actions .btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
}

function showSection(sectionName) {
  // Hide all platform sections
  document.querySelectorAll('.section.platform-element').forEach(section => {
    section.style.display = 'none';
  });
  
  // Show selected section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.style.display = 'block';
  }
  
  // Update navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionName) {
      link.classList.add('active');
    }
  });
  
  currentSection = sectionName;
  
  // Initialize section-specific functionality
  setTimeout(() => {
    if (sectionName === 'dashboard') {
      updateDashboard();
    } else if (sectionName === 'trading') {
      updateTradingPanel();
    } else if (sectionName === 'analytics') {
      updateAnalytics();
    } else if (sectionName === 'strategies') {
      updateStrategies();
    } else if (sectionName === 'team') {
      updateTeamSection();
    }
  }, 100);
}

function showAuthPage() {
  const authSection = document.getElementById('auth');
  if (authSection) {
    authSection.style.display = 'flex';
  }
  
  // Hide platform elements
  const platformElements = document.querySelectorAll('.platform-element');
  platformElements.forEach(element => {
    element.style.display = 'none';
  });
}

// Market Ticker
function initializeMarketTicker() {
  const tickerContent = document.getElementById('tickerContent');
  if (!tickerContent) return;
  
  let tickerHTML = '';
  
  appData.marketData.forEach(stock => {
    const changeClass = stock.change >= 0 ? 'positive' : 'negative';
    const changeSymbol = stock.change >= 0 ? '+' : '';
    tickerHTML += `
      <span class="ticker-item">
        <span class="ticker-symbol">${stock.symbol}</span>
        <span class="ticker-price">$${stock.price.toFixed(2)}</span>
        <span class="ticker-change ${changeClass}">${changeSymbol}${stock.change.toFixed(2)} (${changeSymbol}${stock.changePercent.toFixed(2)}%)</span>
      </span>
    `;
  });
  
  tickerContent.innerHTML = tickerHTML;
}

// Charts Initialization
function initializeCharts() {
  initializeAllocationChart();
  initializeTradingChart();
  initializeSentimentChart();
  initializeSectorChart();
  initializeBacktestChart();
}

function initializeAllocationChart() {
  const allocationCtx = document.getElementById('allocationChart');
  if (allocationCtx && !portfolioChart) {
    portfolioChart = new Chart(allocationCtx, {
      type: 'doughnut',
      data: {
        labels: ['Stocks', 'Bonds', 'Crypto', 'Cash'],
        datasets: [{
          data: [65.2, 15.8, 12.5, 6.5],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f5f5f5',
              padding: 15,
              usePointStyle: true
            }
          }
        }
      }
    });
  }
}

function initializeTradingChart() {
  const tradingCtx = document.getElementById('tradingChart');
  if (tradingCtx && !tradingChart) {
    const priceData = generatePriceData();
    tradingChart = new Chart(tradingCtx, {
      type: 'line',
      data: {
        labels: priceData.labels,
        datasets: [{
          label: 'AAPL Price',
          data: priceData.prices,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#f5f5f5' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#a7a9a9' },
            grid: { color: 'rgba(119, 124, 124, 0.3)' }
          },
          y: {
            ticks: { color: '#a7a9a9' },
            grid: { color: 'rgba(119, 124, 124, 0.3)' }
          }
        }
      }
    });
  }
}

function initializeSentimentChart() {
  const sentimentCtx = document.getElementById('sentimentChart');
  if (sentimentCtx && !sentimentChart) {
    sentimentChart = new Chart(sentimentCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [75, 25],
          backgroundColor: ['#4ade80', '#374151'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        circumference: 180,
        rotation: 270,
        cutout: '80%',
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

function initializeSectorChart() {
  const sectorCtx = document.getElementById('sectorChart');
  if (sectorCtx && !sectorChart) {
    sectorChart = new Chart(sectorCtx, {
      type: 'bar',
      data: {
        labels: ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer'],
        datasets: [{
          label: 'Performance (%)',
          data: [8.5, 3.2, -1.4, 5.7, 2.1],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#D2BA4C'],
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#a7a9a9' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#a7a9a9' },
            grid: { color: 'rgba(119, 124, 124, 0.3)' }
          }
        }
      }
    });
  }
}

function initializeBacktestChart() {
  const backtestCtx = document.getElementById('backtestChart');
  if (backtestCtx && !backtestChart) {
    const backtestData = generateBacktestData();
    backtestChart = new Chart(backtestCtx, {
      type: 'line',
      data: {
        labels: backtestData.labels,
        datasets: [{
          label: 'Strategy Performance',
          data: backtestData.returns,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0
        }, {
          label: 'Benchmark',
          data: backtestData.benchmark,
          borderColor: '#FFC185',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#f5f5f5' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#a7a9a9' },
            grid: { color: 'rgba(119, 124, 124, 0.3)' }
          },
          y: {
            ticks: { color: '#a7a9a9' },
            grid: { color: 'rgba(119, 124, 124, 0.3)' }
          }
        }
      }
    });
  }
}

// Populate Data
function populateData() {
  populatePositions();
  populateNews();
}

function populatePositions() {
  const positionsList = document.getElementById('positionsList');
  if (!positionsList) return;
  
  let positionsHTML = '';
  const topPositions = appData.marketData.slice(0, 5);
  
  topPositions.forEach(position => {
    const changeClass = position.change >= 0 ? 'positive' : 'negative';
    const value = (position.price * Math.floor(Math.random() * 100 + 10)).toFixed(2);
    
    positionsHTML += `
      <div class="position-item">
        <div>
          <div class="position-symbol">${position.symbol}</div>
          <div class="position-price">$${position.price.toFixed(2)}</div>
        </div>
        <div class="position-value">
          <div>$${value}</div>
          <div class="metric-value ${changeClass}">${position.change >= 0 ? '+' : ''}${position.changePercent.toFixed(2)}%</div>
        </div>
      </div>
    `;
  });
  
  positionsList.innerHTML = positionsHTML;
}

function populateNews() {
  const newsList = document.getElementById('newsList');
  if (!newsList) return;
  
  let newsHTML = '';
  
  appData.news.forEach(item => {
    newsHTML += `
      <div class="news-item">
        <div class="news-title">${item.title}</div>
        <div class="news-summary">${item.summary}</div>
        <div class="news-meta">
          <span class="news-sentiment ${item.sentiment}">${item.sentiment}</span>
          <span class="news-time">${item.time}</span>
        </div>
      </div>
    `;
  });
  
  newsList.innerHTML = newsHTML;
}

// Trading Functions
function executeTrade(action) {
  const symbol = document.getElementById('tradingSymbol').value;
  const quantity = parseInt(document.getElementById('orderQuantity').value);
  const price = parseFloat(document.getElementById('orderPrice').value);
  const orderType = document.getElementById('orderType').value;
  
  const order = {
    id: Date.now(),
    symbol,
    action: action.toUpperCase(),
    quantity,
    price,
    type: orderType,
    timestamp: new Date().toLocaleTimeString(),
    status: 'Executed'
  };
  
  orderHistory.unshift(order);
  updateOrderHistory();
  
  // Update portfolio value
  const portfolioValue = document.getElementById('portfolioValue');
  const availableBalance = document.getElementById('availableBalance');
  
  if (portfolioValue && availableBalance) {
    const tradeValue = quantity * price;
    
    if (action === 'buy') {
      appData.portfolioData.totalValue += tradeValue * 0.02;
      const currentBalance = parseFloat(availableBalance.textContent.replace(/[$,]/g, ''));
      availableBalance.textContent = `$${(currentBalance - tradeValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      appData.portfolioData.totalValue += tradeValue * 0.01;
      const currentBalance = parseFloat(availableBalance.textContent.replace(/[$,]/g, ''));
      availableBalance.textContent = `$${(currentBalance + tradeValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
    portfolioValue.textContent = `$${appData.portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  showNotification(`${action.toUpperCase()} order executed: ${quantity} shares of ${symbol} at $${price.toFixed(2)}`);
}

function updateOrderHistory() {
  const orderHistoryElement = document.getElementById('orderHistory');
  if (!orderHistoryElement) return;
  
  let historyHTML = '';
  const recentOrders = orderHistory.slice(0, 10);
  
  if (recentOrders.length === 0) {
    historyHTML = `
      <div class="order-item">
        <div>
          <span class="order-type buy">BUY</span>
          <span>AAPL</span>
        </div>
        <div>
          <div>10 @ $195.84</div>
          <div style="font-size: 0.75rem; color: var(--color-text-secondary);">09:30 AM</div>
        </div>
      </div>
      <div class="order-item">
        <div>
          <span class="order-type sell">SELL</span>
          <span>TSLA</span>
        </div>
        <div>
          <div>5 @ $248.73</div>
          <div style="font-size: 0.75rem; color: var(--color-text-secondary);">09:15 AM</div>
        </div>
      </div>
    `;
  } else {
    recentOrders.forEach(order => {
      historyHTML += `
        <div class="order-item">
          <div>
            <span class="order-type ${order.action.toLowerCase()}">${order.action}</span>
            <span>${order.symbol}</span>
          </div>
          <div>
            <div>${order.quantity} @ $${order.price.toFixed(2)}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${order.timestamp}</div>
          </div>
        </div>
      `;
    });
  }
  
  orderHistoryElement.innerHTML = historyHTML;
}

// Strategy Functions
function selectStrategy(index) {
  document.querySelectorAll('.strategy-option').forEach((option, i) => {
    option.classList.toggle('active', i === index);
  });
}

function runBacktest() {
  showNotification('Running backtest...');
  
  setTimeout(() => {
    updateBacktestResults();
    showNotification('Backtest completed successfully!');
  }, 2000);
}

function updateBacktestResults() {
  if (backtestChart) {
    const newData = generateBacktestData();
    backtestChart.data.labels = newData.labels;
    backtestChart.data.datasets[0].data = newData.returns;
    backtestChart.data.datasets[1].data = newData.benchmark;
    backtestChart.update();
  }
}

// Team Carousel Functions
function initializeTeamCarousel() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => previousSlide());
    nextBtn.addEventListener('click', () => nextSlide());
  }
  
  // Initialize indicators with click handlers
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
}

function goToSlide(index) {
  const carousel = document.getElementById('teamCarousel');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!carousel) return;
  
  currentTeamIndex = index;
  carousel.style.transform = `translateX(-${index * 100}%)`;
  
  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentTeamIndex = (currentTeamIndex + 1) % appData.teamMembers.length;
  goToSlide(currentTeamIndex);
}

function previousSlide() {
  currentTeamIndex = (currentTeamIndex - 1 + appData.teamMembers.length) % appData.teamMembers.length;
  goToSlide(currentTeamIndex);
}

// Real-time Updates
function startRealTimeUpdates() {
  marketDataInterval = setInterval(() => {
    updateMarketData();
    updatePortfolioValue();
    if (currentSection === 'trading' && tradingChart) {
      updateTradingChart();
    }
  }, 3000);
}

function updateMarketData() {
  appData.marketData.forEach(stock => {
    const change = (Math.random() - 0.5) * 2;
    stock.price += change;
    stock.change += change;
    stock.changePercent = (stock.change / (stock.price - stock.change)) * 100;
  });
  
  initializeMarketTicker();
  if (currentSection === 'dashboard') {
    populatePositions();
  }
}

function updatePortfolioValue() {
  const portfolioValue = document.getElementById('portfolioValue');
  const portfolioChange = document.getElementById('portfolioChange');
  const dailyPL = document.getElementById('dailyPL');
  
  if (portfolioValue && portfolioChange) {
    const change = (Math.random() - 0.4) * 1000;
    appData.portfolioData.totalValue += change;
    appData.portfolioData.dailyChange += change;
    appData.portfolioData.dailyChangePercent = (appData.portfolioData.dailyChange / (appData.portfolioData.totalValue - appData.portfolioData.dailyChange)) * 100;
    
    portfolioValue.textContent = `$${appData.portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    const changeClass = appData.portfolioData.dailyChange >= 0 ? 'positive' : 'negative';
    const changeSymbol = appData.portfolioData.dailyChange >= 0 ? '+' : '';
    const changeText = `${changeSymbol}$${Math.abs(appData.portfolioData.dailyChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${changeSymbol}${appData.portfolioData.dailyChangePercent.toFixed(2)}%)`;
    
    portfolioChange.textContent = changeText;
    portfolioChange.className = `value-change ${changeClass}`;
    
    if (dailyPL) {
      dailyPL.textContent = changeText;
      dailyPL.className = `metric-value ${changeClass}`;
    }
  }
}

function updateTradingChart() {
  if (tradingChart) {
    const newData = generatePriceData();
    tradingChart.data.labels = newData.labels;
    tradingChart.data.datasets[0].data = newData.prices;
    tradingChart.update('none');
  }
}

// Update Functions
function updateDashboard() {
  populatePositions();
  if (portfolioChart) {
    portfolioChart.update();
  }
}

function updateTradingPanel() {
  updateOrderHistory();
  if (!tradingChart) {
    setTimeout(initializeTradingChart, 100);
  }
}

function updateAnalytics() {
  if (!sentimentChart) {
    setTimeout(initializeSentimentChart, 100);
  }
  if (!sectorChart) {
    setTimeout(initializeSectorChart, 100);
  }
}

function updateStrategies() {
  if (!backtestChart) {
    setTimeout(initializeBacktestChart, 100);
  }
}

function updateTeamSection() {
  // Reset carousel to first slide when entering team section
  currentTeamIndex = 0;
  goToSlide(0);
}

// Helper Functions
function generatePriceData() {
  const labels = [];
  const prices = [];
  const basePrice = 195.84;
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i);
    labels.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    const variation = (Math.random() - 0.5) * 4;
    prices.push(basePrice + variation + (Math.sin(i / 5) * 2));
  }
  
  return { labels, prices };
}

function generateBacktestData() {
  const labels = [];
  const returns = [];
  const benchmark = [];
  
  let strategyValue = 100;
  let benchmarkValue = 100;
  
  for (let i = 0; i < 252; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (252 - i));
    labels.push(date.toLocaleDateString());
    
    const strategyChange = (Math.random() - 0.45) * 2;
    strategyValue *= (1 + strategyChange / 100);
    returns.push(strategyValue);
    
    const benchmarkChange = (Math.random() - 0.48) * 1.8;
    benchmarkValue *= (1 + benchmarkChange / 100);
    benchmark.push(benchmarkValue);
  }
  
  return { labels, returns, benchmark };
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--color-primary);
    color: var(--color-btn-primary-text);
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    box-shadow: var(--shadow-lg);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Auto-advance team carousel
setInterval(() => {
  if (currentSection === 'team' && isAuthenticated) {
    nextSlide();
  }
}, 5000);

// Cleanup
window.addEventListener('beforeunload', () => {
  if (marketDataInterval) {
    clearInterval(marketDataInterval);
  }
});