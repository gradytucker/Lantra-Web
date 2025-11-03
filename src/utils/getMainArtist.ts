/**
 *
 * @param artistString - Full artist string possibly containing featuring artists
 * @returns Main artist name only
 */
export const getMainArtist = (artistString: string) => {
  // Match everything before common featuring separators
  const match = artistString.match(/^(.*?)(\s*\(feat\.|\s*feat\.|,|;)/i);
  if (match) {
    return match[1].trim(); // return the part before the separator
  }
  return artistString.trim(); // if no match, return the original
};
