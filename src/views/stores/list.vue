<template>
	<div>
        <v-container fluid class="grid-list-xl pt-0">
            <div class="d-flex justify-space-between align-items-center pa-6 project-grid-title">
                <div class="title">
                    <h3 class="mb-0">{{$t('message.store')}}</h3>
                </div>
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
						v-bind:items="stores"
						v-bind:search="search"
					>
                        <template v-slot:item="{ item }">
                            <tr>			
                                <td>{{ item.storeName }}</td>
                                <td>{{ item.uid }}</td>
                                <td>{{ item.distract }}</td>
                                <td>{{ item.city }}</td>
                                <td>{{ item.phone }}</td>
                                <td>
                                    <v-badge :value=false v-if="item.status == 'new'" class="custom_badge success">{{item.status}}</v-badge>
                                    <v-badge :value=false v-else-if="item.status == 'onHold'" class="custom_badge info">{{item.status}}</v-badge>
                                    <v-badge :value=false v-else class="custom_badge error">{{item.status}}</v-badge>
                                </td>
                                
                                <td>
                                    <div class="button-wrap"> 
                                        <router-link class="primary custom_badge"
                                            :to="`/${getCurrentAppLayoutHandler() + '/detail/'+ item.uid}`">
                                            Show Detail
                                        </router-link>
                                        <router-link class="success custom_badge"
                                            :to="`/${getCurrentAppLayoutHandler() + '/order_history/'+ item.uid}`">
                                            Order History
                                        </router-link>
                                        <router-link class="info custom_badge"
                                            :to="`/${getCurrentAppLayoutHandler() + '/transactions/'+ item.uid}`">
                                            Transactions
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
			</v-row>
        </v-container>
	</div>
</template>

<script>

// widgets
import { getCurrentAppLayout } from "Helpers/helpers";
import { storesRef } from "../../firebase";


export default {
    data() {
        return {
            stores: [],

            loader: true,
            search: "",
            pagination: {},
            headers: [
                { text: "Name", value: "storeName" },
                { text: "Id", value: "uid" },
                { text: "Distract", value: "distract" },
                { text: "City", value: "city" },
                { text: "Phone", value: "phone" },
                { text: "Status", value: "status" },
                { text: "Action", value: "uid" , sortable: false }
            ],
        };
    },
    mounted() {
        this.getStores();
    },
    methods:{
        getStores() {
			storesRef.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					let data = doc.data();
					// if(data.storeName && data.storeName["en"]){
						this.stores.push({
                            uid: doc.id,
							status: data.status ? data.status : "No data",
							storeName: data.storeName && data.storeName["en"] ? data.storeName["en"] : "No data",
							distract: data.distract && data.distract.name && data.distract.name["en"] ? data.distract.name["en"] : "No data",
							city: data.city && data.city["en"] ? data.city["en"] : "No data",
							phone: data.phone ? data.phone : "No data",
						});
					// }
				});
				this.loader = false;
			});
		},
        getCurrentAppLayoutHandler() {
            return getCurrentAppLayout(this.$router);
        }
    }
};
</script>