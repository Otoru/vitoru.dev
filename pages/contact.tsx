import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Navbar } from 'components'

const Contact: NextPage = () => {
  const { t } = useTranslation('contact')
  const { locale } = useRouter()
  return (
    <div>
      <Head>
        <title>{t('head')}</title>
      </Head>
      <Navbar locale={locale} />
      <main></main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const props = locale
    ? await serverSideTranslations(locale, ['contact', 'common'])
    : {}
  return { props }
}

export default Contact
