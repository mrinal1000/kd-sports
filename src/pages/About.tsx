import { ArrowRight, Handshake, Instagram, MapPin, ShieldCheck, Target, Users } from "lucide-react";
import { BUSINESS, IMAGES, PAGE_META, SHORT_ADDRESS } from "@/config/site";
import { ButtonAnchor, ButtonLink, Pending, Reveal } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { PageHeader } from "@/components/PageHeader";
import { CATEGORIES } from "@/data/categories";

/**
 * About.
 *
 * Everything on this page is either taken from the GST certificate or is a
 * statement of intent that does not require evidence. Deliberately absent:
 * years in business, customer numbers, awards, brand partnerships and
 * "authorised dealer" claims — none of which were provided, and any of which
 * would be a fabrication about a real business.
 */
export function About() {
  return (
    <>
      <Seo {...PAGE_META.about} />
      <PageHeader
        eyebrow="About"
        title={
          <>
            More than equipment.
            <br />
            <span className="text-blaze-500">It&rsquo;s the game we live for.</span>
          </>
        }
        crumbs={[{ label: "About" }]}
      />

      <div className="container-kd py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden bg-ink-850">
              <img
                src={IMAGES.about}
                alt="Inside KD Sports in Kharar — the counter, with batting gloves and kit on the shelves behind"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="headline text-3xl text-white md:text-4xl">
              <span className="slash" aria-hidden="true" />
              A cricket store in Kharar
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-300">
              <p>
                KD Sports is a cricket store in Kharar, in SAS Nagar district, Punjab. Bats,
                batting and keeping gloves, protection, balls, shoes and kit bags — for club
                sides, academies and individual players.
              </p>
              <p>
                The business is founded and run by{" "}
                <strong className="text-white">{BUSINESS.proprietor}</strong> as a proprietorship.
                That matters more than it sounds: the person selecting the stock is the person who
                answers the phone, so there is nobody to pass you to when something is not right.
              </p>
              <p>
                What we care about is straightforward — that the gear performs, that the price is
                fair, and that someone who buys a bat here comes back for their pads.
              </p>
            </div>

            <dl className="mt-9 grid gap-5 border-t border-ink-800 pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-display text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-500">
                  Proprietor
                </dt>
                <dd className="mt-1 font-semibold text-white">{BUSINESS.proprietor}</dd>
              </div>
              <div>
                <dt className="font-display text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-500">
                  Business type
                </dt>
                <dd className="mt-1 font-semibold text-white">{BUSINESS.constitution}</dd>
              </div>
              <div>
                <dt className="font-display text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-500">
                  Based in
                </dt>
                <dd className="mt-1 font-semibold text-white">
                  {BUSINESS.address.locality}, {BUSINESS.address.state}
                </dd>
              </div>
              <div>
                <dt className="font-display text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-500">
                  Registered
                </dt>
                <dd className="mt-1 font-semibold text-white">GST registered business</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* What we stand for */}
        <section className="mt-20 md:mt-28" aria-labelledby="values">
          <h2 id="values" className="headline mb-10 text-3xl text-white md:text-4xl">
            <span className="slash" aria-hidden="true" />
            What we stand for
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Target size={22} strokeWidth={1.6} />,
                title: "Performance",
                body: "Gear is chosen for how it behaves under match conditions, not how it photographs.",
              },
              {
                icon: <ShieldCheck size={22} strokeWidth={1.6} />,
                title: "Quality",
                body: "Equipment that lasts a season and beyond, so a purchase does not become a recurring cost.",
              },
              {
                icon: <Users size={22} strokeWidth={1.6} />,
                title: "The local game",
                body: "Serving cricketers, clubs and academies across Kharar, Mohali and the wider Punjab.",
              },
              {
                icon: <Handshake size={22} strokeWidth={1.6} />,
                title: "Trust",
                body: "Straight answers about what suits you — including when the cheaper option is the right one.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="h-full border border-ink-800 bg-ink-900 p-6">
                  <span className="mb-4 grid size-11 place-items-center rounded-sm bg-blaze-500/12 text-blaze-400">
                    {item.icon}
                  </span>
                  <h3 className="headline mb-2 text-lg text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-300">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Behind the counter
           *
           * Real photographs of the shop and the people in it, supplied by the
           * owner. For an independent retailer this does more work than any
           * amount of copy: it answers "is this a real shop with real stock"
           * in one glance. The gear on the shelves behind them is the same
           * gear listed in the catalogue. */}
        <section className="mt-20 md:mt-28" aria-labelledby="counter">
          <h2 id="counter" className="headline mb-6 text-3xl text-white md:text-4xl">
            <span className="slash" aria-hidden="true" />
            Behind the counter
          </h2>
          <p className="mb-8 max-w-2xl text-ink-300">
            The shop in Kharar, and the people you will actually deal with when you walk in or
            send a message.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <figure className="h-full">
                <div className="overflow-hidden rounded-sm ring-1 ring-ink-800">
                  <img
                    src={IMAGES.store.team}
                    alt="Two KD Sports staff inside the shop, holding a KD Sports bat and batting gloves, with kit bags and gloves on the shelves behind"
                    width={1400}
                    height={1050}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-400">
                  Inside the shop &mdash; a KD Sports bat and batting gloves, with the kit bag and
                  glove range on the wall behind.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={90}>
              <figure className="h-full">
                <div className="overflow-hidden rounded-sm ring-1 ring-ink-800">
                  <img
                    src={IMAGES.store.counter}
                    alt={`${BUSINESS.proprietor} at the KD Sports counter, beneath the shop sign`}
                    width={900}
                    height={1600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover md:aspect-auto md:h-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-400">
                  {BUSINESS.proprietor} at the counter, under the KD Sports sign.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* What we stock */}
        <section className="mt-20 md:mt-28" aria-labelledby="stock">
          <h2 id="stock" className="headline mb-6 text-3xl text-white md:text-4xl">
            <span className="slash" aria-hidden="true" />
            What we stock
          </h2>
          <p className="mb-8 max-w-2xl text-ink-300">
            Six cricket ranges, each with the sub-ranges players actually ask for.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <div key={category.slug} className="border border-ink-800 bg-ink-900 p-5">
                <h3 className="headline mb-3 text-lg text-white">{category.name}</h3>
                <ul className="space-y-1.5 text-sm text-ink-400">
                  {category.subcategories.slice(0, 5).map((sub) => (
                    <li key={sub.slug}>{sub.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-500">
            Bats and gloves are real stock. The other ranges are placeholders until real products arrive — see the note on the Categories page.
          </p>
        </section>

        {/* Visit / contact */}
        <section className="mt-20 border border-ink-800 bg-ink-900 p-8 md:mt-28 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="headline text-2xl text-white md:text-3xl">Talk to us directly</h2>
              <p className="mt-3 max-w-md text-ink-300">
                Questions about fit, sizing or a team order are answered fastest by a person. Email
                or Instagram both reach us.
              </p>
              <p className="mt-5 flex items-start gap-2.5 text-sm text-ink-300">
                <MapPin size={17} className="mt-0.5 flex-none text-blaze-400" aria-hidden="true" />
                {SHORT_ADDRESS}
              </p>
              <p className="mt-2 text-sm text-ink-400">
                Opening hours: <Pending value={BUSINESS.contact.hours} />
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <ButtonLink to="/contact" size="lg">
                Contact page <ArrowRight size={16} />
              </ButtonLink>
              <ButtonAnchor
                variant="outline"
                size="lg"
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={17} /> {BUSINESS.social.instagramHandle}
              </ButtonAnchor>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
