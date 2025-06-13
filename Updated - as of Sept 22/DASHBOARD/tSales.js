function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.querySelector("table tbody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3]; // 3rd column is the "Time Stamp"
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Example admin email, replace this with dynamic data from your authentication system
const adminEmail = 'admin@example.com'; // Replace with actual email
document.getElementById('adminEmail').textContent = adminEmail;

window.onload = function() {
    //Log out
    document.getElementById('logoutLink').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent immediate redirection
        document.getElementById('logoutModal').classList.add('show'); // Show the modal
    });

    document.getElementById('confirmLogout').addEventListener('click', function() {
        window.location.href = "index.html"; // Redirect if YES is clicked
    });

    document.getElementById('cancelLogout').addEventListener('click', function() {
        document.getElementById('logoutModal').classList.remove('show'); // Hide the modal if NO is clicked
    });
};

// Function to download the PDF
document.getElementById('downloadPDF').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add the title and table
    doc.text('Total Sales', 20, 10);
    doc.autoTable({ html: 'table', startY: 20 });

    // Save the PDF
    const fileName = 'total_sales.pdf';
    doc.save(fileName);

    // Automatically open the file after downloading
    const pdfUrl = doc.output('bloburl'); // Create a blob URL for the PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link); // Append link to body
    link.click(); // Simulate a click to download and open
    document.body.removeChild(link); // Remove the link from the DOM
});

// Sample data for Sales by Product
const productSalesData = {
    labels: ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04'],
    datasets: [
        {
            label: 'Lined Layout',
            data: [50, 60, 70, 80], // Replace with real-time data
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Unlined Layout',
            data: [30, 40, 50, 60], // Replace with real-time data
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }
    ]
};

// Sample data for Sales per Department
const departmentSalesData = {
    labels: ['FoE', 'FHTM', 'FCSIT', 'FCJ', 'FTE', 'FIT'],
    datasets: [
        {
            label: 'Sales',
            data: [120, 150, 170, 110, 90, 130], // Replace with real-time data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ]
};

// Create Sales by Product chart
const productSalesChartCtx = document.getElementById('product-sales-chart').getContext('2d');
const productSalesChart = new Chart(productSalesChartCtx, {
    type: 'bar',
    data: productSalesData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: false // Disable stacking on the x-axis
            },
            y: {
                stacked: false // Disable stacking on the y-axis
            }
        }
    }
});

// Create Sales per Department chart
const departmentSalesChartCtx = document.getElementById('department-sales-chart').getContext('2d');
const departmentSalesChart = new Chart(departmentSalesChartCtx, {
    type: 'bar',
    data: departmentSalesData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }
});