export const translations = {
  en: {
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to your SimplePOS account",
      email: "Email",
      emailPlaceholder: "name@example.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Forgot password?",
      rememberMe: "Remember me",
      signIn: "Sign In",
      signingIn: "Signing in...",
      orContinueWith: "Or continue with",
      google: "Google",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
    },
  },
  id: {
    login: {
      title: "Selamat Datang",
      subtitle: "Masuk ke akun SimplePOS Anda",
      email: "Email",
      emailPlaceholder: "nama@contoh.com",
      password: "Kata Sandi",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Lupa kata sandi?",
      rememberMe: "Ingat saya",
      signIn: "Masuk",
      signingIn: "Sedang masuk...",
      orContinueWith: "Atau lanjutkan dengan",
      google: "Google",
      noAccount: "Belum punya akun?",
      signUp: "Daftar",
    },
  },
}

export type Locale = keyof typeof translations
