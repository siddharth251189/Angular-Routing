# Angular Routing

## Router imports

The Angular Router is an optional service that presents a particular component view for a given URL. It is not part of the Angular core. It is in its own library package, @angular/router. Import what you need from it as you would from any other Angular package.

```Javascript
import { RouterModule, Routes } from '@angular/router';
```

## Configuration

### app.module.ts

```javascript
import { Routes, RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersService } from "./servers/servers.service";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "servers", component: ServersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Router Outlet

After configure the routes in the app.module.ts file we need to add router outlet into our view file as following below:

### app.component.html

```javascript
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

## Router Link

We use routerLink on place of href into <a> tag for achieving the one page application functionality(change page without the refresh page)

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a routerLink="/">Home</a></li>
        <li role="presentation"><a routerLink="servers">Servers</a></li>
        <li role="presentation"><a routerLink="users">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

## Styleing Active Router Link

For styleing active router link we need to add a active class to link and with help of routerLinkActive we can achive this goal but there will be an issue if user will click on another link, default link also will be styled as active link so for solveing the issue we need to add [routerLinkActiveOptions]="{exact:true}" on default router link.

### Important syntax:

#### routerLinkActive="className"

#### [routerLinkActiveOptions]="{exact:true}"

```html
<ul class="nav nav-tabs">
  <li
    role="presentation"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{exact:true}"
  >
    <a routerLink="/">Home</a>
  </li>
  <li role="presentation" routerLinkActive="active">
    <a routerLink="servers">Servers</a>
  </li>
  <li role="presentation" routerLinkActive="active">
    <a routerLink="users">Users</a>
  </li>
</ul>
```

## Navigating Programmatically

For navigate Programmatically we need to follow steps as given below:

### Steps:

1. Import Router from @angular/router.
2. Call the router in constructor.
3. Use navigate mathod.

### Important syntax:

this.router.navigate(['servers'])

### HTML

```javascript
<button class="btn btn-primary" (click)="onLoadServers()">Load Server</button>
```

### Angular Code

```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onLoadServers(){
    this.router.navigate(['servers'])
  }
}

```

# Part-2 Start

## Passing Router Parameters

In the example we are passing two parameters to users route first is id and second is name in the routes configration.below is the example of url.

http://localhost:4200/users/1/max

### app.module.ts

```Javascript
const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'users',component:UsersComponent},
  {path:'users/:id/:name',component:UserComponent},
  {path:'servers',component:ServersComponent}
]
```

## Fatching Router Parameters

In order to fatching URL we need to follow below steps:

1. import ActivatedRoute from @angular/router
2. Hold this ActivatedRoute in a private variable in constructor parameter
3. By Useing <b>snapshot.params</b> we can access the parameters

### Important syntax:

```
this.route.snapshot.params['id']
```

### user.component.ts

```Javascript
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.params['name']);

    this.user={
      id:this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    }
  }

}

```

### user.component.html

```html
<p>User with ID {{user.id}} loaded.</p>
<p>User name is {{user.name}}</p>
```

## Fatching Router Parameters Reactively(With Observable);

In some conditions screenshot method will not work. For example if we have a router link in user component like this:

```html
<a [routerLink]="['/users',10,'Anna']">Load Anna</a>
```

If we will click on button it will update parameters in address bar(URL) but not on the view. so for prevent this issue we will have to use <b>params</b> observable.

### Important syntax:

```Javascript
this.route.params
    .subscribe((params:Params)=>{

    })
```

### user.component.ts

```Javascript
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.params['name']);

    this.user={
      id:this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    }

    this.route.params
    .subscribe((params:Params)=>{
      this.user.id=params['id'],
      this.user.id=params['name']
    })
  }

}

```

# Part -3 Start

## Seting Query Parameters

### Important properties:

```html
 <a
 [routerLink]="['/servers',5,'edit']"
 [queryParams]="{allowEdit:'1'}"
 fragment="loading"
</a>

```

### servers.component.html

```html
<a
  [routerLink]="['/servers',5,'edit']"
  [queryParams]="{allowEdit:'1'}"
  fragment="loading"
  class="list-group-item"
  *ngFor="let server of servers"
>
  {{ server.name }}
</a>
```

## Seting Query Parameters Programmatically

### home.component.html

```html
<button class="btn btn-primary" (click)="onLoadServer(1)">Load Servers</button>
```

### home.component.ts

```javascript
 import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  onLoadServer(id:number){
    this.route.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'},fragment:'loading'})
  }
}


```

## Retrieving Query Parameters and Fragment By Snapshot

### Steps for Retrieving Parameters and Fragment By Snapshot

1. Import ActivatedRoute
2. Hold it into private variable in constructor
3. By using <b>this.activetedRoute.snapshot.queryParams</b> get query parameter.

```javascript
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  constructor(private serversService: ServersService,
    private activetedRoute:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activetedRoute.snapshot.queryParams)
    console.log(this.activetedRoute.snapshot.fragment)

  }

}
```

## Retrieving Parameters and Fragment By Subscribe Method

### Steps for Retrieving Parameters and Fragment By Subscribe Method

1. Import ActivatedRoute from @angular/router
2. Hold ActivatedRoute into private variable in constructor
3. Use params.subscribe methods for Retrieving parameters and fragment

### Important Syntex

```javascript
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute,Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
    constructor(
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
   this.route.params.subscribe(
      (params:Params)=>{
        console.log(params['id'])
      }
    )
  }

}

```

### server.component.ts

```javascript
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute,Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    const id=+this.route.snapshot.params['id']

    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params:Params)=>{
        console.log(params['id'])
      }
    )
  }
  onEditServer(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
}




```

### Child Routing

```javascript
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }]
  },

  {
    path: "servers",
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      { path: ":id/edit", component: EditServerComponent }
    ]
  }
];
```

### servers.component.html

```html
<div class="row">
  <div class="col-xs-12 col-sm-4">
    <div class="list-group">
      <a
        [routerLink]="['/servers',server.id]"
        [queryParams]="{allowEdit:'1'}"
        fragment="loading"
        class="list-group-item"
        *ngFor="let server of servers"
      >
        {{ server.name }}
      </a>
    </div>
  </div>
  <div class="col-xs-12 col-sm-4">
    <router-outlet></router-outlet>
  </div>
</div>
```

### users.component.html

```html
<div class="row">
  <div class="col-xs-12 col-sm-4">
    <div class="list-group">
      <a
        [routerLink]="['/users',user.id,user.name]"
        class="list-group-item"
        *ngFor="let user of users"
      >
        {{ user.name }}
      </a>
    </div>
  </div>
  <div class="col-xs-12 col-sm-4">
    <router-outlet></router-outlet>
  </div>
</div>
```

## Configuring the Handling of Query Parameters

When route or page will change so usually we lost the value of query parameter. For solving this issue we can use queryParamsHandling property.

In Our Example when we will click on edit server button we will lost our value of query parameter so we wre not able to edit the server. Solution for this issue/condition we have to use queryParamsHandling property.

### Important Syntex:

```ts
this.router.navigate(["edit"], {
  relativeTo: this.route,
  queryParamsHandling: "preserve"
});
```

### server.component.ts

```javascript
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute,Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    const id=+this.route.snapshot.params['id']

    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params:Params)=>{
        this.server = this.serversService.getServer(+params['id']);
      }
    )
  }
  onEditServer(){
    this.router.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:'preserve'});
  }
}


```

## Redirecting and Wildcard Routes

```javascript
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }]
  },

  {
    path: "servers",
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      { path: ":id/edit", component: EditServerComponent }
    ]
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];
```

## Important: Redirection Path Matching

In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always the case when adding redirections.

By default, Angular matches paths by prefix. That means, that the following route will match both /recipes and just /

```javascript
{ path: '', redirectTo: '/somewhere-else' }
```

Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with '' (Important: That's no whitespace, it's simply "nothing").

To fix this behavior, you need to change the matching strategy to "full" :

```javascript
{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
```

Now, you only get redirected, if the full path is '' (so only if you got NO other content in your path in this example).
