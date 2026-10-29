import Link from "next/link";

import { ArticleBody } from "@/components/blog/article-body";
import {
  ArticleCta,
  ArticleMeta,
  BackLink,
  Chevron,
  CroppedImage,
  TableOfContents,
} from "@/components/blog/article-parts";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import {
  type BlogArticle,
  articleUrl,
  blogIntro,
  formatPublished,
  getHeadings,
  getReadingMinutes,
} from "@/lib/blog";

/**
 * The blog's layouts (the "typographic journal" direction).
 *
 * Index: numbered rows on a 12-column grid, divided by hairlines. Titles run
 * large, excerpts sit under them at a comfortable measure, and the topic and
 * status hang in a right-hand column. Only the first row carries an image, so
 * imagery marks the newest piece rather than decorating every entry.
 *
 * Article: the same grid. A metadata column (like the case-study pages' dl)
 * sits left of the title, and below it becomes a sticky contents list beside
 * the text. No lead image; the screenshot in the body is the only one, and it
 * extends past the text column into the margin.
 */

export function BlogIndex({ articles }: { articles: readonly BlogArticle[] }) {
  return (
    <>
      <Section spacing="none" aria-labelledby="blog-heading" className="pt-12 pb-10 md:pt-20 md:pb-16">
        <Container width="full" className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-2 lg:col-span-7">
            <SectionLabel>{blogIntro.label}</SectionLabel>
            <h1 id="blog-heading" className="text-display font-semibold text-foreground">
              {blogIntro.heading}
            </h1>
          </div>
          <p className="max-w-[44ch] text-lg leading-7 text-foreground/66 lg:col-span-4 lg:col-start-9">
            {blogIntro.description}
          </p>
        </Container>
      </Section>

      <Section spacing="none" aria-label="All articles">
        <Container width="full">
          {articles.length === 0 ? (
            <p className="border-t border-foreground/12 py-10 text-lg leading-7 text-foreground/66">
              The first articles are on their way.
            </p>
          ) : (
            <ol className="border-b border-foreground/12">
              {articles.map((article, i) => (
                <Reveal as="li" key={article.slug} className="border-t border-foreground/12">
                  <Link
                    href={articleUrl(article)}
                    className="group grid gap-x-6 gap-y-4 py-8 focus-visible:outline-offset-[-2px] md:py-10 lg:grid-cols-12"
                  >
                    <span
                      aria-hidden
                      className="font-mono text-sm text-foreground/50 transition-colors duration-200 group-hover:text-foreground lg:col-span-1"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col gap-3 lg:col-span-7">
                      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
                        {article.title}
                      </h2>
                      <p className="max-w-[56ch] text-base leading-6 text-foreground/66 md:text-lg md:leading-7">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
                      {i === 0 && article.image ? (
                        <CroppedImage
                          image={article.image}
                          decorative
                          priority
                          sizes="(min-width: 1024px) 30vw, 100vw"
                          className="aspect-[3/2] max-w-md lg:max-w-none"
                        />
                      ) : null}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <SectionLabel className="text-foreground/60">{article.topic}</SectionLabel>
                          <ArticleMeta article={article} showAuthor={false} />
                        </div>
                        <Chevron className="mt-0.5 text-foreground/50 group-hover:text-foreground" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ol>
          )}
        </Container>
      </Section>
    </>
  );
}

export function BlogPost({
  article,
  related,
}: {
  article: BlogArticle;
  related: readonly BlogArticle[];
}) {
  const headings = getHeadings(article);
  const minutes = getReadingMinutes(article);
  const meta = [
    ["Author", article.author.name],
    ["Topic", article.topic],
    ["Published", formatPublished(article)],
    ["Length", `${minutes} min read`],
  ];

  return (
    <article>
      <Container width="full" className="pt-10 md:pt-16">
        <BackLink href={"/blog"} />

        <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-x-6 md:mt-14">
          <div className="lg:col-span-8 lg:col-start-4 lg:row-start-1">
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-foreground">{article.title}</h1>
            <p className="mt-6 max-w-article text-xl leading-8 text-pretty text-foreground/66">
              {article.intro}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-foreground/12 pt-4 sm:grid-cols-4 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:grid-cols-1 lg:self-start">
            {meta.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="font-mono text-eyebrow font-medium text-foreground/60 uppercase">{label}</dt>
                <dd className="text-sm leading-5 text-foreground">
                  {label === "Published" && article.publishedAt ? (
                    <time dateTime={article.publishedAt}>{value}</time>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-12 grid gap-x-6 md:mt-16 lg:grid-cols-12">
          {headings.length > 0 ? (
            <div className="hidden lg:col-span-2 lg:col-start-1 lg:block">
              <TableOfContents headings={headings} title="Contents" className="sticky top-24" />
            </div>
          ) : null}
          <div className="min-w-0 lg:col-span-8 lg:col-start-4">
            <ArticleBody
              blocks={article.body}
              figureClassName="xl:-mr-40"
              wideTableClassName="xl:w-[calc(100%+10rem)]"
            />
            <ArticleCta article={article} className="mt-16 max-w-article" />
          </div>
        </div>
      </Container>

      {related.length > 0 ? (
        <Section spacing="none" aria-labelledby="related-heading" className="pt-20 md:pt-28">
          <Container width="full" className="grid gap-x-6 gap-y-6 lg:grid-cols-12">
            <SectionLabel as="h2" id="related-heading" className="text-foreground/60 lg:col-span-3">
              Further reading
            </SectionLabel>
            <ul className="border-b border-foreground/12 lg:col-span-8 lg:col-start-4">
              {related.map((a) => (
                <li key={a.slug} className="border-t border-foreground/12">
                  <Link
                    href={articleUrl(a)}
                    className="group flex items-start justify-between gap-6 py-6 focus-visible:outline-offset-[-2px]"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{a.title}</h3>
                      <p className="max-w-[56ch] text-base leading-6 text-foreground/66">{a.excerpt}</p>
                    </div>
                    <Chevron className="mt-1.5 text-foreground/50 group-hover:text-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </article>
  );
}
