import { playNameLookup } from "./playName";

const romanToArabic = (roman: string): number => {
  const romanNumeralMap: { [key: string]: number } = {
    I: 1, IV: 4, V: 5, IX: 9, X: 10, XL: 40, L: 50, XC: 90, C: 100, CD: 400, D: 500, CM: 900, M: 1000
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

const getPlayName = (play: string) => playNameLookup[play.trim()] ?? play.trim();

const parseBiblTextFields = (biblText: string) => {
  const parts = biblText.split(/,\s*/);
  if (parts.length !== 3) return { play: "", act: "", scene: "", lines: "" };
  const [playAndAct, scene, lines] = parts;
  const playAndActParts = playAndAct.trim().split(/\s+/);
  let play = "", act = "";
  if (playAndActParts.length >= 2) {
    play = playAndActParts.slice(0, -1).join(' ');
    act = playAndActParts[playAndActParts.length - 1];
  } else {
    play = playAndActParts[0];
  }
  play = play.toLowerCase().replace(/\s|\./g, ''); // Lowercase and remove whitespace and periods
  return { play, act, scene: scene.trim(), lines: lines.trim() };
};

const parseNField = (nField: string) => {
  const parts = nField?.split(' ') ?? [];
  if (parts.length < 2) return { play: "", act: "", scene: "", lines: "" };
  const play = parts[1].toLowerCase().replace(/\s|\./g, ''); // Lowercase and remove whitespace and periods
  const actSceneLines = parts.slice(2).join('.');
  const actSceneParts = actSceneLines.split('.');
  const act = actSceneParts[0] || "";
  const scene = actSceneParts[1] || "";
  const lines = actSceneParts[2] || "";
  return { play, act, scene, lines };
};

export const parseBiblText = (biblText: string, nField: string) => {
  const biblTextFields = parseBiblTextFields(biblText);
  const nFieldFields = parseNField(nField);

  const play = nFieldFields.play || biblTextFields.play;
  const act = nFieldFields.act || biblTextFields.act;
  const scene = nFieldFields.scene || biblTextFields.scene;
  const lines = nFieldFields.lines || biblTextFields.lines;

  return {
    play,
    act: act ? (isNaN(Number(act)) ? romanToArabic(act) : parseInt(act)) : "",
    scene: parseInt(scene),
    lines: parseInt(lines),
    nField,
    biblText,
    playName: getPlayName(play)
  };
};
