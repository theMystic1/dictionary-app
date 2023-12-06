import * as model from './model.js';
import view from './view.js';

const controlFontsWindow = function () {
  view.toggleWindow();
};

const controlSearchResult = async function (word) {
  try {
    word = view.getQuery();

    // console.log(word);
    if (!word) return;

    view.renderSpinner();

    await model.getWord(word);
    // console.log(await model.getWord(word));

    view.renderApp();
    // view.renderFooter(model.state.result);
    view.renderword(model.state.result);
    view.renderDefinition(model.state.result);
    view.renderSynonyms(model.state.result);
    view.renderVerbMeanings(model.state.result);
    view.renderPartOfSpeech(model.state.result);
    view.renderPartOfSpeech2(model.state.result);
  } catch (error) {
    // throw Error(error);
    // console.error(`${error} 💥💥💥`);
    view.renderError();
  }

  // console.log(data);
};

const controlAudio = async function (word) {
  try {
    // await model.getWord(word);

    view.getAudioFile(model.state.result);
  } catch (error) {
    throw error;
  }
};

const init = function () {
  view.toggleDarkMode();
  view.toggleFontWindow(controlFontsWindow);
  view.addEventFonts();
  view.addEventHandler(controlSearchResult);
  view.playAudio(controlAudio);
};
init();
