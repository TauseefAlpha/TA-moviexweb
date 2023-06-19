import axios from "axios"

const BaseUrl = "https://api.themoviedb.org/3"

const TmbdToken = import.meta.env.VITE_API_TOKEN

const headers = {
    Authorization: "bearer " + TmbdToken,
}

export const fetchdata = async (url, params) => {
    try {
        const { data } = await axios.get(BaseUrl + url, {
            headers:headers,
            params:params
        })
        return data
    } catch (error) {
        console.log(error)
    }
}
