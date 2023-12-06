import image from '../images/Oval.svg';
import windIcon from '../images/icon-new-window.svg';
import play from '../images/icon-play.svg';
import spinner from '../images/spinner-svgrepo-com.svg';

class View {
  _parentEl;
  _bodyEl;
  themeContainer = document.querySelector('.head-span');
  _data;
  _inputEl = document.querySelector('.form__field');
  _errMsg = `Sorry pal, we couldn't find definitions for the word you were
  looking for you can try the search again at later time or head to
  the web instead.`;

  toggleDarkMode() {
    this.themeContainer.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('.toggle--mode');
      const body = document.querySelector('body');
      if (!toggleBtn) return;
      toggleBtn.querySelector('.moon--norm').classList.toggle('hidden');
      toggleBtn.querySelector('.moon--active_dark').classList.toggle('hidden');
      body.classList.toggle('dark-theme');
      toggleBtn.querySelector('.mode').classList.toggle('mode--active');
    });
  }

  toggleFontWindow(handler) {
    this._parentEl = document.querySelector('.head__span');
    this._parentEl.addEventListener('click', function (e) {
      const navBtn = e.target.closest('.font-selected');
      if (!navBtn) return;

      handler();
    });
  }

  toggleWindow() {
    document.querySelector('.fonts').classList.toggle('hidden');
  }

  addEventFonts() {
    const body = document.querySelector('body');

    this._parentEl = document.querySelector('.fonts');
    this._parentEl.addEventListener('click', function (e) {
      let fontName = document.querySelector('.sel-font-name');
      const curFont = event.target.closest('.font');

      if (!curFont) return;
      const font = curFont.dataset.tog;
      fontName.textContent = font;
      if (fontName.textContent === 'Sans Serif') {
        body.style.fontFamily = 'Inter';
        document.querySelector('.fonts').classList.add('hidden');
      }
      if (fontName.textContent === 'Mono') {
        body.style.fontFamily = 'Inconsolata';
        document.querySelector('.fonts').classList.add('hidden');
      }
      if (fontName.textContent === 'Serif') {
        body.style.fontFamily = 'Lora';
        document.querySelector('.fonts').classList.add('hidden');
      }
    });
  }

  getQuery() {
    const query = document.querySelector('.form__field').value;
    this.emptySrchErr(query);

    this.clear();

    return query;
  }

  emptySrchErr(data) {
    this._parentEl = document.querySelector('.error-mesg');
    if (data === '') {
      this._inputEl.style.border = '1px solid red';
      this._parentEl.style.display = 'block';
      return false;
    } else {
      this._parentEl.style.display = 'none';
      this._inputEl.style.border = 'none';
      return true;
    }
  }
  addEventHandler(handler) {
    document.querySelector('.form').addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
      // console.log(this.getSearchInput());
    });
  }

  renderApp() {
    const markUp = `
    <span class="searched-word-audio"> </span>

    <div class="speech-fig part--speech"></div>

    <article class="meaning__details">
      <div class="meaning--details">
        <p class="p_mean">Meaning</p>

        <ul class="meanings"></ul>
      </div>
    </article>

    <span class="synonyms"> </span>

    <div class="speech-fig fig--speech-2"></div>

    <article class="meaning__details meaning-synonym">
      <div class="meaning--details meaning--details-synonyms">
        <p class="p_mean">Meaning</p>

        <ul class="meanings verb-meanings"></ul>
      </div>
    </article>
    `;

    this.clear();
    this._parentEl = document.querySelector('.main--container');
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  clear() {
    document.querySelector('.main--container').innerHTML = '';
  }

  renderword = function (data) {
    this._data = data;
    const markUp = `
    <div class="srch-audio">
    <span class="word-pron">
      <p class="word">${this._data.word.toUpperCase()}</p>

      <span class="pronounciation"> ${
        this._data.phonetic ? this._data.phonetic : ''
      } </span>
    </span>

    <img
      src="${play}"
      alt=""
      class="audion-icon"
    />
    
  </div>


    
    `;

    this._parentEl = document.querySelector('.searched-word-audio');

    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  };

  getAudioFile(data) {
    const audio = data.phonetics.find(obj => obj.audio !== '') || '';
    const audioSound = audio?.audio || '';
    if (audioSound === '') return;
    const playAudio = new Audio(audioSound);
    playAudio.play();
  }
  playAudio(handler) {
    document
      .querySelector('.main--container')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.audion-icon');
        if (!btn) return;
        handler();
      });
  }

  renderPartOfSpeech(data) {
    this._data = data;

    const markUp = `
    <p class="fig-speech">${this._data.meanings[0].partOfSpeech}</p>
    <div class="line"></div>
    `;

    this._parentEl = document.querySelector('.part--speech');

    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  // renderPartOfSpeech(data[0]);
  renderPartOfSpeech2(data) {
    this._data = data;

    const markUp = `
    <p class="fig-speech">${
      this._data.meanings[1] ? this._data.meanings[1].partOfSpeech : ''
    }</p>
    <div class="line"></div>
    `;

    this._parentEl = document.querySelector('.fig--speech-2');
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  // renderPartOfSpeech2(data[0]);

  renderDefinition(data) {
    this._data = data;

    this._data.meanings[0].definitions.forEach(meaning => {
      const markUp = `
      
        <li class="meaning">
          <img src="${image}" alt="" />

          <p class="p">
            ${meaning.definition ? meaning.definition : ''}
          </p>
        </li>
      
      `;
      this._parentEl = document.querySelector('.meanings');
      this._parentEl.insertAdjacentHTML('afterbegin', markUp);
    });
  }
  // renderDefinition();

  renderSynonyms(data) {
    this._data = data;
    const markUp = `
  <p class="synonyms--word">synonyms</p>
  <p class="synonym-word-example">${
    this._data.meanings[0].synonyms[0] ? this._data.meanings[0].synonyms[0] : ''
  }</p>
  `;

    this._parentEl = document.querySelector('.synonyms');
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  // renderSynonyms(data[0]);

  findObjectWithProperty(array, property) {
    const foundObject = array.find(obj => obj.hasOwnProperty(property));

    // Check if an object with the specified property was found
    if (foundObject) {
      return foundObject[property];
    } else {
      return '';
    }
  }

  renderVerbMeanings(data) {
    const getLengthMeaning = data.meanings.length - 1;
    const markUp = `
        <li class="meaning">
          <img src="${image}" alt="" />
  
          <p class="p">
           ${this.findObjectWithProperty(
             data.meanings[0].definitions,
             'definition'
           )}
          </p>
        </li>
        <P class="p-example">
        ${this.findObjectWithProperty(
          data.meanings[getLengthMeaning].definitions,
          'example'
        )}
       </P>
  
  
       <span class="footer-det">
       <p class="p-example src">Source:</p>
  
       <span class="link-spn">
         <a href="${this._data.sourceUrls}" class="sc-link">
           ${
             // this._data.sourceUrls.map((src) => src).join(" ") ||
             this._data.sourceUrls[0]
           }
         </a>
         <img src="${windIcon}" alt="" />
       </span>
     </span>

     
    
     `;

    this._parentEl = document.querySelector('.verb-meanings');
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError() {
    const markUp = `
    <div class="error-container">
      <span class="emoji"> ☹️ </span>
      
      <h2 class="error-title">No Definitions Found</h2>
      
      <p class="error-message"> ${this._errMsg}</p>
    </div>  
    `;

    this.clear();
    document
      .querySelector('.main--container')
      .insertAdjacentHTML('afterbegin', markUp);
  }
  renderSpinner() {
    const markUp = `
      <div class="spinner">
          <img src="${spinner}" alt="" />
      </div>
    `;

    this._parentEl = document.querySelector('.main--container');
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
}

export default new View();
