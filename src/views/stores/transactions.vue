<template>
	<div>
        <app-section-loader :status="loader"></app-section-loader>
		<v-container fluid class="grid-list-xl pt-5 mt-n3">
            <div class="title mt-5 mb-5">
                <h3 class="mb-0">Transactions</h3>
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
import { getTheDate01 } from "Helpers/helpers";
import ManagementDetails from 'Components/Widgets/ManagementDetails'

export default {
    components: {
        ManagementDetails,
    },
    data() {
        return {
            router: "",
            loader: true,
            search: "",
            pagination: {},
            headers: [
                { text: "Order Number", value: "orderNumber"},
                { text: "Balance", value: "balance" },
                { text: "Commission", value: "commission" },
                { text: "ServiceFee", value: "serviceFee" },
                { text: "Total", value: "total" },
                { text: "Date", value: "date" }
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
                    .collection("info")
                    .get();

                for (const menuTypeObj of menuTypesSnap.docs) {
                    var menuType = menuTypeObj.data();
                    var docType = menuTypeObj.id;

                    if(docType == "balance"){
                        menuType["menuItems"] = [];
                        // Get Restaurant Menu Items
                        var menuItemsSanp = await menuTypeObj.ref
                            .collection("transications")
                            .get();
                        for (const menuItem of menuItemsSanp.docs) {
                            menuType["menuItems"].push(menuItem.data());
                        }
                        console.log("===============total")
                        console.log(menuType.menuItems);

                        for(var i=0; i<menuType.menuItems.length; i++){
                            this.items.push({
                                orderNumber: menuType.menuItems[i].orderNumber,
                                balance: menuType.menuItems[i].addedToBalance,
                                commission: menuType.menuItems[i].commission,
                                serviceFee: menuType.menuItems[i].serviceFee,
                                total: menuType.menuItems[i].total,
                                date: getTheDate01(menuType.menuItems[i].date),
                            });
                        }                        
                    }
                }

                console.log(this.items);
                this.loader = false;

                return this.items;
            } catch (error) { console.log(error)}
        }
    }
};
</script>
