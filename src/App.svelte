<script>
  import { fade } from "svelte/transition";
  let url;
  let text;
  let new_url;

  async function submit() {
    try {
      text = "Please wait...";
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({ url: url }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      new_url = await response.json();
      text = `<a href="https://serverless-url-shortener.vercel.app/id/`
        + new_url[0].short_url
        + `">https://serverless-url-shortener.vercel.app/id/`
        + new_url[0].short_url
        + `</a> now redirects to <a href=`
        + url
        + `>`
        + url
        + `</a>`;
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
      type="text"
      bind:value={url}
      name="url"
      placeholder="https://8-b.site"
    />
    <input type="submit" value="POST URL" />
  </form>

  {#if text}
    <p transition:fade>{@html text}</p>
  {/if}
</main>
