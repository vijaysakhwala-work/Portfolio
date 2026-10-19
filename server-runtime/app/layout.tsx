import type {Metadata} from 'next';
export const metadata:Metadata={title:'Cubusify',description:'AI and software your business runs on.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
