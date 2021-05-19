import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})


export const insertEvent = payload => api.post(`/event`, payload)
export const createTable = payload => api.post(`/events`, payload)
export const getAllEvents = (page) => api.get(`/${page}/view`)
export const getAllTables= () => api.get(`/events`)
export const updateEventById = (page, id, payload) => api.put(`/${page}/${id}`, payload)
export const updateEventByFile = (page, file) => api.post(`/${page}/upload`, file)
export const deleteEventById = id => api.delete(`/event/${id}`)
export const getEventById = id => api.get(`/event/${id}`)
export const getCSV = page => api.get(`/${page}/download/csv`)
export const getXLS = page => api.get(`/${page}/download/xls`)

const apis = {
    insertEvent,
    createTable,
    getAllTables,
    getAllEvents,
    updateEventById,
    updateEventByFile,
    deleteEventById,
    getEventById,
    getCSV,
    getXLS,
}

export default apis
