import { Injectable } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(public alertCtrl: AlertController) {}

  async presentAlertConfirm(header: string, message: string) {
    let choice;
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Okay",
          role: "okay",
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data;
    });
    return choice;
  }
}
