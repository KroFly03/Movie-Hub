export const getYoutubePreview = (url) => {
  const movieYID = url.replace("https://www.youtube.com/watch?v=", "");
  return `https://img.youtube.com/vi/${movieYID}/0.jpg`;
}