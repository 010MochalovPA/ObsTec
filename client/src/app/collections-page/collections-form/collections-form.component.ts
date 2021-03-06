import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Collection, CollectionsList } from 'src/app/shared/interfaces';
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
  selector: 'app-collections-form',
  templateUrl: './collections-form.component.html',
  styleUrls: ['./collections-form.component.scss'],
})
export class CollectionsFormComponent implements OnInit, OnDestroy {
  @Input() collection!: CollectionsList;

  @ViewChild(MatTable) table!: MatTable<Collection[]>;
  @ViewChild('collectionsDialog') dialogRef!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  isNew = true;
  collectionData: Collection[] = [];
  isLoading = false;
  selectedRow!: Collection | null;
  filterValue = '';
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(this.collectionData);
  matcher = new MyErrorStateMatcher();
  constructor(private collectionsService: CollectionsService, private materialService: MaterialService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.collectionsService.fetch(this.collection.url).subscribe((data) => {
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
    const newItem: Collection = {
      name: this.form.value.name,
    };
    if (this.isNew) {
      this.collectionsService.create(this.collection.url, newItem).subscribe(
        (dataItem) => {
          this.materialService.openSnackBar(`${this.collection.name} ${dataItem.name} ????????????!`);
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
      this.collectionsService.update(this.collection.url, newItem, this.selectedRow?._id).subscribe(
        (dataItem) => {
          this.materialService.openSnackBar(`${this.collection.name} ${dataItem.name} ??????????????!`);
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
      name: this.selectedRow!.name,
    });
    this.materialService.openDialog(this.dialogRef);
  }
  onDelete() {
    const decision = window.confirm(`?????????????? ${this.selectedRow!.name} ???? ?????????????????????? ${this.collection.title}?`);
    if (decision) {
      this.collectionsService.delete(this.collection.url, this.selectedRow!).subscribe(
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
    this.collectionsService.fetch(this.collection.url).subscribe((data) => {
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
