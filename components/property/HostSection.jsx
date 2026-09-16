import React from "react";
import Image from "next/image";
import { Star, Medal, ShieldCheck } from "lucide-react";

export function HostSection({ property }) {
  const { host } = property;

  return (
    <section className="py-10 border-b border-airbnb-borderLight" aria-labelledby="host-profile-heading">
      {/* Host Card Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-airbnb-border relative">
              <Image
                src={host.avatar}
                alt={host.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow-sm">
              <Medal className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <h2 id="host-profile-heading" className="text-[22px] font-semibold text-airbnb-charcoal leading-tight">
              Hosted by {host.name}
            </h2>
            <p className="text-sm text-airbnb-muted mt-0.5">
              Joined in {host.joinedDate} · {host.yearsHosting} years hosting
            </p>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-6 text-sm text-airbnb-charcoal">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-current text-airbnb-charcoal" />
            <span className="font-semibold">{host.reviewsCount} Reviews</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-airbnb-charcoal" />
            <span className="font-semibold">Identity verified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Medal className="w-4 h-4 text-[#FF385C]" />
            <span className="font-semibold">Superhost</span>
          </div>
        </div>
      </div>

      {/* Host Bio and Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-airbnb-charcoal">
        <div className="space-y-4">
          <p className="leading-relaxed whitespace-pre-line text-airbnb-charcoal">
            {host.bio}
          </p>

          {host.coHosts && (
            <div className="pt-2 text-sm text-airbnb-muted">
              <span className="font-semibold text-airbnb-charcoal">Co-hosts: </span>
              {host.coHosts.join(", ")}
            </div>
          )}
        </div>

        <div className="space-y-4 bg-airbnb-bgLight p-6 rounded-2xl border border-airbnb-borderLight">
          <h3 className="font-semibold text-base text-airbnb-charcoal">
            Host details
          </h3>
          <ul className="space-y-2 text-sm text-airbnb-charcoal">
            <li>
              Response rate: <span className="font-semibold">{host.responseRate}</span>
            </li>
            <li>
              Response time: <span className="font-semibold">{host.responseTime}</span>
            </li>
          </ul>

          <div className="pt-3">
            <button
              type="button"
              className="border border-airbnb-charcoal font-semibold text-sm text-airbnb-charcoal px-6 py-3 rounded-lg hover:bg-white transition shadow-xs focus-visible:ring-2 focus-visible:ring-black"
            >
              Contact host
            </button>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-airbnb-border text-xs text-airbnb-muted">
            <ShieldCheck className="w-5 h-5 text-[#FF385C] flex-shrink-0" />
            <span>
              To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
