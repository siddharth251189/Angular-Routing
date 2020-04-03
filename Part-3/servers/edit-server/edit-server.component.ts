import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
allowEdit=false;
  constructor(private serversService: ServersService,
    private activetedRoute:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activetedRoute.snapshot.queryParams)
    console.log(this.activetedRoute.snapshot.fragment)
    this.activetedRoute.queryParams
      .subscribe(
        (querPharams:Params)=>{
          this.allowEdit=querPharams['allowEdit']==='1' ? true:false
        }
      )
    this.server = this.serversService.getServer(2);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
