import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { StateObserverService } from 'src/app/service/state-observer/state-observer.service';
import { DataBaseInterfaceService } from 'src/app/service/dataBase/data-base-interface.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public stateObserver: StateObserverService,
    public database: DataBaseInterfaceService
    ) { }

    displayedColumns;
    table;
    search = '';
    title: string;
    filteredList;

  getRecords(table: string) {
    this.database.getRecords(table)
      .subscribe((data: any[]) => {
        this.table = data;
        this.filter();
        if (data.length !== 0) {
          this.displayedColumns = Object.keys(data[0]);
        } else {
          this.displayedColumns = [];
          this.database.getColumns(table)
            .subscribe(
              (columns: any[]) => {
                for (const col of columns) {
                  this.displayedColumns.push(col.column_name);
                }
              }
            );
        }
  });
}

  deleteRecord(id: string) {
    console.log(id);
    this.database.deleteRecord(this.title, id)
      .subscribe(() => this.getRecords(this.title));
  }

  filter() {
    if (this.search !== '') {
      this.filteredList = this.table.filter(elem => elem.id === this.search);
    } else {
      this.filteredList = this.table;
    }
  }

  openDialog() {
    if (this.displayedColumns) {
      this.dialog.open(FormComponent, {
        width: '500px',
        data : {
          table: this.displayedColumns,
          title: this.title,
          id: this.table
        }
      })
        .afterClosed()
          .subscribe(
            () => this.getRecords(this.title)
          );
    } else {
      alert('Choose table first.');
    }
  }


  ngOnInit(): void {
    this.stateObserver.state$
      .subscribe(
        data => {
          this.getRecords(data.tableName);
          this.title = data.tableName;
        }
      );
  }

}
