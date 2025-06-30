export const apiBasePath = "https://api.themoviedb.org/3/search/";

export const imageBasePath = "https://image.tmdb.org/t/p/w500";

export const fallbackImagePath = (
  width: number,
  height: number,
  text: string = "No+Image"
): string => {
  return `https://placehold.co/${width}x${height}/png?text=${text}`;
};
