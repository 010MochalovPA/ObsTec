import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Vendor } from 'src/app/shared/interfaces';
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
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss'],
})
export class VendorFormComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<Vendor[]>;
  @ViewChild('vendorsDialog') dialogRef!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  isNew = true;
  vendors$!: any;
  vendors: Vendor[] = [];
  isLoading = false;
  selectedRow = '';
  filterValue = '';
  displayedColumns: string[] = ['name'];
  dataSource: any;
  matcher = new MyErrorStateMatcher();
  constructor(private collectionsService: CollectionsService, private materialService: MaterialService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.vendors$ = this.collectionsService.fetchVendor().subscribe((vendors) => {
      this.isLoading = false;
      this.vendors = vendors;
      this.dataSource = new MatTableDataSource(vendors);
    });
  }
  openDialog() {
    this.isNew = true;
    this.materialService.openDialog(this.dialogRef);
  }
  closeDialog() {
    this.materialService.closeDialog();
    this.form.reset();
  }
  ngOnDestroy(): void {
    this.selectedRow = '';
    this.vendors$.unsubscribe();
    this.materialService.closeDialog();
  }
  sortData() {
    this.selectedRow = '';
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.selectedRow = '';
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  clearFilter() {
    this.selectedRow = '';
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  onSubmit() {
    this.form.disable();
    if (this.isNew) {
      const newVendor: Vendor = {
        name: this.form.value.name,
      };
      this.collectionsService.createVendor(newVendor).subscribe(
        (vendor) => {
          this.materialService.openSnackBar(`Производитель ${vendor.name} создан!`);
          this.vendors.push(vendor);
          this.dataSource = new MatTableDataSource(this.vendors);
          this.table.renderRows();
        },
        (error) => {
          this.materialService.openSnackBar(error.error.message);
        },
        () => {
          this.form.reset();
          this.materialService.closeDialog();
          this.form.enable();
        }
      );
    } else {
      console.log('edit');
    }
  }
  onEditVendor() {
    this.isNew = false;
    console.log(this.selectedRow);
  }
}
