import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'PruebaTrabajo';
  test1: any[] = []
  element = false;
  contador = 0;
  contador1 = 0;

  displayedColumns: string[] = ['Comercio', 'Estado', 'Fecha'];

  dataSource = new MatTableDataSource<any>(this.test1);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  currentItem = "";


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private papa: Papa, private _liveAnnouncer: LiveAnnouncer) {
  }


  showData() {
    return (this.element = true);
  }
  hideData() {
    return (this.element = false);
  }
  getValue(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    return (event.target as HTMLInputElement).value;
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files; // FileList object
    this.test1 = []

    for (var i = 0; i < files.length; i++) {


      var file = files[i];
      var reader = new FileReader();

      reader.readAsText(file);

      reader.onload = (event: any) => {
        var csv = event.target.result; // Content of CSV file
        this.papa.parse(csv, {
          skipEmptyLines: true,
          header: true,

          complete: (results) => {
            this.test1 = this.test1.concat(results.data)

            if (i == files.length) {
              this.contador1 = 0;
              for (var b = 0; b < this.test1.length; b++) {
                if (this.test1[b].Estado == "Aceptada") {
                  this.contador1++;
                }
              }
            }
            this.dataSource.data = this.test1

          }

        });
      }
    }


  }

}





