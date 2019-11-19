import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public dataService:GroceriesServiceService, public alertController: AlertController) { }

	async showPrompt(item?, index?) {
		const alert = await this.alertController.create({
		header: item ? 'Edit ' + item.name + '...'  : 'Add new Item',
		message: item ? 'Please edit name and/or quantity...' : 'Please enter new item...',
		inputs: [
			{
				name: 'name',
				type: 'text',
				placeholder: 'Name',
				value: item ? item.name : null
			},
			{
				name: 'quantity',
				type: 'number',
				placeholder: 'Quantity',
				value: item ? item.quantity : null
			}
		],
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: data => {
					console.log('Confirm Cancel');
				}
			},
			{
				text: 'Save',
				handler: item => {
				console.log('Save Clicked', item);
					if (index == undefined) {
						this.dataService.addItem(item);
					} else {
						this.dataService.editItem(item, index);
					}
				}
        }
		]
		});

    await alert.present();
	}
}
