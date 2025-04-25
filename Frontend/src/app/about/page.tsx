import type React from 'react'

export const generateMetadata = () => ({
  title: 'Ezalia24 - About Us',
  description: 'About us page for Ezalia24',
  keywords: ['About us', 'Ezalia24'].join(', ')
});


function page() {
  return (
    <>
      <div>About Page</div>
    </>
  )
}

export default page