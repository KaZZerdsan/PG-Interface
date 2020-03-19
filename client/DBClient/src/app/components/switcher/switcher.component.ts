import { Component, OnInit } from '@angular/core';
import { DataBaseInterfaceService } from 'src/app/service/dataBase/data-base-interface.service';
import { StateObserverService } from 'src/app/service/state-observer/state-observer.service';
import { TableList } from 'src/app/interface/tableList';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  tables = [];

  constructor(
    private database: DataBaseInterfaceService,
    private stateObserver: StateObserverService
  ) { }

  switchTable(table) {
    this.stateObserver.emit(table.toLowerCase(), this.tables);
  }

  getTables() {
    this.database.getTableList()
      .subscribe((tables: TableList[]) => {
        this.tables = [];
        tables.forEach(table =>
          this.tables.push(
            table.table_name.charAt(0).toUpperCase() + table.table_name.substring(1)));
      });
  }

  ngOnInit(): void {
    this.getTables();
  }

}
