import {
  useMutation,
  type UseMutationOptions,
  type MutationFunction,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query';
import Swal from 'sweetalert2';


type SuccessMessage = string | 'default';


interface ApiError {
  response?: {
    status?: number; 
    data?: {
      message?: string; 
     
    };
  };
  message?: string; 
}


export const useGlobalMutation = <
  TData = unknown,
  TError = ApiError, 
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn' | 'onSuccess' | 'onError'
  > & {
    onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined, queryClient: QueryClient) => Promise<unknown> | unknown;
    onError?: (error: TError, variables: TVariables, context: TContext | undefined, queryClient: QueryClient) => Promise<unknown> | unknown;
  },
  onSuccessMessage: SuccessMessage = 'default',
) => {
  const queryClient = useQueryClient();

  const defaultSuccessMessage = 'Berhasil!';
  const defaultErrorMessage = 'Terjadi kesalahan server (5xx). Silakan coba lagi.';
  const defaultWarningMessage = 'Periksa input Anda (4xx).';

  const mutate = useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options, 

    onSuccess: (data, variables, context) => {

      console.log("data", data)
     
      options?.onSuccess?.(data, variables, context, queryClient);

     
      const title =
        onSuccessMessage === 'default' ? defaultSuccessMessage : onSuccessMessage;
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500,
      });
    },

    onError: (error, variables, context) => {
      // 1. Jalankan onError kustom
      options?.onError?.(error, variables, context, queryClient);
      
      // 2. Tentukan jenis notifikasi berdasarkan status code
      
      let status: number | undefined;
      let title: string = defaultErrorMessage;
      let icon: 'error' | 'warning' = 'error';
      let timer: number = 3000;

      const isApiError = (err: unknown): err is ApiError =>
        !!err && typeof err === 'object' && 'response' in err;

      if (isApiError(error) && error.response) {
          status = error.response.status;
          
          // Coba ambil pesan spesifik dari server
          const serverMessage = error.response.data?.message;

          if (status && status >= 400 && status < 500) {
              // --- Status 4XX (Client Error) ---
              icon = 'warning';
              title = serverMessage || defaultWarningMessage;
              timer = 5000; // Beri waktu lebih lama untuk membaca pesan warning
          } else if (status && status >= 500) {
              // --- Status 5XX (Server Error) ---
              icon = 'error';
              title = serverMessage || defaultErrorMessage;
              timer = 3000;
          }
      } else {
        // Error Jaringan (misalnya, server tidak merespons sama sekali)
        title = (error as any)?.message || 'Gagal terhubung ke server.';
        icon = 'error';
        timer = 3000;
      }
      
      // 3. Tampilkan notifikasi
      Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: timer,
      });
    },
  });

  return mutate;
};