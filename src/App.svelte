<script>
  import { onMount } from "svelte";
  let urls;

  onMount(async () => {
    const res = await fetch("/api/read");
    urls = await res.json();
  });
</script>

<main>
  <h1>URL shortener</h1>
  <form action="api/create" method="post">
    <label for="url_input">URL to be shortened</label>
    <input
      id="url_input"
      type="text"
      name="url"
      placeholder="https://8-b.site"
    />
    <input type="submit" value="POST URL" />
  </form>

  {#if urls}
    <h2>Previously shortened URLs</h2>
    {#each urls.reverse() as { href, short_url }}
      <p>{href} ===> serverless-url-shortener.vercel.app/id/{short_url}</p>
    {/each}
  {/if}
</main>
