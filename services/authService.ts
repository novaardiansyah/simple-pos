export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  success: boolean
  message: string
  data: {
    token: string
  }
  errors?: Record<string, string[]>
}

class AuthService {
  private getHeaders(token: string): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async login(formData: LoginRequest): Promise<LoginResponse> {
    try {
      const req = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: this.getHeaders(''),
      })

      const res = await req.json()

      return res
    } catch (error) {
      console.log('Internal server error: ', error)
      throw error
    }
  }
}

const authService = new AuthService()
export default authService
