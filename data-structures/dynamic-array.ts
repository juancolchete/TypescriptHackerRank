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
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n: number, queries: number[][]): number[] {
    // Write your code here
    let arr = [];
    let anwsers = [];
    let lastAnwser = 0;
    for(let i=0; i < n;i++){
     arr.push([]); 
    }
    for(let i=0;i < queries.length;i++){
     let x = queries[i][1]; 
     let y = queries[i][2]; 
     if(queries[i][0] == 1){
        let idx = ((x ^ lastAnwser) % n);
        arr[idx].push(y);
     }else{
        let idx = ((x ^ lastAnwser) % n);
        lastAnwser = arr[idx][y % arr[idx].length]; 
        anwsers.push(lastAnwser);
     }
    }
    return anwsers;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const q: number = parseInt(firstMultipleInput[1], 10);

    let queries: number[][] = Array(q);

    for (let i: number = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result: number[] = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
