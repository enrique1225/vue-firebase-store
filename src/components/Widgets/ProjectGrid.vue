<template>
   <div class="app-card-content pt-0">  
      <div class="d-flex justify-space-between align-items-center mb-4">
         <h6>Distract :</h6>
         <h6>{{ managementData.distract }}</h6>
      </div>  
      <div class="d-flex justify-space-between align-items-center mb-4">
         <h6>City :</h6>
         <h6>{{ managementData.city }}</h6>
      </div>  
      <div class="d-flex justify-space-between align-items-center mb-4">
         <h6>Contact Info :</h6>
         <h6>{{ managementData.phone }}</h6>
      </div>
       <div class="d-flex justify-space-between align-items-center mb-5">
         <h6>Status :</h6>
         <v-btn v-if="managementData.status == 'new'" color="success" text-color="white">{{ managementData.status }}</v-btn>
         <v-btn v-else-if="managementData.status == 'onHold'" color="info" text-color="white">{{ managementData.status }}</v-btn>
         <v-btn v-else color="error" text-color="white">Undefined</v-btn>
      </div> 
      <div class="button-wrap text-center"> 
         <v-btn color="primary" medium class="ml-3 mt-3"
            :to="`/${getCurrentAppLayoutHandler() + '/detail/'+ managementData.uid}`">
            Show Detail
         </v-btn>
         <v-btn color="primary" medium class="ml-3 mt-3"
            :to="`/${getCurrentAppLayoutHandler() + '/order_history/'+ managementData.uid}`">
            Order History
         </v-btn>
         <v-btn color="primary" medium class="ml-3 mt-3"
            :to="`/${getCurrentAppLayoutHandler() + '/transactions/'+ managementData.uid}`">
            Transactions
         </v-btn>
      </div>            
   </div>
</template>
<script>
// import api from "Api";
import { getCurrentAppLayout } from "Helpers/helpers";

export default {
   props:['managementData'],
   data() {
      return {
      };
   },
   methods: {
      getCurrentAppLayoutHandler() {
         return getCurrentAppLayout(this.$router);
      }
   }
};
</script>