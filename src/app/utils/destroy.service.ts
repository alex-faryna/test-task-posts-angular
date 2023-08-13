import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class UnsubscribeService extends Observable<void> implements OnDestroy {
  private unsunscribe = new Subject<void>();

  constructor() {
    super();
    Object.assign(this, this.unsunscribe.asObservable());
  }

  ngOnDestroy() {
    this.unsunscribe.next();
    this.unsunscribe.complete();
}

}
