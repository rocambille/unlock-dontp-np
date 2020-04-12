/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';

import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import Card from './Card';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function Deck({
  playerId,
  playerCount,
  story,
}) {
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjs.getDocument(story.url);

      setPdf(await loadingTask.promise);
    };

    fetchPdf();
  }, [story.url]);

  let cardStart = 0;
  let cardCount = 0;

  const getCardCount = (i) => (
    Math.floor(story.deckSize / playerCount)
      + (i <= story.deckSize % playerCount ? 1 : 0)
  );

  for (let i = 1; i <= playerId; i += 1) {
    cardStart += cardCount;
    cardCount = getCardCount(i);
  }

  return (
    <>
      {pdf == null ? (
        <p>chargement...</p>
      ) : (
        React.Children.toArray((new Array(cardCount)).fill(0).map(
          (value, index) => <Card src={pdf} index={cardStart + index} />,
        ))
      )}
    </>
  );
}

export default Deck;
