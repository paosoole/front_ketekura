const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  console.log('API response:', res);

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.json();
}

export const api = {
  // Pacientes
  listPatients: () => request('/pacientes'),
  getPatient: (rut) => request(`/pacientes/${rut}`),
  getTotalPatients: () => request('/pacientes/total'),

  // Función corregida para crear paciente
  crearPaciente: async (paciente) => {
    try {
      const response = await fetch(`${API_BASE}/pacientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(paciente),
      });

      if (!response.ok) {
        const errorDetails = await response.text();  // Obtener detalles del error
        console.error('Error al crear paciente:', errorDetails);
        throw new Error('Error al crear paciente');
      }

      return response.json();  // Devuelve los datos del paciente creado
    } catch (error) {
      console.error('Error en la API:', error);
      throw error;
    }
  },

  // Médicos
  listDoctors: () => request('/medicos'),
  getDoctor: (rut) => request(`/medicos/${rut}`),

  // Pagos
  listPayments: () => request('/pagos'),

  // Recetas / Exámenes / Atenciones
  listRecipesByRut: (rut) => request(`/recetas/${rut}`),
  recipeDetails: (id) => request(`/recetas/detalle/${id}`),
  listRecipes: () => request('/recetas'),

  deleteRecipe: (id) =>
    request(`/recetas/${id}`, { method: 'DELETE' }),
};
export default api;