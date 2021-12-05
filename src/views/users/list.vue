<template>
	<div>
        <v-container fluid class="grid-list-xl pt-0">
            <div class="d-flex justify-space-between align-items-center pa-6 project-grid-title">
                <div class="title">
                    <h3 class="mb-0">{{$t('message.users')}}</h3>
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
						v-bind:items="users"
						v-bind:search="search"
					>
                        <template v-slot:item="{ item }">
                            <tr>			
                                <td>{{ item.name }}</td>
                                <td>{{ item.uid }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.phoneNumber }}</td>
                                <td>{{ item.signupDate }}</td>
                                <td>{{ item.balance }}</td>
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
			</v-row>
        </v-container>
	</div>
</template>

<script>
import { getCurrentAppLayout } from "Helpers/helpers";
import { usersRef } from "../../firebase";

export default {
    data() {
        return {
            users: [],

            loader: true,
            search: "",
            pagination: {},
            headers: [
                { text: "Name", value: "name" },
                { text: "Id", value: "uid" },
                { text: "Email", value: "email" },
                { text: "Phone Number", value: "phoneNumber" },
                { text: "Sign Up Date", value: "signupDate" },
                { text: "Balance", value: "balance" },
                { text: "Action", value: "uid" }
            ],
        };
    },
    mounted() {
        this.getUsers();
    },
    methods:{
        getUsers() {
			usersRef.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					let data = doc.data();
                    this.users.push({
                        uid: doc.id,
                        name: data.name ? data.name : "No data",
                        email: data.email ? data.email : "No data",
                        phoneNumber: data.phoneNumber ? data.phoneNumber: "No data",
                        signupDate: data.signupDate ? data.signupDate: "No data",
                        balance: data.balance ? data.balance : "No data",
                    });
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