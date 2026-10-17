"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"
import { FEATURE_FLAGS } from "@/lib/feature-flags"

type FaqItem = { question: string; answer: ReactNode }

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Are Sassafras’s issues free?",
    answer: (
      <p>
        Yes, Sassafras’ digital publications are free for everyone to view. No ads. No subscription paywalls. We
        aim to make critical curiosity and diverse forms of knowledge-sharing as accessible as possible. In the
        future, we do intend to make physical copies of our issues available for sale, but digital versions will
        continue to remain free.
      </p>
    ),
  },
  {
    question: "What are the submission requirements?",
    answer: (
      <p>
        Sassafras welcomes submissions of various mediums/formats and from anyone around the world, regardless of
        educational background or level. Submissions must be original work, relate to the theme of the issue,
        and, at this time, be understandable to English speakers or include an English translation (for written
        works). Institutional affiliations are not necessary, and submissions with shared authorship/multiple
        collaborators are also welcome. We look for pieces that are thought-provoking, in alignment with our
        ethics, and feature perspectives rooted in critical decolonial thought and intersectional feminist
        values. We prefer unpublished works, but previously published works will still be considered provided
        that you can provide written confirmation that you have the rights/permission to republish on other
        platforms.
      </p>
    ),
  },
  {
    question: "How does the submission/selection process work?",
    answer: (
      <p>
        At this time, we only accept submissions in response to issue-specific calls for submissions. Firstly, we
        ask that you share your ‘pitch’ via the form on the ‘Submissions’ page. Pitches should briefly explain the
        idea of your work and tell us what connection it has to a given issue’s theme. From the pitches we
        receive, we try to put together a selection of diverse and unique contributions that, in terms of content
        and format, speak to the topic and to each other. Selected pitches will receive a ‘conditional
        acceptance’, meaning that we are likely to publish your final product so long as it complies with the
        expectations set by your pitch, our ethical guidelines, our timeline, and our quality standards.
      </p>
    ),
  },
  {
    question: "How long does the submission process take?",
    answer: (
      <>
        <p>
          We currently publish 2 issues per year, meaning we spend roughly 6 months preparing each issue. The open
          call period typically spans around 1 month. Those who submit a ‘pitch’ will receive an email with the
          specific dates and details for the given issue’s timeline.
        </p>
        <p>
          Once granted a conditional acceptance, contributors will then have around 4-6 weeks to share their first
          full draft. Once you have shared a completed draft with us, our editing team will provide feedback and
          propose revisions as necessary. From there, you will have another 6-8 weeks to finalise your piece with
          support from our editing team.
        </p>
        <p>
          We will try to be accommodating of our contributor’s needs and work together on a realistic timeline to
          finalize your piece. Ultimately, the final piece must be ready at least 6 weeks before the given issue’s
          publication date. This is necessary to allow our team time to design and format the upcoming issue and
          code the website accordingly.
        </p>
      </>
    ),
  },
  {
    question: "Do contributors get paid for their publications?",
    answer: <p>No—unfortunately, we are not able to pay our contributors at this time.</p>,
  },
  {
    question: "I’d like to get in touch with one of your contributors. How do I reach out to them?",
    answer: (
      <p>
        Contributors have the option to include their social media handles and/or emails, in which case their
        contact information can be found next to their names on the article/in their contributor bios. Otherwise,
        please send your request to contact the contributor to us directly at sassafrasinitiative@gmail.com. For
        privacy reasons, we cannot pass out contact details, however we can pass on your email and then it is up
        to them if they wish to respond or not.
      </p>
    ),
  },
  {
    question: "I’m interested in supporting Sassafras. Can I make a donation or sponsor your work?",
    answer: (
      <p>
        We are always grateful to receive financial support. If you are interested in sponsoring our work in some
        capacity, please get in touch: sassafrasinitiative@gmail.com. Sassafras’ members work on a volunteer basis
        and are in the process of registering as a Verein (non-profit organization). Until then, donations are
        not tax-deductible.
      </p>
    ),
  },
  {
    question: "I’d like to collaborate with Sassafras in some capacity. Is your collective open to this?",
    answer: (
      <>
        <p>
          Yes! We are very interested in all kinds of collaborations, including collaborating on a publication,
          co-hosting an event, doing a workshop, or other ideas you may have. Feel free to reach out with your
          idea via email at sassafrasinitiative@gmail.com.
        </p>
        <p>
          We also welcome volunteers who are interested in assisting us with our behind-the-scenes operations.
          Focus areas include editing, design, social media, and web development. If you’d like to lend a helping
          hand in one of these areas, please get in touch.
        </p>
      </>
    ),
  },
  {
    question: "How can I contact Sassafras for comments, questions, requests, ideas to share, etc.?",
    answer: (
      <p>
        We welcome all kinds of feedback and would love to hear from you! You can email us at
        sassafrasinitiative@gmail.com, or you can engage with us via comments or DMs on our Instagram account.
      </p>
    ),
  },
]

export default function FaqPage() {
  if (!FEATURE_FLAGS.faq) notFound()

  const { darkMode: dm } = useHeaderScrolled()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    document.body.style.transition = "background-color 500ms ease"
    document.body.style.backgroundColor = dm ? "#000" : "#fcfaf2"
    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.transition = ""
    }
  }, [dm])

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <div
      className={`min-h-screen font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32 transition-colors duration-300 ${dm ? "bg-black text-white" : "bg-[#fcfaf2] text-[#222]"}`}
    >
      <div className="relative z-10 pl-24 pr-8 md:pr-16 pt-12 pb-16">
        {/* Full-width accordion — same row/border treatment as the Our Team list. */}
        <div className={`w-full border-2 ${dm ? "border-white" : "border-black"}`}>
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i
            return (
              <div
                key={i}
                className={i > 0 ? `border-t-2 ${dm ? "border-white" : "border-black"}` : ""}
              >
                <button
                  className={`w-full flex items-start gap-4 pl-4 pr-3 py-3 text-left transition-colors duration-200 ${open ? (dm ? "bg-white/10" : "bg-[#f0efe7]") : (dm ? "hover:bg-white/10" : "hover:bg-[#f0efe7]")}`}
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                >
                  <span className={`flex-1 font-alte-haas text-lg md:text-xl tracking-[0.03em] ${dm ? "text-white" : "text-[#222]"}`}>
                    {item.question}
                  </span>
                  <span
                    className="flex-shrink-0 font-alte-haas text-2xl leading-none mt-0.5 transition-transform duration-300"
                    style={{ color: "#5D9800", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`border-t-2 px-4 py-4 text-base md:text-lg leading-relaxed space-y-4 ${dm ? "border-white bg-white/5 text-white/85" : "border-black bg-[#FBFAF1] text-[#444]"}`}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomLeftSlot>
        <Link
          href="/about"
          className="font-alte-haas text-sm tracking-[0.1em] transition-opacity hover:opacity-60"
          style={{ color: "#5D9800" }}
        >
          {"< "}
          <span className="underline underline-offset-2">Our Team</span>
        </Link>
      </BottomLeftSlot>
    </div>
  )
}
