import { db } from "../../configs";
import { collection } from 'firebase/firestore';

// REFS
export const orderRef = collection(db, 'orders')
export const citiesRef = collection(db, 'city')
export const villageRef = collection(db, 'village')
export const tariffRef = collection(db, 'tariffs')
export const couriersRef = collection(db, 'couriers')
// REFS
