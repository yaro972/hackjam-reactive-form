import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Estate} from '../types';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribeAll} from '../utils';

@Component({
  selector: 'hb-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css']
})
export class FilterSectionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() estateToFilter;

  @Output() onFiltersChange = new EventEmitter();

  roomTypes = [
    'entire_home',
    'private_room',
    'shared_room'
  ];
  MIN_PRICE = 0;
  MAX_PRICE = 999999999;

  form: FormGroup;

  subscriptions: Subscription[] = [];


  constructor(private fb: FormBuilder) {
    this.form = this.buildForm(this.fb);
  }

  ngOnInit() {
    this.filterEstate(this.estateToFilter, this.getRawValueOfForm());

    /**
     * TODO: when price value changes, we have to filter estate
     * @type {Subscription}
     */

  }

  buildForm(fb: FormBuilder): FormGroup {
    const roomTypesControls: FormControl[] = this.roomTypes.map((type) => new FormControl(null));

    return fb.group({
      price: fb.group({
        min: [this.MIN_PRICE, [], []],
        max: [this.MAX_PRICE, [], []]
      }),
      roomTypes: this.fb.array(roomTypesControls)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    /**
     * we have to call the filterEstate function  with the currentValue
     * of estateToFilter property of 'changes'
     */
  }

  /**
   * Filter estates received by room type
   *
   * @param estates
   * @param roomTypes
   * @returns {any}
   */
  filterEstatesByRoomType(estates: Estate[], roomTypes: String[]) {
    // TODO: Get only selected roomTypes
    const roomTypesSelected = null;

    if (roomTypesSelected.length === 0) {
      return this.estateToFilter;
    }

    // TODO: return filtered estates by room type
    return;
  }

  /**
   * Filter estates received by price
   * Tip: use the property 'pricePerNight'
   * @param estates
   * @param price
   * @returns {Estate[]}
   */
  filterEstatesByPrice(estates: Estate[], price: { min: number, max: number }) {
    return estates.filter(estate => {
    });
  }

  /**
   * Filter estates by price, by room Type and emit the filtered estates
   * @param estates
   * @param filters
   */
  filterEstate(estates, filters: Form) {
    this.onFiltersChange.emit(
      // TODO: emit the filtered estates
    );
  }

  /**
   * TODO: Reset the form
   */
  resetFilters() {

    this.form.reset({});

    this.filterEstate(this.estateToFilter, this.getRawValueOfForm());
  }

  getRawValueOfForm() {
    return this.form.getRawValue();
  }

  roomTypesAlreadySelected(type: string) {
    const formValues = this.form.getRawValue();
    return formValues.roomTypes.includes(type);
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }
}


export class Form {
  price: { min: number, max: number };
  roomTypes: String[];
}
