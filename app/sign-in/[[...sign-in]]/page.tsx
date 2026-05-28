import { SignIn } from '@clerk/nextjs'
import { CLERK_AUTH_APPEARANCE_OVERRIDE } from '@/lib/constants'

export default function SignInPage() {
  return (
    <main className="wrapper container py-20">
      <div className="mx-auto max-w-lg rounded-[2rem] bg-white/90 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.15)] backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">Sign in to Book Mountain</h1>
        <p className="text-sm text-slate-600 mb-6">
          Use your email address to continue.
        </p>
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          appearance={{ elements: CLERK_AUTH_APPEARANCE_OVERRIDE }}
        />
      </div>
    </main>
  )
}
