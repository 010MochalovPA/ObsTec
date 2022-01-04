import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Device } from '../shared/interfaces';
import { TechService } from '../shared/services/tech.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tech-page',
  templateUrl: './tech-page.component.html',
  styleUrls: ['./tech-page.component.scss'],
})
export class TechPageComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;

  devices$!: any;
  isLoading = false;
  filterValue = '';
  selectedRow = '';
  devices: Device[] = [];
  displayedColumns: string[] = ['deviceTypeName', 'deviceModel', 'serialNumber', 'inventoryNumber', 'ipAdress'];
  dataSource: any;

  constructor(private techService: TechService) {}
  ngOnInit() {
    this.isLoading = true;
    this.devices$ = this.techService.fetch().subscribe((devices) => {
      this.isLoading = false;
      this.devices = devices;
      this.dataSource = new MatTableDataSource(devices);
    });
  }
  ngOnDestroy(): void {
    this.selectedRow = '';
    this.devices$.unsubscribe();
  }
  sortData() {
    this.selectedRow = '';
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.selectedRow = '';
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
