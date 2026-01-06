async function fetchWithRetry(url, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries === 0) {
      console.error("Request failed after retries");
      throw error;
    }

    console.log(`Retrying in ${delay}ms... (${retries} left)`);
    await new Promise(resolve => setTimeout(resolve, delay));

    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}

fetchWithRetry("https://jsonplaceholder.typicode.com/posts/1")
  .then(data => console.log(data))
  .catch(err => console.error("Final Error:", err.message));
