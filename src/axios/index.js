import axios from 'axios'
import {REACT_APP_API_DOMAIN} from "../config"
import {API_V1_ENDPOINT} from '../constants'

const AxiosInstance = axios.create({
    baseURL: REACT_APP_API_DOMAIN + API_V1_ENDPOINT
})


export default AxiosInstance