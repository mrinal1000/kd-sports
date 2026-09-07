import { useState } from "react";
import {
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
  Navigation,
  Package,
  Phone,
  RotateCcw,
  Truck,
} from "lucide-react";
import { BUSINESS, PAGE_META, SHORT_ADDRESS } from "@/config/site";
import { Button, ButtonAnchor, Pending } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { PageHeader } from "@/components/PageHeader";

interface Fields {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY: Fields = { name: "", email: "", phone: "", subject: "", message: "" };

export function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  function validate(fields: Fields) {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email))
      next.email = "Enter a valid email address, for example name@example.com.";
    if (fields.phone && !/^[\d+\s()-]{7,20}$/.test(fields.phone))
      next.phone = "Enter a valid phone number, or leave it blank.";
    if (fields.subject.trim().length < 3) next.subject = "Please add a short subject.";
    if (fields.message.trim().length < 10) next.message = "Please write at least a sentence.";
    return next;
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true'] input, [data-invalid='true'] textarea");
      first?.focus();
      return;
    }
    // No backend: the form does not transmit anything. Rather than pretending
    // it did, it confirms locally and hands over a prefilled mail link, which
    // is a channel that genuinely works today.
    setSent(true);
  }

  const mailtoHref =
    "mailto:" +
    BUSINESS.contact.email +
    "?subject=" +
    encodeURIComponent(values.subject || "Enquiry — KD Sports") +
    "&body=" +
    encodeURIComponent(
      values.message +
        "\n\n—\n" +
        values.name +
        (values.phone ? "\n" + values.phone : "") +
        "\n" +
        values.email,
    );

  function field(key: keyof Fields) {
    return {
      value: values[key],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((current) => ({ ...current, [key]: event.target.value }));
        if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
      },
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": errors[key] ? key + "-error" : undefined,
      className:
        "h-12 w-full rounded-sm border bg-ink-900 px-4 text-white outline-none transition-colors placeholder:text-ink-600 focus:border-blaze-500 " +
        (errors[key] ? "border-err" : "border-ink-700"),
    };
  }

  return (
    <>
      <Seo {...PAGE_META.contact} />
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lede="Questions about stock, sizing or a team order — ask away."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="container-kd py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Details */}
          <div>
            <h2 className="headline mb-6 text-2xl text-white md:text-3xl">
              <span className="slash" aria-hidden="true" />
              KD Sports
            </h2>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="grid size-11 flex-none place-items-center rounded-sm bg-blaze-500/12 text-blaze-400">
                  <MapPin size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                    Location
                  </h3>
                  <p className="mt-1 text-sm text-ink-300">{SHORT_ADDRESS}</p>
                  <p className="mt-1 text-xs text-ink-500">
                    Street address: <Pending value={BUSINESS.address.street} />
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="grid size-11 flex-none place-items-center rounded-sm bg-blaze-500/12 text-blaze-400">
                  <Phone size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">Phone</h3>
                  <a
                    href={BUSINESS.contact.phoneHref}
                    className="mt-1 block text-sm text-ink-300 hover:text-blaze-400"
                  >
                    {BUSINESS.contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="grid size-11 flex-none place-items-center rounded-sm bg-blaze-500/12 text-blaze-400">
                  <Mail size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">Email</h3>
                  <a
                    href={"mailto:" + BUSINESS.contact.email}
                    className="mt-1 block break-all text-sm text-ink-300 hover:text-blaze-400"
                  >
                    {BUSINESS.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="grid size-11 flex-none place-items-center rounded-sm bg-blaze-500/12 text-blaze-400">
                  <Instagram size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                    Instagram
                  </h3>
                  <a
                    href={BUSINESS.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-ink-300 hover:text-blaze-400"
                  >
                    {BUSINESS.social.instagramHandle}
                  </a>
                </div>
              </li>
            </ul>

            {/* The shop on the map, at the coordinates the owner supplied.
               *
               * Keyless Google Maps embed, so there is no API key to leak or
               * bill. It is lazy-loaded: it is well below the fold and pulls
               * a few hundred KB from Google, which should not sit in the
               * critical path of a page whose job is the contact form. */}
            <div className="mt-8">
              <div className="overflow-hidden rounded-sm border border-ink-800 bg-ink-900">
                <iframe
                  src={BUSINESS.map.embed}
                  title={`Map showing ${BUSINESS.name} in ${BUSINESS.address.locality}`}
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full border-0"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <ButtonAnchor
                  variant="outline"
                  size="sm"
                  href={BUSINESS.map.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation size={15} /> Get directions
                </ButtonAnchor>
                <ButtonAnchor
                  variant="ghost"
                  size="sm"
                  href={BUSINESS.map.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={15} /> Open in Google Maps
                </ButtonAnchor>
              </div>
            </div>

            {/* Shipping / returns / FAQ anchors referenced from the footer. */}
            <div className="mt-10 space-y-4">
              <PolicyBlock
                id="shipping"
                icon={<Truck size={18} />}
                title="Shipping"
                body="Delivery options and charges are confirmed when you place an order. Policy to be supplied by KD Sports."
              />
              <PolicyBlock
                id="returns"
                icon={<RotateCcw size={18} />}
                title="Returns"
                body="Return and exchange terms are still to be confirmed. Nothing is claimed here that has not been agreed."
              />
              <PolicyBlock
                id="faq"
                icon={<Package size={18} />}
                title="Team &amp; bulk orders"
                body="Club kit, academy orders and custom team wear — email with quantities and we will come back with options."
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="border border-ink-800 bg-ink-900 p-6 md:p-8">
              <h2 className="headline mb-2 text-2xl text-white">Send a message</h2>
              <p className="mb-6 text-sm text-ink-400">
                Fields marked <span className="text-blaze-400">*</span> are required.
              </p>

              {sent ? (
                <div role="status" className="py-6 text-center">
                  <CheckCircle2 size={44} className="mx-auto mb-4 text-ok" aria-hidden="true" />
                  <h3 className="headline text-xl text-white">Message ready</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-300">
                    This site has no server, so nothing was sent automatically — that would be a
                    message nobody receives. Your details are packaged into an email below; send it
                    and it reaches KD Sports directly.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <ButtonAnchor href={mailtoHref}>
                      <Mail size={16} /> Open the email
                    </ButtonAnchor>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setValues(EMPTY);
                        setSent(false);
                      }}
                    >
                      Write another
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div data-invalid={Boolean(errors.name)}>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white">
                        Name <span className="text-blaze-400">*</span>
                      </label>
                      <input id="name" type="text" autoComplete="name" {...field("name")} />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs font-semibold text-err">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div data-invalid={Boolean(errors.phone)}>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white">
                        Phone
                      </label>
                      <input id="phone" type="tel" autoComplete="tel" {...field("phone")} />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-xs font-semibold text-err">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div data-invalid={Boolean(errors.email)}>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white">
                      Email <span className="text-blaze-400">*</span>
                    </label>
                    <input id="email" type="email" autoComplete="email" {...field("email")} />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs font-semibold text-err">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div data-invalid={Boolean(errors.subject)}>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-white">
                      Subject <span className="text-blaze-400">*</span>
                    </label>
                    <input id="subject" type="text" {...field("subject")} />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs font-semibold text-err">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div data-invalid={Boolean(errors.message)}>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-white">
                      Message <span className="text-blaze-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...field("message")}
                      className={
                        "w-full rounded-sm border bg-ink-900 p-4 text-white outline-none transition-colors placeholder:text-ink-600 focus:border-blaze-500 " +
                        (errors.message ? "border-err" : "border-ink-700")
                      }
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs font-semibold text-err">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send message
                  </Button>

                  <p className="text-xs leading-relaxed text-ink-500">
                    This form has no server behind it yet. On submit it builds an email for you to
                    send, so your message actually reaches someone.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PolicyBlock({
  id,
  icon,
  title,
  body,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div id={id} className="scroll-mt-28 border border-ink-800 bg-ink-900 p-5">
      <h3 className="mb-1.5 flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wide text-white">
        <span className="text-blaze-400" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-400">{body}</p>
    </div>
  );
}

export default Contact;
