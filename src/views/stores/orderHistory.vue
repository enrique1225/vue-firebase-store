<template>
	<div>
        <app-section-loader :status="loader"></app-section-loader>
		<v-container fluid class="grid-list-xl pt-5 mt-n3">
            <div class="title mt-5 mb-5">
                <h3 class="mb-0">Order History</h3>
            </div>
			<v-row>
				<app-card
					:fullBlock="true"
					colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
				>
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
						v-bind:items="items"
						v-bind:search="search"
					>
                        <template v-slot:item="{ item }">
                            <tr>			
                                <td>{{ item.orderNumber }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.phone }}</td>
                                <td>{{ item.paymentMethod }}</td>
                                <td>{{ item.acceptedAt }}</td>
                                <td>{{ item.readyIn }}</td>
                                <td>{{ item.total }}</td>
                                <td>{{ item.vat }}</td>
                                <td class="text-nowrap">
                                    <v-badge :value=false v-if="item.orderStatus == 'ready'" class="custom_badge success">{{item.orderStatus}}</v-badge>
                                    <v-badge :value=false v-else-if="item.orderStatus == 'closed'" class="custom_badge info">{{item.orderStatus}}</v-badge>
                                    <v-badge :value=false v-else class="custom_badge error">{{item.orderStatus}}</v-badge>
                                </td>
                            </tr>
                        </template>
						<template slot="pageText" slot-scope="{ pageStart, pageStop }">
							From {{ pageStart }} to {{ pageStop }}
						</template>
					</v-data-table>
				</app-card>
			</v-row>
	</v-container>
	</div>
</template>

<script>
import { storesRef } from "../../firebase";
import { getCurrentSubLayout } from "Helpers/helpers";
import { getTheDate } from "Helpers/helpers";

export default {
    data() { 
        return {
            router: "",
            loader: true,
            search: "",
            pagination: {},
            headers: [
                { text: "Order Number", value: "orderNumber" },
                { text: "Cumstomer Name", value: "name" },
                { text: "Phone", value: "phone" },
                { text: "Payment Method", value: "paymentMethod" },
                { text: "Accpeted At", value: "acceptedAt" },
                { text: "Ready In", value: "readyIn" },
                { text: "Total", value: "total" },
                { text: "Vat", value: "vat" },
                { text: "Order Status", value: "orderStatus" }
            ],
            items: []
        };
    },
    created() {
        //... get this page's router
        var router = getCurrentSubLayout(this.$router);
        //... get this store detail informations
        this.getStoreDetail(router).then(response => {
            if (response && response.errorMsg) {
                this.error = response.errorMsg;
            } else {
                this.store = response;
            }
        });
    },
	methods:{
        async getStoreDetail(resId){
            try {
                //... all store's collections
                var allStores = storesRef;

                //... get sub collections 
                var menuTypesSnap = await allStores
                    .doc(resId)
                    .collection("ordersHistory")
                    .get();

                for (const menuTypeObj of menuTypesSnap.docs) {
                    var menuType = menuTypeObj.data();

                    this.items.push({
                        name: menuType.customer.name,
                        phone: menuType.customer.phone,
                        orderNumber: menuType.orderNumber,
                        orderStatus: menuType.orderStatus,
                        paymentMethod: menuType.paymentMethod,
                        acceptedAt: getTheDate(menuType.statusHistory.acceptedAt.seconds),
                        readyIn: getTheDate(menuType.statusHistory.readyIn.seconds),
                        total: menuType.total,
                        vat: menuType.vat,
                    });
                }

                this.loader = false;

                return this.items;
            } catch (error) { console.log(error)}
        }
    }
};
</script>
