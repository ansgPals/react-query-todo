import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from './middlewares'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import {
  IUseReactQueryMutationParams,
  IUseReactQueryParams,
  MutationMethodType,
} from '@/types'

const MutationMethod = {
  delete: 'delete',
  post: 'post',
  put: 'put',
} as const

export const useReactQuery = (params: IUseReactQueryParams) => {
  const { url, disable, onError } = params

  const queryClient = useQueryClient()
  const uniqueKey = url.split('/').slice(1) ?? ['']
  const [disableState, setDisableLater] = useState(disable)

  const { data, isFetching, error } = useQuery<
    any,
    AxiosError<{ details: string }>,
    any
  >(
    [...uniqueKey],
    async () => {
      const response = await axios.get(url)
      return response?.data
    },
    {
      onError,
      // 에러시 하고싶은거있으면 넣으셈
      enabled: !disableState,
      // 비동기로 query 하고싶을까바 만듦
    },
  )

  const refetch = () => {
    queryClient.invalidateQueries([...uniqueKey])
  }
  // 데이터 리패치기능 (수정삭제후 사용하셔유)

  const handleDisable = () => {
    setDisableLater(disable)
  }

  useEffect(() => {
    handleDisable()
    // disable 바뀌면 바로 리랜더링되면서 useQuery요청 부름
  }, [disable])

  return {
    data,
    error,
    isLoading: isFetching,
    refetch,
  } as const
}

export const useReactQueryMutation = (method: MutationMethodType) => (
  params: IUseReactQueryMutationParams,
) => {
  const { url, onError, onSuccess } = params

  const { mutate, isLoading, error } = useMutation<any, any, any, any>({
    mutationFn: (variables: any) => {
      return axios[method](url, variables)
    },
    onSuccess,
    onError,
  })

  return {
    mutation: mutate,
    isLoading,
    error,
  } as const
}

export const useReactQueryDelete = useReactQueryMutation(MutationMethod.delete)
export const useReactQueryPost = useReactQueryMutation(MutationMethod.post)
export const useReactQueryPut = useReactQueryMutation(MutationMethod.put)
