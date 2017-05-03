import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
export function chunk(array, chunkSize) {
  const R = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    R.push(array.slice(i, i + chunkSize));
  }
  return R;
}


export function unsubscribeAll(subscriptions: Subscription[]) {
  if (!subscriptions) {
    return;
  }
  for (const sub of subscriptions) {
    if (sub && sub.unsubscribe()) {
      sub.unsubscribe();
    }
  }
}

export function resetForm(form: FormGroup) {
  const constrols = form.controls;
  for (const key in constrols) {
    if (constrols[key]) {
      constrols[key].reset();
    }
  }
}
