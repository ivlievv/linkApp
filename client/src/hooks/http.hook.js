import {useState, useCallback} from 'react' //useCallback исп. для того чтобы реакт не входил в рекурсию

export const useHttp = () => {
  const [loading, setLoading] = useState(false) // с помощью даного хука буду опредилять грузится ли чтото с сервера или нет
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true) // когда мы начинаем делать запрос setLoading(true), тоисть запрос пошел
    try {

      if (body){
        body = JSON.stringify(body) // когда мы работаем с json тонам нужно указать то мы передаем json
        headers['Content-Type'] = 'application/json' // и делается ето так
      }

      const response = await fetch(url, {method, body, headers}) // когда дождался чт делается запрос на сервер, получаю респонс и его нужно распарсить
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так') // data.message это тот формат который я определил  в backend

      }
      setLoading(false) // когда закончили запрос setLoading(false), тоисть запрос больше не идет

      return data

    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, []) // useCallback принемает вторим параметром deps, по этому []

  const clearError = useCallback(() => setError(null),[]) // функция которая будет чистить ошибки

  return {loading, request, error, clearError}

}
/*
это хук позволяет мне работать в комфортном
режиме с асинхронными запросами сервер используя
нативний api browser afetch  только в формате хуков
(по сути этот хук позволяет взаемодействовать с
сервером и он будек экспортировать определенные
сущности которые мы сгруперуем в даном модуле,
эти сущности работают с сервером и конкретно
это бдет функция которая позволяет делать запрос,
это дудет stateLoading, тоисть если проходит
процес загрузки и потонциальные ошибки если они есть)
* */