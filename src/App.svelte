<script>
  import { onMount } from "svelte";
  let url;
  let new_url;

  async function submit() {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({ url: url }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      new_url = await response.json();
    } catch (err) {
      console.error(err);
    }
  }
</script>

<main>
  <h1>URL shortener</h1>
  <form on:submit|preventDefault={submit}>
    <label for="url_input">URL to be shortened</label>
    <input
      id="url_input"
      type="text"
      bind:value={url}
      name="url"
      placeholder="https://8-b.site"
    />
    <input type="submit" value="POST URL" />
  </form>

  {#if new_url}
  <p>
    <a href="https://serverless-url-shortener.vercel.app/id/{new_url[0].short_url}">https://serverless-url-shortener.vercel.app/id/{new_url[0].short_url}</a>
    now redirects to 
    <a href="{url}">{url}</a>
  </p>
  {/if}
</main>
