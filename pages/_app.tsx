import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
// const comment = `Flagsmith Feature:
// **Production**
// - [ ] Environment Default
//
// **Development**
// - [x] Environment Default
// \`\`\`xml
// <div/>
// \`\`\`
//
// - [ ] internal_segment
//
//
// Last Updated 11th May 2022 19:44pm
// `
//
// const [initial,...rest] = comment.split(/\*\*(.*?)\*\*/g)
// let environments = {
//
// }
// let currentEnvironment = ""
// rest.forEach((v)=>{
//   if (!v.startsWith('\n')) {
//     environments[v] = {}
//     currentEnvironment = v
//   } else {
//     const featureValues = v.split
//     environments[currentEnvironment] = v
//   }
// })
// console.log(environments)
