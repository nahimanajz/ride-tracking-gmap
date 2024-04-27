
import '../../envConfig'

export default function defineConfig(){
    return  ({
        apiKey: process.env.GOOGLE_MAP_API_KEY
    })
}

