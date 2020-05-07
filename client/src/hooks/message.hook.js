import {useCallback} from "react";

export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text) {
      window.M.toast({html: text})
    }
  }, [])
}

/*
* для того чтобы показывать сообщение
*  об ошибке я воспользывался Materialize
*  у которого есть метод toast(когда я
*  подключил Materialize мне в объекте
*  Window доступен объект М у него есть
*  метод toast, и если я в него передам
* {html: text} то я получаю на странице
*  сообщение об ошибке с текстоб ошибки
*  который я указл в text)
* */