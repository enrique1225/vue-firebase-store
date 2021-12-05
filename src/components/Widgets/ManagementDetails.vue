<template>
   <div>
		<v-list class="card-list top-selling management-wrap">
			<v-list-item class="py-4">
				<v-list-item-content class="py-0">
					<v-list-item-title>Name :</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="my-0">
					<h5 class="mb-0" v-if="managementData.storeName && managementData.storeName['en'] != ''">{{ managementData.storeName['en'] }} </h5>
					<h5 class="mb-0" v-else> No data </h5>
				</v-list-item-action>			
			</v-list-item>
			<v-list-item class="py-4">
				<v-list-item-content class="py-0">
					<v-list-item-title>Phone:</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="my-0">
					<h5 class="mb-0" v-if="managementData.phone && managementData.phone != ''">{{ managementData.phone }} </h5>
					<h5 class="mb-0" v-else> No data </h5>
				</v-list-item-action>
			</v-list-item>
			<v-list-item class="py-4">
				<v-list-item-content class="py-0">
					<v-list-item-title>City:</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="my-0">
					<h5 class="mb-0" v-if="managementData.city && managementData.city['en'] != ''">{{ managementData.city['en'] }} </h5>
					<h5 class="mb-0" v-else> No data </h5>
				</v-list-item-action>
			</v-list-item>
			<v-list-item class="py-4">
				<v-list-item-content class="py-0">
					<v-list-item-title>Distract:</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="my-0">
					<h5 class="mb-0" v-if="managementData.distract && managementData.distract['en'] != ''">{{ managementData.distract['en'] }} </h5>
					<h5 class="mb-0" v-else> No data </h5>
				</v-list-item-action>
			</v-list-item>
			<v-list-item class="py-4">
				<v-list-item-content class="py-0">
					<v-list-item-title>ServiceFee:</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="my-0">
					<h5 class="mb-0" v-if="managementData.serviceFee && managementData.serviceFee != ''">{{ managementData.serviceFee }} </h5>
					<h5 class="mb-0" v-else> No data </h5>
				</v-list-item-action>
			</v-list-item>
			<v-list-item class="py-4">
				<v-list-item-content class="py-0">
					<v-list-item-title>Status:</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="my-0">
					<h5 class="mb-0" v-if="managementData.status && managementData.status != ''"> <v-btn color="success">{{ managementData.status}}</v-btn> </h5>
					<h5 class="mb-0" v-else> <v-btn color="error">No data</v-btn> </h5>
				</v-list-item-action>
			</v-list-item>
		</v-list>
   </div>
</template>
<script>

export default {
   props:['managementData']
}
</script>