<template>
    <div class="banks">
        <h1>All banks</h1>
        <v-row align="center" class="spacing-playground justify-center">
            <v-card
            :loading="loading"
            class="mx-auto my-12"
            width="250"
            v-for="(bank) in allBanks"
            :key="bank.id"
            >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-4">
                    Interest rate {{bank['interest rate'] * 100}}%
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                    {{bank['bank name']}}
                    </v-list-item-title>
                </v-list-item-content>

                <v-icon
                x-large
                >
                mdi-bank</v-icon>
                </v-list-item>
                <v-card-actions class="justify-space-between">
                <v-btn
                    color="deep-purple lighten-2"
                    dark
                    @click="delBank(bank)"
                >
                    Delete
                </v-btn>
                <EditBank :edit-bank="bank"/>
                </v-card-actions>
            </v-card>
        </v-row>
        <CreateBankDialog/>   
    </div>
</template>

<script>

import CreateBankDialog from './CreateBankDialog.vue'
import EditBank from './EditBank.vue'
import { mapGetters, mapActions} from 'vuex'

export default {
    data(){
        return {
            loading: false,
        }
    },
    components:{
        CreateBankDialog,
        EditBank,
    },
    async created(){
        await this.fetchBanks();
    },
    mounted(){
        
    },
    computed:{
        ...mapGetters(['allBanks'])
    },
    methods: {
        ...mapActions(['fetchBanks','deleteBank']),
        delBank(bank){
            this.deleteBank(bank.id);
        },

    }

}
</script>

<style>

</style>