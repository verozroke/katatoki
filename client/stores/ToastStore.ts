import { defineStore } from 'pinia';
import { colorsEnum, colors } from '~/hooks/use-color';


export type ToastColor = colorsEnum.EMERALD | colorsEnum.RED | colorsEnum.VIOLET

export const useToastStore = defineStore('ToastStore', () => {
  const snackbar = ref<boolean>(false)
  const color = ref<ToastColor>(colorsEnum.EMERALD)
  const message = ref<string>('')
  const timeout = ref<number>(2000)

  const openSnackbar = (messageValue: string, timeoutValue: number = 2000, colorValue: ToastColor) => {
    timeout.value = timeoutValue
    message.value = messageValue
    color.value = colorValue
    snackbar.value = true

    setTimeout(() => setToDefault(), timeout.value + 4000)
  }

  const setToDefault = () => {
    color.value = colorsEnum.EMERALD
    message.value = ''
    timeout.value = 2000
  }

  return {
    snackbar,
    color,
    message,
    timeout,
    openSnackbar,
    setToDefault
  };
});
