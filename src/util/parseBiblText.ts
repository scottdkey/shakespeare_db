import { parseBiblTextFields } from "./parseBiblTextFields";
import { parseNField } from "./parseNField";
import { getPlayName } from "./playName";


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
