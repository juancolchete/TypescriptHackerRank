
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
 * Complete the 'hourglassSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function hourglassSum(arr: number[][]): number {
    // Write your code here
    let sum = 0;
    let curSum = 0;
    for(let i =0;i<arr.length-2;i++){
        for(let j=0;j<arr.length-2;j++){
            curSum += arr[i][j] + arr[i][j+1] + arr[i][j+2]
            curSum += arr[i+1][j+1]
            curSum += arr[i+2][j] + arr[i+2][j+1] + arr[i+2][j+2]
            if(curSum > sum){
                sum = curSum
            }
            curSum = 0;
        }
    }
    console.log(sum)
    return sum;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    let arr: number[][] = Array(6);

    for (let i: number = 0; i < 6; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result: number = hourglassSum(arr);

    ws.write(result + '\n');

    ws.end();
}
