import { api } from "./api"


export const dashboardService = {
    getCount: async()=>{
        return api.get('/dashboard/count')
    },
    getAllStats: async()=>{
        return api.get('/dashboard')
    }
}