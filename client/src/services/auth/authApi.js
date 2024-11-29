const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/user`;

export async function signup(data) {
  const formData = new FormData();

  Object.keys(data)
    .filter((key) => key !== "image")
    .forEach((key) => {
      formData.append(key, data[key]);
    });

  if (data.image) {
    formData.append("image", data["image"]);
  }

  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function resetPassword({ resetToken, password, confirmPassword }) {
  const res = await fetch(`${BASE_URL}/reset-password/${resetToken}`, {
    method: "PATCH",
    body: JSON.stringify({ password, confirmPassword }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function logout() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;
}
