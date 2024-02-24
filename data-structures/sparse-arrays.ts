'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'matchingStrings' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY stringList
 *  2. STRING_ARRAY queries
 */

function matchingStrings(stringList: string[], queries: string[]): number[] {
  // Write your code here
  let result:number[] = []
  for(let i =0;i < stringList.length;i++){
    for(let q=0;q < queries.length;q++){
      if(result[q] == null){
        result[q] = 0;
      }
      if(stringList[i] == queries[q]){
        result[q]++; 
      }
    }
  }  
  return result;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const stringListCount: number = parseInt(readLine().trim(), 10);

    let stringList: string[] = [];

    for (let i: number = 0; i < stringListCount; i++) {
        const stringListItem: string = readLine();
        stringList.push(stringListItem);
    }

    const queriesCount: number = parseInt(readLine().trim(), 10);

    let queries: string[] = [];

    for (let i: number = 0; i < queriesCount; i++) {
        const queriesItem: string = readLine();
        queries.push(queriesItem);
    }

    const res: number[] = matchingStrings(stringList, queries);

    ws.write(res.join('\n') + '\n');

    ws.end();
}
