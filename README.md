# ytrabbit

This Node.js package summarizes transcriptions of YouTube videos, with support for multiple languages.

## How to use

Install the package:

```bash
npm install ytrabbit
```

### Example

```
import { ytrabbitApi } from 'ytrabbit';

const videoURL = 'https://youtu.be/HAotLQQ0Lps?si=IcIim2jpJnJUj1KO';
const language = 'en';

ytrabbitApi(videoURL, language)
  .then((results) => {
    console.log("Transcrições recebidas:");
    results.forEach(result => console.log(result));
  })
  .catch((error) => {
    console.error("Erro:", error.message);
  });    
```
