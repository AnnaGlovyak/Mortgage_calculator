<template>
    <div class="history">
        <h1 class="history-title">Your history</h1>
        <v-simple-table height="300px">
            <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        Time
                    </th>
                    <th class="text-left">
                        Initial loan
                    </th>
                    <th class="text-left">
                        Down Payment
                    </th>
                    <th class="text-left">
                        Bank
                    </th>
                    <th class="text-left">
                        Result
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in mortgageHistory"
                    :key="item.id"
                    >
                        <td> {{ item.date.toDate().toLocaleString().split(',')[0]}}
                        <td>{{ item.userInitLoan }}</td>
                        <td>{{ item.userDownPayment }}</td>
                        <td>{{ item.userBank }}</td>
                        <td>{{ item.userResult }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {

    async created(){
        await this.fetchHistory();
    },
     computed:{
        ...mapGetters(['mortgageHistory']),
     },
     methods: {
        ...mapActions(['fetchHistory']),
     },
}
</script>

<style>

    .history{
        margin-top: 100px;
    }
    .history-title{
        margin-bottom: 60px;
        text-align: center;
    }

</style>