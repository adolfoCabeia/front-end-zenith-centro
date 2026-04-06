import { api } from "./api";

export const cursoService = {
    create: async(data:FormData)=>{
        return api.post('/cursos', data)
    },
    getAll: async()=>{
        return api.get('/cursos')
    },
    getById: async(id:string)=>{
        return api.get(`/cursos/${id}`)
    },
    update: async(id:string, data:FormData)=>{
        return api.put(`/cursos/${id}`, data)
    },
    delete: async(id:string)=>{
        return api.delete(`/cursos/${id}`)
    }
}