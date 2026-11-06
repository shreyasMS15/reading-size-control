/**
 * Connect a group of size radios to the text area it controls.
 * Add a storage key to remember the selection on this browser.
 */
export function mountReadingSize({ controls, content, storageKey }) {
  const choices = new Map(
    [...controls.querySelectorAll('input[type="radio"]')]
      .filter((radio) => !radio.disabled && /^\d+$/.test(radio.value))
      .filter((radio) => Number(radio.value) >= 100 && Number(radio.value) <= 200)
      .map((radio) => [radio.value, radio]),
  );
  const defaultChoice = [...choices.values()].find((radio) => radio.checked);
  if (!defaultChoice) {
    throw new Error("Mark a size option between 100 and 200 as checked.");
  }

  function readSize() {
    if (storageKey) {
      try {
        return localStorage.getItem(storageKey);
      } catch {
        // The control still works when the browser blocks storage.
      }
    }
    return null;
  }

  function applySize(radio) {
    radio.checked = true;
    content.style.setProperty("--reading-size", `${radio.value}%`);
  }

  function onChange(event) {
    const radio = choices.get(event.target.value);
    if (radio !== event.target || !radio.checked) return;
    applySize(radio);
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, radio.value);
      } catch {
        // Keep applying the current preference even if it cannot be saved.
      }
    }
  }

  applySize(choices.get(readSize()) ?? defaultChoice);
  controls.addEventListener("change", onChange);
  controls.hidden = false;

  return () => {
    controls.removeEventListener("change", onChange);
    controls.hidden = true;
    content.style.removeProperty("--reading-size");
  };
}
