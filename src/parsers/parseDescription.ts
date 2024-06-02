export function parseDescription(input: string, bibl: BiblReturn[]): { value: string, bibl: BiblReturn[] }[] {
  // This regex matches sequences of two or more periods separated by optional spaces
  const regex = /(\.\s?){1,}/g;
  let workingData = bibl

  // Find all matches and their positions in the input string
  const matches = [...input.matchAll(regex)];

  let lastIndex = 0;
  const result: { value: string, bibl: BiblReturn[] }[] = [];

  for (const match of matches) {
    const startIndex = match.index!;
    const endIndex = startIndex + match[0].length;

    // Extract the substring before the current match
    const substring = input.slice(lastIndex, startIndex).trim();
    const count = (match[0].match(/\ . /g) || []).length // Count the number of periods
    const taken = workingData.slice(0, count);
    workingData = workingData.slice(count);
    if (substring) {
      result.push({
        value: substring,
        bibl: taken

      });
    }

    lastIndex = endIndex;
  }

  // Handle any remaining text after the last match
  const remainingText = input.slice(lastIndex).trim();
  if (remainingText) {
    result.push({
      value: remainingText,
      bibl: []
    });
  }

  return result;
}