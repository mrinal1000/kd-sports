import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { BUSINESS, FOOTER_NAV, IMAGES, SHORT_ADDRESS } from "@/config/site";
import { Pending } from "./ui/primitives";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="container-kd py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={IMAGES.logo} alt="KD Sports" width={200} height={64} className="h-11 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              A cricket store in Kharar, Punjab. Bats, gloves, protection and kit for club and
              academy players. Run by {BUSINESS.proprietor}.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-start gap-2.5 text-ink-300">
                <MapPin size={16} className="mt-0.5 flex-none text-blaze-400" aria-hidden="true" />
                <span>{SHORT_ADDRESS}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 flex-none text-blaze-400" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.contact.email}`} className="text-ink-300 hover:text-white">
                  {BUSINESS.contact.email}
                </a>
              </p>
              <p className="flex items-start gap-2.5 text-ink-300">
                <span className="mt-0.5 flex-none text-blaze-400" aria-hidden="true">
                  <Instagram size={16} />
                </span>
                <a
                  href={BUSINESS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {BUSINESS.social.instagramHandle}
                </a>
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KD Sports on Instagram"
                className="grid size-11 place-items-center rounded-sm border border-ink-700 text-ink-200 transition-colors hover:border-blaze-500 hover:bg-blaze-500 hover:text-white"
              >
                <Instagram size={19} />
              </a>
              <a
                href={`mailto:${BUSINESS.contact.email}`}
                aria-label="Email KD Sports"
                className="grid size-11 place-items-center rounded-sm border border-ink-700 text-ink-200 transition-colors hover:border-blaze-500 hover:bg-blaze-500 hover:text-white"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" links={FOOTER_NAV.shop} />
          <FooterColumn title="Company" links={FOOTER_NAV.company} />
          <FooterColumn title="Support" links={FOOTER_NAV.support} />
        </div>

        {/* Business information — required for a registered business, kept
            deliberately quiet. Not a selling point, so it does not compete
            with anything above it. */}
        <div className="mt-14 border-t border-ink-800 pt-8">
          <h2 className="mb-3 font-display text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-500">
            Business information
          </h2>
          <div className="flex flex-col gap-1 text-xs text-ink-500 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <p>
              {BUSINESS.legalName} · {BUSINESS.constitution}
            </p>
            <p>Proprietor: {BUSINESS.proprietor}</p>
            <p>
              GSTIN: <span className="font-mono tracking-wide">{BUSINESS.gstin}</span>
            </p>
            <p>
              {BUSINESS.address.locality}, {BUSINESS.address.state} — {BUSINESS.address.pin}
            </p>
          </div>
          <p className="mt-3 text-xs text-ink-600">
            Phone: <Pending value={BUSINESS.contact.phone} />
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink-800 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} KD SPORTS. All rights reserved.</p>
          <p>Kharar, SAS Nagar, Punjab, India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; to: string; external?: boolean }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
        {title}
      </h2>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-300 transition-colors hover:text-blaze-400"
              >
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className="text-sm text-ink-300 transition-colors hover:text-blaze-400">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
