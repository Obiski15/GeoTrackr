export async function getTimeline() {
  try {
    const res = await fetch("http://localhost:9000/timeline");

    if (!res.ok) throw new Error("An error occured trying to fetch timeline");

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new error(error);
  }
}

export async function deleteTiimeline(id) {
  try {
    const res = await fetch(`http://localhost:9000/timeline/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Unable to delete timeline. Pls try again");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function createTimeline(value) {
  try {
    const res = await fetch("http://localhost:9000/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });

    if (!res.ok) throw new Error("Unable to delete timeline. Pls try again");

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
