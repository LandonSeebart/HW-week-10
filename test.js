
const nodeArgs = process.argv;
const action = process.argv[2];
let input = "";

function getInput(nodeArgs){
  
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            input = input + "+" + nodeArgs[i];
        }

        else {

            input += nodeArgs[i];

        }
    }
}

getInput(nodeArgs);

console.log(`action: ${action}`);
console.log(`input: ${input}`);
