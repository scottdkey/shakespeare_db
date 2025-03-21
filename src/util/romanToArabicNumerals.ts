export const romanToArabic = (roman: string): number => {
  const romanNumeralMap: { [key: string]: number } = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000,
  };
  let arabic = 0;
  let i = 0;
  while (i < roman.length) {
    if (i + 1 < roman.length && romanNumeralMap[roman.substring(i, i + 2)]) {
      arabic += romanNumeralMap[roman.substring(i, i + 2)];
      i += 2;
    } else {
      arabic += romanNumeralMap[roman.substring(i, i + 1)];
      i += 1;
    }
  }
  return arabic;
};
