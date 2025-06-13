document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('salesChart').getContext('2d');

    // Helper function to generate date labels
    function generateDateLabels(numDays) {
        const labels = [];
        const today = new Date();
        for (let i = 0; i < numDays; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            labels.unshift(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
        }
        return labels;
    }

    // Generate labels for the past 4 days
    const labels = generateDateLabels(4);

    // Example data corresponding to the generated dates
    const data = [150, 200, 175, 225]; // Adjust as needed

    const salesChart = new Chart(ctx, {
        type: 'line', // Line graph
        data: {
            labels: labels, // Use dynamic labels
            datasets: [{
                label: 'Total Sales',
                data: data, // Example total sales per date
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false // Ensure the area under the line is not filled
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#fff',
                        font: { size: 10 }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff',
                        font: { size: 14 }
                    }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });

    // Get the admin email from local storage or authentication
    const adminEmail = localStorage.getItem('adminEmail') || 'admin@example.com'; // Replace with actual email
    document.getElementById('adminEmail').textContent = adminEmail;

    // Update department choices with new colleges
    const colleges = [
        'Faculty of Engineering',
        'Faculty of Hospitality and Tourism Management',
        'Faculty of Computer Studies and Information Technology',
        'Faculty of Criminal Justice',
        'Faculty of Teacher Education',
        'Faculty of Industrial Technology'
    ];
    document.getElementById('top-department').textContent = colleges[Math.floor(Math.random() * colleges.length)];

    document.getElementById('lined-stock-amount').textContent = 'Stock: 30';
    document.getElementById('unlined-stock-amount').textContent = 'Stock: 25';

    // Notification functionality
    const notificationBell = document.querySelector('.notification-bell');
    const notificationPanel = document.getElementById('notification-panel');
    const notifications = [
        "New message from GSM Module",
        "System update available",
        "Reminder: Check stock levels"
    ];
    const notificationList = document.getElementById('notification-list');

    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification;
        notificationList.appendChild(li);
    });

    notificationBell.addEventListener('click', () => {
        notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!notificationBell.contains(event.target) && !notificationPanel.contains(event.target)) {
            notificationPanel.style.display = 'none';
        }
    });

    // Logout modal functionality
    document.getElementById('logoutLink').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('logoutModal').style.display = 'flex'; // Show modal
    });

    document.getElementById('confirmLogout').addEventListener('click', () => {
        window.location.href = 'logout.html'; // Redirect to logout page
    });

    document.getElementById('cancelLogout').addEventListener('click', () => {
        document.getElementById('logoutModal').style.display = 'none'; // Close modal
    });
});