<template>
	<div>
		<v-container fluid grid-list-xl pt-5>
            <app-card
                colClasses="col-12 mt-3"
                customClasses="mb-0"
            >
                <v-form v-model="form.valid" ref="form" lazy-validation :key="componentkey">
                    <h4 class="pt-3 pb-3">User Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="chosen_user.name" 
                                label="Name"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div> 
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="chosen_user.email"
                                label="Email"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="chosen_user.phoneNumber"
                                label="Phone Number"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field> 
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <div>
                                <v-dialog
                                    ref="dialog"
                                    v-model="showModal"
                                    :return-value.sync="date"
                                    persistent
                                    width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="chosen_user.signupDate"
                                        label="Sign Up date"
                                        prepend-icon="event"
                                        readonly
                                        disabled
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                        <v-date-picker v-model="chosen_user.signupDate" scrollable>
                                        <div class="flex-grow-1"></div>
                                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="chosen_user.balance"
                                label="Balance"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 text-right">
                           <v-btn 
                                @click="submit"
                                class="v-btn v-btn--contained theme--light v-size--default success"> Update
                            </v-btn>
                        </div>
                    </v-row>
                </v-form>
            </app-card>
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
                                        :to="`/${getCurrentAppLayoutHandler() + '/order/'+ router + `/` + item.uid}`">
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
        <delete-confirmation-dialog
            ref="updateConfirmationDialog"
            heading="Are You Sure You Want To Update?"
            message="Are you sure you want to update this user?"
            @onConfirm="updateUser(router)"
        >
        </delete-confirmation-dialog>
         <v-snackbar :top="y === 'top'" :timeout="timeout" v-model="snackbar">
            {{ snackbarMessage }}
        </v-snackbar>
	</div>
</template>

<script>
import { usersRef } from "../../firebase";   
import { getCurrentSubLayout } from "Helpers/helpers";
import { getCurrentAppLayout } from "Helpers/helpers";
import { getTheDate01 } from "Helpers/helpers";


export default {
    data() {
        return {
            componentkey: 0,
            chosen_user: {
                id: "",
                name: "",
                email: "",
                phoneNumber: "",
                signupDate: "",
                balance: "",
            },
            form: {
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },

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

            loader: false,
            snackbar: false,
            snackbarMessage: "",
            timeout: 2000,
            y: "top",
            showModal: false,
            date: null,

        };
    },
    created() {
        //... get this page's router
        this.router = getCurrentSubLayout(this.$router);
        //... get this user detail informations
        var _that = this;
        this.getUserDetail(this.router).then(response => {
            if (response && response.errorMsg) {
                this.error = response.errorMsg;
            } else {
                this.chosen_user = response;
                _that.componentkey++;
            }
        });
    },
    
	methods:{
        submit() {
            if (this.$refs.form.validate()) {
                this.$refs.updateConfirmationDialog.openDialog();
            }
        },
        async getUserDetail(resId){
            try {

                //... chosen document's detail information
                var userSnap = await usersRef.doc(resId).get();

                this.chosen_user = userSnap.data();
                this.chosen_user.orders = {}

                //... get sub collections
                var orderSubCollection = await usersRef
                    .doc(resId)
                    .collection("orders")
                    .get();            

                for (const orderObj of orderSubCollection.docs) {
                    var orderData = orderObj.data();

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
                        uid: orderObj.id
                    })
                }
                
                return this.chosen_user;
            } catch (error) { console.log(error)}
        },

        updateUser(docId){
            usersRef.doc(docId).get().then(() => 
                usersRef.doc(docId).set({
                    name: this.chosen_user.name,
                    email: this.chosen_user.email,
                    phoneNumber: this.chosen_user.phoneNumber,
                    // signupDate: this.chosen_user.signupDate,
                    balance: this.chosen_user.balance
                })
            );

            this.$refs.updateConfirmationDialog.close();
            this.loader = true;
            setTimeout(() => {
                this.loader = false;
                this.snackbar = true;
                this.snackbarMessage = "This user information was updated Successfully!";
            }, 1500);
        },

        getCurrentAppLayoutHandler() {
            return getCurrentAppLayout(this.$router);
        }
    },
};
</script>
