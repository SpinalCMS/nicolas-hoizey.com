---
date: 2022-01-26 12:49:33 +00:00
title: Trailing Slashes on URLs: Contentious or Settled?
lang: en
link: https://www.zachleat.com/web/trailing-slash/
authors:
  - name: "Zach Leatherman"
    twitter: "zachleat"
    site: "https://www.zachleat.com"
tags: [Eleventy, URL]
---

I have mixed feelings about URLs without an extension (`.html` for example) or a trailing slash. It certainly comes mostly from 25 years of unexpected behaviors with HTTP servers and other Web plumbering.

When there's none of these at the end of the URL, I don't know what it "is", it's disturbing. 

I like how URL termination helps infer what the page type is:
- There's a trailing slash? It's a folder, there are other contents "inside"/"below" it.
- There's an `.html` extension? It's a page, a "leaf" in the site content "tree".

I disagree with Zach on the "Cool URIs Don’t Change" impact on extensions in URLs. Do we really think Web pages will use anything else than HTML in the future? I would agree for other extensions though, even if [a good redictions strategy can help]({% link_to "identify-which-apache-rewrite-rules-are-used" %}).

But on the server side, if I have an article with some illustrations or other content attached (CSS for [this example]({% link_to "jamstack-is-fast-only-if-you-make-it-so" %})), I like to keep these in a single place, which is naturaly a folder, and URLs to load/show these other contents should be relative to the main content one. I wan't to avoid the "Asset References" problem Zach lists in his article. Which leads to URLs with trailing slashes as the best URLs for contents, instead of an `.html` extension, as my guts would promote. Struggling with myself…

So be it, content URLs as folders, and so trailing slashes everywhere… 🤷‍♂️

I like then that an `index.html` file shows the content of a folder by convention[^opquast204].

[^opquast204]: Remember that [you should never let the web server list the actual files present in the folder on the file system](https://checklists.opquast.com/en/web-quality-assurance/the-server-does-not-list-files-in-folders-that-do-not-have-index-files)![^opquast]

[^opquast]: By the way, make sure you read, understand and apply as much as possible Opquast's [Web Quality Assurance Checklist](https://checklists.opquast.com/en/web-quality-assurance/).

Now that this is decided, it's important to know how our toolschain helps or prevent it.

From the tools I use nowadays for multiple sites:
- [Eleventy](https://11ty.dev) helps, as it is the default behavior, and you can define your own permalinks behavior as you want, as I did with [a single option in Pack11ty](https://pack11ty.dev/documentation/collections/#permalinks), my Eleventy project template. 👍
- [Netlify](https://netlify.com) has an optional "Pretty URLs" feature in [post build asset optimizations](https://docs.netlify.com/site-deploys/post-processing/), I really thank them for making it optional. 👍
- [Cloudflare](https://cloudflare.com) on the other hand does it [by default without any way to disable it](https://developers.cloudflare.com/pages/platform/serving-pages#route-matching), I hate that. 😡

