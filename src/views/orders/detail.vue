<template>
	<div>
		<v-container fluid grid-list-xl pt-5>
			<app-card :fullBlock="true">
				<gmap-map :center="this.center" :zoom="9" style="width: '100%'; height: 400px">
					<gmap-marker 
						:position="this.markers.position" 
						:clickable="true"
						:draggable="false"
						@click="center=this.markers.position"
					>
					</gmap-marker>
				</gmap-map>
			</app-card>

            <app-card
                colClasses="col-12 mt-3"
                customClasses="mb-0"
            >
                <v-form v-model="form.valid" ref="form" lazy-validation :key="componentkey">
                    <h4 class="pt-3 pb-3">General Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="generalInfo.orderNumber" 
                                label="Number"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="generalInfo.orderFee" 
                                label="Fee"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-select
                                :items="orderStatusLists"
                                v-model="generalInfo.orderStatus"
                                label="Status"
                                :rules="form.validRules"
                                required
                            ></v-select>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="generalInfo.paymentMethod" 
                                label="Payment Method"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-switch 
                                label="Paid" 
                                v-model="generalInfo.paymentStatus"
                                color="success"
                                hide-details
                            >
                            </v-switch>
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
                                        v-model="generalInfo.createdAt"
                                        label="Created At"
                                        prepend-icon="event"
                                        readonly
                                        disabled
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                        <v-date-picker v-model="generalInfo.createdAt" scrollable>
                                        <div class="flex-grow-1"></div>
                                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="generalInfo.subtotal" 
                                label="SubTotal"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="generalInfo.total" 
                                label="Total"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="generalInfo.vat" 
                                label="Vat"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>
                
                    <h4 class="pt-3 pb-3">Customer Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="customerInfo.name" 
                                label="Name"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="customerInfo.email" 
                                label="Email"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="customerInfo.city" 
                                label="City"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="customerInfo.phone" 
                                label="Phone"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>

                    <h4 class="pt-3 pb-3">Store Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="storeInfo.name.en" 
                                label="Name(En)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-if="storeInfo.name"
                                v-model="storeInfo.name.ar" 
                                label="Name(Ar)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-else
                                v-model="storeInfo.name.ar" 
                                label="Name(Ar)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="storeInfo.address.en" 
                                label="Address(En)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="storeInfo.address.ar" 
                                label="Address(Ar)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="storeInfo.location._lat"
                                label="Latitude"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="storeInfo.location._long"
                                label="Longitude"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>

                    <h4 class="pt-3 pb-3">Items Information</h4>
                    
                    <v-row v-if="itemsInfo.length == 0">
                        <h4 class="pt-3 pl-5"> No data </h4>
                    </v-row>
                    <v-row v-else v-for="(tmp, tmp_index) in itemsInfo" :key="tmp_index" class="orderItemRow">
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <h4>Item {{tmp_index + 1}}</h4>
                        </div>                        
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="tmp.item.name.en" 
                                label="Name(En)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="tmp.item.name.ar" 
                                label="Name(Ar)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="tmp.item.price" 
                                label="Price"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="tmp.item.extras" 
                                label="Extras"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="tmp.item.quantity" 
                                label="Quantity"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>
                    <v-row>
                        <div class="col-sm-12 text-right">
                            <v-btn 
                                @click="submit"
                                class="v-btn v-btn--contained theme--light v-size--default success"> Update </v-btn>
                        </div>
                    </v-row>
                </v-form>
            </app-card>
		</v-container>
        <delete-confirmation-dialog
            ref="updateConfirmationDialog"
            heading="Are You Sure You Want To Update?"
            message="Are you sure you want to update this store?"
            @onConfirm="updateOrder(router, lastRouter)"
        >
        </delete-confirmation-dialog>
         <v-snackbar :top="y === 'top'" :timeout="timeout" v-model="snackbar">
            {{ snackbarMessage }}

        </v-snackbar>
	</div>
    
</template>

<script>
import { ordersRef } from "../../firebase";   
import { getCurrentSubLayout } from "Helpers/helpers";
import { getTheDate01 } from "Helpers/helpers";

export default {
    data() {
        return {
            componentkey: 0,
            
            form: {
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },

            generalInfo: {},
            customerInfo: {},
            itemsInfo: [],
            storeInfo: {},

            orderStatusLists: ["preparing", "accepted", "ready", "closed", "new"],
            showModal: false,
            date: null,
            
            center: {},
            markers: {
                position: {}
            },
            
            router: "",
            lastRouter: "",
            active: null,

            loader: false,
            snackbar: false,
            snackbarMessage: "",
            timeout: 2000,
            y: "top",
        };
    },
    created() {
        //... get this page's router
        this.router = getCurrentSubLayout(this.$router);
        //... get this order detail informations
        var _that = this;
        this.getOrderDetail(this.router).then(response => {
            if (response && response.errorMsg) {
                this.error = response.errorMsg;
            } else {
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
        async getOrderDetail(orderId){
            try {
                //... get sub collections
                var orderDoc = await ordersRef
                    .doc(orderId)
                    .get();

                var orderData = orderDoc.data();

                this.generalInfo.orderNumber = orderData.orderNumber ? orderData.orderNumber : "";
                this.generalInfo.orderFee = orderData.orderFee ? orderData.orderFee : "";
                this.generalInfo.orderStatus = orderData.orderStatus ? orderData.orderStatus : "";
                this.generalInfo.paymentMethod = orderData.paymentMethod ? orderData.paymentMethod : "";
                this.generalInfo.paymentStatus = orderData.paymentStatus ? orderData.paymentStatus : "";
                this.generalInfo.subtotal = orderData.subtotal ? orderData.subtotal : "";
                this.generalInfo.total = orderData.total ? orderData.total : "";
                this.generalInfo.vat = orderData.vat ? orderData.vat : "";
                this.generalInfo.createdAt = orderData.createdAt ? getTheDate01(orderData.createdAt) : ""

                this.customerInfo.name = orderData.customer.name ? orderData.customer.name :"";
                this.customerInfo.city = orderData.customer.city ? orderData.customer.city :"";
                this.customerInfo.email = orderData.customer.email ? orderData.customer.email :"";
                this.customerInfo.phone = orderData.customer.phone ? orderData.customer.phone : "";

                for(var i = 0; i < orderData.items.length; i++){
                    var item = orderData.items[i];
                    
                    this.itemsInfo.push({item: {
                        name: {
                            "en": item.item.name.en ? item.item.name.en : "",
                            "ar": item.item.name.ar ? item.item.name.ar : ""
                        },
                        price: item.item.price ? item.item.price : "",
                        id: item.item.id ? item.item.id : "",
                        extras: item.item.extras ? item.item.extras : "",
                        quantity: item.quantity ? item.quantity : ""
                    }})
                }

                this.storeInfo.name = orderData.store.name ? orderData.store.name : {};
                this.storeInfo.address = orderData.store.address ? orderData.store.address : {};
                this.storeInfo.location = orderData.store.location ? orderData.store.location : {};
                this.storeInfo.id = orderData.store.storeUid ? orderData.store.storeUid : "";

                //... put correct Google Map
                var locat_lat = this.storeInfo.location._lat ? this.storeInfo.location._lat : 0;
                var locat_long = this.storeInfo.location._long ? this.storeInfo.location._long : 0;
                
                this.center = {lat: parseFloat(locat_lat), lng: parseFloat(locat_long)};
                this.markers.position = {lat: parseFloat(locat_lat), lng: parseFloat(locat_long)};

            } catch (error) { console.log(error)}
        },
        
        updateOrder(docId){
            var test_item = {item: this.itemsInfo}
            console.log(test_item)
            ordersRef.doc(docId).get().then(() => 
                ordersRef.doc(docId).update({
                    customer: this.customerInfo,
                    store: this.storeInfo,
                    items: this.itemsInfo,

                    orderNumber: this.generalInfo.orderNumber ? this.generalInfo.orderNumber : "",
                    orderFee: this.generalInfo.orderFee ? this.generalInfo.orderFee : "",
                    orderStatus: this.generalInfo.orderStatus ? this.generalInfo.orderStatus : "",
                    paymentMethod: this.generalInfo.paymentMethod ? this.generalInfo.paymentMethod : "",
                    paymentStatus: this.generalInfo.paymentStatus == true? "paid" : "",
                    subtotal: this.generalInfo.subtotal ? this.generalInfo.subtotal : "",
                    total: this.generalInfo.total ? this.generalInfo.total : "",
                    vat: this.generalInfo.vat ? this.generalInfo.vat : "",                    
                })
            )

            this.$refs.updateConfirmationDialog.close();
            this.loader = true;
            setTimeout(() => {
                this.loader = false;
                this.snackbar = true;
                this.snackbarMessage = "This order information was updated Successfully!";
            }, 1500);
        },
    },
};
</script>
