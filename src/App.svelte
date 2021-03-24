<script>
  import { onMount } from "svelte";
  let urls;

  onMount(async () => {
    const res = await fetch("/api/users");
    urls = await res.json();
    console.log(urls);
  });
</script>

<main>
  <h1>URL shortener</h1>
  <form action="api/new" method="post">
    <label for="url_input">URL to be shortened</label>
    <input id="url_input" type="text" name="url" placeholder="https://www.freecodecamp.org">
    <input type="submit" value="POST URL">
  </form>
  <p>{urls ? urls.urls[urls.urls.length-1].original_url : 'Loading urls...'}</p>
</main>
