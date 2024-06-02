export const parseNField = (nField: string) => {
  const parts = nField?.split(' ') ?? [];
  if (parts.length < 2) return { play: "", act: "", scene: "", line: "" };

  const play = parts[1].toLowerCase().replace(/\s|\./g, '');
  let act = "", scene = "", line = "";

  if (parts.length >= 3) {
    const actSceneLine = parts[2].split('.');
    act = actSceneLine[0] || "";
    scene = actSceneLine[1] || "";
    line = actSceneLine[2] || "";
  }

  return { play, act, scene, line };
};