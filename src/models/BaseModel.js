import { async } from "@firebase/util";
import * as firestore from "firebase/firestore";
import { db } from "../firebase";


class BaseModel {
    collectionName = ''
    collectionRef = null
    constructor(collectionName) {
        this.collectionName = collectionName
        this.collectionRef = firestore.collection(db, this.collectionName)
    }

    #sendSucces(data, message) {
        return {
            isError: false,
            data,
            message: message || `Response of ${this.collectionName}`
        }
    }

    #sendError(message) {
        return {
            isError: true,
            data: null,
            message: message || `Failed ${this.collectionName}`
        }
    }


    async findAll({ where = {}, include = {} } = {}) {
        try {

            let whereConditions = Object.keys(where).map(key => {
                return firestore.where(key, '==', where[key])
            })

            let query = firestore.query(this.collectionRef, ...whereConditions)


            let snapshots = await firestore.getDocs(query)
            let result = [];
            snapshots.forEach(async (snapshot) => {
                let data = snapshot.data()
                let id = snapshot.id;
                for (const key in include) {
                    if (data[key]) {
                        let docRef = firestore.doc(db, data[key])
                        let refSnapshot = await firestore.getDoc(docRef)
                        if (refSnapshot.exists()) {
                            data[key.replace('Ref', '')] = {
                                id: refSnapshot.id,
                                ...refSnapshot.data()
                            }
                        }
                    }
                }
                result.push({ id, ...data })
            })

            return this.#sendSucces(result)
        }
        catch (err) {
            return this.#sendError(err.toString())
        }
    }

    async find(docId) {
        let docRef = firestore.doc(db, this.collectionName, docId)
        let snapshot = await firestore.getDoc(docRef)

        if (!snapshot.exists()) return this.#sendError()

        let data = snapshot.data()
        let id = snapshot.id
        return this.#sendSucces({ id, ...data })

    }

    async create({ data } = {}) {
        try {
            let snapshot = await firestore.addDoc(this.collectionRef, data)

            return this.#sendSucces({ id: snapshot.id })
        }
        catch (err) {
            return this.#sendError(err.toString())
        }
    }

    async update({ where = {}, data = {} } = {}) {
        try {
            let { id } = where
            let docRef = firestore.doc(this.collectionRef, id)
            if (data.id) {
                delete data.id
            }
            let snapshot = await firestore.setDoc(docRef, data)

            return this.#sendSucces(data)
        }
        catch (err) {
            return this.#sendError(err.toString())
        }
    }

}

export default BaseModel