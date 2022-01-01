import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Device } from '../shared/interfaces';
import { TechService } from '../shared/services/tech.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tech-page',
  templateUrl: './tech-page.component.html',
  styleUrls: ['./tech-page.component.scss'],
})
export class TechPageComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  devices$: Observable<Device[]> = this.techService.fetch();

  filterValue = '';
  selectedRow = '';
  loading = false;
  devices: Device[] = [];
  displayedColumns: string[] = ['deviceTypeName', 'deviceModel', 'serialNumber', 'inventoryNumber', 'ipAdress'];
  dataSource: any;

  constructor(private techService: TechService) {}
  ngOnInit() {
    this.loading = true;
    this.devices$.subscribe((devices) => {
      this.loading = false;
      this.devices = devices;
      this.dataSource = new MatTableDataSource(devices);
    });
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
  clearFilter() {
    this.filterValue = '';
    this.dataSource.filter = '';
  }
}
