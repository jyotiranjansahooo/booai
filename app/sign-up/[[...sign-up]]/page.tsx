import { SignUp } from '@clerk/nextjs'
import { CLERK_AUTH_APPEARANCE_OVERRIDE } from '@/lib/constants'

export default function SignUpPage() {
  return (
    <main className="wrapper container py-20">
      <div className="mx-auto max-w-lg rounded-[2rem] bg-white/90 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.15)] backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">Create your Book Mountain account</h1>
        <p className="text-sm text-slate-600 mb-6">
          Sign up with your email address to start building your library.
        </p>
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          appearance={{ elements: CLERK_AUTH_APPEARANCE_OVERRIDE }}
        />
      </div>
    </main>
  )
}
