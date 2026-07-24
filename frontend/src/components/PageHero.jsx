import React from "react";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Btn";

export const PageHero = ({ kicker, title, sub, image }) => (
  <section className="relative pt-[72px]">
    {image && (
      <div className="absolute inset-0 overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/25 via-foreground/55 to-foreground/70" />
      </div>
    )}
    <div className={`relative max-w-[1400px] mx-auto px-5 lg:px-10 ${image ? "py-28 lg:py-40 text-background" : "py-20 lg:py-28"}`}>
      <Reveal><Kicker className={image ? "!text-accent" : ""}>{kicker}</Kicker></Reveal>
      <Reveal delay={0.1}>
        <h1 className={`mt-5 font-display font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl leading-[0.9] ${image ? "text-background" : ""}`}>
          {title}
        </h1>
      </Reveal>
      {sub && (
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-2xl text-base lg:text-lg font-light leading-relaxed ${image ? "text-background/75" : "text-muted-foreground"}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  </section>
);
