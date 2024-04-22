import { graphqlClient } from "@/clients/api"
import { getcurrentUserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () =>{
     const query = useQuery({
          queryKey: ['current-user'],
          queryFn: () => graphqlClient.request(getcurrentUserQuery)
     })
     return {...query,user:query.data?.getCurrentUser}
}

// export const useGetUserById = (id: string)