import React, {
  useState,
} from 'react';

import Deck from './components/Deck';
import Story from './components/Story';

import './App.css';

const stories = [{
  name: 'Tutoriel',
  image: 'https://static.wixstatic.com/media/59baa2_081be07951c34ce28996bebe7cfa86ec~mv2.png/v1/fill/w_173,h_158,al_c,q_85,usm_0.66_1.00_0.01/mouse.webp',
  url: 'https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_5dbfd556434846bf8754ca4116101f37.pdf',
  deckSize: 10,
}, {
  name: 'La 5è avenue',
  image: 'https://static.wixstatic.com/media/59baa2_8bc2d8990f864c7aa65bdcc294674dd1~mv2_d_2000_2828_s_2.png/v1/fill/w_209,h_295,al_c,q_85,usm_0.66_1.00_0.01/CoverArt_5Avenue.webp',
  url: 'https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_b414561726024995b66b03ecef774c8b.pdf',
  deckSize: 27,
}, /* {
  name: 'Le donjon de Doo-Arann',
  image: 'https://static.wixstatic.com/media/59baa2_05b28f37bcbc434ca47ce6ab7baf1508~mv2_d_2480_3508_s_4_2.png/v1/fill/w_211,h_295,al_c,q_85,usm_0.66_1.00_0.01/CoverArt_Unlock_DooAraan.webp',
  url: 'https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_d7f24d940eea4cfa89b7400dfb581459.pdf',
  deckSize: 24,
}, */ {
  name: 'L\'élite',
  image: 'https://static.wixstatic.com/media/59baa2_fc82f6175d0a49d69f7755f8aedec7fd~mv2.jpg/v1/fill/w_210,h_322,al_c,q_80,usm_0.66_1.00_0.01/Cover_Demo.webp',
  url: 'https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_fcba9236512e4b2b912e26150ca01264.pdf',
  deckSize: 20,
}, /* {
  name: 'À la poursuite de Cabrakan',
  image: 'https://static.wixstatic.com/media/59baa2_ec89ebe3425b4ffab33d0cd3e836df58~mv2_d_3508_5393_s_4_2.jpg/v1/fill/w_211,h_322,al_c,q_80,usm_0.66_1.00_0.01/CoverArt_Cabrakan.webp',
  url: 'https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_ec1d34bb0fe246069dd7dc12ebf8697d.pdf',
  deckSize: 24,
}, */ {
  name: 'Le temple de RA',
  image: 'https://static.wixstatic.com/media/59baa2_9d2e29d0b0474af68a5be337d5a0b914~mv2_d_2304_3543_s_2.png/v1/fill/w_208,h_322,al_c,q_85,usm_0.66_1.00_0.01/CoverArt_Temple%20de%20RA.webp',
  url: 'https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_164fbfd3e76b4dbcb46282074693f098.pdf',
  deckSize: 24,
}];

function App() {
  const [wantedStory, setWantedStory] = useState(null);
  const [playerCount, setPlayerCount] = useState(1);
  const [playerId, setPlayerId] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        {
          wantedStory == null
            ? (
              <>
                <h1
                  style={{
                    gridColumn: '1/-1',
                  }}
                >
                  Unlock! (don&apos;t) Print and Play
                </h1>
                <p
                  style={{
                    gridColumn: '1/-1',
                  }}
                >
                  Envie de profiter des&nbsp;
                  <a href="https://www.spacecowboys.fr/unlock-demos">
                    démos Unlock!
                  </a>
                  , mais pas d&apos;imprimante sous la main ?
                  <br />
                  Ce site vous permet de vous échapper en ligne.
                </p>
                <form
                  action="#"
                  style={{
                    gridColumn: '1/-1',
                    fontSize: '1rem',
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      marginBottom: '1rem',
                    }}
                  >
                    option multi-joueur : partagez les cartes entre plusieurs ordis
                  </strong>
                  <div
                    style={{
                      marginBottom: '1rem',
                    }}
                  >
                    <label
                      htmlFor="playerCount"
                      style={{
                        marginRight: '1rem',
                      }}
                    >
                      Nombre de joueurs :
                    </label>
                    <input
                      id="playerCount"
                      name="playerCount"
                      type="number"
                      value={playerCount}
                      onChange={(event) => { setPlayerCount(event.target.value); }}
                      min="1"
                      max="6"
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: '1rem',
                    }}
                  >
                    <label
                      htmlFor="playerId"
                      style={{
                        marginRight: '1rem',
                      }}
                    >
                      Vous êtes le joueur :
                    </label>
                    <input
                      id="playerId"
                      name="playerId"
                      type="number"
                      value={playerId}
                      onChange={(event) => { setPlayerId(event.target.value); }}
                      min="1"
                      max={playerCount}
                    />
                  </div>
                </form>
                {React.Children.toArray(stories.map((story) => (
                  <Story data={story} callback={() => setWantedStory(story)} />
                )))}
              </>
            )
            : (
              <>
                <div
                  style={{
                    gridColumn: '1/-1',
                  }}
                >
                  <button
                    type="button"
                    className="link"
                    onClick={() => setWantedStory(null)}
                  >
                    Accueil
                  </button>
                </div>
                <Deck playerId={playerId} playerCount={playerCount} story={wantedStory} />
              </>
            )
        }
      </header>
    </div>
  );
}

export default App;
