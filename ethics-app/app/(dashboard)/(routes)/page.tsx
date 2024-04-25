import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
   <div>
      <header>
        <h1>Welcome to Cyber Ethics</h1>
        <p>A Learning Tool for Cybersecurity</p>
    </header>
    
    <section>
        <h2>About Cyber Ethics</h2>
        <p>Cyber Ethics is a platform dedicated to promoting ethical behavior in cyberspace. Our mission is to educate individuals and organizations about the importance of ethical conduct in cybersecurity practices.</p>
        <p>Through our courses and resources, we aim to foster a culture of responsibility, integrity, and respect for privacy and security in the digital world.</p>
    </section>
    <footer>
      <p>&copy; 2024 Cyber Ethics. All rights reserved.</p>
    </footer>
   </div>
  )
}
