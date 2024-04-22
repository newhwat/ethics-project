import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
   <div>
      <UserButton>
        afterSignOutURL="/"
      </UserButton>
   </div>
  )
}
