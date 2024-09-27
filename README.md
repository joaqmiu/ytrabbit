# [Axios](https://www.npmjs.com/package/ytrabbit)

This package summarizes transcriptions of YouTube videos, with support for multiple languages.

## Supported Languages

The following languages are available for summarization:

- `en`: English
- `pt`: Portuguese
- `es`: Spanish
- `fr`: French
- `it`: Italian
- `de`: German
- `ru`: Russian

## How to use

Install the package:

```bash
npm install ytrabbit
```

### Example

```javascript
import { ytrabbitApi } from 'ytrabbit';

const videoURL = 'https://youtu.be/HAotLQQ0Lps?si=IcIim2jpJnJUj1KO';
const language = 'en';

ytrabbitApi(videoURL, language)
  .then((results) => {
    console.log("transcriptions:");
    results.forEach(result => console.log(result));
  })
  .catch((error) => {
    console.error("error:", error.message);
  });    
```
