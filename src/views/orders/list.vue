<template>
	<div>
		<v-container fluid grid-list-xl pt-5>
            <app-card
                :fullBlock="true"
                colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
            >
                <h4 class="pt-5 pl-5">Orders</h4>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                    >
                    </v-text-field>
                </v-card-title>
                <v-data-table
                    v-bind:headers="headers"
                    v-bind:items="orderLists"
                    v-bind:search="search"
                    v-bind:sort-by.sync="defaultSort"
                >
                    <template v-slot:item="{ item }">
                        <tr>			
                            <td>{{ item.orderNumber }}</td>
                            <td>{{ item.orderFee }}</td>
                            <td>
                                <v-badge :value=false v-if="item.orderStatus == 'new'" class="custom_badge success">{{item.orderStatus}}</v-badge>
                                <v-badge :value=false v-else-if="item.orderStatus == 'newOrder'" class="custom_badge success"> New </v-badge>
                                <v-badge :value=false v-else-if="item.orderStatus == 'accepted'" class="custom_badge info">{{item.orderStatus}}</v-badge>
                                <v-badge :value=false v-else-if="item.orderStatus == 'ready'" class="custom_badge info">{{item.orderStatus}}</v-badge>
                                <v-badge :value=false v-else-if="item.orderStatus == 'preparing'" class="custom_badge primary">{{item.orderStatus}}</v-badge>
                                <v-badge :value=false v-else class="custom_badge error">{{item.orderStatus}}</v-badge>
                            </td>
                            <td>{{ item.paymentMethod }}</td>
                            <td>
                                <v-badge :value=false v-if="item.paymentStatus == 'paid'" class="custom_badge success">{{item.paymentStatus}}</v-badge>
                                <v-badge :value=false v-else class="custom_badge error">{{item.paymentStatus}}</v-badge>
                            </td>
                            <td>{{ item.subtotal }}</td>
                            <td>{{ item.total }}</td>
                            <td>{{ item.vat }}</td>
                            <td>{{ item.createdAt }}</td>
                            <td>
                                <div class="button-wrap"> 
                                    <router-link class="primary custom_badge"
                                        :to="`/${getCurrentAppLayoutHandler() + '/detail/'+ item.uid}`">
                                        Show Detail
                                    </router-link>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                        From {{ pageStart }} to {{ pageStop }}
                    </template>
                </v-data-table>
            </app-card>
		</v-container>
	</div>
    
</template>

<script>
import { ordersRef } from "../../firebase";   
import { getTheDate01 } from "Helpers/helpers";
import { getCurrentAppLayout } from "Helpers/helpers";

export default {
    data() {
        return {
            orderLists: [],
            defaultSort: "orderNumber",
            headers: [
                { text: "Number", value: "orderNumber" },
                { text: "Fee", value: "orderFee" },
                { text: "Status", value: "orderStatus" },
                { text: "Payment Method", value: "paymentMethod" },
                { text: "Payment Status", value: "paymentStatus" },
                { text: "Subtotal", value: "subtotal" },
                { text: "Total", value: "total" },
                { text: "Vat", value: "vat" },
                { text: "Created At", value: "createdAt" },
                { text: "Action", value: "uid", sortable: false }
            ],
            search: "",
            pagination: {},
            router: "",
            active: null,
            date: null,
        };
    },
    created() {
        this.getOrders();
    },
    
	methods:{
        getOrders() {
			ordersRef.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					let orderData = doc.data();
					this.orderLists.push({
                        orderNumber: orderData.orderNumber ? orderData.orderNumber : "No data",
                        orderFee: orderData.orderFee ? orderData.orderFee : "No data",
                        orderStatus: orderData.orderStatus ? orderData.orderStatus : "No data",
                        paymentMethod: orderData.paymentMethod ? orderData.paymentMethod : "No data",
                        paymentStatus: orderData.paymentStatus ? orderData.paymentStatus : "No data",
                        subtotal: orderData.subtotal ? orderData.subtotal : "No data",
                        total: orderData.total ? orderData.total : "No data",
                        vat: orderData.vat ? orderData.vat : "No data",
                        createdAt: orderData.createdAt ? getTheDate01(orderData.createdAt) : "No data",
                        uid: doc.id
                    });
				});
				this.loader = false;
			});
        },
        getCurrentAppLayoutHandler() {
            return getCurrentAppLayout(this.$router);
        }
    },
};
</script>
