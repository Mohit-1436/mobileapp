// Mobile Trading Platform JavaScript

// Application data
const appData = {
  teamMembers: [
    {
      name: "Shivam Vijai Sharma",
      role: "Team Lead",
      description: "Leading the team with vision and clarity, Shivam brings strong technical insight into quantitative finance and algorithmic trading. With hands-on skills in Python and LaTeX, he ensures strategic coordination and effective execution across all modules.",
      expertise: ["Quantitative Finance", "Algorithmic Trading", "Python", "LaTeX", "Team Leadership"],
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Aditya Dave",
      role: "Financial Strategy Developer", 
      description: "A meticulous thinker with a knack for market behavior, Aditya focuses on shaping our financial logic and trading models. His background in Python and finance helps bridge quantitative insights with practical algorithms.",
      expertise: ["Market Analysis", "Trading Models", "Python", "Financial Logic", "Algorithm Development"],
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Vidushi Rajhans",
      role: "Design & Analytics Lead",
      description: "Combining creative design with data-driven thinking, Vidushi ensures our platform is not only functional but also visually compelling. Her cross-domain skills—from Canva to backtesting—make her an integral part of both front-end and financial analytics.",
      expertise: ["UI/UX Design", "Data Analytics", "Canva", "Backtesting", "Frontend Development"],
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mohit Patil",
      role: "Full Stack Developer",
      description: "Mohit crafts the digital interface and backend flow, translating ideas into seamless user experiences. With a strong command of web technologies and machine learning tools, he builds the bridge between data and user interaction.",
      expertise: ["Full Stack Development", "Web Technologies", "Machine Learning", "Backend Systems", "User Experience"],
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
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
    {symbol: "AAPL", price: 195.84, change: 2.34, changePercent: 1.21},
    {symbol: "GOOGL", price: 142.56, change: -1.23, changePercent: -0.85},
    {symbol: "MSFT", price: 378.91, change: 4.67, changePercent: 1.25},
    {symbol: "TSLA", price: 248.73, change: -3.21, changePercent: -1.27},
    {symbol: "NVDA", price: 567.12, change: 12.45, changePercent: 2.24},
    {symbol: "AMZN", price: 186.41, change: 1.89, changePercent: 1.03},
    {symbol: "META", price: 512.33, change: -5.67, changePercent: -1.09},
    {symbol: "BTC-USD", price: 67234.56, change: 1823.45, changePercent: 2.78}
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

// Global state
let currentSymbol = 'AAPL';
let allocationChart = null;

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

function formatPercent(percent) {
  return (percent >= 0 ? '+' : '') + percent.toFixed(2) + '%';
}

function getStatusClass(change) {
  return change >= 0 ? 'status--success' : 'status--error';
}

// Authentication
function handleAuth() {
  const loginForm = document.getElementById('login-form');
  const authScreen = document.getElementById('auth-screen');
  const app = document.getElementById('app');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    
    if (username) {
      authScreen.classList.add('hidden');
      app.classList.remove('hidden');
      initializeApp();
    }
  });
}

// Initialize the main application
function initializeApp() {
  initializeDashboard();
  initializeTrading();
  initializeAnalytics();
  initializeStrategies();
  initializeTeam();
  initializeNavigation();
}

// Dashboard initialization
function initializeDashboard() {
  const { portfolioData } = appData;
  
  // Portfolio values
  document.getElementById('portfolio-total').textContent = formatCurrency(portfolioData.totalValue);
  
  const dailyChangeEl = document.getElementById('portfolio-daily');
  dailyChangeEl.textContent = `${formatPercent(portfolioData.dailyChangePercent)} (${formatCurrency(portfolioData.dailyChange)})`;
  dailyChangeEl.className = `status ${getStatusClass(portfolioData.dailyChange)}`;
  
  // Market ticker
  const tickerContainer = document.getElementById('ticker-items');
  tickerContainer.innerHTML = '';
  
  appData.marketData.forEach(item => {
    const tickerItem = document.createElement('div');
    tickerItem.className = 'ticker-item';
    tickerItem.innerHTML = `
      <span class="ticker-symbol">${item.symbol}</span>
      <span class="ticker-price">${formatCurrency(item.price)}</span>
      <span class="status status--sm ${getStatusClass(item.change)}">${formatPercent(item.changePercent)}</span>
    `;
    tickerContainer.appendChild(tickerItem);
  });

  // Quick action buttons
  document.getElementById('quick-buy').addEventListener('click', () => {
    switchTab('trading-section');
  });
  
  document.getElementById('quick-sell').addEventListener('click', () => {
    switchTab('trading-section');
  });
}

// Trading interface
function initializeTrading() {
  const symbolSelect = document.getElementById('trade-symbol');
  const priceEl = document.getElementById('trade-price');
  const changeEl = document.getElementById('trade-change');
  
  // Populate symbol dropdown
  appData.marketData.forEach(item => {
    const option = document.createElement('option');
    option.value = item.symbol;
    option.textContent = item.symbol;
    symbolSelect.appendChild(option);
  });
  
  // Update price display
  function updatePrice() {
    const selectedData = appData.marketData.find(item => item.symbol === currentSymbol);
    if (selectedData) {
      priceEl.textContent = formatCurrency(selectedData.price);
      changeEl.textContent = `${formatPercent(selectedData.changePercent)} (${formatCurrency(selectedData.change)})`;
      changeEl.className = `status ${getStatusClass(selectedData.change)}`;
    }
  }
  
  symbolSelect.addEventListener('change', (e) => {
    currentSymbol = e.target.value;
    updatePrice();
  });
  
  // Initialize with first symbol
  updatePrice();
  
  // Order buttons
  document.getElementById('order-buy').addEventListener('click', () => {
    alert(`Buy order placed for ${currentSymbol}`);
  });
  
  document.getElementById('order-sell').addEventListener('click', () => {
    alert(`Sell order placed for ${currentSymbol}`);
  });
}

// Analytics chart
function initializeAnalytics() {
  const ctx = document.getElementById('allocationChart').getContext('2d');
  const { allocation } = appData.portfolioData;
  
  allocationChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Stocks', 'Bonds', 'Crypto', 'Cash'],
      datasets: [{
        data: [allocation.stocks, allocation.bonds, allocation.crypto, allocation.cash],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 16,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

// Strategies section
function initializeStrategies() {
  const strategiesContainer = document.getElementById('strategy-list');
  
  appData.tradingStrategies.forEach(strategy => {
    const card = document.createElement('div');
    card.className = 'card strategy-card';
    card.innerHTML = `
      <div class="card__body">
        <h3>${strategy.name}</h3>
        <p>${strategy.description}</p>
        <div class="flex justify-between">
          <span><strong>Returns:</strong> ${strategy.returns}</span>
          <span><strong>Sharpe:</strong> ${strategy.sharpeRatio}</span>
        </div>
        <div class="flex justify-between">
          <span><strong>Max Drawdown:</strong> ${strategy.maxDrawdown}</span>
          <button class="btn btn--primary btn--sm touch-target">Select</button>
        </div>
      </div>
    `;
    
    const selectBtn = card.querySelector('button');
    selectBtn.addEventListener('click', () => {
      alert(`Selected strategy: ${strategy.name}`);
    });
    
    strategiesContainer.appendChild(card);
  });
}

// Team section
function initializeTeam() {
  const teamContainer = document.getElementById('team-list');
  
  appData.teamMembers.forEach(member => {
    const card = document.createElement('div');
    card.className = 'card team-card';
    card.innerHTML = `
      <div class="card__body">
        <div class="flex gap-16 items-center">
          <img src="${member.photo}" alt="${member.name}" class="team-photo" />
          <div class="flex flex-col gap-4">
            <h3>${member.name}</h3>
            <p><strong>${member.role}</strong></p>
          </div>
        </div>
        <p>${member.description}</p>
        <div class="flex gap-8" style="flex-wrap: wrap">
          ${member.expertise.map(skill => 
            `<span class="status status--info" style="font-size: 11px">${skill}</span>`
          ).join('')}
        </div>
      </div>
    `;
    teamContainer.appendChild(card);
  });
}

// Navigation
function initializeNavigation() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      switchTab(target);
    });
  });
  
  // Set initial active tab
  switchTab('dashboard-section');
}

function switchTab(targetSection) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.add('hidden'));
  
  // Show target section
  document.getElementById(targetSection).classList.remove('hidden');
  
  // Update tab active states
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.target === targetSection);
  });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  handleAuth();
});