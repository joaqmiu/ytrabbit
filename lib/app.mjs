import { YoutubeTranscript } from 'youtube-transcript';
import fetch from 'node-fetch';
import { langMessages } from './lang.js';

const apiUrl = 'https://hercai.onrender.com/v3/hercai?question=';

const sendToApi = async (text, startTime, endTime, lang) => {
  const prefix = langMessages[lang] || langMessages['en'];
  const question = `${prefix} ${text}`;
  try {
    const response = await fetch(`${apiUrl}${encodeURIComponent(question)}`);
    const data = await response.json();
    return `[ ${startTime} - ${endTime} ]\n${data.reply}`;
  } catch (error) {
    return `Error at: [ ${startTime} - ${endTime} ]: ${error.message}`;
  }
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

export const ytrabbitApi = async (videoURL, lang = 'pt') => {
  const videoId = videoURL.includes('youtu.be') ? videoURL.split('youtu.be/')[1]?.split('?')[0] : videoURL.split('v=')[1]?.split('&')[0];

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    let block = [];
    let blockStartTime = 0;
    const requests = [];
    
    for (const item of transcript) {
      if (item.offset <= blockStartTime + 120) {
        block.push(item.text);
      } else {
        const textToSend = block.join(' ');
        const startTime = formatTime(blockStartTime);
        const endTime = formatTime(blockStartTime + 120);
        requests.push(sendToApi(textToSend, startTime, endTime, lang));
        
        block = [item.text];
        blockStartTime += 120;
      }
    }

    if (block.length > 0) {
      const textToSend = block.join(' ');
      const startTime = formatTime(blockStartTime);
      const endTime = formatTime(blockStartTime + 120);
      requests.push(sendToApi(textToSend, startTime, endTime, lang));
    }

    const results = await Promise.all(requests);
    return results;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};
