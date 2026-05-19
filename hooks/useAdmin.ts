'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAdmin() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])
  
  function getToken() {
    return localStorage.getItem('admin_token')
  }
  
  function logout() {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  return { getToken, logout }
}