import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from "rxjs";
import { Cats } from "../../models/cats.model";
import { ModalController } from "@ionic/angular";
import { SettingsPage } from "../settings/settings.page";
import { SettingsService } from "../../services/settings/settings.service";
import { CatApiService } from "../../services/cat-api/cat-api.service";
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})

export class HomePage implements OnInit {
  data: any = {};
  cats: Observable<Cats>;

  constructor(
    private modalCtrl: ModalController,
    private catsApiService: CatApiService,
    private settingsService: SettingsService  // Inject the SettingsService
  ) {
    this.initCats();
    this.cats = this.catsApiService.getCats();
  }

  ngOnInit() {
    // Subscribe to the hasAllergies$ observable to keep track of checkbox status
    this.settingsService.hasAllergies$.subscribe((hasAllergies: boolean) => {
      // Use hasAllergies value as needed
      if (hasAllergies) {
        // Checkbox is checked, perform actions accordingly
      } else {
        // Checkbox is not checked, perform other actions
      }
    });
  }

  private async initCats() {
    this.cats = this.catsApiService.getCats();
    this.cats.subscribe(
      cats => {
        if (cats && cats.url) {
          console.log('Cats data:', cats.url);
        } else {
          console.log('Cats data does not contain URL property:', cats);
        }
      },
      error => console.error('Error fetching cats data:', error)
    );
  }

  fetchData() {
    // Subscribe to hasAllergies$ to get the current value
    this.settingsService.hasAllergies$.subscribe((hasAllergies: boolean) => {
      // Use the hasAllergies variable to determine whether the checkbox is checked or not
      if (hasAllergies) {
        this.catsApiService.getHairless().subscribe((data: any) => {
          // Data from the request is assigned to this.data
          this.data = data;
        });
      } else {
        this.catsApiService.getCats().subscribe((data: any) => {
          // Data from the request is assigned to this.data
          this.data = data;
        });
        // Checkbox is not checked, perform other actions
      }
    });
  }

  async openSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });

    await modal.present();

    modal.onWillDismiss().then(_ => {
      // Update the checkbox status based on the SettingsService
      this.settingsService.hasAllergies$.subscribe((hasAllergies: boolean) => {
        // Use hasAllergies value as needed
      });

      // Refresh data based on the updated checkbox status
      this.initCats();
    });
  }

  setCatsData(cats: Cats) {
    this.catsApiService.detail = cats;
  }
}
