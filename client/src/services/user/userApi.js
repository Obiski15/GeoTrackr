const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/user`;

export async function getUser() {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function updateUser({ username, image }) {
  const formData = new FormData();

  formData.append("username", username);

  if (image) {
    formData.append("image", image);
  }

  const res = await fetch(BASE_URL, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
