# 03NgBtTable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

Ejemplo de tablas bootstrap5 filtrables y ordenables<br>

1.- ng g module tablas --routing<br />
2.- ng g component tablas/tabla01<br />
3.- En tablasModule, exportar los componentes<br />
4.- En app.module, importat tablasModule.ts<br />

## instalar ng-bootstrap
ng add @ng-bootstrap/ng-bootstrap
## instalar bootstrap-icons
npm i bootstrap-icons --save<br> 

Then add this line to your styles.css file:<br>
@import "~bootstrap-icons/font/bootstrap-icons.css";


## instalar ngx-toastr
npm install ngx-toastr@15.2.2<br>
npm install @angular/animations --save<br>

Importar ambos módulos en el app.module.ts<br>
 imports: [
    ...
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],

add it to your angular.json
"styles": [ 
  "node_modules/ngx-toastr/toastr.css"  
]




