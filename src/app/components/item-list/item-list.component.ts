import { RequestsService } from './../../service/requests.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  resetDate = '0000-00-00';

  items: any[] = [];

  newNameCourse = '';
  newStartDate:any = '';
  newEndDate:any = '';
  editId: number | null = null;
  editNameCourse = '';
  editStartDate:any = '';
  editEndDate:any = '';

  constructor(private requestService:RequestsService){

  }

  ngOnInit(): void {
      this.loadItems();
  }

  loadItems() {
    this.requestService.getdItems().subscribe((res) => {
      this.items = res;
    });
  }

  addItem () {
    const newForm = new FormData();

    newForm.append('name_course', this.newNameCourse);
    newForm.append('start_date', this.newStartDate);
    newForm.append('end_date', this.newEndDate);

    this.requestService.createItem(newForm).subscribe((res) => {
      this.newNameCourse = '';
      this.newStartDate = this.resetDate;
      this.newEndDate = this.resetDate;
      this.loadItems();
    });
  }

  editItem (item:any) {
    this.editId = item.id;
    this.editNameCourse = item.name;
    this.editStartDate = item.startDate;
    this.editEndDate = item.endDate;
  }

  updateItem () {
    if(this.editId) {
      this.requestService.updateItem(this.editId, {
        name_course: this.editNameCourse,
        start_date: this.editStartDate,
        end_date: this.editEndDate
      }).subscribe((res) => {
        this.editId = null;
        this.editNameCourse = '';
        this.editStartDate = this.resetDate;
        this.editEndDate = this.resetDate;
        this.loadItems();
      }) ;
    }
  }

  deleteItem (id: number) {
    this.requestService.deleteItem(id).subscribe((res) => {
      this.loadItems();
    });
  }

  cancelItem () {
    this.editId = null;
    this.editNameCourse = '';
    this.editStartDate = this.resetDate;
    this.editEndDate = this.resetDate;
  }
}

