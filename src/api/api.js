import axios from "axios";

const base = 'https://helloit-21f0c-default-rtdb.asia-southeast1.firebasedatabase.app'

export const POST = {
  postCourier: (data) => axios.post(`${base}/couriers.json`, data)
}

export const GET = {
  getCourier: () => axios.get(`${base}/couriers.json`)
}