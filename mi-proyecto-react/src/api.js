const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.json();
}

export const api = {
  // Oracle: Pacientes
  listPatients: () => request('/pacientes'),
  getPatient: (rut) => request(`/pacientes/${rut}`),
  getTotalPatients: () => request('/pacientes/total'),

  // Oracle: Médicos
  listDoctors: () => request('/medicos'),
  getDoctor: (rut) => request(`/medicos/${rut}`),

  // Oracle: Pagos (aún no lo tienes, pero lo dejo preparado)
  listPayments: () => request('/pagos'),

  // MongoDB: Recetas / Exámenes / Atenciones
  listRecipesByRut: (rut) => request(`/recetas/${rut}`),
  recipeDetails: (id) => request(`/recetas/detalle/${id}`),

  deleteRecipe: (id) =>
    request(`/recetas/${id}`, { method: 'DELETE' }),
};
