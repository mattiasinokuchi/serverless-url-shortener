<script>
  import { onMount } from "svelte";
  let urls;

  onMount(async () => {
    const res = await fetch("/api/read");
    urls = await res.json();
    console.log(urls);
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
      placeholder="https://www.freecodecamp.org"
    />
    <input type="submit" value="POST URL" />
  </form>

  {#if urls}
    {#each urls as { original_url, short_url }}
      <p>{original_url} = .vercel.app/{short_url}</p>
    {/each}
  {/if}
</main>
