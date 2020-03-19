import { Component, OnInit } from '@angular/core';
import { StateObserverService } from 'src/app/service/state-observer/state-observer.service';
import { DataBaseInterfaceService } from 'src/app/service/dataBase/data-base-interface.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
