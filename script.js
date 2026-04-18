// Database of exercises grouped by muscle group and modality (gym / home)
const exercisesDB = {
    gym: {
        chest: [
            { name: "Press banca", repInfo: "4x10" },
            { name: "Aperturas", repInfo: "3x12" },
            { name: "Press inclinado", repInfo: "4x10" },
            { name: "Cruce poleas", repInfo: "3x15" }
        ],
        back: [
            { name: "Dominadas", repInfo: "4x8" },
            { name: "Remo con barra", repInfo: "3x10" },
            { name: "Jalón al pecho", repInfo: "3x12" },
            { name: "Remo en polea", repInfo: "3x12" }
        ],
        legs: [
            { name: "Sentadillas", repInfo: "4x10" },
            { name: "Prensa", repInfo: "3x12" },
            { name: "Peso muerto", repInfo: "3x10" },
            { name: "Elevación gemelos", repInfo: "4x15" },
            { name: "Curl femoral", repInfo: "3x12" }
        ],
        shoulders: [
            { name: "Press militar", repInfo: "4x10" },
            { name: "Elevaciones laterales", repInfo: "3x15" },
            { name: "Pájaros", repInfo: "3x12" }
        ],
        arms: [
            { name: "Curl bíceps", repInfo: "3x12" },
            { name: "Press francés", repInfo: "3x12" },
            { name: "Fondos tríceps", repInfo: "3x10" },
            { name: "Curl martillo", repInfo: "3x12" }
        ],
        core: [
            { name: "Plancha", repInfo: "3x30\"" },
            { name: "Abdominales", repInfo: "3x15" },
            { name: "Elevación piernas", repInfo: "3x12" }
        ],
        cardio: [
            { name: "Cinta correr", repInfo: "20-30 min" },
            { name: "Elíptica", repInfo: "20 min" },
            { name: "Bici estática", repInfo: "20 min" }
        ]
    },
    home: {
         chest: [
            { name: "Flexiones de pecho", repInfo: "4xFallo" },
            { name: "Flexiones declinadas", repInfo: "3x12" },
            { name: "Flexiones diamante", repInfo: "3x10" }
        ],
        back: [
            { name: "Remo con toalla", repInfo: "4x15" },
            { name: "Dominadas (si barra)", repInfo: "3xFallo" },
            { name: "Superman", repInfo: "3x20" }
        ],
        legs: [
            { name: "Sentadilla libre", repInfo: "4x20" },
            { name: "Zancadas", repInfo: "3x15/p" },
            { name: "Puente glúteo", repInfo: "3x20" },
            { name: "Elevación gemelos", repInfo: "4x20" }
        ],
        shoulders: [
            { name: "Flexiones pino", repInfo: "3x8" },
            { name: "Elevación c/ botellas", repInfo: "3x15" },
            { name: "Caminata oso", repInfo: "3x60\"" }
        ],
        arms: [
            { name: "Fondos en silla", repInfo: "4x12" },
            { name: "Curl isométrico", repInfo: "3x30\"" }
        ],
        core: [
            { name: "Plancha", repInfo: "3x45\"" },
            { name: "Crunch abdominal", repInfo: "3x20" },
            { name: "Russian twists", repInfo: "3x20" }
        ],
        cardio: [
            { name: "Burpees", repInfo: "3x12" },
            { name: "Jumping Jacks", repInfo: "3x30\"" },
            { name: "High knees", repInfo: "3x30\"" }
        ]
    }
};

const dayNames = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];

// Interactive segmented controls logic
document.querySelectorAll('.segmented-control').forEach(control => {
    const buttons = control.querySelectorAll('.segment');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all brothers
            buttons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            // Update hidden input if present
            const hidden = control.parentElement.querySelector('input[type="hidden"]');
            if(hidden) {
                hidden.value = btn.dataset.value;
            }
        });
    });
});

const tips = [
    "Calienta 5-10 minutos antes de entrenar y estira al finalizar. La constancia y una buena alimentación son clave para ver resultados.",
    "Prioriza la técnica sobre el peso. Un movimiento bien ejecutado activa mejor las fibras musculares.",
    "La hidratación es fundamental: Intenta beber al menos 2 litros de agua diarios, especialmente en días de entreno.",
    "El músculo crece durante el descanso. Asegúrate de dormir 7-8 horas para una recuperación óptima."
];

function generateRoutine() {
    // Collect data
    const age = document.getElementById('age').value || 20;
    const weight = document.getElementById('weight').value || 70;
    const height = document.getElementById('height').value || 175;
    const levelSelect = document.getElementById('level');
    const level = levelSelect.options[levelSelect.selectedIndex].text;
    
    // Value from segmented inputs
    const goalRaw = document.getElementById('goal').value; 
    const goalText = goalRaw === 'lose' ? 'Perder grasa' : 'Ganar músculo';
    
    const daysRaw = document.getElementById('days').value;
    const days = parseInt(daysRaw);
    
    const gymRaw = document.getElementById('gym').value;
    const isGym = gymRaw === 'yes';

    // Update Summary
    document.getElementById('routine-summary').innerText = `Objetivo: ${goalText} • Nivel: ${level} • ${days} días`;
    
    // Populate Random Tip
    document.getElementById('random-tip').innerText = tips[Math.floor(Math.random() * tips.length)];

    const container = document.getElementById('routine-container');
    container.innerHTML = '';

    const db = isGym ? exercisesDB.gym : exercisesDB.home;

    // Different splits depending on days (3, 4, or 5)
    let splitPlan = [];

    if (days === 3) {
        splitPlan = [
            { day: 0, title: "Torso / Pierna A", icon: "fa-dumbbell", groups: ["chest", "legs", "back"] },
            { day: 2, title: "Torso / Pierna B", icon: "fa-bolt", groups: ["back", "shoulders", "legs"] },
            { day: 4, title: "Full Body", icon: "fa-fire", groups: ["legs", "chest", "arms", "core"] }
        ];
    } else if (days === 4) {
        splitPlan = [
            { day: 0, title: "Torso", icon: "fa-dumbbell", groups: ["chest", "back", "shoulders"] },
            { day: 1, title: "Pierna", icon: "fa-walking", groups: ["legs", "core"] },
            { day: 3, title: "Torso y Brazos", icon: "fa-biceps", groups: ["chest", "back", "arms"] },
            { day: 4, title: "Pierna y Cardio", icon: "fa-running", groups: ["legs", "cardio"] }
        ];
    } else {
        // 5 Days (PPL like the image)
        splitPlan = [
            { day: 0, title: "Pecho y Tríceps", icon: "fa-dumbbell", groups: ["chest", "arms"] },
            { day: 1, title: "Pierna", icon: "fa-walking", groups: ["legs"] },
            { day: 2, title: "Espalda y Bíceps", icon: "fa-biceps", groups: ["back", "arms"] },
            { day: 3, title: "Cardio y Core", icon: "fa-running", groups: ["cardio", "core"] },
            { day: 4, title: "Hombro y Full Body", icon: "fa-fire", groups: ["shoulders", "legs", "chest"] }
        ];
    }

    // Adjust reps for Hypertrophy vs Fat Loss slightly visually
    const restTime = goalRaw === 'lose' ? "45-60 seg descanso" : "60-90 seg descanso";

    splitPlan.forEach(plan => {
        let itemsHTML = '';
        let exercisesAdded = 0;
        
        plan.groups.forEach(group => {
            // Pick 1-2 exercises from the group
            const limit = plan.groups.length > 2 ? 1 : 2;
            for(let i=0; i<limit; i++) {
                if (db[group] && db[group][i]) {
                    const ex = db[group][i];
                    itemsHTML += `
                        <li>
                            <span class="ex-name">${ex.name}</span>
                            <span class="ex-sets">${ex.repInfo}</span>
                        </li>
                    `;
                    exercisesAdded++;
                }
            }
        });

        // Ensure we have ~4-5 exercises per card
        if (exercisesAdded < 4 && db['core'][0]) {
             itemsHTML += `
                <li>
                    <span class="ex-name">${db['core'][0].name}</span>
                    <span class="ex-sets">${db['core'][0].repInfo}</span>
                </li>
            `;
        }

        const card = `
            <div class="day-card">
                <div class="day-badge">${dayNames[plan.day]}</div>
                <div class="day-icon"><i class="fas ${plan.icon}"></i></div>
                <div class="day-title">${plan.title}</div>
                <ul class="exercises-list">
                    ${itemsHTML}
                </ul>
                <div class="rest-time"><i class="far fa-clock"></i> ${restTime}</div>
            </div>
        `;
        container.innerHTML += card;
    });

    // Show results with smooth scroll
    const resultsSec = document.getElementById('results-section');
    resultsSec.classList.remove('results-hidden');
    resultsSec.scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('results-section').classList.add('results-hidden');
    document.getElementById('generator-form').reset();
    
    // Reset visual actives to default state
    const controls = document.querySelectorAll('.segmented-control');
    controls.forEach(ctrl => {
        const btns = ctrl.querySelectorAll('.segment');
        btns.forEach(b => b.classList.remove('active'));
        // Find the one matching hidden input default value and make it active
        const hidden = ctrl.parentElement.querySelector('input[type="hidden"]');
        if(hidden) {
             const defaultBtn = ctrl.querySelector(`[data-value="${hidden.value}"]`);
             if(defaultBtn) defaultBtn.classList.add('active');
        } else {
             btns[0].classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function exportPDF() {
    const element = document.getElementById('pdf-content');
    
    // Hide buttons during print
    const actions = document.querySelector('.actions');
    actions.style.display = 'none';

    html2pdf()
        .set({
            margin: 10,
            filename: 'Mi_Rutina_FitPlanner.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0a0c10' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        })
        .from(element)
        .save()
        .then(() => {
            // Restore buttons
            actions.style.display = 'flex';
        });
}