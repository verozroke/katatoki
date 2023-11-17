import { useToastStore } from "~/stores/ToastStore"
import { colorsEnum } from "./use-color"

export type ToastOptions = {
  message: string,
  timeout?: number
}


export const useToast = () => {

  const toastStore = useToastStore()

  const toast = {
    error({ message, timeout }: ToastOptions) {
      toastStore.openSnackbar(message, timeout, colorsEnum.RED)
    },
    success({ message, timeout }: ToastOptions) {
      toastStore.openSnackbar(message, timeout, colorsEnum.EMERALD)
    },
    copied({ message, timeout }: ToastOptions) {
      toastStore.openSnackbar(message, timeout, colorsEnum.VIOLET)
    }
  }

  return { toast }
}