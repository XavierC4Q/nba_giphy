import axios from 'axios'

const url = process.env.GIPHY_URL
const search = process.env.GIPHY_SEARCH
const apiKey = process.env.GIPHY_API_KEY

export const handleGiphySearch = async (query, limit) => {
   try {
        const results = await axios({
            method: 'GET',
            url: search,
            baseURL: url,
            params: {
                api_key: apiKey,
                q: query,
                limit: limit
            }
        })
        return results.data.data
   }
   catch(err){
    return null
   }
}

export const handleSingleGif = async (id) => {
    try {
        const results = await axios({
            method: 'GET',
            url: `${process.env.SINGLE_GIF}/${id}`,
            baseURL: url,
            params: {
                api_key: apiKey,
                gif_id: id
            }
        })

        return results.data.data
    }
    catch(err){
        return null
    }
}

