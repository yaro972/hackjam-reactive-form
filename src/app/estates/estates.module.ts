import {NgModule} from '@angular/core';
import {EstateCardComponent} from './estate-card/estate-card.component';
import {EstateCardImageComponent} from './estate-card/estate-card-image/estate-card-image.component';
import {EstateCardContentComponent} from './estate-card/estate-card-content/estate-card-content.component';
import {EstatesComponent} from './estates.component';
import {FilterSectionComponent} from '../filter-section/filter-section.component';
import {SharedModule} from '../shared-module/shared.module';
import {EstateApiService} from './estate-api.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [EstatesComponent],
  declarations: [
    EstateCardComponent,
    EstateCardImageComponent,
    EstateCardContentComponent,
    EstatesComponent,
    FilterSectionComponent,
  ],
  providers: [EstateApiService]
})
export class EstatesModule {
}
