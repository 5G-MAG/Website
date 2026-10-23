# Search and AI discoverability

What makes the site findable, and what keeps it up to date. Nothing here is edited by hand except where it says so.

## Built on every build (nothing to do)

| What | Where | Made from |
| --- | --- | --- |
| Page titles and descriptions | each page's front matter or `description` prop | the pages; `src/theme/DocItem/Metadata` adds the project to generic titles ("Tutorials: ...") |
| Sitemap | `/sitemap.xml` | the built pages (the 404 and search pages are left out) |
| Page index for AI assistants | `/llms-full.txt`, `/pages.json` | the built HTML (`src/plugins/seo-index.mjs`) |
| Short AI index and project map | `/llms.txt`, `/ai-context.json` | the taxonomy, GitHub metadata and releases (`scripts/build-ai-registry.js`) |
| Structured data | Organization and WebSite (every page); SoftwareSourceCode (project pages); BlogPosting (news) | the taxonomy and `static/data/repo-metadata.json` |

## Refreshed daily by GitHub Actions (nothing to do)

`scripts/fetch-repo-metadata.js` reads description, licence, language, topics, private or public and last push of every repository, and lists the repositories that no project of the taxonomy lists (`untracked`) and the `public` flags that no longer match GitHub (`drift`). The site follows GitHub where it has an entry: a repository made public stops showing "Early Access" by itself.

After every deploy `scripts/indexnow.js` tells Bing, Yandex and the other IndexNow engines which pages exist. The key file is `static/<key>.txt`; do not delete it.

## Done once by a person (Google does not take IndexNow)

1. Google Search Console: add the property `https://www.5g-mag.com` (domain property through DNS is best), then submit `https://www.5g-mag.com/sitemap.xml`.
2. Bing Webmaster Tools: import the site from Search Console and submit the same sitemap.
3. Look at "Pages" and "Enhancements" in both after a week: they list any page that cannot be indexed.

## Wording

The association is **The Media Connectivity Association** (short form 5G-MAG). It does not only work on 5G: say so in titles and descriptions. Its software is the **Media Connectivity Software Accelerator**. Page titles end with "| The Media Connectivity Association".
