import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CollectionAddress } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { CollectionsService } from 'src/app/shared/services/collections.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}
@Component({
  selector: 'app-collections-form-address',
  templateUrl: './collections-form-address.component.html',
  styleUrls: ['./collections-form-address.component.scss'],
})
export class CollectionsFormAddressComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<CollectionAddress[]>;
  @ViewChild('addressDialog') dialogRef!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  form: FormGroup = new FormGroup({
    postalCode: new FormControl('', [Validators.required]),
    locality: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
  });
  isNew = true;
  collectionData: CollectionAddress[] = [];
  isLoading = false;
  selectedRow!: CollectionAddress | null;
  filterValue = '';
  displayedColumns: string[] = ['address'];
  dataSource = new MatTableDataSource(this.collectionData);
  matcher = new MyErrorStateMatcher();
  constructor(private collectionsService: CollectionsService, private materialService: MaterialService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.collectionsService.fetchAddress().subscribe((data) => {
      this.isLoading = false;
      this.collectionData = data;
      this.dataSource.data = this.collectionData;
    });
  }
  openDialog() {
    this.isNew = true;
    this.clearSelect();
    this.form.reset();
    this.materialService.openDialog(this.dialogRef);
  }
  closeDialog() {
    this.materialService.closeDialog();
    this.clearSelect();
  }
  ngOnDestroy(): void {
    this.clearSelect();
    this.materialService.closeDialog();
  }
  sortData() {
    this.clearSelect();
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.selectedRow = null;
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  onSubmit() {
    this.form.disable();
    const newItem: CollectionAddress = {
      postalCode: this.form.value.postalCode,
      locality: this.form.value.locality,
      street: this.form.value.street,
      number: this.form.value.number,
    };
    if (this.isNew) {
      this.collectionsService.createAddress(newItem).subscribe(
        (dataItem) => {
          this.materialService.openSnackBar(`?????????? ${dataItem.locality}, ${dataItem.street}, ${dataItem.number} ????????????!`);
          this.collectionData.push(dataItem);
          this.dataSource.data = this.collectionData;
          this.table.renderRows();
        },
        (error) => {
          this.materialService.openSnackBar(error.error.message);
          this.form.enable();
        },
        () => {
          this.materialService.closeDialog();
          this.form.enable();
        }
      );
    } else {
      this.collectionsService.updateAddress(newItem, this.selectedRow?._id).subscribe(
        (dataItem) => {
          this.materialService.openSnackBar(`?????????? ${dataItem.locality}, ${dataItem.street}, ${dataItem.number} ??????????????!`);
          const index = this.collectionData.findIndex((item) => item._id === this.selectedRow?._id);
          this.collectionData[index] = dataItem;
          this.dataSource.data = this.collectionData;
          this.table.renderRows();
        },
        (error) => {
          this.materialService.openSnackBar(error.error.message);
          this.form.enable();
        },
        () => {
          this.materialService.closeDialog();
          this.form.enable();
        }
      );
    }
  }
  onEdit() {
    this.isNew = false;
    this.form.patchValue({
      postalCode: this.selectedRow!.postalCode,
      locality: this.selectedRow!.locality,
      street: this.selectedRow!.street,
      number: this.selectedRow!.number,
    });
    this.materialService.openDialog(this.dialogRef);
  }
  onDelete() {
    const decision = window.confirm(`?????????????? ${this.selectedRow!.locality}, ${this.selectedRow!.street}, ${this.selectedRow!.number} ???? ?????????????????????? ???????????????`);
    if (decision) {
      this.collectionsService.deleteAddress(this.selectedRow!).subscribe(
        (response) => {
          const index = this.collectionData.findIndex((item) => item._id === this.selectedRow!._id);
          this.collectionData.splice(index, 1);
          this.dataSource.data = this.collectionData;
          this.materialService.openSnackBar(response.message);
          this.clearSelect();
        },
        (error) => {
          this.materialService.openSnackBar(error);
        }
      );
    }
  }
  onRefresh() {
    this.isLoading = true;
    this.collectionsService.fetchAddress().subscribe((data) => {
      this.isLoading = false;
      this.collectionData = data;
      this.dataSource.data = this.collectionData;
    });
    this.clearSelect();
  }
  clearSelect() {
    this.selectedRow = null;
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
