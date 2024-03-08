import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  /*
    - Holds values that match the search criteria entered by the user.
    - When the page load it should contain the total set of housing locations values by default. (Done in the constructor)
  */
  filteredLocationList: HousingLocation[] = [];


  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  /*
    - This function uses a string filter function to compare the value of the text param against housinglovation.city
    - It can also be updated to match multiple properties
  */
  filterResults(text: string) {
    if(!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLocaleLowerCase().includes(text.toLowerCase())
    )
  }
}
