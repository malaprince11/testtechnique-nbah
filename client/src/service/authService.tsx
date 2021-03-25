import apiTracker from '../api/apiTracker'

export const loginService = async (username : string, password : string) =>{
    console.log("je passe par ici")
    try {
        const response = await apiTracker.post('/login',{username, password})
        console.log("respose : ", response.data.token)
        localStorage.setItem("token", response.data.token);
    }
    catch(error){
        console.log(error)
        
    }
}

export const UpdateScore = (username : string, password : string) =>{
    console.log("je passe par ici")
    try {
        const response = apiTracker.post('/updateScore',{username, password})
        console.log(response)
    }
    catch(error){
        console.log(error)
        
    }
}
export const addScore = (score) =>{
    console.log("je passe par ici")
    try {
        const response = apiTracker.post('/addScore', {score})
        console.log(response)
    }
    catch(error){
        console.log(error)
        
    }
}
export const getScore = (score : number) =>{
    console.log("je passe par ici get score")
    try {
        const response = apiTracker.get('/getScore',)
        console.log(response)
    }
    catch(error){
        console.log(error)
        
    }
}
export const deleteScore = (id) =>{
    console.log("je passe par le delete")
    try {
        const response = apiTracker.post('/deleteScore/'+id)
        console.log(response)
    }
    catch(error){
        console.log(error)
        
    }
}