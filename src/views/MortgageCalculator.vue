<template>
    <div class="mortgage">
        <v-row justify="center" class="pt-10">
            <v-form class="mortgage-form flex-column" ref="form" 
                v-model="valid"
                lazy-validation>
                <v-card>
                    <v-card-title class="justify-space-around">
                        <span class="text-h5">Mortgage calculator</span>
                        <span class="text-h5">Monthly mortgage payment</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row class="mortgage-row align-center">
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                label="Initial loan"
                                type="number"
                                v-model="initialLoan"
                                color="deep-purple lighten-2"
                                required min="0" 
                                :rules="[(v) => (v!==0 && v  && v.length >= 5)]"
                                ></v-text-field>

                                <v-text-field
                                label="Down payment"
                                type="number"
                                v-model="downPayment"
                                color="deep-purple lighten-2"
                                required min="0" 
                                :rules="[(v) => (v!==0 && v  && v.length >= 3)]"
                                ></v-text-field>

                                <v-select 
                                label="Choose bank" 
                                :items="filterBanksName"
                                :rules="[v => !!v || 'Item is required']"
                                v-model="bank"
                                color="deep-purple lighten-2"
                                required
                                >
                                </v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <div class="mortgage-result">
                                    <p class="text-h3 text-center font-weight-black">
                                        {{ resultMonthPayment }}
                                    </p>
                                    <p class="text-center deep-purple--text text--lighten-2" v-if="resultMonthPayment !== ''">monthly payment for {{ monthQuantity }} months</p>
                                </div>
                            </v-col>
                            </v-row>
                                <mortgage-error  v-if="error">
                                    <v-alert
                                        dense
                                        outlined
                                        type="error"
                                    >
                                        This bank has <strong>Maximum loan: {{ errorMaxLoan }}</strong> and <strong>Minimum down payment: {{ errorMinDownPayment }}</strong>. <br> Сheck your entered parameters!
                                    </v-alert>
                                </mortgage-error>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn
                            class="ma-2"
                            x-large
                            dark
                            color="deep-purple lighten-2"
                            @click="calculate($event)"
                            block>
                            Calculate
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-row>
        <MortgageHistory/>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import MortgageError from '../components/MortgageError.vue'
import MortgageHistory from '../components/MortgageHistory.vue'

export default {
    data(){
        return{ 
            resultMonthPayment:'',
            initialLoan: 0,
            downPayment: 0,
            bank: '',
            monthQuantity: 0,
            error: false,
            errorMaxLoan: '',
            errorMinDownPayment: '',
            errorSlot: '',
            valid: true,
            newHistoryItem: {}

        }
    },
    components: {
        MortgageError,
        MortgageHistory
    },
    async created(){
        await this.fetchBanks()
    },
    computed:{
        ...mapGetters(['allBanks']),
        filterBanksName(){
            return this.allBanks.reduce(function(newAr, bank){
                newAr.push(bank['bank name'])
                return newAr 
                },[])
        }
    },
    methods: {
        ...mapActions(['fetchBanks', 'writeHistory']),
        calculate(event){
            if(!this.valid){
                event.preventDefault();
            } else {
                let choosenBank = this.allBanks.filter(item => item['bank name'] === this.bank)[0];
                if(choosenBank['maximum loan'] < this.initialLoan || this.downPayment < choosenBank['minimum down payment']){
                    this.error = true;
                    this.errorMaxLoan = choosenBank['maximum loan']
                    this.errorMinDownPayment = choosenBank['minimum down payment']
                } else {
                    this.error = false;
                    let r = choosenBank['interest rate'];
                    let n = choosenBank['loan term'];
                    let p = this.initialLoan;

                    let monthRate = r / 12
                    let generalRate = ((1 + monthRate) ** n)

                    this.resultMonthPayment = Math.round((p * monthRate * generalRate) / (generalRate - 1));
                    this.monthQuantity = n;

                    this.newHistoryItem.userInitLoan = this.initialLoan
                    this.newHistoryItem.userDownPayment = this.downPayment
                    this.newHistoryItem.userBank = choosenBank['bank name']
                    this.newHistoryItem.userBankId = choosenBank.id
                    this.newHistoryItem.userResult = this.resultMonthPayment
                    this.addHistoryItem(this.newHistoryItem)
                }  
            }
        },
        validate () {
            this.$refs.form.validate()
        },
        addHistoryItem(item){
            this.writeHistory(item)
        }

    }
}
</script>

<style >

.mortgage{
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}
.mortgage-form{
    width: 100%;
}

.mortgage-row{
    width:100%;
}
.mortgage-result{
    align-self: center;
}


</style>