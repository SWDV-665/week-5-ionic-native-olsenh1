import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

	title = "Groceries";
	author = "Henrik Olsen (0913075)";


  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, public socialSharing: SocialSharing) {}

	loadItems() {
		return this.dataService.getItems();
	}

	async removeItem(item, index){
		var toastMsg = "< " + item.name + " > removed from " + this.title + "… ";
		const toast = await this.toastCtrl.create({
			message: toastMsg,
			duration: 3000
		});
		toast.present();
		this.dataService.removeItem(index);
	}
	
	async shareItem(item, index){
		var toastMsg = "< " + item.name + " > shared...";
		const toast = await this.toastCtrl.create({
			message: toastMsg,
			duration: 3000
		});
		let message = "Sharing Grocery Item: " + item.name + " (" + item.quantity + ")";
		let subject = "Shared via Groceries app";

		this.socialSharing.share(message, subject).then(() => {
			// sharing via email is possible
			console.log("Shared Successfully!");
		}).catch((error) => {
			// sharing via email is not possible
			console.error("Error sharing via Groceries app", error);
		});

		toast.present();
	}

	async addItem() {
		console.log("Adding item...")
		this.inputDialogService.showPrompt();
	}

	async editItem(item, index) {
		console.log("Editing item...")
		this.inputDialogService.showPrompt(item, index);
	}

}