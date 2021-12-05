<template>
	<div>
		<app-section-loader :status="loader"></app-section-loader>
		<v-container fluid class="grid-list-xl py-0 mt-3">
		<v-row>
			<app-card
				:heading="$t('message.store')"
				:fullBlock="true"
				colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
			>
			
			<v-data-table v-bind:headers="headers" :items="stores">
				<template slot="headerCell" slot-scope="props">
				<v-tooltip bottom>
					<span slot="activator">
					{{ props.header.text }}
					</span>
					<span>
					{{ props.header.text }}
					</span>
				</v-tooltip>
				</template>

				<template slot="stores" slot-scope="props">
				<tr>
					<td>{{ props.stores.storeName }}</td>                
					<td>{{ props.stores.city }}</td>
					<td>{{ props.stores.distract }}</td>
					<td>{{ props.stores.phone }}</td>
					<td>{{ props.stores.city }}</td>
					<td>{{ props.stores.status }}</td>
				</tr>
				</template>
				
				<template #item:actions="{item}">
				<button small :to="`/watch/`"> {{item.id}}</button>
				</template>
			</v-data-table> 
			</app-card>
		</v-row>
		</v-container>
		<app-section-loader :status="loader"></app-section-loader>
	</div>
</template>

<script>
//import api from "Api";
import { storesRef } from "../../firebase";

export default {
	data() {
		return {
			loader: true,
			stores: [],
			pagination: {
				sortBy: "storeName",
			},
			selected: [],
			headers: [
				{ text: "Store Name", value: "storeName" },
				{ text: "Distract", value: "distract" },
				{ text: "City", value: "city" },
				{ text: "Phone", value: "phone" },
				{ text: "Status", value: "status" },
			],
		};
	},
	mounted() {
		this.getStores();
	},
	methods: {
		getStores() {
			storesRef.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					let data = doc.data();
					if(data.storeName && data.storeName["en"]){
						this.stores.push({
							uid: doc.id,
							status: data.status,
							storeName: data.storeName && data.storeName["en"] ? data.storeName["en"] : "",
							distract: data.distract && data.distract["en"] ? data.distract["en"] : "",
							city: data.city && data.city["en"] ? data.city["en"] : "",
							phone: data.phone,
						});
					}
				});
				this.loader = false;
			});
		}
	},
};
</script>
