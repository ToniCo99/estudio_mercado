document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.getElementById('tabs');
    const tabButtons = tabs.querySelectorAll('.tab-button');
    const tabPanes = document.getElementById('tab-content').querySelectorAll('.tab-pane');

    // Función para cambiar de pestaña
    function switchTab(targetTabId) {
        // Desactivar todos los botones y paneles
        tabButtons.forEach(button => button.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Activar el botón y panel correspondientes
        const activeButton = tabs.querySelector(`.tab-button[data-tab="${targetTabId}"]`);
        const activePane = document.getElementById(targetTabId);

        if (activeButton && activePane) {
            activeButton.classList.add('active');
            // Retraso para la animación de entrada
            setTimeout(() => {
                activePane.classList.add('active');
            }, 50); // Pequeño retraso para asegurar que la clase 'active' se aplique después de removerla
        }
    }

    // Event listener para clicks en los botones de pestañas
    tabs.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab-button')) {
            const targetTab = event.target.getAttribute('data-tab');
            switchTab(targetTab);
        }
    });

    // Activar la primera pestaña por defecto
    const firstTabButton = tabs.querySelector('.tab-button');
    if (firstTabButton && !tabs.querySelector('.tab-button.active')) { // Solo activar si ninguna está activa ya
        switchTab(firstTabButton.getAttribute('data-tab'));
    }

    // --- Código para Gráficos Chart.js ---

    // Datos y configuración Gráfico 1: Comparativa Nutricional (Proteínas)
    const nutricionCtx = document.getElementById('nutritionComparisonChart').getContext('2d');
    const nutricionChart = new Chart(nutricionCtx, {
        type: 'bar',
        data: {
            labels: ['Conejo', 'Pollo', 'Ternera', 'Cerdo'],
            datasets: [{
                label: 'Proteínas (g por 100g)',
                data: [21.5, 20.0, 19.0, 18.0], // Datos de ejemplo
                backgroundColor: [
                    '#003865', // Azul IMDEEC
                    'rgba(217, 217, 217, 0.8)', // Gris claro D9D9D9
                    'rgba(0, 56, 101, 0.7)',
                    'rgba(217, 217, 217, 0.6)',
                ],
                borderColor: [
                    '#002B4D',
                    '#AEAEAE',
                    '#002B4D',
                    '#AEAEAE',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparativa de Contenido Proteico'
                },
                legend: {
                    display: false // Ocultar leyenda si solo hay un dataset
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Gramos (g)'
                    }
                }
            }
        }
    });

    // Datos y configuración Gráfico 2: Eficiencia de Conversión
    const eficienciaCtx = document.getElementById('proteinEfficiencyChart').getContext('2d');
    const eficienciaChart = new Chart(eficienciaCtx, {
        type: 'line',
        data: {
            labels: ['Conejo', 'Pollo', 'Cerdo', 'Ternera'],
            datasets: [{
                label: 'Kg Alimento / Kg Carne',
                data: [2.8, 2.0, 3.5, 7.0], // Datos de ejemplo - Kg alimento por Kg de carne producida
                fill: false,
                borderColor: '#003865', // Azul IMDEEC
                tension: 0.1 // Suaviza la línea
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Eficiencia de Conversión Alimenticia (Menor es Mejor)'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true, // Empezar en 0 para una mejor comparación visual
                    title: {
                        display: true,
                        text: 'Kg Alimento / Kg Carne'
                    }
                }
            }
        }
    });

}); // Fin de DOMContentLoaded 