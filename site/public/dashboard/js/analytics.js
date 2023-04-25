const line = document.getElementById('lineChart');

new Chart(line, {
    type: 'line',
    data: {
        labels: ['SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SABADO','DOMINGO'],
        datasets: [{
            label: 'dasdas',
            data: [10, 17, 14, 19, 20, 25, 13],
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
        labels: ['RAM', 'CPU', 'Rede', 'Memória'],
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
        labels: ['Operado', 'Manutenção', 'Inativa'],
        datasets: [{
            label: '# of Votes',
            data: [80, 13 ,7],
            borderWidth: 2,
            cutout: '60%',
        }]
    },
    options: {
    }
});
