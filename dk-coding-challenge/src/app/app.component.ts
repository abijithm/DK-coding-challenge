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

  header = false;

  generateData(event?: KeyboardEvent){
    console.log('clicked button');

    this.Operations(this.csvRecords);
  }

  getOperation1Parameters(){
    var data = document.getElementById("data")
    var indexBegin = document.getElementById("op1IndexBegin")
    var indexEnd = document.getElementById("op1IndexEnd")
    var threshold = document.getElementById("threshold")
    var winLength = document.getElementById("winLength")

    console.log(data)

    {{this.operation1(data, indexBegin, indexEnd, threshold, winLength)}}
  }

  getOperation2Parameters(){
    var data = document.getElementById("data")
    var indexBegin = document.getElementById("op1IndexBegin")
    var indexEnd = document.getElementById("op1IndexEnd")
    var threshold1 = document.getElementById("thresholdLo")
    var threshold2 = document.getElementById("thresholdHi")
    var winLength = document.getElementById("winLength")

    {{this.operation2(data, indexBegin, indexEnd, threshold1, threshold2, winLength)}}
  }
  getOperation3Parameters(){
    var data1 = document.getElementById("data1")
    var data2 = document.getElementById("data2")
    var indexBegin = document.getElementById("op1IndexBegin")
    var indexEnd = document.getElementById("op1IndexEnd")
    var threshold1 = document.getElementById("threshold1")
    var threshold2 = document.getElementById("threshold2")
    var winLength = document.getElementById("winLength")

    {{this.operation3(data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength)}}
  }
  getOperation4Parameters(){
    var data = document.getElementById("data")
    var indexBegin = document.getElementById("op1IndexBegin")
    var indexEnd = document.getElementById("op1IndexEnd")
    var thresholdLo = document.getElementById("thresholdLo")
    var thresholdHi = document.getElementById("thresholdHi")
    var winLength = document.getElementById("winLength")

    {{this.operation4(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength)}}
  }

  operation1(data, indexBegin, indexEnd, threshold, winLength, event?: KeyboardEvent){
    console.log("operation1")

    this.res1 = this.operationsService.searchContinuityAboveValue(data, indexBegin, indexEnd, threshold, winLength);

    console.log(this.res1)
  }
  operation2(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength, event?: KeyboardEvent){
    console.log("operation2")

    this.res1 = this.operationsService.backSearchContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength);

    console.log(this.res2)
  }
  operation3(data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength, event?: KeyboardEvent){
    console.log("operation3")

    this.res3 = this.operationsService.searchContinuityAboveValueTwoSignals(data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength);

    console.log(this.res3)
  }
  operation4(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength, event?: KeyboardEvent){
    console.log("operation4")

    this.res4 = this.operationsService.searchMultiContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength);

    console.log(this.res4)
  }

  constructor(private operationsService: OperationsService, private http: HttpClient, private ngxCsvParser: NgxCsvParser) {
    const file = this.http.get('assets/latestSwing.csv', {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.ax.push(row[0]);
            this.ay.push(row[1]);
            this.az.push(row[2]);
            this.wx.push(row[0]);
            this.wy.push(row[1]);
            this.wz.push(row[2]);
          }
          this.csvRecords.concat(this.ax, this.ay, this.az, this.wx, this.wy, this.wz)
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