import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import useIsMobile from '../lib/useIsMobile'
import { MobileGlassCard } from '../components/mobile/MobileUIComponents'

const sections = [
  {
    title: 'Introduction',
    content: `This Privacy Policy describes how Prarambh and its affiliates (collectively "Prarambh", "we", "our", "us") collect, use, share, protect or otherwise process your information/personal data through our website https://www.prarambhtheatre.com/ (hereinafter referred to as "Platform").

Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India.

By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy.

If you do not agree, please do not use or access our Platform.`,
  },
  {
    title: 'Information We Collect',
    content: `We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship. Some of the information that we may collect includes but is not limited to:`,
    points: [
      'Personal information provided during sign-up/registration such as name, date of birth, address, telephone/mobile number, email ID',
      'Information shared as proof of identity or address',
      'Payment information such as bank account or credit/debit card details (collected with your consent)',
      'Transaction information related to ticket bookings and donations',
      'Behavioural data, preferences, and other information you choose to provide on our Platform',
    ],
    footer: `You always have the option to not provide information by choosing not to use a particular service or feature on the Platform. We compile and analyse this information on an aggregated basis.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data for:`,
    points: [
      'Processing ticket bookings and donations',
      'Enhancing customer experience',
      'Resolving disputes and troubleshooting problems',
      'Informing you about shows, events, and updates',
      'Customising your experience on the Platform',
      'Detecting and protecting against error, fraud and other criminal activity',
      'Enforcing our terms and conditions',
      'Conducting surveys and research',
    ],
    footer: `You understand that your access to these products/services may be affected if permission is not provided to us.`,
  },
  {
    title: 'Information Sharing',
    content: `We may share your personal data internally within our group entities and affiliates to provide you access to the services and products offered by them. We may also disclose personal data to:`,
    points: [
      'Third-party service providers including payment processors and communication services',
      'Government agencies or law enforcement if required by law',
      'Third parties to protect the rights, property or personal safety of our users or the general public',
    ],
    footer: `We will not sell your personal data to third parties for marketing purposes without your explicit consent.`,
  },
  {
    title: 'Security Precautions',
    content: `To protect your personal data from unauthorised access or disclosure, loss or misuse, we adopt reasonable security practices and procedures. Once your information is in our possession, we adhere to our security guidelines to protect it against unauthorised access and offer the use of a secure server.

However, the transmission of information over the internet is not completely secure for reasons beyond our control. By using the Platform, you accept the security implications of data transmission over the internet which cannot always be guaranteed as completely secure.

Users are responsible for ensuring the protection of login and password records for their account.`,
  },
  {
    title: 'Data Retention & Deletion',
    content: `You have an option to delete your account by contacting us at the information provided below. This action would result in you losing all information related to your account.

We may refuse or delay deletion of the account in the event of any pending grievance, claims, or any other services. Once the account is deleted, you will lose access to the account.

We retain your personal data for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.`,
  },
  {
    title: 'Your Rights',
    content: `You may access, rectify, and update your personal data by contacting us directly. You have the right to:`,
    points: [
      'Access your personal data we hold',
      'Request correction of inaccurate data',
      'Request deletion of your data (subject to legal requirements)',
      'Withdraw consent for data processing',
      'Opt-out of marketing communications',
    ],
  },
  {
    title: 'Consent',
    content: `By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy.

If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.

You consent to us contacting you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy.

You have an option to withdraw your consent that you have already provided by writing to the contact information provided below. Please mention "Withdrawal of consent for processing personal data" in your subject line. However, please note that your withdrawal of consent will not be retrospective. In the event you withdraw consent given to us, we reserve the right to restrict or deny the provision of our services.`,
  },
  {
    title: 'Fraud Warning',
    content: `If you receive an email, a call from a person/association claiming to be Prarambh seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information.

If you have already revealed such information, report it immediately to an appropriate law enforcement agency.`,
  },
  {
    title: 'Changes to Privacy Policy',
    content: `Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We may alert/notify you about significant changes to the Privacy Policy, in the manner as may be required under applicable laws.`,
  },
  {
    title: 'Contact Us',
    content: `For any privacy-related concerns or requests:

Point of Contact: Rabi Shankar Kar
Designation: Settlor / Senior Management Official
Contact: +91-9818620738, +91-9310109669
Available: Monday - Friday (9:00 AM - 6:00 PM)
Email: prarambh.theatre.group@gmail.com

Address: Avenue 1, Gaur City 1, Gautam Buddha Nagar, Greater Noida West, Uttar Pradesh - 201318`,
  },
]

export default function PrivacyPolicyPage() {
  const isMobile = useIsMobile(640)

  if (isMobile) {
    return (
      <div className="px-4 pb-24">
        <header className="pt-6">
          <h1 className="font-serif text-2xl text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-white/60">Last updated: January 2026</p>
        </header>

        <section className="mt-5 space-y-4">
          {sections.map((section, idx) => (
            <MobileGlassCard key={idx}>
              <h2 className="font-serif text-lg text-white">{section.title}</h2>
              {section.content && (
                <p className="mt-3 text-sm leading-relaxed text-white/75 whitespace-pre-line">{section.content}</p>
              )}
              {section.points && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/75">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="mt-3 text-sm leading-relaxed text-white/75">{section.footer}</p>
              )}
            </MobileGlassCard>
          ))}
        </section>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <SectionReveal>
        <header className="pt-8 sm:pt-10">
          <h1 className="font-serif text-4xl text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-white/60">Last updated: January 2026</p>
        </header>
      </SectionReveal>

      <div className="mt-8 space-y-6">
        {sections.map((section, idx) => (
          <SectionReveal key={idx} delay={idx * 0.05}>
            <GlassPanel className="p-6 sm:p-8">
              <h2 className="font-serif text-xl text-white sm:text-2xl">{section.title}</h2>
              {section.content && (
                <p className="mt-4 text-sm leading-relaxed text-white/75 whitespace-pre-line sm:text-base">
                  {section.content}
                </p>
              )}
              {section.points && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/75 sm:text-base">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{section.footer}</p>
              )}
            </GlassPanel>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
