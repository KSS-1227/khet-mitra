import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: 'AI Agriculture Portal',
        cta: 'Get Started',
        detect: 'Detect Disease',
        weather: 'Weather',
        market: 'Marketplace',
        chat: 'Assistant',
        dashboard: 'Dashboard',
        register: 'Register',
        profile: 'Profile',
      },
      landing: {
        h1: 'Grow smarter with AI',
        sub: 'Detect crop diseases, get weather advice, and trade locally — in your language.',
        choose_language: 'Choose your language',
      },
      detect: {
        title: 'AI Disease Detection',
        upload: 'Upload from gallery',
        capture: 'Capture photo',
        describe: 'Or describe symptoms',
        placeholder: 'e.g., brown spots on leaves, yellowing edges, wilting',
        speak: 'Speak',
        stop: 'Stop',
        analyze: 'Analyze',
        result: 'Result',
        confidence: 'confidence',
        recommendation: 'Recommended',
        recommendationText: 'Fungicide ABC, consult local supplier.',
        diseases: { leaf_blight: 'Leaf Blight' },
        takePhoto: 'Take photo',
      },
      common: { cancel: 'Cancel' },
    },
  },
  hi: {
    translation: {
      app: {
        title: 'एआई कृषि पोर्टल',
        cta: 'शुरू करें',
        detect: 'रोग पहचान',
        weather: 'मौसम',
        market: 'बाज़ार',
        chat: 'सहायक',
        dashboard: 'डैशबोर्ड',
        register: 'पंजीकरण',
        profile: 'प्रोफ़ाइल',
      },
      landing: {
        h1: 'एआई के साथ समझदारी से बढ़ें',
        sub: 'फसल रोग पहचानें, मौसम सलाह पाएं और अपनी भाषा में स्थानीय व्यापार करें।',
        choose_language: 'अपनी भाषा चुनें',
      },
      detect: {
        title: 'एआई रोग पहचान',
        upload: 'गैलरी से अपलोड करें',
        capture: 'फ़ोटो कैप्चर करें',
        describe: 'या लक्षण बताएँ',
        placeholder: 'जैसे पत्तियों पर भूरे धब्बे, पीले किनारे, मुरझाना',
        speak: 'बोलें',
        stop: 'रोकें',
        analyze: 'विश्लेषण करें',
        result: 'परिणाम',
        confidence: 'विश्वास',
        recommendation: 'सुझाव',
        recommendationText: 'फंजीसाइड ABC, स्थानीय आपूर्तिकर्ता से संपर्क करें।',
        diseases: { leaf_blight: 'लीफ ब्लाइट' },
        takePhoto: 'फोटो लें',
      },
      common: { cancel: 'रद्द करें' },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;