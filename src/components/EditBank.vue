<template>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2"
            text
            color="deep-purple lighten-2"
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5"> Edit bank - {{ editBank['bank name'] }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Bank name*"
                    v-model="editBank['bank name']"
                    :value="editBank['bank name']"
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
                    v-model="editBank['interest rate']"
                    :value="editBank['interest rate']"
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
                    v-model="editBank['loan term']"
                    :value="editBank['loan term']"
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
                    v-model="editBank['maximum loan']"
                    :value="editBank['maximum loan']"
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
                    v-model="editBank['minimum down payment']"
                    :value="editBank['minimum down payment']"
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
              @click="rewriteBank()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>

import {mapActions} from 'vuex'

export default {

    data: () => ({
        dialog: false,
    }),
    props: ['editBank'],
    methods: {
        ...mapActions(['setBank']),
        rewriteBank(){
            this.setBank(this.editBank)
            this.dialog = false
        }
    }
  }
</script>

<style>

</style>