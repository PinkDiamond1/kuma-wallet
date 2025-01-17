export const ACCOUNT_PATH = `m/44'/60'/0'/0/0`;

export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const PRIVATE_KEY_OR_SEED_REGEX =
  /^(0x)?[0-9a-fA-F]{64}|^([a-zA-Z]+ )+[a-zA-Z]+$/;

export const LANGUAGES = [
  { lang: "en", name: "English", englishName: "English", flag: "🇺🇸" },
  { lang: "es", name: "Español", englishName: "Spanish", flag: "🇪🇸" },
  { lang: "jp", name: "日本語", englishName: "Japanese", flag: "🇯🇵" },
  { lang: "it", name: "Italiano", englishName: "Italian", flag: "🇮🇹" },
];

const env = import.meta.env;

export enum aboutUsLinks {
  kuma = env.VITE_ABOUT_KUMA || "#",
  discord = env.VITE_ABOUT_DISCORD || "#",
  github = env.VITE_ABOUT_GITHUB || "#",
  twitter = env.VITE_ABOUT_TWITTER || "#",
  telegram = env.VITE_ABOUT_TELEGRAM || "#",
  blockcoders = env.VITE_ABOUT_BLOCKCODERS || "#",
}

export enum issuesLinks {
  github = env.VITE_ISSUES_GITHUB || "#",
  discord = env.VITE_ISSUES_DISCORD || "#",
}
