const API_URL = "http://localhost:8090";

export const api = {
  listPatients: async () =>
    fetch(`${API_URL}/patients`).then(res => res.json()),

  listDoctors: async () =>
    fetch(`${API_URL}/doctors`).then(res => res.json()),

  listAttendances: async () =>
    fetch(`${API_URL}/attendances`).then(res => res.json()),
};
