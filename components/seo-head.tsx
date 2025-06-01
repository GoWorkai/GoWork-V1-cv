import Head from "next/head"

export function SEOHead() {
  return (
    <Head>
      <title>GoWork: La Red Social del Talento y las Oportunidades Humanas</title>
      <meta
        name="description"
        content="Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti."
      />
      <meta
        name="keywords"
        content="red social del talento, oportunidades humanas, habilidades, ingresos, servicios locales, freelance, GoWork, trabajo independiente, comunidad profesional"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://gowork.com/" />
      <meta property="og:title" content="GoWork: La Red Social del Talento y las Oportunidades Humanas" />
      <meta
        property="og:description"
        content="Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti."
      />
      <meta property="og:image" content="https://gowork.com/images/gowork-og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://gowork.com/" />
      <meta property="twitter:title" content="GoWork: La Red Social del Talento y las Oportunidades Humanas" />
      <meta
        property="twitter:description"
        content="Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti."
      />
      <meta property="twitter:image" content="https://gowork.com/images/gowork-og-image.jpg" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="author" content="GoWork" />
      <link rel="canonical" href="https://gowork.com/" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GoWork",
            description: "La Red Social del Talento y las Oportunidades Humanas",
            url: "https://gowork.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://gowork.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </Head>
  )
}
