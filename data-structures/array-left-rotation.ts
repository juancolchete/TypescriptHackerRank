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
 * Complete the 'rotateLeft' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER d
 *  2. INTEGER_ARRAY arr
 */

function rotateLeft(d: number, arr: number[]): number[] {
  // Write your code here
  let tempArr = [...arr];
  let result = arr;
  for(let r =0; r < d; r++){
    for(let i = 0; i < result.length;i++){
      let leftIndex = 0;
      if(i == 0){
        leftIndex = result.length -1;
      }else{
        leftIndex = i - 1;
      }
      result[leftIndex] = tempArr[i];
    }
    tempArr = [...result]
  }
  return result;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const d: number = parseInt(firstMultipleInput[1], 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result: number[] = rotateLeft(d, arr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}