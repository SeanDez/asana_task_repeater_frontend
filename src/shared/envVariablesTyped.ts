import fs from 'fs';
import path from 'path';

const projectRootFolder = path.join(__dirname, '../../');
const envFilePath = path.join(projectRootFolder, '.env');

// slurp the whole file as a long string
// split by new line
const fileContents = fs.readFileSync(envFilePath, { encoding: 'utf8' });
const fileContentsByLine = fileContents.split(/\n/);

// kick out bad lines
const kVPairStrings = fileContentsByLine.filter(line => {
  if (line === '' || /^\#/.test(line)) {
    return false;
  }

  return true;
});

// key each kv pair to an object property and export
const envVariables: { [k: string]: string } = {};
kVPairStrings.forEach(kVPairString => {
  const arrayPair = kVPairString.split('=');
  envVariables[arrayPair[0]] = arrayPair[1];  
});

// console.log('envVariables', envVariables);

export default envVariables;


