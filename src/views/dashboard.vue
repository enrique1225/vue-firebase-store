<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-row class="stats-card-v4">
				<v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
					<stats-card-v4 
						:title="`Total Stores`"
						:value="totalStores"
						:status="1"
						:data="[20,15,12,6,18,17,20,2]"
						:labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
						:color="ChartConfig.color.info"
					>
					</stats-card-v4>
				</v-col>
				<v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
					<stats-card-v4 
						:title="`Total Users`"
						:value="totalUsers"
						:status="0"
						:data="[15,20,6,9,18,17,20,2]"
						:labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
						:color="ChartConfig.color.warning"
					></stats-card-v4>
				</v-col>
				<v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
					<stats-card-v4 
						:title="`Total Orders`"
						:value="totalOrders"
						:status="1"
						:data="[1,15,12,6,18,17,20,22]"
						:labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
						:color="ChartConfig.color.danger"
					></stats-card-v4>
				</v-col>
			</v-row>
			
		</v-container>
	</div>
</template>

<script>
import StatsCardV4 from "Components/StatsCardV4/StatsCardV4";
import { storesRef } from "../firebase";
import { usersRef } from "../firebase";
import { ordersRef } from "../firebase";

// chart config
import { ChartConfig } from "Constants/chart-config";

export default {
    components: {
        StatsCardV4
    },
    data() {
        return {
            ChartConfig,
            totalStores: 0,
            totalUsers: 0,
            totalOrders: 0
        };
    },
    created() {
        this.getStores();
        this.getUsers();
        this.getOrders();
    },
    methods: {
        getStores() {
			storesRef.onSnapshot((snapshot) => {
				this.totalStores = snapshot.docs.length;
			});
		},
        getUsers(){
            usersRef.onSnapshot((snapshot) => {
                this.totalUsers = snapshot.docs.length;
            })
        },
        getOrders(){
            ordersRef.onSnapshot((snapshot) => {
                this.totalOrders = snapshot.docs.length;
            })
        }
    }
};
</script>
