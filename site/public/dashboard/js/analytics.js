const line = document.getElementById('lineChart');

new Chart(line, {
    type: 'line',
    data: {
        labels: ['12:02', '12:04', '12:06', '12:08', '12:10', '12:12', '12:14', '12:16', '12:18',
            '12:20', '12:20', '12:20', '12:20', '12:20', '12:20',],
        datasets: [{
            label: 'dasdas',
            data: [12, 19, 3, 5, 2, 3, 12, 21, 3, 40, 30, 120, 40, 30, 128],
            borderWidth: 4,
            fill: true,
            tension: 0.4,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'black',
                },
                grid: {
                    color: 'black',
                },

            },
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'black',
                },
                grid: {
                    color: 'white',
                },
            }
        },
    }
});

const bar = document.getElementById('barChart');

new Chart(bar, {
    type: 'bar',
    data: {
        labels: ['12:02', '12:04', '12:06', '12:08', '12:10'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 70, 53, 54],
            borderWidth: 4,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'black',
                },
                grid: {
                    color: 'black',
                }
            },
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'black',
                },
                grid: {
                    color: 'white',
                },
            }
        }
    }
});

const pie = document.getElementById('pieChart');

new Chart(pie, {
    type: 'doughnut',
    data: {
        labels: ['Uso', 'Disponível'],
        datasets: [{
            label: '# of Votes',
            data: [80, 20],
            borderWidth: 2,
            cutout: '60%',
        }]
    },
    options: {
    }
});
