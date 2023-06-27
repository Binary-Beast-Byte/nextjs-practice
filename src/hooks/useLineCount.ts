import { useState, useEffect } from 'react';

export const  useLineCount = (paragraphElem) => {
  const [lineCount, setLineCount] = useState(0);
  const [lines, setLines] = useState('');

  useEffect(() => {
    if (paragraphElem) {
      // Count the number of sentences separated by full stops
      const sentences = paragraphElem.split('.').filter(sentence => sentence.trim() !== '');
      setLineCount(sentences.length);

      // Extract the first two lines and enclose them in a paragraph element
      const firstTwoLines = sentences.slice(0, 2).map(sentence => sentence.trim()).join('. ');
      setLines(`${firstTwoLines}</p>`);
    }
  }, [paragraphElem]);

  return { totalLineCount: lineCount, lines };
}
