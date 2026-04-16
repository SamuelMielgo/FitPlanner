function generarRutina() {
  let objetivo = document.getElementById("objetivo").value;
  let dias = document.getElementById("dias").value;
  let contenedor = document.getElementById("rutina");

  let rutina = "";

  if (dias == 3) {
    rutina = `
    <p><b>Día 1:</b> Pecho + tríceps</p>
    <p><b>Día 2:</b> Pierna</p>
    <p><b>Día 3:</b> Espalda + bíceps</p>
    `;
  }

  if (dias == 4) {
    rutina = `
    <p><b>Día 1:</b> Pecho</p>
    <p><b>Día 2:</b> Espalda</p>
    <p><b>Día 3:</b> Pierna</p>
    <p><b>Día 4:</b> Hombro</p>
    `;
  }

  if (dias == 5) {
    rutina = `
    <p><b>Día 1:</b> Pecho</p>
    <p><b>Día 2:</b> Espalda</p>
    <p><b>Día 3:</b> Pierna</p>
    <p><b>Día 4:</b> Hombro</p>
    <p><b>Día 5:</b> Full body</p>
    `;
  }

  if (objetivo == "grasa") {
    rutina += "<p>+ Cardio 20-30 min</p>";
  }

  contenedor.innerHTML = rutina;
}