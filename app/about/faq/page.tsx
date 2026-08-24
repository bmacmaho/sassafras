"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"
import { FEATURE_FLAGS } from "@/lib/feature-flags"

type FaqItem = { question: string; answer: ReactNode }

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Sassafras Initiative?",
    answer: (
      <p>
        Sassafras is an experimental publication platform dedicated to highlighting creative and critical
        thought. We seek to expand the terrain of intellectual discourse by platforming ideas and formats that
        are typically shut out from traditional academic circles—such as personal essays, artworks, multimedia
        pieces, etc—and create a space where these various types of works can further color our understanding of
        theory, culture, and engagement with the world around us.
      </p>
    ),
  },
  {
    question: "Are Sassafras’s issues free?",
    answer: (
      <p>
        Yes, everything that we publish online is free for everyone to view. We aim to make critical curiosity
        and diverse forms of knowledge-sharing more accessible—both to potential contributors and to the public
        audience. In the future, we hope to also offer physical printed copies of our issues for a small fee for
        interested persons, but digital versions will continue to remain online for free.
      </p>
    ),
  },
  {
    question: "What are the submission requirements?",
    answer: (
      <>
        <p>
          We welcome submissions of various mediums/formats and from anyone around the world, regardless of
          educational background or level, so long as your piece is an original work, relates to the theme of the
          issue, and, at this time, is understandable to English speakers (for written works). Institutional
          affiliations are not necessary, and submissions with shared authorship/multiple collaborators are also
          welcome. We look for pieces that are thought-provoking, in alignment with our ethics, and give voice to
          underrepresented peoples and ideas, especially with consideration for decolonial thought and
          intersectional feminist values. We prefer previously unpublished works, but previously published works
          will still be considered provided that you have the rights or permission to repost.
        </p>
        <p>
          First, we ask that you share your ‘pitch’ via the form on the ‘Submissions’ page. Briefly explain the
          idea of your work and tell us what connection it has to a given issue’s theme. From the pitches we
          receive, we try to curate a selection of diverse and unique contributions to the issue’s theme, both in
          terms of content and format. Selected pitches will receive a ‘conditional acceptance’, meaning that we
          are very likely to publish your final product so long as it complies with the expectations set by your
          pitch, our ethical guidelines, our timelines, and our quality standards. If we feel that there is a
          place in this issue for your perspective, we will offer a conditional acceptance and invite you to
          submit your full work. From there, you will work with our editing team to prepare your piece for
          publication.
        </p>
      </>
    ),
  },
  {
    question: "How long does the submission process take?",
    answer: (
      <>
        <p>
          We currently publish two issues per year, meaning we spend roughly six months preparing each issue. The
          open call period typically spans around one month. Those who submit a ‘pitch’ will receive an email with
          the specific dates and details for the given issue’s timeline.
        </p>
        <p>
          Once granted a conditional acceptance, contributors will then have around 4-6 weeks to share their full
          piece. Once you have shared a completed draft with us, our editing team will provide feedback and
          propose revisions as necessary. From there, the revision period may last up to another 6 weeks,
          depending on the needs of the individual piece and contributor’s availability.
        </p>
        <p>
          We will try to be accommodating of your needs and work together on a realistic timeline to finalize your
          piece. Ultimately, the final draft must be ready at least 6 weeks before the given issue’s publication
          date. This is necessary to allow our team time to design and format the upcoming issue and code the
          website accordingly.
        </p>
      </>
    ),
  },
  {
    question: "Do contributors get paid for their publications?",
    answer: (
      <>
        <p>No– unfortunately, we are not able to pay our contributors.</p>
        <p>
          We understand that this is a larger problem in the landscape of academic publishing, and we take issue
          with publishing schemes that ask authors to pay out-of-pocket to publish their own work while
          simultaneously placing said publications behind paywalls for audiences.
        </p>
        <p>
          Though we cannot offer direct financial compensation at this time, we are providing a free platform for
          your work, alongside the unpaid labor from our team in content creation, editing services, outreach, and
          website design.
        </p>
      </>
    ),
  },
  {
    question: "What are your ethical guidelines?",
    answer: (
      <div className="space-y-5">
        <div>
          <p className="font-semibold">Accessibility</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              How accessible is the issue?
              <ul className="list-[circle] pl-6 space-y-1">
                <li>Always available for free online</li>
                <li>Eventual print versions will incur a small fee</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">AI</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Transparency in case of use</li>
            <li>
              Acceptable use of AI
              <ul className="list-[circle] pl-6 space-y-1">
                <li>Supportive: grammar/spelling checks, assistance with translation, formatting, etc.</li>
              </ul>
            </li>
            <li>
              Non-acceptable use of AI
              <ul className="list-[circle] pl-6 space-y-1">
                <li>Generative AI: image/audio/text creation</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Inclusivity</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              What do we accept?
              <ul className="list-[circle] pl-6 space-y-1">
                <li>No barriers in terms of discrimination, sexual orientation, background, language, etc.</li>
                <li>No parameters set on education level, disciplinary background, or institutional affiliations</li>
                <li>For now, we are an English-medium publication platform, but we accept translated works</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Privacy</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Consent
              <ul className="list-[circle] pl-6 space-y-1">
                <li>From contributor(s), to publish their piece, promote on social media, etc.</li>
                <li>From any party included in the piece (name, image, quotes, etc.)</li>
              </ul>
            </li>
            <li>
              Your information
              <ul className="list-[circle] pl-6 space-y-1">
                <li>Choice to publish under your full name, first name, pseudonym, or anonymously</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Red lines</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Intolerance and discrimination: racism, homophobia, misogyny, islamophobia, casteism, etc.—
              protection of marginalized identities
            </li>
            <li>Defamation</li>
            <li>Far-right/Nazi ideology</li>
            <li>
              Misinformation/disinformation: claims must be supported by reputable sources, citations/hyperlinks
              must be made clear, no pseudoscientific or conspiratorial claims; editing team will fact-check
            </li>
            <li>
              Authorship
              <ul className="list-[circle] pl-6 space-y-1">
                <li>Plagiarism</li>
                <li>Collaborative work</li>
                <li>AI</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: "I’d like to get in touch with one of your contributors. How do I reach out to them?",
    answer: (
      <p>
        Reach out to us at [insert email ID here] and, where a contributor has agreed to be contacted, we will do
        our best to pass your message along.
      </p>
    ),
  },
  {
    question: "I’m interested in supporting Sassafras. Can I make a donation or sponsor your work?",
    answer: (
      <p>
        We are always happy to receive public support! Currently, Sassafras is in the process of registering as a
        Verein (non-profit organization). If you are interested in sponsoring our work in some capacity, please
        get in touch: [insert email ID here].
      </p>
    ),
  },
  {
    question: "I’d like to collaborate with Sassafras in some capacity. Is your organization open to this?",
    answer: (
      <p>
        Yes, we are very interested in collaborations with like-minded organizations, researchers, or artists.
        This could include collaborating on a publication, co-hosting an event, social media promotion, or other
        ideas you may have. We invite interested parties to share your collaborative ideas with us via our email:
        [insert email ID here].
      </p>
    ),
  },
  {
    question:
      "I’ve published a piece with you already and I want to change or remove part or all of my work. What should I do?",
    answer: (
      <p>
        Please contact us at [insert email ID here] if you’d like to request any changes or removals
        post-publication. We ask you to thoroughly explain the reasons and urgency behind your request. We will
        evaluate requests on a case-by-case basis and make every attempt to respond promptly as needed. For very
        serious and/or time-sensitive cases, please indicate ‘URGENT’ in the email subject line.
      </p>
    ),
  },
  {
    question: "How can I contact Sassafras for comments, questions, requests, ideas to share, etc.?",
    answer: (
      <p>
        We welcome all kinds of feedback and would love to hear from you! You can email us at [insert email ID
        here], or you can engage with us via comments or DMs on our Instagram account.
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
