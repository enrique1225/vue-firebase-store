<template>
	<div>
        <app-section-loader :status="loader"></app-section-loader>
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
                    <h4 class="pt-3 pb-3">Store Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="chosen_store.storeName.en" 
                                label="Store Name(En)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div> 
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="chosen_store.storeName.ar"
                                label="Store Name(Ar)"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="chosen_store.phone"
                                label="Phone"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field> 
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field 
                                v-model="chosen_store.serviceFee"
                                label="Service Fee"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                             <v-col cols="12">
                                <v-select
                                    :items="status_list"
                                    v-model="chosen_store.status"
                                    label="Status"
                                    :rules="form.validRules"
                                    required
                                ></v-select>
                            </v-col>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-switch label="closed" v-model="chosen_store.closed" color="success" hide-details>
                            </v-switch>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="geohash"
                                label="Geohash"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="geopoint._lat"
                                label="Latitude"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="geopoint._long"
                                label="Longitude"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-select
                                v-model="chosen_store.city"
                                :items="cities"
                                item-text="name.en"
                                label="City"
                                @change="change_city($event)"
                            ></v-select>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-select
                                v-model="chosen_store.distract"
                                :items="selected_distracts[0].lists"
                                item-text="name.en"
                                label="Distract"
                                @change="change_distract($event)"
                            >
                                <option v-for="(id, item) in selected_distracts[0].lists" :key="'distract' + id">
                                    "{{ item.name }}"
                                </option>
                            </v-select> 
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <label class="timepicker_label"> Open </label>
                            <vue-timepicker v-model="chosen_store.workingHours.open" format="HH:mm"></vue-timepicker>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <label class="timepicker_label"> Close </label>
                            <vue-timepicker v-model="chosen_store.workingHours.close" format="HH:mm"></vue-timepicker>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-file-input
                                label="Choose avatar"
                                @change="chooseAvatar"
                                class="input-group--focused"
                                accept = "image/*"
                            ></v-file-input>                                          
                        
                            <img class="preview_avatar" v-if="chosen_store.logo" height="150" width="150" :src="chosen_store.logo">
                        </div>
                    </v-row>

                    <h4 class="pt-3 pb-3">General Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="store_info.general_ccr"
                                label="Ccr"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="store_info.general_email"
                                label="Email"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="store_info.general_manager"
                                label="Manager"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>

                    <h4 class="pt-3 pb-3">Files Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-file-input
                                label="Choose IBAN File"
                                @change="chooseIBAN"
                                class="input-group--focused"                                
                            ></v-file-input>
                            <v-text-field
                                v-model="IBANData"
                                label="IBAN"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-file-input
                                label="Choose ccr File"
                                @change="chooseCcr"
                                class="input-group--focused"
                            ></v-file-input>
                            <v-text-field
                                v-model="ccrData"
                                label="Ccr"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-file-input
                                label="Choose contract File"
                                @change="chooseContract"
                                class="input-group--focused"
                            ></v-file-input>
                            <v-text-field
                                v-model="contractData"
                                label="Contract"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>

                    <h4 class="pt-3 pb-3">Payment Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="store_info.payment_IBAN"
                                label="IBAN"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="store_info.payment_bank" 
                                label="Bank"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                    </v-row>

                    <h4 class="pt-3 pb-3">Balance Information</h4>
                    <v-row>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <v-text-field
                                v-model="store_info.balance"
                                label="Balance"
                                class="input-group--focused"
                                :rules="form.validRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-lg-8 col-md-6 col-sm-12 text-right">
                            <v-btn @click="submit" color="success"> Update </v-btn>
                        </div>
                    </v-row>
                </v-form>
            </app-card>

            <app-card 
                colClasses="col-12 mt-5"
                customClasses="mb-0"
            >

                <h4 class="pt-3 pl-5">Menu</h4>

                <v-row>
                    <div class="col-md-4 col-sm-12">
                        <v-dialog v-model="dialog5" max-width="600px">
                            <template v-slot:activator="{ on }">
                                <div class="text-center">
                                    <v-btn class="mt-3" color="info" dark v-on="on"> New Category </v-btn>
                                </div>
                            </template>
                            <v-card>
                                <v-form v-model="menu_form.valid" ref="category_form" lazy-validation>
                                    <v-card-title>
                                        Add a Menu Category
                                    </v-card-title>
                                    <v-card-text>
                                        <v-text-field v-model="new_menu.name.en" label="Name(En)" class="input-group--focused" :rules="menu_form.validRules"></v-text-field>
                                        <v-text-field v-model="new_menu.name.ar" label="Name(Ar)" class="input-group--focused" :rules="menu_form.validRules"></v-text-field>                                
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="error" @click.native="dialog5 = false">Close</v-btn>
                                        <v-btn color="success" @click="addMenuCategory">Save</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </v-dialog>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <v-dialog v-model="dialog6" max-width="600px">
                            <template v-slot:activator="{ on }">
                                <div class="text-center">
                                    <v-btn class="mt-3" color="info" dark v-on="on"> New Item </v-btn>
                                </div>
                            </template>
                            <v-card>
                                <v-form v-model="new_item_form.valid" ref="new_item_form" lazy-validation>
                                    <v-card-title>
                                        Add a Menu Item
                                    </v-card-title>
                                    <v-card-text>
                                        <v-select
                                            :items="menu_categories"
                                            item-text="name"
                                            item-value="id"
                                            v-model="menu_category"
                                            label="Choose a category"
                                            :rules="new_item_form.validRules"
                                            required
                                        ></v-select>
                                        <v-text-field v-model="new_item.name.en" label="Name(En)" class="input-group--focused" :rules="new_item_form.validRules"></v-text-field>
                                        <v-text-field v-model="new_item.name.ar" label="Name(Ar)" class="input-group--focused" :rules="new_item_form.validRules"></v-text-field>
                                        <v-text-field v-model="new_item.price" label="Price" class="input-group--focused" :rules="new_item_form.validRules"></v-text-field>
                                        <v-text-field v-model="new_item.description.en" label="Description(En)" class="input-group--focused" :rules="new_item_form.validRules"></v-text-field>
                                        <v-text-field v-model="new_item.description.ar" label="Description(Ar)" class="input-group--focused" :rules="new_item_form.validRules"></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="error" @click.native="dialog6 = false">Close</v-btn>
                                        <v-btn color="success" @click.native="addItem">Save</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </v-dialog>
                    </div>
                    <div class="col-md-4 col-sm-12 text-center">
                        <v-file-input label="Import File"  @change="import_menu_csv" class="input-group--focused import_menu_csv" accept=".csv, .xlsx"></v-file-input>
                        <v-btn v-if="show_upload_csv" class="mt-3" color="info" @click="upload_csv"> Upload </v-btn>
                    </div>
                </v-row>


                <xlsx-read :file="file">
                    <xlsx-json>
                        <template #default="{collection}">
                            <p id="imported_menu_data">{{collection}}</p>
                        </template>
                    </xlsx-json>
                </xlsx-read>
                
                <v-tabs v-model="active" slider-color="primary" class="customTab" :key="categoryKey">
                    <v-tab v-for="(menu,index) in MenuList" :key="index" ripple class="text-capitalize">
                        {{ menu.name['en'] }}
                    </v-tab>
                    <v-tab-item v-for="(menu,menu_number) in MenuList" :key="menu_number">
                        <div v-if="menu.items.length != 0">
                            <v-form>
                                <div class="pl-3 pt-5 pb-3" v-for="(item,number) in menu.items" :key="number">
                                    <v-row>
                                        <div class="col-lg-4 col-md-6 col-sm-12">
                                            <v-text-field v-model="item.name.en" label="Name(En)" class="input-group--focused" disabled></v-text-field>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-12">
                                            <v-text-field v-model="item.name.ar" label="Name(Ar)" class="input-group--focused" disabled></v-text-field>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-12">
                                            <v-text-field v-model="item.price" label="Price" class="input-group--focused" disabled></v-text-field>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-12">
                                            <v-text-field v-model="item.description.en" label="Description(En)" class="input-group--focused" disabled></v-text-field>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-12">
                                            <v-text-field v-model="item.description.ar" label="Description(Ar)" class="input-group--focused" disabled></v-text-field>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-12 text-center">
                                            <img v-if="item.image" class="preview_avatar mt-0" height="150" width="150" :src="item.image">
                                        </div>
                                    </v-row>

                                    <div class="text-right">
                                        <v-btn class="mt-3" color="success"  @click="getItem(menu.uid, item.uid)"> Edit </v-btn>
                                    </div>
                                </div>
                            </v-form>
                        </div>
                    </v-tab-item> 
                </v-tabs>
                <v-dialog v-model="edit_item_dialog" max-width="900px">
                    <v-card :key="categoryKey">
                        <v-form v-model="edit_item_form.valid" ref="edit_item_form" lazy-validation>
                            <v-card-title>
                                Edit a Menu Item
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <v-text-field v-model="edit_item.name.en" label="Name(En)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <v-text-field v-model="edit_item.name.ar" label="Name(Ar)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <v-text-field v-model="edit_item.price" label="Price" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                    </div>
                                    <div class="col-sm-12">
                                        <v-text-field v-model="edit_item.description.en" label="Description(En)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                    </div>
                                    <div class="col-sm-12">
                                        <v-text-field v-model="edit_item.description.ar" label="Description(Ar)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                    </div>
                                </v-row>
                                <h5 class="mb-0">Subcategory</h5>
                                <div :key="categoryKey">
                                    <div v-for="(sub_cat, index) in subcategories" :key="index">
                                        <v-row>
                                            <div class="col-sm-4">
                                                <v-text-field v-if="subcategories[index].name" v-model="subcategories[index].name.en" label="Name(En)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                            </div>
                                            <div class="col-sm-4">
                                                <v-text-field v-if="subcategories[index].name" v-model="subcategories[index].name.ar" label="Name(Ar)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                            </div>
                                            <div class="col-sm-4">
                                                <v-switch label="isRequired" color="success" v-model="subcategories[index].isRequired" class="input-group--focused"></v-switch>
                                            </div>
                                        </v-row>
                                        <h5 class="mt-2">Options</h5>
                                        <div :key="subcat_Key">
                                            <div v-for="(sub_item,i) in subcategories[index].options" :key="i">
                                                <v-row>
                                                    <div class="col-sm-10">
                                                        <v-row>
                                                            <div class="col-sm-4">
                                                                <v-text-field v-model="sub_item.name.en" label="Name(En)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <v-text-field v-model="sub_item.name.ar" label="Name(Ar)" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <v-text-field v-model="sub_item.price" label="Price" class="input-group--focused" :rules="edit_item_form.validRules"></v-text-field>
                                                            </div>
                                                        </v-row>
                                                    </div>
                                                    <div class="col-sm-2">                                                    
                                                        <v-btn color="error" @click="removeOption(index,i)"> Remove </v-btn>
                                                    </div>                                        
                                                </v-row>                                        
                                            </div>
                                        </div>
                                        <v-btn color="info" @click.native="addOption(index)" class="mr-3">Add Option</v-btn>
                                    </div>
                                </div>
                                <v-btn color="info" @click.native="addSubcategory()" class="mt-3 mr-3">Add SubCategory</v-btn>
                                <v-btn color="error" @click="removeSubcategory()" class="mt-3"> Remove Subcategory </v-btn>

                                <v-file-input
                                    label="Choose image"
                                    @change="chooseItemImage($event)"
                                    class="input-group--focused chooseItemImage"
                                    accept="image/*"
                                ></v-file-input>
                                <div class="text-center">
                                    <img v-if="edit_item.image" class="preview_avatar" height="150" width="150" :src="edit_item.image">
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="error" @click.native="edit_item_dialog = false">Close</v-btn>
                                <v-btn color="success" menu-id="" item-id="" @click.native="editItem()">Save</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>
            </app-card>
		</v-container>
        <delete-confirmation-dialog
            ref="updateConfirmationDialog"
            heading="Are You Sure You Want To Update?"
            message="Are you sure you want to update this store?"
            @onConfirm="updateStore(router)"
        >
        </delete-confirmation-dialog>
         <v-snackbar :top="y === 'top'" :timeout="timeout" v-model="snackbar">
            {{ snackbarMessage }}
        </v-snackbar>
        <app-section-loader :status="loader"></app-section-loader>
        </div>    
</template>

<script>
import { storesRef } from "../../firebase";   
import firebase from 'firebase';
import { getCurrentSubLayout } from "Helpers/helpers";
import { XlsxRead, XlsxJson } from "../../../node_modules/vue-xlsx/dist/vue-xlsx.es.js"
import VueTimepicker from '../../../node_modules/vue2-timepicker/src/vue-timepicker.vue'
import 'vue2-timepicker/dist/VueTimepicker.css'


export default {
    data() {
        return {
            yourStringTimeValue: "10:00",
            center: {},
            markers: {
                position: {}
            },
            componentkey: 0,
            categoryKey: 0,
            chosen_store: {
                id: "",
                storeName: {
                    en: "",
                    ar: ""
                },
                phone: "",
                serviceFee: "",
                status: "",
                closed: "",
                avatar: "",
                city: "",
                distract: "",
                location: {
                    latitude: "",
                    longitude: ""
                },
                workingHours:{
                    open: "",
                    close: ""
                }
            },
            form: {
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },
            menu_form: {
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },
            item_form:{
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },
            edit_item_form:{
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },
            new_item_form:{
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },
            store_info : {
                storeName:{
                    en: "",
                    ar: ""
                }
            },
            avatar: null,
            item_avatar: null,
            geohash: "",
            geopoint: {
                latitude: "",
                longitude: ""
            },
            lat: "",
            long: "",
            router: "",
            active: null,
            status_list: ["newAccount", "active", "onHold", "inactive"],
            cities: [
                {
                    name: {
                        ar: "الرياض",
                        en: "Riyadh"
                    },
                    id: "1"
                },
                {
                    name: {
                        ar: "الدمام",
                        en: "Damamm"
                    },
                    id: "2"
                }
            ],
            distracts: [
                {
                    name: "Riyadh",
                    lists: [
                        {
                            "name": {
                                "ar": "لبن",
                                "en": "Laban"
                            },
                            "id": "1"
                        },
                        {
                            "name": {
                                "ar": "عرقة",
                                "en": "Irqah"
                            },
                            "id": "2"
                        }
                    ]
                },
                {
                    name: "Damamm",
                    lists: [
                        {
                            "name": {
                                "ar": "لبن",
                                "en": "Laban"
                            },
                            "id": "1"
                        },
                        {
                            "name": {
                                "ar": "عرقة",
                                "en": "Irqah"
                            },
                            "id": "2"
                        }
                    ],
                }
            ],
            selected_distracts: [
                {
                    name: "",
                    lists: []
                }
            ],
            switch_status: [
                "open",
                "closed"
            ],
            select: { state: 'Florida', abbr: 'FL' },
            tmp: "",

            loader: false,
            snackbar: false,
            snackbarMessage: "",
            timeout: 2000,
            y: "top",
            menu_dialog: false,

            imageData: null,
            IBANData: null,
            ccrData: null,
            contractData: null,

            MenuList: [],
            new_menu:{
                name: {
                    en: "",
                    ar: ""
                }
            },
            new_item:{
                name: {
                    en: "",
                    ar: ""
                },
                price: "",
                image: "",
                description: {
                    en: "",
                    ar: ""
                },
            },
            edit_item:{
                name: {
                    en: "",
                    ar: ""
                },
                price: "",
                image: "",
                description: {
                    en: "",
                    ar: ""
                },
                subcategory:[{
                    name:{
                        en: "",
                        ar: ""
                    },
                    options: []
                }]
            },
            subcategories: [],
            dialog5: false,
            dialog6: false,
            edit_item_dialog: false,
            menu_categories: [],
            menu_category: "",
            file: null,
            show_upload_csv: false,
            hidden_menuID : "",
            hidden_itemID: "",
            subcat_Key: 0
        };
    },
    components:{
        XlsxRead,
        XlsxJson,
        VueTimepicker
    },
    created() {
        //... get this page's router
        this.router = getCurrentSubLayout(this.$router);
        //... get this store detail informations
        var _that = this;
        this.getStoreDetail(this.router).then(response => {
            if (response && response.errorMsg) {
                this.error = response.errorMsg;
            } else {
                this.chosen_store = response;
                _that.componentkey++;
            }
        });
    },
    
	methods:{
        //... udpate store detail informations
        submit() {
            if (this.$refs.form.validate()) {
                this.$refs.updateConfirmationDialog.openDialog();
            }
        },
        
        //... get store detail information
        async getStoreDetail(resId){
            try {
                //... chosen document's detail information
                var storeSnap = await storesRef.doc(resId).get();

                this.chosen_store = storeSnap.data();
                console.log(storeSnap.data());
                this.chosen_store = {
                    storeName: {
                        en: storeSnap.data().storeName && storeSnap.data().storeName.en ? storeSnap.data().storeName.en : "",
                        ar: storeSnap.data().storeName && storeSnap.data().storeName.ar ? storeSnap.data().storeName.ar : "",
                    },
                    phone: storeSnap.data().phone ? storeSnap.data().phone : "",
                    serviceFee: storeSnap.data().serviceFee ? storeSnap.data().serviceFee : "",
                    status: storeSnap.data().status ? storeSnap.data().status : "",
                    closed: storeSnap.data().closed ? storeSnap.data().closed : "",
                    location: {
                        geohash: storeSnap.data().location && storeSnap.data().location.geohash ? storeSnap.data().location.geohash : "",
                        geopoint: storeSnap.data().location && storeSnap.data().location.geopoint ? storeSnap.data().location.geopoint : {}
                    },
                    city: storeSnap.data().city ? storeSnap.data().city : "",
                    distract: storeSnap.data().distract ? storeSnap.data().distract : "",
                    workingHours: {
                        open: storeSnap.data().workingHours && storeSnap.data().workingHours.open ? storeSnap.data().workingHours.open : "",
                        close: storeSnap.data().workingHours && storeSnap.data().workingHours.close ? storeSnap.data().workingHours.close : ""
                    },
                    logo: storeSnap.data().logo ? storeSnap.data().logo : "",
                }
                
                this.chosen_store.info = {
                    storeName: {
                        en: "",
                        ar: ""
                    },
                    balance: "",
                    files_IBAN: "",
                    files_ccr: "",
                    files_contract: "",
                    general_ccr: "",
                    general_email: "",
                    general_manager: "",
                    payment_IBAN: "",
                    payment_bank: ""
                };

                //... get sub collections
                var menuSubCollection = await storesRef
                    .doc(resId)
                    .collection("menu")
                    // .orderBy('index')
                    .get();
                var infoSubCollection = await storesRef
                    .doc(resId)
                    .collection("info")
                    .get();

                console.log(menuSubCollection);
                
                for (const menuObj of menuSubCollection.docs) {
                    var menuData = menuObj.data();
                    menuData["items"] = [];
                    menuData["uid"] = menuObj.id;

                    // Get Restaurant Menu Items
                    var ItemsSanp = await menuObj.ref
                        .collection("items")
                        .get();

                    // console.log(ItemsSanp.docs)
                    for (const data of ItemsSanp.docs) {
                        for (const item of data.data().items){
                            menuData["items"].push({
                                uid: data.id,
                                name: item.name ? item.name : {},
                                price: item.price ? item.price : "",
                                description: item.description ? item.description : {},
                                image: item.image ? item.image : ""
                            });
                        }
                    }

                    this.menu_categories.push({id: menuData["uid"], name: menuObj.data().name.en ? menuObj.data().name.en : ""});
                    this.MenuList.push(menuData);
                }

                for (const infoObj of infoSubCollection.docs) {
                    var infoData = infoObj.data();
                    if(infoObj.id == "generalInfo"){
                        this.store_info.general_ccr = infoData.ccr ? infoData.ccr : "",
                        this.store_info.general_email = infoData.email ? infoData.email : "",
                        this.store_info.general_manager = infoData.manager ? infoData.manager : ""
                    }
                    if(infoObj.id == "files"){
                        this.store_info.files_IBAN = this.IBANData = infoData.IBAN ? infoData.IBAN : "",
                        this.store_info.files_ccr = this.ccrData = infoData.ccr ? infoData.ccr : "",
                        this.store_info.files_contract = this.contractData = infoData.contract ? infoData.contract : ""
                    }
                    if(infoObj.id == "paymentInfo"){
                        this.store_info.payment_IBAN= infoData.IBAN ? infoData.IBAN : "",
                        this.store_info.payment_bank= infoData.bank ? infoData.bank : ""
                    }
                    if(infoObj.id == "balance"){
                        this.store_info.balance= infoData.currentBalance ? infoData.currentBalance : ""
                    }
                }

                this.chosen_store.info = this.store_info;
                this.geohash = this.chosen_store.location && this.chosen_store.location.geohash ? this.chosen_store.location.geohash : "",
                this.geopoint = this.chosen_store.location && this.chosen_store.location.geopoint ? this.chosen_store.location.geopoint : { _lat:0, _long:0 }
                //... put correct Google Map
                const location = {lat: parseFloat(this.geopoint._lat), lng: parseFloat(this.geopoint._long)}
                this.center = location;
                this.markers.position = location;
                //... get avatar
                this.avatar = this.chosen_store.logo;
                //... get distracts
                this.selected_distracts = this.distracts;
                
                return this.chosen_store;
            } catch (error) { alert(error); }
        },

        //... update store(basic information, general info, files info, payment info, balance info)
        updateStore(docId){
            this.loader = true;
            storesRef.doc(docId).get().then(() => 
                storesRef.doc(docId).set({
                    storeName: {
                        en: this.chosen_store.storeName && this.chosen_store.storeName.en ? this.chosen_store.storeName.en : "",
                        ar: this.chosen_store.storeName && this.chosen_store.storeName.ar ? this.chosen_store.storeName.ar : "",
                    }, 
                    phone: this.chosen_store.phone ? this.chosen_store.phone : "",
                    serviceFee: this.chosen_store.serviceFee ? this.chosen_store.serviceFee : "",
                    status: this.chosen_store.status ? this.chosen_store.status : "",
                    closed: this.chosen_store.closed ? this.chosen_store.closed : "",
                    logo: this.avatar ? this.avatar : "",
                    city: this.chosen_store.city ? this.chosen_store.city : "",
                    distract: this.chosen_store.distract ? this.chosen_store.distract : "",
                    location: {
                        "geohash": this.geohash,
                        "geopoint": new firebase.firestore.GeoPoint(this.geopoint._lat, this.geopoint._long)
                    },
                    workingHours: {
                        close: this.chosen_store.workingHours.close ? this.chosen_store.workingHours.close : "",
                        open: this.chosen_store.workingHours.open ? this.chosen_store.workingHours.open : ""
                    }
                }).then(response => {
                    if (response && response.errorMsg) {
                        this.error = response.errorMsg;
                    } else {
                        this.loader = false;
                    }
                })
            );

            //... update general, payment, files, balance documents
            var info_collection = storesRef.doc(docId).collection("info");

            info_collection.doc("generalInfo").set({
                email: this.store_info.general_email ? this.store_info.general_email : "",
                ccr: this.store_info.general_ccr ? this.store_info.general_ccr : "",
                manager: this.store_info.general_manager ? this.store_info.general_manager : "",
            });
            info_collection.doc("paymentInfo").set({
                IBAN: this.store_info.payment_IBAN ? this.store_info.payment_IBAN : "",
                bank: this.store_info.payment_bank ? this.store_info.payment_bank : "",
            });
            info_collection.doc("files").set({
                IBAN: this.store_info.files_IBAN ? this.store_info.files_IBAN : "",
                ccr: this.store_info.files_ccr ? this.store_info.files_ccr : "",
                contract: this.store_info.files_contract ? this.store_info.files_contract : "",
            });
            info_collection.doc("balance").set({
                currentBalance: this.store_info.balance ? this.store_info.balance : "",
            })

            this.$refs.updateConfirmationDialog.close();
            this.loader = true;
            setTimeout(() => {
                this.loader = false;
                this.snackbar = true;
                this.snackbarMessage = "Store detail updated Successfully!";
            }, 1500);
        },

        //... IBAN file upload
        chooseAvatar(event){
            this.upload_avatar=0;
            this.avatar = event;
            this.loader = true;
            this.avatarUpload();
        },
        avatarUpload(){
            const month = new Date().getMonth() + 1;
            const today = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
            const filePath = `stores/logo/${today}/${this.avatar.name}`;
            const storageRef=firebase.storage().ref().child(filePath).put(this.avatar);
            storageRef.on(`state_changed`,snapshot=>{
                this.upload_avatar = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{
                    this.upload_avatar=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        console.log(url);
                        this.loader = false;
                        this.avatar = url;
                        this.chosen_store.logo = url;
                    });
                }      
            );
        },

        //... IBAN file upload
        chooseIBAN(event){
            this.upload_IBAN=0;
            this.IBANData = event;
            this.loader = true;
            this.IBANUpload();
        },
        IBANUpload(){
            const month = new Date().getMonth() + 1;
            const today = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
            const filePath = `stores/IBAN/${today}/${this.IBANData.name}`;
            const storageRef=firebase.storage().ref().child(filePath).put(this.IBANData);
            storageRef.on(`state_changed`,snapshot=>{
                this.upload_IBAN = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{
                    this.upload_IBAN=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.loader = false;
                        this.IBANData = url;
                        this.store_info.files_IBAN = url;
                    });
                }      
            );
        },

        //... Ccr file upload
        chooseCcr(event){
            this.upload_ccr=0;
            this.ccrData = event;
            this.loader = true;
            this.ccrUpload();
        },
        ccrUpload(){
            const month = new Date().getMonth() + 1;
            const today = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
            const filePath = `stores/ccr/${today}/${this.ccrData.name}`;
            const storageRef=firebase.storage().ref().child(filePath).put(this.ccrData);
            storageRef.on(`state_changed`,snapshot=>{
                this.upload_ccr = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{
                    this.upload_ccr=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.loader = false;
                        this.ccrData = url;
                        this.store_info.files_ccr = url;
                    });
                }      
            );
        },

        //... Contract file upload
        chooseContract(event){
            this.upload_contract=0;
            this.contractData = event;
            this.loader = true;
            this.contractUpload();
        },
        contractUpload(){
            const month = new Date().getMonth() + 1;
            const today = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
            const filePath = `stores/contract/${today}/${this.contractData.name}`;
            const storageRef=firebase.storage().ref().child(filePath).put(this.contractData);
            storageRef.on(`state_changed`,snapshot=>{
                this.upload_contract = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{
                    this.upload_contract=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.loader = false;
                        this.contractData = url;
                        this.store_info.files_contract = url;
                    });
                }      
            );
        },

        //... get city and distracts
        change_city(event){
            this.selected_distracts = this.distracts.filter(x => (x.name).toLowerCase() == event.toLowerCase());
            var tmp_city = {id: "", name: { en: "", ar: "" }};
            tmp_city.name.en = event;
            tmp_city.name.ar = event == "Riyadh" ? "الدمام" : "الرياض";
            tmp_city.id = event == "Riyadh" ? "1" : "2";
            this.chosen_store.city = tmp_city;
        },

        change_distract(event){
           var tmp_distract = {id: "", name: { en: "", ar: "" }};
           tmp_distract.name.en = event;
           tmp_distract.name.ar = event == "Laban" ? "لبن" : "عرقة";
           tmp_distract.id = event == "Laban" ? "1" : "2";
           this.chosen_store.distract = tmp_distract;
        },

        //... add new menu category
        addMenuCategory(){
            if (this.$refs.category_form.validate()) {
                this.dialog5 = false;
                var _that = this;
                storesRef.doc(this.router).collection("menu").orderBy('index').get().then(snap =>{
                    console.log(snap.size);
                    storesRef.doc(this.router).collection("menu").add({
                        name: this.new_menu.name,
                        index: snap.size + 1
                    }).then(function(){
                        async function delay(delayInms) {
                            return new Promise(resolve  => {
                                setTimeout(() => {
                                    resolve(2);
                                    _that.snackbar = true;
                                    _that.snackbarMessage = "A menu category was created Successfully!";
                                }, delayInms);
                            });
                        }
                        async function reload() {
                            await delay(2000);
                            location.reload()
                        }
                        reload();
                    })
                })
            }
        },

        //... add new menu item for selected menu category
        addItem(){
            if (this.$refs.new_item_form.validate()) {
                this.dialog6 = false;
                 var _that = this;
                storesRef.doc(this.router).collection("menu").doc(this.menu_category).collection("items").add({
                    items:[{
                        name: this.new_item.name ? this.new_item.name : {},
                        price: this.new_item.price ? this.new_item.price : "",
                        description: this.new_item.description ? this.new_item.description : {},
                        // image: item.image ? item.image : ""
                    }]
                }).then(function(){
                    async function delay(delayInms) {
                        return new Promise(resolve  => {
                            setTimeout(() => {
                                resolve(2);
                                _that.snackbar = true;
                                _that.snackbarMessage = "A menu item was created Successfully!";
                            }, delayInms);
                        });
                    }
                    async function reload() {
                        await delay(2000);
                        location.reload()
                    }
                    reload();
                })
            }
        },

        //... get item when click edit item dialog
        getItem(menuID, itemID){
            this.edit_item_dialog = true;
            this.hidden_menuID = menuID;
            this.hidden_itemID = itemID;
            storesRef.doc(this.router).collection("menu").doc(menuID).collection("items").doc(itemID).get()
            .then(doc => {
                storesRef.doc(this.router).collection("menu").doc(menuID).collection("items").doc(itemID).collection("selections").orderBy('index').get()
                .then(item => {
                    console.log(item.docs)
                    this.edit_item = {
                        name: doc.data().items[0].name ? doc.data().items[0].name : {},
                        price: doc.data().items[0].price ? doc.data().items[0].price : "",
                        description: doc.data().items[0].description ? doc.data().items[0].description : {},
                        image: doc.data().items[0].image ? doc.data().items[0].image : "",
                    };
                    var tmp_array = [];
                    item.docs.forEach((sub) =>{
                        var sub_data = sub.data() ? sub.data() : {};
                        tmp_array.push(sub_data);
                    })
                    this.subcategories = tmp_array;
                })
            })
        },

        addSubcategory(){
            this.subcategories.push({
                isRequired: false,
                name: {
                    en: "",
                    ar: ""
                },
                options: [{
                    name: {
                        en: "",
                        ar: ""
                    },
                    price: ""
                }]
            })
            this.subcat_Key ++;
        },

        addOption(index){
            this.subcategories[index].options.push({
                name: {
                    en: "",
                    ar: ""
                },
                price: "",
            });
            this.subcat_Key ++;
        },

        removeSubcategory(){
            this.subcategories.pop();
            this.subcat_Key ++;
        },

        removeOption(cat, option){
            this.subcategories[cat].options.splice(option, 1);
            this.subcat_Key ++;
        },

        editItem(){
            if (this.$refs.edit_item_form.validate()) {
                this.edit_item_dialog = false;
                var _that = this;
                _that.loader = true;
                var itemRef = storesRef.doc(this.router).collection("menu").doc(this.hidden_menuID).collection("items").doc(this.hidden_itemID);
                itemRef.update({
                    items: [{
                        name: this.edit_item.name ? this.edit_item.name : {},
                        price: this.edit_item.price ? this.edit_item.price : "",
                        description: this.edit_item.description ? this.edit_item.description : {},
                        image: this.edit_item.image ? this.edit_item.image : "",
                    }]
                })
                .then(function(){
                    async function delay(delayInms) {
                        return new Promise(resolve  => {
                            setTimeout(() => {
                                resolve(2);
                                _that.snackbar = true;
                                _that.snackbarMessage = "A menu item was updated Successfully!";
                            }, delayInms);
                        });
                    }
                    async function reload() {
                        await delay(2000);
                        location.reload()
                    }
                    reload();
                })
                itemRef.collection("selections").orderBy("index").get().then(doc => {
                    console.log(doc.docs)
                    var _that = this;
                    //... delete all documents of selection
                    async function deleteSel(){
                        for(var i=0; i<doc.docs.length; i++){
                            await itemRef.collection("selections").doc(doc.docs[i].id).delete();
                        }
                    }

                    deleteSel().then(function(){
                        for(var j=0; j<_that.subcategories.length; j++){
                            itemRef.collection("selections").add({
                                isRequired: _that.subcategories[j].isRequired,
                                name: _that.subcategories[j].name,
                                options: _that.subcategories[j].options,
                                index: j + 1
                            })
                        }
                        console.log(_that.subcategories);
                        _that.categoryKey ++;
                    })
                })
            }
        },

        //.... import excel for menu
        import_menu_csv(event) {
            this.file = event ? event : null;
            if(this.file && this.file.name != ""){
                this.show_upload_csv = true;
            }else{
                this.show_upload_csv = false;
            }
        },
        //... upload csv json
        upload_csv(){
            //... make json from import csv
            var data_from_csv = JSON.parse(document.getElementById("imported_menu_data").innerText);
            console.log(data_from_csv)

            var main_tmp=[];
            var sub_tmp=[];

            for(var i=0; i<data_from_csv.length; i++){
                if(data_from_csv[i].name_en){
                    if(sub_tmp.length!=0)
                        main_tmp.push(sub_tmp)
                    sub_tmp=[];
                    sub_tmp.push({
                        index: data_from_csv[i].index,
                        name: {
                            en: data_from_csv[i].name_en ? data_from_csv[i].name_en : "",
                            ar: data_from_csv[i].name_ar ? data_from_csv[i].name_ar : "",
                        },
                        items: [{
                            name: {
                                en: data_from_csv[i].items_name_en ? data_from_csv[i].items_name_en : "",
                                ar: data_from_csv[i].items_name_ar ? data_from_csv[i].items_name_ar : "",
                            },
                            price: data_from_csv[i].items_price ? data_from_csv[i].items_price : "",
                            image: data_from_csv[i].items_image ? data_from_csv[i].items_image : "",
                            description: {
                                en: data_from_csv[i].items_description_en ? data_from_csv[i].items_description_en : "",
                                ar: data_from_csv[i].items_description_ar ? data_from_csv[i].items_description_ar : "",
                            },
                        }],
                        subcategory:{
                            name: {
                                en: data_from_csv[i].items_subcategory_en ? data_from_csv[i].items_subcategory_en : "",
                                ar: data_from_csv[i].items_subcategory_ar ? data_from_csv[i].items_subcategory_ar : "",
                            },
                            options: [
                                {
                                    name: {
                                        en: data_from_csv[i].items_subcategory_option_name_en ? data_from_csv[i].items_subcategory_option_name_en : "",
                                        ar: data_from_csv[i].items_subcategory_option_name_ar ? data_from_csv[i].items_subcategory_option_name_ar : "",
                                    },
                                    price: data_from_csv[i].items_subcategory_option_price ? data_from_csv[i].items_subcategory_option_price : ""
                                }
                            ]
                        }
                    })
                }
                else{
                    sub_tmp.push({
                        index: data_from_csv[i].index,
                        name: {
                            en: data_from_csv[i].name_en ? data_from_csv[i].name_en : "",
                            ar: data_from_csv[i].name_ar ? data_from_csv[i].name_ar : "",
                        },
                        items: [{
                            name: {
                                en: data_from_csv[i].items_name_en ? data_from_csv[i].items_name_en : "",
                                ar: data_from_csv[i].items_name_ar ? data_from_csv[i].items_name_ar : "",
                            },
                            price: data_from_csv[i].items_price ? data_from_csv[i].items_price : "",
                            image: data_from_csv[i].items_image ? data_from_csv[i].items_image : "",
                            description: {
                                en: data_from_csv[i].items_description_en ? data_from_csv[i].items_description_en : "",
                                ar: data_from_csv[i].items_description_ar ? data_from_csv[i].items_description_ar : "",
                            },
                        }],
                        subcategory:{
                            name: {
                                en: data_from_csv[i].items_subcategory_en ? data_from_csv[i].items_subcategory_en : "",
                                ar: data_from_csv[i].items_subcategory_ar ? data_from_csv[i].items_subcategory_ar : "",
                            },
                            options: [
                                {
                                    name: {
                                        en: data_from_csv[i].items_subcategory_option_name_en ? data_from_csv[i].items_subcategory_option_name_en : "",
                                        ar: data_from_csv[i].items_subcategory_option_name_ar ? data_from_csv[i].items_subcategory_option_name_ar : "",
                                    },
                                    price: data_from_csv[i].items_subcategory_option_price ? data_from_csv[i].items_subcategory_option_price : ""
                                }
                            ]
                        }
                    })
                }
            }
            if(sub_tmp.length!=0)
                main_tmp.push(sub_tmp)

            //... upload json to firebase
            if(main_tmp.length != 0){
                // this.loader = true;
                var _that = this;
                var category = [];

                console.log(main_tmp)

                // upload menu categories
                async function menu_data(){
                    for(var k=0; k<main_tmp.length; k++){
                        category = main_tmp[k];

                        await storesRef.doc(_that.router).collection("menu").add({
                            index: category[0].index,
                            name: category[0].name
                        }).then(function(response){
                            for(var i=0; i<category.length; i++){
                                storesRef.doc(_that.router).collection("menu").doc(response.id).collection("items").add({
                                    items: category[i].items
                                })
                            }
                        })
                    }
                }

                // menu_data().then(
                //     setTimeout(() => {
                //         this.loader = false;
                //         this.snackbar = true;
                //         this.snackbarMessage = "Menu data was uploaded successfully! Please refresh page.";
                //     }, 1500)
                // );
            }else{
                alert("Please import xlxs")
            }
        },

        chooseItemImage(e){
            this.upload_item=0;
            this.item_avatar = e;
            this.loader = true;

            const month = new Date().getMonth() + 1;
            const today = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
            const filePath = `stores/item/${today}/${this.item_avatar.name}`;
            const storageRef=firebase.storage().ref().child(filePath).put(this.item_avatar);
            storageRef.on(`state_changed`,snapshot=>{
                this.upload_item = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{
                    this.upload_item=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.loader = false;
                        this.item_avatar = url;
                        
                        this.edit_item.image = url;
                    });
                }      
            );

        },
    },
};
</script>
