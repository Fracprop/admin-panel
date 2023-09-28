import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  public selectedIndex=0;

  constructor() { }

  ngOnInit(): void {
  }

  tabChange(e: any) {
   
    this.selectedIndex = e;
    localStorage.setItem('tabStatus', this.selectedIndex.toString());
  }
  nextStep() {
    if (this.selectedIndex != 2) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }
  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }
}
