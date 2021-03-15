import { Component } from '@angular/core';
import { OperationsService} from "./operations.service";
import { HttpClient } from '@angular/common/http';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dk-coding-challenge';

  csvRecords: any[] = [];
  ax: any[] = [];
  ay: any[] = [];
  az: any[] = [];
  wx: any[] = [];
  wy: any[] = [];
  wz: any[] = [];

  res1: any;
  res2: any;
  res3: any;
  res4: any;


  // Operation 1 
  op1Data: string;
  op1IndexBegin: number;
  op1IndexEnd: number;
  op1Threshold: number;
  op1WinLength: number;

  // Operation 2
  op2Data: string;
  op2IndexBegin: number;
  op2IndexEnd: number;
  op2ThresholdLo: number;
  op2ThresholdHi: number;
  op2WinLength: number;

  // Operation 3
  op3Data1: string;
  op3Data2: string;
  op3IndexBegin: number;
  op3IndexEnd: number;
  op3Threshold1: number;
  op3Threshold2: number;
  op3WinLength: number;

  // Operation 4
  op4Data: string;
  op4IndexBegin: number;
  op4IndexEnd: number;
  op4ThresholdLo: number;
  op4ThresholdHi: number;
  op4WinLength: number;

  header = false;

  generateData(event?: KeyboardEvent){
    console.log('clicked button');

    this.Operations(this.csvRecords);
  }

  dataColumn(column){

    console.log(column)
    if (column == "ax"){
      return this.ax
    }
    if (column == "ay"){
      return this.ay
    }
    if (column == "az"){
      return this.az
    }
    if (column == "wx"){
      return this.wx
    }
    if (column == "wy"){
      return this.wy
    }
    if (column == "wz"){
      return this.wz
    }
  }

  operation1(event?: KeyboardEvent){
    console.log("operation1")

    var data = this.dataColumn(this.op1Data);

    this.res1 = this.operationsService.searchContinuityAboveValue(data, this.op1IndexBegin, this.op1IndexEnd, this.op1Threshold, this.op1WinLength);

    console.log(this.res1)
  }
  operation2(event?: KeyboardEvent){
    console.log("operation2")

    var data = this.dataColumn(this.op2Data);

    this.res1 = this.operationsService.backSearchContinuityWithinRange(data, this.op2IndexBegin, this.op2IndexEnd, this.op2ThresholdLo, this.op2ThresholdHi, this.op2WinLength);

    console.log(this.res2)
  }
  operation3(event?: KeyboardEvent){
    console.log("operation3");

    var data1 = this.dataColumn(this.op3Data1);
    var data2 = this.dataColumn(this.op3Data2);

    this.res3 = this.operationsService.searchContinuityAboveValueTwoSignals(data1, data2, this.op3IndexBegin, this.op3IndexEnd, this.op3Threshold1, this.op3Threshold2, this.op3WinLength);

    console.log(this.res3)
  }
  operation4(event?: KeyboardEvent){
    console.log("operation4")

    var data = this.dataColumn(this.op4Data);

    this.res4 = this.operationsService.searchMultiContinuityWithinRange(data, this.op4IndexBegin, this.op4IndexEnd, this.op4ThresholdLo, this.op4ThresholdHi, this.op4WinLength);

    console.log(this.res4)
  }

  constructor(private operationsService: OperationsService, private http: HttpClient, private ngxCsvParser: NgxCsvParser) {
    const file = this.http.get('assets/latestSwing.csv', {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 0; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",")
                this.ax.push(row[1]),
                this.ay.push(row[2]),
                this.az.push(row[3]),
                this.wx.push(row[4]),
                this.wy.push(row[5]),
                this.wz.push(row[6])
          }
          // this.csvRecords.concat(this.ax, this.ay, this.az, this.wx, this.wy, this.wz)
      },
      error => {
          console.log(error);
        }
      );
  }
  //   console.log(this.csvRecords);
  //   this.ngxCsvParser.parse(file[0], { header: this.header, delimiter: ',' })
  //     .pipe().subscribe((result: Array<any>) => {
  //       console.log('works');
  //       console.log('Result', result);
  //       this.csvRecords = result;
  //       this.Operations(this.csvRecords);
  //     }, (error: NgxCSVParserError) => {
  //       console.log('Error', error);
  //     });
  // }

  // class Analysis {
  //   data = getInfo();
  // }


  // let analysis = new Analysis();
  // analysis.data;

  // getInfo() {
  //   let results = [];
  //   const csv = require('csv-parser');
  //   const fs = require('fs');
    
  //   fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
  //   .pipe(csv(['Timestamp','ax','ay','az','wx','wy','wz']))
  //   .on('data',(data)=> results.push(data))
  //   .on('end', () => {
  //       this.Operations(results);
  //   });
  // }

  public Operations(results){
  
    console.log('Operations');

    console.log(results[0])

    let ax = results.map(x=> x.ax)
    let ay = results.map(x=> x.ay)
    let az = results.map(x=> x.az)
    let wx = results.map(x=> x.wx)
    let wy = results.map(x=> x.wy)
    let wz = results.map(x=> x.wz)
    
    console.log("\n ********** Operation 1 ********** \n")

    var res11 = this.operationsService.searchContinuityAboveValue(ax, 880, 920, 25.0, 3);
    console.log(res11);
    console.log('\n')
    var res12 = this.operationsService.searchContinuityAboveValue(wz, 800, 1000, 10.0, 7);
    console.log(res12);

    console.log("\n ********** Operation 2 ********** \n")

    var res21 = this.operationsService.backSearchContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res21);
    console.log('\n')
    var res22 = this.operationsService.backSearchContinuityWithinRange(ay, 245, 300, 0.00, 0.3, 13);
    console.log(res22);
    
    console.log("\n ********** Operation 3 ********** \n")

    var res31 = this.operationsService.searchContinuityAboveValueTwoSignals(ax, ay, 870, 920, 0.0, -15.0, 3);
    console.log(res31);
    console.log('\n')
    var res32 = this.operationsService.searchContinuityAboveValueTwoSignals(az, wx, 400, 600, 0.0, 0.2, 4);
    console.log(res32);
    
    console.log("\n ********** Operation 4 ********** \n")

    var res41 = this.operationsService.searchMultiContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res41)
    console.log('\n')
    var res42 = this.operationsService.searchMultiContinuityWithinRange(ax, 880, 920, 0.0, 17.0, 3);
    console.log(res42)

    // Test Cases

    console.log("\n ******** Assertion Test Cases ******** \n")

    console.log(" ******** Operation 1 Tests ******** \n")

    console.assert(res11 === 720, "on -1 === 720");
    console.assert(res11 === -1, "on -1 === -1");
    console.assert(res12 === 816, "on 816 === 816")
    console.assert(res12 === -1, "on 816 === -1")

    console.log("\n ******** Operation 2 Tests ********\n")

    console.assert(res21 === 886, "on 886 === 886");
    console.assert(res21 === -1, "on 886 === -1");
    console.assert(res22 === 263, "on 263 === 263");
    console.assert(res22 === -1, "on 263 === -1");

    console.log("\n ******** Operation 3 Tests ******** \n")

    console.assert(res31 === 883, "on 883 === 883");
    console.assert(res31 === -1, "on 883 === -1");
    console.assert(res32 === 500, "on 500 === 500");
    console.assert(res32 === -1, "on 500 === -1");

    console.log("\n ******** Operation 4 Tests ******** \n")

    console.assert(String(res41) == "886,888", "on [[886, 888]] === [[886, 888]]");
    console.assert(String(res41) === "", "on [[886, 888]] === []");
    console.assert(String(res42) == "883,885,884,886,885,887,886,888,887,889,888,890,889,891,890,892,908,910,909,911,910,912,911,913,912,914,913,915,914,916,915,917,916,918,917,919",
    "on res42 === [[ 883, 885 ], [ 884, 886 ],[ 885, 887 ], [ 886, [ 887, 889 ], [ 888, 890 ],[ 889, 891 ], [ 890, 892 ],[ 908, 910 ], [ 909, 911 ],[ 910, 912 ], [ 911, 913 ],[ 912, 914 ], [ 913, [ 914, 916 ], [ 915, 917 ],[ 916, 918 ], [ 917, 919 ] ]" )
    console.assert(String(res42) == "915,917,916,918,917,919",
    "on res42 === [ [ 915, 917 ],[ 916, 918 ], [ 917, 919 ] ]" );

    console.log("\n ************ Tests Complete ************\n")
  }
}