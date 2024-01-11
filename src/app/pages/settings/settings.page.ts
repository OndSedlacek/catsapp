import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) {
    this.form = this.fb.group({
      hasAllergies: new FormControl(false),
    });
  }

  ngOnInit() {
    // Subscribe to the service to keep the checkbox value in sync
    this.settingsService.hasAllergies$.subscribe((value: any) => {
      const hasAllergiesControl = this.form.get('hasAllergies');
      if (hasAllergiesControl) {
        hasAllergiesControl.setValue(value);
      }
    });
  }

  async dismiss() {
    // Update the service with the current checkbox value
    const hasAllergiesControl = this.form.get('hasAllergies');
    if (hasAllergiesControl) {
      this.settingsService.setHasAllergies(hasAllergiesControl.value);
    }
    await this.modalCtrl.dismiss();
  }
}
