import { db } from '../../main.js'
import { collection, getDocs, doc, deleteDoc,addDoc, setDoc, Timestamp } from "firebase/firestore";

export default {
    state: {
        banks: [],
        history: [],
    },
    getters: {
        allBanks(state){
            return state.banks
        },
        mortgageHistory(state){
            return state.history
        }
    },
    actions: {
        async fetchBanks(context){
            let banks = []
            const querySnapshot = await getDocs(collection(db, "banks"));
                querySnapshot.forEach((doc) => {
                    banks.push({
                        id: doc.id,
                        'bank name': doc.data()['bank name'],
                        'interest rate': doc.data()['interest rate'],
                        'loan term': doc.data()['loan term'],
                        'maximum loan': doc.data()['maximum loan'],
                        'minimum down payment': doc.data()['minimum down payment']
                    })
                });
            context.commit('updateBanks', banks)
        },
        async deleteBank({ dispatch}, id){
            await deleteDoc(doc(db, "banks", id));
            dispatch('fetchBanks');
        },
        async setBank({commit, dispatch}, editBank){
            await setDoc(doc(db, "banks", editBank.id), {
                'bank name': editBank['bank name'],
                'interest rate': Number(editBank['interest rate']),
                'loan term': Number(editBank['loan term']),
                'maximum loan': Number(editBank['maximum loan']),
                'minimum down payment': Number(editBank['minimum down payment']),
                })
            dispatch('fetchBanks')
            commit('updateBanks')
        },
        async addBank({commit, dispatch}, newBank){
            await addDoc(collection(db, "banks"), {
                'bank name': newBank.name,
                'interest rate': Number(newBank.intRate),
                'loan term': Number(newBank.loanTerm),
                'maximum loan': Number(newBank.maxLoan),
                'minimum down payment': Number(newBank.minPayment),
                })
            dispatch('fetchBanks')
            commit('updateBanks')
        },
        async writeHistory({commit, dispatch}, item){
            await addDoc(collection(db, "history"), {
                date: Timestamp.now(),
                userInitLoan: Number(item.userInitLoan),
                userDownPayment: Number(item.userDownPayment),
                userBank: item.userBank,
                userBankId: item.userBankId,
                userResult: item.userResult
                })
            dispatch('fetchHistory')
            commit('updateHistory')
        },
        async fetchHistory(context){
            let history = []
            const querySnapshot = await getDocs(collection(db, "history"));
                querySnapshot.forEach((doc) => history.push(doc.data()));
            context.commit('updateHistory', history)
        },
        
    },
    mutations: {
        updateBanks(state, banks){
            state.banks = banks
        },
        updateHistory(state, history){
            state.history = history
        },
    }
}