import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Collection, CollectionChild, CollectionsList, CollectionsListChild } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { CollectionsService } from 'src/app/shared/services/collections.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThrowStmt } from '@angular/compiler';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}
@Component({
  selector: 'app-collections-form-child',
  templateUrl: './collections-form-child.component.html',
  styleUrls: ['./collections-form-child.component.scss'],
})
export class CollectionsFormChildComponent implements OnInit, OnDestroy {
  @Input() collection!: CollectionsListChild;

  @ViewChild(MatTable) table!: MatTable<Collection[]>;
  @ViewChild('collectionsDialog') dialogRef!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  isNew = true;
  collectionData: CollectionChild[] = [];
  parentData: Collection[] = [];
  isLoading = false;
  selectedRow?: CollectionChild | null;
  selectedParent?: string;
  filterValue = '';
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(this.collectionData);
  matcher = new MyErrorStateMatcher();
  constructor(private collectionsService: CollectionsService, private materialService: MaterialService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.collectionsService.fetch(this.collection.parent.url).subscribe((data) => {
      this.parentData = data;
      this.isLoading = false;
    });
  }
  openDialog() {
    this.isNew = true;
    this.form.reset();
    this.materialService.openDialog(this.dialogRef);
  }
  closeDialog() {
    this.materialService.closeDialog();
    this.form.reset();
    this.clearSelect();
  }
  ngOnDestroy(): void {
    this.clearParent();
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
    const newItem: CollectionChild = {
      name: this.form.value.name,
      ParentId: this.selectedParent!,
    };
    if (this.isNew) {
      this.collectionsService.createChild(this.collection.url, newItem).subscribe(
        (dataItem) => {
          this.materialService.openSnackBar(`${this.collection.name} ${dataItem.name} создан!`);
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
          this.clearSelect();
          this.form.enable();
        }
      );
    } else {
      this.collectionsService.updateChild(this.collection.url, newItem, this.selectedRow?._id).subscribe(
        (dataItem) => {
          this.materialService.openSnackBar(`${this.collection.name} ${dataItem.name} изменен!`);
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
          this.clearSelect();
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
    const decision = window.confirm(`Удалить ${this.selectedRow!.name} из справочника ${this.collection.title}?`);
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
    this.collectionsService.fetchChild(this.collection.url, this.selectedParent!).subscribe((data) => {
      this.isLoading = false;
      this.collectionData = data;
      this.dataSource.data = this.collectionData;
    });
    this.clearSelect();
  }
  clearSelect() {
    this.selectedRow = null;
    this.form.reset();
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  clearParent() {
    this.selectedParent = '';
  }
}
