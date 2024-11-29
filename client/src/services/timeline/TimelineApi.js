const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/timeline`;

export async function getTimeline() {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function deleteTiimeline(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) throw result;

  return null;
}

export async function addToTimeline(value) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...value }),
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
