/**
 * YouTube Utility Functions
 * Supports parsing standard watch URLs, short URLs, embed URLs, shorts, and mobile URLs.
 */

/**
 * Extracts the 11-character YouTube video ID from various URL formats.
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
export const getYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;

  const trimmedUrl = url.trim();

  // Handle direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmedUrl)) {
    return trimmedUrl;
  }

  // Regex patterns for YouTube URLs:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  // - https://www.youtube.com/v/VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  const patterns = [
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = trimmedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Generates an embeddable YouTube URL.
 * @param {string} url - YouTube URL or Video ID
 * @param {boolean} autoplay - Whether to autoplay the video
 * @returns {string|null} - Embed URL or null if invalid
 */
export const getYouTubeEmbedUrl = (url, autoplay = false) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1'
  });

  if (autoplay) {
    params.set('autoplay', '1');
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Gets the thumbnail URL for a YouTube video.
 * @param {string} url - YouTube URL or Video ID
 * @param {'maxresdefault' | 'hqdefault' | 'mqdefault'} quality - Thumbnail quality
 * @returns {string|null} - Thumbnail URL or null
 */
export const getYouTubeThumbnail = (url, quality = 'hqdefault') => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
