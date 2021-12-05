<template>
	<div>
		<app-section-loader :status="loader"></app-section-loader>
		<v-container fluid class="grid-list-xl py-0 mt-3">
		<v-row>
			<app-card
				:heading="`Categories`"
				:fullBlock="true"
				colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
			>
				<div class="text-right">
					<v-btn class="mr-3" color="success"  @click="show_add_dialog()"> Add Category </v-btn>
				</div>
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
                    v-bind:items="apps"
                    v-bind:search="search"
                >
                    <template v-slot:item="{ item }">
                        <tr>
							<td>{{ item.uid }}</td>
                            <td>{{ item.name_en }}</td>
                            <td>{{ item.name_ar }}</td>
							<td>
								<div class="button-wrap"> 
									<button class="primary custom_badge" @click="show_edit_dialog(item.uid)"> Edit </button>
									<button class="warning custom_badge" @click="show_delete_dialog(item.uid)"> Delete </button>
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
		<v-dialog v-model="add_dialog" max-width="600px">
			<v-card>
				<v-form v-model="add_category_form.valid" ref="add_category_form" lazy-validation>
					<v-card-title>
						Add a category
					</v-card-title>
					<v-card-text>
						<v-row>
							<div class="col-sm-12">
								<v-text-field v-model="newCategory.name.en" label="Name(En)" class="input-group--focused" :rules="add_category_form.validRules"></v-text-field>
							</div>
							<div class="col-sm-12">
								<v-text-field v-model="newCategory.name.ar" label="Name(Ar)" class="input-group--focused" :rules="add_category_form.validRules"></v-text-field>
							</div>
						</v-row>
					</v-card-text>
					<div class="text-right">
						<v-btn color="info" @click.native="add()" class="mr-3 mb-3">Submit</v-btn>
					</div>
				</v-form>
			</v-card>
		</v-dialog>
		<v-dialog v-model="edit_dialog" max-width="600px">
			<v-card>
				<v-form v-model="edit_category_form.valid" ref="edit_category_form" lazy-validation>
					<v-card-title>
						Add a category
					</v-card-title>
					<v-card-text>
						<v-row>
							<div class="col-sm-12">
								<v-text-field v-model="editCategory.name.en" label="Name(En)" class="input-group--focused" :rules="edit_category_form.validRules"></v-text-field>
							</div>
							<div class="col-sm-12">
								<v-text-field v-model="editCategory.name.ar" label="Name(Ar)" class="input-group--focused" :rules="edit_category_form.validRules"></v-text-field>
							</div>
						</v-row>
					</v-card-text>
					<div class="text-right">
						<v-btn color="info" @click.native="edit(editCategory.id)" class="mr-3 mb-3">Submit</v-btn>
					</div>
				</v-form>
			</v-card>
		</v-dialog>
		<v-dialog v-model="delete_dialog" max-width="600px">
			<v-card>
				<v-card-title>
					Do you want to delete this category?
				</v-card-title>
				<div class="text-right">
					<v-btn color="info" @click.native="delete_category(editCategory.id)" class="mr-3 mb-3">Delete</v-btn>
					<v-btn color="danger" @click.native="delete_dialog = false" class=" mr-3 mb-3">Cancel</v-btn>
				</div>
			</v-card>
		</v-dialog>
		</v-container>
		<v-snackbar :top="y === 'top'" :timeout="timeout" v-model="snackbar">
            {{ snackbarMessage }}
        </v-snackbar>
		<app-section-loader :status="loader"></app-section-loader>
	</div>
</template>

<script>
//import api from "Api";
import { appsRef } from "../../firebase";

export default {
	data() {
		return {
			loader: false,
			search: "",
			snackbar: false,
            snackbarMessage: "",
			timeout: 2000,
            y: "top",
			apps: [],
			pagination: {
				sortBy: "name_en",
			},
			headers: [
				{ text: "Id", value: "uid" },
				{ text: "Name(En)", value: "name_en" },
				{ text: "Name(Ar)", value: "name_ar" },
				{ text: "Action"}
			],
			add_category_form: {
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },
			edit_category_form: {
                valid: true,
                validRules: [
                    v => !!v || "This field is required",
                ]
            },
			newCategory:{
				name:{
					en: "",
					ar: ""
				}
			},
			editCategory:{
				name:{
					en: "",
					ar: ""
				}
			},
			add_dialog: false,
			edit_dialog: false,
			delete_dialog: false
		};
	},
	mounted() {
		this.getApps();
	},
	methods: {
		getApps() {
            var categories = appsRef.doc("data").collection("categories");
			categories.onSnapshot((snapshot) => {
				this.apps = [];
				snapshot.forEach((doc) => {
                    let data = doc.data();
                    this.apps.push({
                        uid: doc.id,
                        name_en: data.name.en ? data.name.en : "",
                        name_ar: data.name.ar ? data.name.ar : ""
                    });
                })
			})
		},
		show_add_dialog(){
			this.add_dialog = true;
		},
		show_edit_dialog(id){
			this.edit_dialog = true;
			appsRef.doc("data").collection("categories").doc(id).get().then(snapshot => {
				var data = snapshot.data();
				this.editCategory.name = data.name;
				this.editCategory.id = snapshot.id;
			});
		},
		show_delete_dialog(id){
			this.delete_dialog = true;
			appsRef.doc("data").collection("categories").doc(id).get().then(snapshot => {
				this.editCategory.id = snapshot.id;
			});
		},
		add(){
			if (this.$refs.add_category_form.validate()) {
                this.add_dialog = false;
                var _that = this;
                appsRef.doc("data").collection("categories").add({
                    name: this.newCategory.name
                }).then(function(){
                    _that.snackbar = true;
                	_that.snackbarMessage = "A category was created Successfully!";
                })
            }
		},
		edit(id){
			if (this.$refs.edit_category_form.validate()) {
                this.edit_dialog = false;
                var _that = this;
                appsRef.doc("data").collection("categories").doc(id).update({
                    name: this.editCategory.name
                }).then(function(){
                    _that.snackbar = true;
                    _that.snackbarMessage = "A category was updated Successfully!";
                })
            }
		},
		delete_category(id){
			this.delete_dialog = false;
			var _that = this;
			appsRef.doc("data").collection("categories").doc(id).delete().then(function(){
				_that.snackbar = true;
				_that.snackbarMessage = "A category was deleted Successfully!";
			})
		}
	},
};
</script>
