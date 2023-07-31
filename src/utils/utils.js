// functie pentru fetch ca sa imi ia url,method si sa imi intoarca data
// sa nu trebuiasca sa rescriu codul de fiecare data, ci doar sa apelex functia
export async function request(url, method, data) {
  let headers = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body data type must match "Content-Type" header
  };

  if (method !== "GET") {
    headers.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, headers);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
