import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '@app/services/student.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-test-json',
  templateUrl: './test-json.component.html',
  styleUrls: ['./test-json.component.less']
})
export class TestJsonComponent implements OnInit {
  dataList: any;
  dataSource: any = [];
  columnName;
  dataSchema = {
    RowID: 'number',
    CustomerID: 'string',
    CustomerName: 'string',
    CustomerAddress: 'string',
    ProductName: 'string',
    Quantity: 'string',
    isEdit: 'isEdit'
  };
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private studentService: StudentService) {
    this.readJsonFileDataSourse();
   }
   displayedColumns: string[] = [];
   // displayedColumns: string[] = [];
   displayedColumns1;
   ngOnInit(): void {

  }
   // Read Json file
   readJsonFileDataSourse(): void {
    this.studentService.getJsondata().subscribe((data) => {
      console.log(data);
      this.displayedColumns1 = data.columnDefinitions;
      console.log(this.displayedColumns1);
      this.dataSource = data.data;
      this.displayedColumns = this.displayedColumns1.map(dataValue => dataValue.colName);
      this.displayedColumns.push('isEdit');
       });
   }
   // delete row
   deleteRow(id: string): void{
   this.dataSource.splice(this.dataSource.findIndex(data => data.CustomerID === id), 1);
   this.table.renderRows();
  }
   // update Row
   updateRow(elemet: any): void {
    this.dataSource.splice(this.dataSource.findIndex(data =>  data.RowID === elemet.RowID), 1 , elemet);
  }
  // filtering table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   // add row
   addRow(): void {
    const newRow = {RowID: '', CustomerID: '', CustomerName: '', CustomerAddress: '', ProductName: 0, Quantity: '', isEdit: true};
    this.dataSource = [...this.dataSource, newRow];
  }
}
