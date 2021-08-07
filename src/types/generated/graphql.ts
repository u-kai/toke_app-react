import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AttendEvent = {
  __typename?: 'AttendEvent';
  events?: Maybe<Array<Maybe<Event>>>;
  paticipants?: Maybe<Array<Maybe<Paticipant>>>;
};

export type Error = {
  __typename?: 'Error';
  errorMessage: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  eventId: Scalars['ID'];
  purpose?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  organizerId: Scalars['ID'];
  organizerName?: Maybe<Scalars['String']>;
  describes?: Maybe<Scalars['String']>;
  bring?: Maybe<Scalars['String']>;
};

export type HomeEvents = {
  __typename?: 'HomeEvents';
  resedEvent?: Maybe<ResedEvent>;
  notResEvent?: Maybe<NotResEvent>;
  attendEvent?: Maybe<AttendEvent>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  userInfo?: Maybe<User>;
  error?: Maybe<Error>;
};

export type Mutation = {
  __typename?: 'Mutation';
  newRegistUser?: Maybe<Scalars['Boolean']>;
};


export type MutationNewRegistUserArgs = {
  input: NewUser;
};

export type MyEvent = {
  __typename?: 'MyEvent';
  events?: Maybe<Array<Maybe<Event>>>;
  paticipants?: Maybe<Array<Maybe<Paticipant>>>;
};

export type NewUser = {
  userName: Scalars['String'];
  userPassword: Scalars['String'];
};

export type NotResEvent = {
  __typename?: 'NotResEvent';
  events?: Maybe<Array<Maybe<Event>>>;
  paticipants?: Maybe<Array<Maybe<Paticipant>>>;
};

export type Paticipant = {
  __typename?: 'Paticipant';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  home?: Maybe<HomeEvents>;
  login: LoginResult;
};


export type QueryHomeArgs = {
  userId: Scalars['ID'];
};


export type QueryLoginArgs = {
  userName: Scalars['String'];
  userPassword: Scalars['String'];
};

export type ResedEvent = {
  __typename?: 'ResedEvent';
  events?: Maybe<Array<Maybe<Event>>>;
  paticipants?: Maybe<Array<Maybe<Paticipant>>>;
};

export type User = {
  __typename?: 'User';
  userName?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
  userPassword?: Maybe<Scalars['String']>;
};

export type NewRegistUserMutationVariables = Exact<{
  userName: Scalars['String'];
  userPassword: Scalars['String'];
}>;


export type NewRegistUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'newRegistUser'>
);

export type LoginQueryVariables = Exact<{
  userName: Scalars['String'];
  userPassword: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'LoginResult' }
    & { userInfo?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'userId' | 'userName'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'errorMessage'>
    )> }
  ) }
);


export const NewRegistUserDocument = gql`
    mutation NewRegistUser($userName: String!, $userPassword: String!) {
  newRegistUser(input: {userName: $userName, userPassword: $userPassword})
}
    `;
export type NewRegistUserMutationFn = Apollo.MutationFunction<NewRegistUserMutation, NewRegistUserMutationVariables>;

/**
 * __useNewRegistUserMutation__
 *
 * To run a mutation, you first call `useNewRegistUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewRegistUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newRegistUserMutation, { data, loading, error }] = useNewRegistUserMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      userPassword: // value for 'userPassword'
 *   },
 * });
 */
export function useNewRegistUserMutation(baseOptions?: Apollo.MutationHookOptions<NewRegistUserMutation, NewRegistUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewRegistUserMutation, NewRegistUserMutationVariables>(NewRegistUserDocument, options);
      }
export type NewRegistUserMutationHookResult = ReturnType<typeof useNewRegistUserMutation>;
export type NewRegistUserMutationResult = Apollo.MutationResult<NewRegistUserMutation>;
export type NewRegistUserMutationOptions = Apollo.BaseMutationOptions<NewRegistUserMutation, NewRegistUserMutationVariables>;
export const LoginDocument = gql`
    query Login($userName: String!, $userPassword: String!) {
  login(userName: $userName, userPassword: $userPassword) {
    userInfo {
      userId
      userName
    }
    error {
      errorMessage
    }
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      userName: // value for 'userName'
 *      userPassword: // value for 'userPassword'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;