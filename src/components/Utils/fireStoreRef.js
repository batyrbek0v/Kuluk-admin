import { db } from "../../configs";
import { collection } from 'firebase/firestore';

export const orderRef = collection(db, 'orders')
