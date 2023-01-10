import axios from "axios";
import { db } from "../configs";

const base = 'https://helloit-21f0c-default-rtdb.asia-southeast1.firebasedatabase.app'

export const POST = {
  postCourier: (data) => axios.post(`${base}/couriers.json`, data)
}

export const GET = {
  getCourier: () => axios.get(`${db}/couriers.json`)
}

export const DELETE = {
  deleteCourier: (id) => axios.delete(`${base}/couriers/${id}.json`)
}