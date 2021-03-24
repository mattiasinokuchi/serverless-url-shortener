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
  <p>{urls ? urls.urls[0].original_url : 'Loading urls...'}</p>
</main>
