// Static content for the informational pages linked from the footer.
//
// Each page has:
//   title    - page heading
//   updated  - "last reviewed" date shown under the heading
//   intro    - short lede paragraph
//   sections - list of { heading, body: [paragraphs], list?: [items] }
//
// Body text is plain; it is rendered as paragraphs in order.

export const CONTACT_EMAIL = 'hello@booksonline.example'
export const SITE_NAME = 'BooksOnline'
export const LAST_UPDATED = '23 October 2026'

export const pages = {
  about: {
    title: 'About BooksOnline',
    updated: LAST_UPDATED,
    intro:
      'BooksOnline is a small, hand-checked directory of UK shops that sell storybooks and novels. We do not sell books ourselves — we help you find the right shop and go straight there.',
    sections: [
      {
        heading: 'Why we built it',
        body: [
          'Searching for a specific edition usually means opening a dozen tabs, comparing shipping notes and guessing which sites actually hold stock. We wanted one page that answers a simpler question: where can I buy this book?',
          'The list stays deliberately short. Every store is checked by hand for a working catalogue, real delivery options and a clear returns policy, so you spend less time filtering out dead ends.',
        ],
      },
      {
        heading: 'How stores get listed',
        body: [
          'We currently list UK shops only, each linked to its UK storefront. A shop is added when it meets three conditions: it sells physical or digital storybooks and novels, it delivers in the UK and publishes clear pricing and delivery information, and we can reach a human about broken links or complaints.',
          'We do not accept payment for a higher position in the list. Ordering inside a genre is alphabetical, not promotional.',
        ],
      },
      {
        heading: 'Editorial independence',
        body: [
          'Some outbound links may earn a small commission if you buy something. That never changes which stores are included, how they are described, or where they appear. Details are on our affiliate disclosure page.',
        ],
      },
      {
        heading: 'What we are not',
        body: [
          'We are not a retailer, publisher or payment processor. Orders, delivery, refunds and customer service belong entirely to the shop you buy from.',
        ],
      },
    ],
  },

  contact: {
    title: 'Contact us',
    updated: LAST_UPDATED,
    intro:
      'Suggest a store, report a broken link, or ask about the directory. Real replies come from a real person.',
    sections: [
      {
        heading: 'Before you write',
        body: [
          'If a link is dead, mention the store name and the page you were on — that is usually enough for us to fix it within a few days.',
        ],
      },
      {
        heading: 'Response times',
        body: [
          'Messages are read on weekdays. Expect a reply within two to three working days, sooner for anything urgent such as a store that has closed down.',
        ],
        list: [
          'General questions and suggestions — 2 to 3 working days',
          'Broken or hijacked links — usually under 48 hours',
          'Corrections to a store description — 1 week',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms & conditions',
    updated: LAST_UPDATED,
    intro:
      'These terms govern your use of BooksOnline. By browsing this site you agree to them. If you do not agree, please stop using the site.',
    sections: [
      {
        heading: '1. What this service is',
        body: [
          'BooksOnline is an informational directory. We publish descriptions of and links to third-party websites that sell books. We are not a party to any transaction you make with those sites.',
        ],
      },
      {
        heading: '2. Use of the site',
        body: [
          'You may browse, search and share links to this site freely. You agree not to:',
        ],
        list: [
          'scrape or republish the directory in bulk without written permission;',
          'attempt to disrupt or overload the site or its hosting;',
          'use the site for unlawful purposes or to mislead others.',
        ],
      },
      {
        heading: '3. Third-party stores',
        body: [
          'Prices, availability, delivery estimates, returns policies and product descriptions shown on linked stores are set by those stores and can change without notice. Your contract of sale is with them, not with us.',
          'We check listings when we add them, but we cannot guarantee that every store is trading, that every URL remains correct, or that a shop behaves well in every case.',
        ],
      },
      {
        heading: '4. Accuracy of information',
        body: [
          'Descriptions are written in good faith and reviewed periodically. Even so, the directory is provided "as is" without warranties of any kind, express or implied, including fitness for a particular purpose.',
        ],
      },
      {
        heading: '5. Limitation of liability',
        body: [
          'To the fullest extent permitted by law, BooksOnline is not liable for any indirect or consequential loss arising from your use of the site or from any purchase you make at a third-party store, including lost orders, delivery delays or payment disputes.',
        ],
      },
      {
        heading: '6. Intellectual property',
        body: [
          'The layout, written descriptions and original design of this site belong to BooksOnline. Store names, logos and trademarks belong to their respective owners and are used only to identify the shops being linked to.',
        ],
      },
      {
        heading: '7. Suggestions you send us',
        body: [
          'If you suggest a store or send us a correction, you confirm the information is accurate to your knowledge, and you allow us to use it when maintaining the directory. We may edit submissions for clarity.',
        ],
      },
      {
        heading: '8. Changes to these terms',
        body: [
          'We may update these terms as the site evolves. The "last reviewed" date above always shows the current version, and continued use after a change means you accept it.',
        ],
      },
      {
        heading: '9. Governing law',
        body: [
          'These terms are governed by the laws of the jurisdiction in which BooksOnline is operated, without regard to conflict-of-law rules. Nothing here removes rights you have as a consumer under local law.',
        ],
      },
      {
        heading: '10. Getting in touch',
        body: [
          `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy policy',
    updated: LAST_UPDATED,
    intro:
      'This site is built to need as little data as possible. There are no accounts, no checkout, and no advertising trackers.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'Search terms and genre filters are held only in your browser while the page is open. They are not sent to a server, and they disappear when you close the tab.',
        ],
        list: [
          'No account, email or payment details are required to browse.',
          'No advertising or cross-site tracking pixels are used.',
          'Filter state is kept in memory only; we do not use localStorage or cookies for profiling.',
        ],
      },
      {
        heading: 'Server logs',
        body: [
          'Like nearly every website, the hosting provider may record standard technical logs — IP address, browser type, requested page and timestamp — to keep the service running and to detect abuse. These are retained for a short period and are not used to profile visitors.',
        ],
      },
      {
        heading: 'Messages you send',
        body: [
          'If you email us or use the contact form, we receive your name, email address and message. We keep that correspondence only as long as needed to answer you and to fix whatever you reported.',
        ],
      },
      {
        heading: 'Third-party sites',
        body: [
          'Clicking through to a store takes you to a site we do not control. Once you leave BooksOnline, that store\'s own privacy policy and cookie rules apply. We encourage you to read them, particularly before creating an account.',
        ],
      },
      {
        heading: 'Store logos',
        body: [
          'Store icons are requested from a public favicon service, which means that service can see your IP address when the image loads. If you would rather avoid that, your browser\'s image-blocking settings will simply show the letter fallback instead.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'The directory is suitable for all ages and is not directed at collecting information from children. We do not knowingly hold personal data about anyone under 13.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `You can ask what correspondence we hold about you, request a correction, or ask us to delete it by writing to ${CONTACT_EMAIL}. We will respond within 30 days.`,
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If this policy changes materially — for example if analytics or a newsletter provider is added — the change will be described here and the review date updated.',
        ],
      },
    ],
  },

  disclaimer: {
    title: 'Disclaimer',
    updated: LAST_UPDATED,
    intro:
      'BooksOnline is a directory, not a shop, adviser or authority on any title.',
    sections: [
      {
        heading: 'No commercial relationship',
        body: [
          'We do not process orders, take payment, hold stock or handle deliveries. Any issue with an order must be raised with the store you bought from.',
        ],
      },
      {
        heading: 'Prices and availability',
        body: [
          'Any price, edition or stock detail mentioned on this site is accurate only as of the date a listing was last checked. Always confirm on the store\'s own product page before buying.',
        ],
      },
      {
        heading: 'External content',
        body: [
          'We are not responsible for the content, security or practices of linked websites, including reviews, user comments or recommendations published there.',
        ],
      },
      {
        heading: 'No professional advice',
        body: [
          'Descriptions of stores and genres are editorial opinion, not legal, financial or consumer-rights advice.',
        ],
      },
    ],
  },

  affiliate: {
    title: 'Affiliate disclosure',
    updated: LAST_UPDATED,
    intro:
      'Some links on this site may earn us a small commission. Here is exactly what that means, and what it does not.',
    sections: [
      {
        heading: 'How it works',
        body: [
          'If a link carries an affiliate tag and you buy a book after following it, the store may pay us a percentage of that sale. The price you pay is unchanged — the commission comes out of the store\'s margin, not your pocket.',
        ],
      },
      {
        heading: 'What it never affects',
        body: [
          'Commission has no influence on which stores are listed, the order they appear in, or what we write about them. Stores that pay nothing are listed exactly like stores that do.',
        ],
        list: [
          'Inclusion is based on the checks described on our About page.',
          'Ordering within a genre is alphabetical.',
          'Critical notes about a store are never removed for commercial reasons.',
        ],
      },
      {
        heading: 'Links without a tag',
        body: [
          'Many links are plain, untagged links. We do not add affiliate tags to every store, and we do not hide which is which.',
        ],
      },
      {
        heading: 'Questions',
        body: [
          `If anything about this is unclear, ask us at ${CONTACT_EMAIL} and we will explain a specific link.`,
        ],
      },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    updated: LAST_UPDATED,
    intro: 'Short answers to the things people ask most.',
    sections: [
      {
        heading: 'Does BooksOnline sell books?',
        body: [
          'No. We list shops that do. Every "Visit store" button opens that shop in a new tab, where the actual purchase happens.',
        ],
      },
      {
        heading: 'Is using the site free?',
        body: [
          'Yes, completely. There is no account, no subscription and no paywall. Some outbound links may be affiliate links, which is described in the affiliate disclosure.',
        ],
      },
      {
        heading: 'How do I suggest a store?',
        body: [
          'Send the store name, its URL and a sentence about what it specialises in using the contact page. We add a few shops each month rather than trying to list everything.',
        ],
      },
      {
        heading: 'A link is broken — what now?',
        body: [
          'Tell us the store name and we will check it. Broken links are usually fixed or removed within 48 hours.',
        ],
      },
      {
        heading: 'How often is the list reviewed?',
        body: [
          'Every listing is re-checked periodically, and the whole directory is reviewed at least twice a year. The review date appears on each policy page.',
        ],
      },
      {
        heading: 'Do you list shops outside the UK?',
        body: [
          'No — every shop in the directory is UK-based or has a UK storefront, and every link opens that UK storefront. Delivery beyond the UK is decided by each store; the region line on the card says where a shop is based and, where known, whether it ships further afield.',
        ],
      },
    ],
  },
}

export const pageOrder = [
  'about',
  'contact',
  'faq',
  'terms',
  'privacy',
  'disclaimer',
  'affiliate',
]
