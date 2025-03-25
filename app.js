// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnZHCNVuYiJIIAFBi-rHP1wpRXXyQ3S7I",
    authDomain: "dayiotproject.firebaseapp.com",
    databaseURL: "https://dayiotproject-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dayiotproject",
    storageBucket: "dayiotproject.appspot.com",
    messagingSenderId: "1045340587978",
    appId: "1:1045340587978:web:1a0b1b9ab9f9b9f9f9f9f9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM elements
const temperatureValue = document.getElementById('temperature-value');
const humidityValue = document.getElementById('humidity-value');
const gasValue = document.getElementById('gas-value');
const gasAlert = document.getElementById('gas-alert');

// Data arrays for chart
const timestamps = [];
const temperatureData = [];
const humidityData = [];
const gasData = [];

// Initialize Chart
const ctx = document.getElementById('sensor-chart').getContext('2d');
const sensorChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatureData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Humidity (%)',
                data: humidityData,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Gas Level',
                data: gasData,
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    }
});

// Listen for data changes in Firebase
database.ref('/sensor').on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        // Update dashboard values
        temperatureValue.textContent = data.temperature ? data.temperature.toFixed(1) : '--';
        humidityValue.textContent = data.humidity ? data.humidity.toFixed(1) : '--';
        gasValue.textContent = data.gas || '--';
        
        // Update gas alert status
        if (data.gas > 400) {
            gasAlert.textContent = 'ALERT: Gas Leak Detected!';
            gasAlert.className = 'alert-status danger';
        } else if (data.gas > 300) {
            gasAlert.textContent = 'Warning: Elevated Gas Level';
            gasAlert.className = 'alert-status warning';
        } else {
            gasAlert.textContent = 'Normal';
            gasAlert.className = 'alert-status normal';
        }
        
        // Update chart data
        const now = new Date();
        const timeString = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        
        // Add new data points
        timestamps.push(timeString);
        temperatureData.push(data.temperature);
        humidityData.push(data.humidity);
        gasData.push(data.gas);
        
        // Limit data points to last 10 readings
        if (timestamps.length > 10) {
            timestamps.shift();
            temperatureData.shift();
            humidityData.shift();
            gasData.shift();
        }
        
        // Update chart
        sensorChart.update();
    }
});

// Function to simulate data for testing (uncomment if needed)
/*
function simulateData() {
    const temp = 25 + Math.random() * 10;
    const hum = 50 + Math.random() * 20;
    const gas = 100 + Math.random() * 400;
    
    database.ref('/sensor').set({
        temperature: temp,
        humidity: hum,
        gas: gas
    });
    
    setTimeout(simulateData, 2000);
}

// Start simulation
simulateData();
*/

// Add this to your existing chart configuration
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1000,
        easing: 'easeOutQuart'
    },
    elements: {
        line: {
            tension: 0.4,  // Makes the line curved and smoother
            borderWidth: 2
        },
        point: {
            radius: 3,
            hoverRadius: 5,
            hitRadius: 30,
            borderWidth: 2
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)'
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                font: {
                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                size: 14
            },
            bodyFont: {
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                size: 13
            },
            padding: 10,
            cornerRadius: 6
        }
    }
};

// Apply these options to your chart when you create it
// For example:
// const sensorChart = new Chart(ctx, {
//     type: 'line',
//     data: chartData,
//     options: chartOptions
// });

// Theme switching functionality
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitch.checked = true;
} else if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    themeSwitch.checked = false;
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-theme');
    themeSwitch.checked = true;
}

// Theme switch event listener
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateChartTheme(true);
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        updateChartTheme(false);
    }
});

// Function to update chart theme
function updateChartTheme(isDark) {
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
    const fontColor = isDark ? '#ffffff' : '#666666';
    
    sensorChart.options.scales.x.grid.color = gridColor;
    sensorChart.options.scales.y.grid.color = gridColor;
    sensorChart.options.scales.x.ticks.color = fontColor;
    sensorChart.options.scales.y.ticks.color = fontColor;
    sensorChart.options.plugins.legend.labels.color = fontColor;
    
    sensorChart.update();
}

// Initialize chart theme based on current mode
updateChartTheme(body.classList.contains('dark-theme'));