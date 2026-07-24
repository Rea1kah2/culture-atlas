// Language context for the UI-chrome switcher. SSR-safe by construction: the
// provider ALWAYS renders DEFAULT_LANG ("en") on the server and on the first
// client render, so the hydrated markup matches the server HTML (no hydration
// mismatch). A post-mount effect then reads the persisted preference (cookie,
// falling back to localStorage) and switches - a full page reload in Indonesian
// shows English for one frame, which is acceptable for interface strings and
// never happens during client-side navigation.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_LANG, messages, type Lang } from "./messages";

const COOKIE_KEY = "ca_lang";
const ONE_YEAR = 60 * 60 * 24 * 365;

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang | null {
  if (typeof document === "undefined") return null;
  const fromCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_KEY}=`))
    ?.split("=")[1];
  if (fromCookie === "en" || fromCookie === "id") return fromCookie;
  try {
    const fromStorage = window.localStorage.getItem(COOKIE_KEY);
    if (fromStorage === "en" || fromStorage === "id") return fromStorage;
  } catch {
    // localStorage can throw in privacy modes - ignore and fall through.
  }
  return null;
}

function persistLang(lang: Lang) {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
    try {
      window.localStorage.setItem(COOKIE_KEY, lang);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = lang;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Adopt the persisted preference after mount (see file header for why this
  // can't happen during the first render without risking a hydration mismatch).
  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== DEFAULT_LANG) {
      setLangState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persistLang(next);
  }, []);

  const t = useCallback(
    (key: string) => messages[lang][key] ?? messages[DEFAULT_LANG][key] ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

// Convenience hook when a component only needs the translator.
export function useT(): (key: string) => string {
  return useLanguage().t;
}
