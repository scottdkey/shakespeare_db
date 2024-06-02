export const parseBiblTextFields = (biblText: string) => {
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