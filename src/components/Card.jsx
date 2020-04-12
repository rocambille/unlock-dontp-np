/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

const cardWidth = 6.164/* cm */;
const cardHeight = 12.269/* cm */;
const pageMarginX = (21/* cm */ - cardWidth * 3) / 2;
const pageMarginY = (29.7/* cm */ - cardHeight * 2) / 2;

function Card({
  src,
  index,
}) {
  const canvasRef = useRef(null);
  const [discarded, setDiscarded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const renderCard = async () => {
      const cardsPerRow = 3;
      const rowsPerPage = 2;
      const cardsPerPage = cardsPerRow * rowsPerPage;
      const pageNumber = 1 + 2 * Math.floor(index / cardsPerPage) + (visible ? 0 : 1);

      const page = await src.getPage(pageNumber);

      const wantedColumn = ((number) => (
        (pageNumber % 2 === 0)
          ? ((cardsPerRow - 1) - number)
          : number
      ))(index % cardsPerRow);
      const wantedRow = Math.floor((index % cardsPerPage) / cardsPerRow);

      const scale = 2;
      const viewport = page.getViewport({ scale });
      const cardViewport = { ...viewport };

      /* 0 / 47 / 277 / 786 */
      cardViewport.cardWidth = (viewport.width * cardWidth) / 21;
      /* 0 / 89 / 935 / 1024 */
      cardViewport.cardHeight = (viewport.height * cardHeight) / 29.7;

      cardViewport.offsetX = -(
        wantedColumn * cardViewport.cardWidth
      ) - (
        viewport.width * pageMarginX
      ) / 21;
      cardViewport.offsetY = -(
        wantedRow * cardViewport.cardHeight
      ) - (
        viewport.height * pageMarginY
      ) / 29.7;

      cardViewport.transform[4] += cardViewport.offsetX;
      cardViewport.transform[5] += cardViewport.offsetY;

      // Prepare canvas using PDF page dimensions
      const canvas = canvasRef.current;

      const context = canvas.getContext('2d');
      canvas.height = cardViewport.cardHeight;
      canvas.width = cardViewport.cardWidth;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: cardViewport,
      };
      const renderTask = page.render(renderContext);

      await renderTask.promise;
    };

    if (src && canvasRef.current) {
      renderCard();
    }
  });

  return (discarded) || (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'auto 16px auto',
        marginBottom: '1rem',
        justifyItems: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'inline-block',
          width: `${cardWidth * 1.5}cm`,
          height: `${cardHeight * 1.5}cm`,
          gridColumn: '1/-1',
          gridRow: '1/3',
        }}
      />
      <button
        type="button"
        className="button"
        style={{
          width: '64px',
          height: '64px',
          padding: '.5rem',
          borderRadius: '50%',
          gridColumn: '1/2',
          gridRow: '2/4',
          boxShadow: '0 0 5px 0 black',
        }}
        onClick={() => { setVisible((previousState) => (!previousState)); }}
      >
        <img
          src={visible ? './hide.svg' : './show.svg'}
          alt={visible ? 'masquer' : 'afficher'}
        />
      </button>
      <button
        type="button"
        className="button"
        style={{
          width: '64px',
          height: '64px',
          padding: '.5rem',
          borderRadius: '50%',
          gridColumn: '2/3',
          gridRow: '2/4',
          boxShadow: '0 0 5px 0 black',
        }}
        onClick={() => { setDiscarded(true); }}
      >
        <img
          src="./trash.svg"
          alt="défausser"
        />
      </button>
    </div>
  );
}

export default Card;
