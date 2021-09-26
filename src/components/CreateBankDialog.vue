<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2"
            x-large
            outlined
            color="deep-purple lighten-2"
            v-bind="attrs"
            v-on="on"
            block
          >
            Add new bank
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">New Bank</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Bank name*"
                    v-model="newBank.name"
                    type="text"
                    color="deep-purple lighten-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Interest rate*"
                    v-model="newBank.intRate"
                    type="number"
                    color="deep-purple lighten-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Loan term*"
                    v-model="newBank.loanTerm"
                    type="number"
                    color="deep-purple lighten-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col 
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Maximum loan*"
                    v-model="newBank.maxLoan"
                    type="number"
                    color="deep-purple lighten-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col 
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Minimum down payment*"
                    v-model="newBank.minPayment"
                    color="deep-purple lighten-2"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="addNewBank()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>

import {mapActions} from 'vuex'

export default {

    data: () => ({
        dialog: false,
        newBank: {
            name: '',
            intRate: null,
            loanTerm: null,
            maxLoan: null,
            minPayment: null
        }
    }),
    methods: {
        ...mapActions(['addBank']),
        addNewBank(){
            this.addBank(this.newBank)
            this.dialog = false
        }
    }
  }
</script>

<style>

</style>