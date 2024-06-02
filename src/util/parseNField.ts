export const parseNField = (nField: string) => {
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