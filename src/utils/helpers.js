export async function shareFile(data) {
  function canShareData(data) {
    if (!navigator.canShare || !navigator.share) return false;
    return data;
  }

  if (canShareData(data))
    try {
      await navigator.share(data);
    } catch (error) {
      throw new Error(error.message);
    }
}

export function getLocale() {
  return (
    new Intl.NumberFormat().resolvedOptions().locale ||
    ((navigator.languages !== undefined || navigator.languages.length > 0) &&
      navigator.languages[0]) ||
    navigator.language
  );
}

export function getCountryFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function formatDateAndTime(date) {
  return new Intl.DateTimeFormat(getLocale(), {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(getLocale(), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
