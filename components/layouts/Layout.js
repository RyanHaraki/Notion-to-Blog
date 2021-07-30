import Head from 'next/head'

import React from 'react'

const Layout = ({page, children}) => {
    return (
        <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Ultra allows you to easily create a blog and completely manage it out of Notion, for free."
            key="desc"
          />
    
          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />
          {/* <meta
            name="twitter:creator"
            content="https://twitter.com/aquapay_"
            key="twhandle"
          /> */}
    
          {/* Open Graph  */}
          <meta
            property="og:title"
            content="Turn your Notion into a Blog | Ultra"
            key="ogtitle"
          />
          <meta
            property="og:description"
            content="Ultra allows you to easily create a blog and completely manage it out of Notion, for free."
            key="ogdesc"
          />
    
          {/* <meta property="og:image" content={Banner} key="ogimage" /> */}
          {/* <meta property="og:url" content="https://aquapay.money/" key="ogurl" /> */}
          <meta property="og:type" content="website" key="ogtype" />
    
          <title>{page ? `${page} | Ultra` : "Ultra"}</title>
        </Head>
    
    
        {children}
    
      </>
 
    )
}

export default Layout
