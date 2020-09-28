
function isAString(suspect: string | undefined): suspect is string {
  if (typeof suspect === 'string') {
    return true;
  }

  throw new Error(`${suspect} is undefined`);
} 

export default isAString;
