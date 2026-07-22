export const findIdsFromText = (prefix: string, content: string): string[] => {
  if (!content) return [];

  const pattern = new RegExp(`${prefix}/([a-zA-Z0-9_-]+)`, "g");

  const matches = content.match(pattern);

  if (!matches) return [];

  const ids = matches.map((match) => match.replace(`${prefix}/`, ""));

  return ids;
};
