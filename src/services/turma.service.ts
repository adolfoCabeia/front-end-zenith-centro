import { api } from "./api"


export const turmaService = {
    create: (data:FormData)=>{
        return api.post('/turmas', data)
    },
    getAll: ()=>{
        return api.get('/turmas')
    },
    getById: (id:string)=>{
        return api.get(`/turmas/${id}`)
    },
    update: (id:string, data:FormData)=>{
        return api.put(`/turmas/${id}`, data)
    },
    delete: (id:string)=>{
        return api.delete(`/turmas/${id}`)
    }
}