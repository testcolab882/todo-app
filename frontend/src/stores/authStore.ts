import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../api/axios';
import useLoadingStore from './loadingStore';


interface AuthState {
  error:string | null
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (token: string,email:string) => void;
  register:(email:string,password:string)=>void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      error:null,
      token: null,
      email: null,
      isAuthenticated: false,
      login: async (email,password) => {
        const {showLoading,hideLoading}=useLoadingStore.getState()
        set({error:null})
        try {
          showLoading()
          const response = await apiClient.post('/auth/login', { email, password });
            set({ token:response.data.token, email:response.data.email, isAuthenticated: true });
        } catch (err:any) {
            set({error:err.response?.data?.message || 'Something went wrong'})
        }finally{
          hideLoading()
        }
      },
      register:async(email,password)=>{
        const {showLoading,hideLoading}=useLoadingStore.getState()
        set({error:null})
        try {
          showLoading()
            await apiClient.post('/auth/register', { email, password });
            window.location.href = '/login'
        } catch (err:any) {
            set({error:err.response?.data?.message || 'Something went wrong'})
        }finally{
          hideLoading()
        }
      },
      logout: () => {
        set({ token: null, email: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', 
      partialize: (state) => ({ 
        token: state.token,
        email:state.email,
        isAuthenticated:state.isAuthenticated
    }),
    }
  )
);


export default useAuthStore;
