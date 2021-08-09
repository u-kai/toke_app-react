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
};

export type CreateNewEvent = {
  start_date: Scalars['String'];
  end_date: Scalars['String'];
  location: Scalars['String'];
  organizer_id: Scalars['ID'];
  organizer_name: Scalars['String'];
  describes: Scalars['String'];
  bring: Scalars['String'];
  purpose: Scalars['String'];
  paticipantsIds: Array<Scalars['ID']>;
  date: Scalars['String'];
};

export type CreateNewEventResult = {
  __typename?: 'CreateNewEventResult';
  newEvent?: Maybe<Event>;
  error?: Maybe<Error>;
};

export type DisplayEvent = {
  __typename?: 'DisplayEvent';
  event?: Maybe<Event>;
  type: DisplayType;
  paticipants?: Maybe<Array<Paticipant>>;
};

export enum DisplayType {
  Myevent = 'MYEVENT',
  Newevent = 'NEWEVENT',
  Editevent = 'EDITEVENT'
}

export type Error = {
  __typename?: 'Error';
  errorMessage: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  event_id: Scalars['ID'];
  purpose: Scalars['String'];
  date: Scalars['String'];
  location: Scalars['String'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
  organizer_id: Scalars['ID'];
  organizer_name: Scalars['String'];
  describes: Scalars['String'];
  bring: Scalars['String'];
};

export type GetPaticipantsResults = {
  __typename?: 'GetPaticipantsResults';
  paticipants: Array<Paticipant>;
  error?: Maybe<Error>;
};

export type GetUsers = {
  __typename?: 'GetUsers';
  users?: Maybe<Array<Maybe<User>>>;
  error?: Maybe<Error>;
};

export type HomeEvents = {
  __typename?: 'HomeEvents';
  requestEvent: Array<Event>;
  displayEvent: DisplayEvent;
  resedEvent: Array<Event>;
  notResEvent: Array<Event>;
  attendEvent: Array<Event>;
  error?: Maybe<Error>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  userInfo?: Maybe<User>;
  error?: Maybe<Error>;
};

export type Mutation = {
  __typename?: 'Mutation';
  newRegistUser?: Maybe<Scalars['Boolean']>;
  createNewEvent: CreateNewEventResult;
};


export type MutationNewRegistUserArgs = {
  input: NewUser;
};


export type MutationCreateNewEventArgs = {
  input: CreateNewEvent;
};

export enum MutationType {
  Changeresponse = 'CHANGERESPONSE',
  Sendresponse = 'SENDRESPONSE',
  Createnewevent = 'CREATENEWEVENT'
}

export type MyEvent = {
  __typename?: 'MyEvent';
  events?: Maybe<Array<Maybe<Event>>>;
};

export type NewUser = {
  userName: Scalars['String'];
  userPassword: Scalars['String'];
};

export type NotResEvent = {
  __typename?: 'NotResEvent';
  events?: Maybe<Array<Maybe<Event>>>;
};

export type Paticipant = {
  __typename?: 'Paticipant';
  user_id: Scalars['ID'];
  user_name: Scalars['String'];
};

export type PaticipantsAndMyResponse = {
  __typename?: 'PaticipantsAndMyResponse';
  paticipants: Array<Paticipant>;
  response?: Maybe<Response>;
  error?: Maybe<Error>;
};

export type Query = {
  __typename?: 'Query';
  getHomeEvents: HomeEvents;
  login: LoginResult;
  getUsers: GetUsers;
  getPaticipants: GetPaticipantsResults;
  getPaticipantsAndMyResponse?: Maybe<PaticipantsAndMyResponse>;
};


export type QueryGetHomeEventsArgs = {
  userId: Scalars['ID'];
};


export type QueryLoginArgs = {
  userName: Scalars['String'];
  userPassword: Scalars['String'];
};


export type QueryGetUsersArgs = {
  user_id: Scalars['String'];
};


export type QueryGetPaticipantsArgs = {
  event_id: Scalars['String'];
};


export type QueryGetPaticipantsAndMyResponseArgs = {
  event_id: Scalars['String'];
  user_id: Scalars['String'];
};

export type ResedEvent = {
  __typename?: 'ResedEvent';
  events?: Maybe<Array<Maybe<Event>>>;
};

export type Response = {
  __typename?: 'Response';
  user_id: Scalars['ID'];
  event_id: Scalars['String'];
  is_attendance: Scalars['Boolean'];
  is_response: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  sendRequest: Event;
};


export type SubscriptionSendRequestArgs = {
  paticipantId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  user_name?: Maybe<Scalars['String']>;
  user_id: Scalars['ID'];
  userPassword?: Maybe<Scalars['String']>;
};

export type CreateNewEventMutationVariables = Exact<{
  location: Scalars['String'];
  end_date: Scalars['String'];
  describes: Scalars['String'];
  bring: Scalars['String'];
  start_date: Scalars['String'];
  organizer_id: Scalars['ID'];
  organizer_name: Scalars['String'];
  purpose: Scalars['String'];
  date: Scalars['String'];
  paticipantsIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type CreateNewEventMutation = (
  { __typename?: 'Mutation' }
  & { createNewEvent: (
    { __typename?: 'CreateNewEventResult' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'errorMessage'>
    )>, newEvent?: Maybe<(
      { __typename?: 'Event' }
      & Pick<Event, 'event_id'>
    )> }
  ) }
);

export type NewRegistUserMutationVariables = Exact<{
  userName: Scalars['String'];
  userPassword: Scalars['String'];
}>;


export type NewRegistUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'newRegistUser'>
);

export type GetHomeEventsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetHomeEventsQuery = (
  { __typename?: 'Query' }
  & { getHomeEvents: (
    { __typename?: 'HomeEvents' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'errorMessage'>
    )>, attendEvent: Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'event_id' | 'purpose' | 'location' | 'date' | 'describes' | 'bring' | 'start_date' | 'end_date' | 'organizer_id' | 'organizer_name'>
    )>, notResEvent: Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'event_id' | 'purpose' | 'location' | 'date' | 'describes' | 'bring' | 'start_date' | 'end_date' | 'organizer_id' | 'organizer_name'>
    )>, requestEvent: Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'event_id' | 'purpose' | 'location' | 'date' | 'describes' | 'bring' | 'start_date' | 'end_date' | 'organizer_id' | 'organizer_name'>
    )>, resedEvent: Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'event_id' | 'purpose' | 'location' | 'date' | 'describes' | 'bring' | 'start_date' | 'end_date' | 'organizer_id' | 'organizer_name'>
    )>, displayEvent: (
      { __typename?: 'DisplayEvent' }
      & Pick<DisplayEvent, 'type'>
      & { paticipants?: Maybe<Array<(
        { __typename?: 'Paticipant' }
        & Pick<Paticipant, 'user_id' | 'user_name'>
      )>>, event?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'event_id' | 'purpose' | 'location' | 'date' | 'describes' | 'bring' | 'start_date' | 'end_date' | 'organizer_id' | 'organizer_name'>
      )> }
    ) }
  ) }
);

export type GetPaticipantsQueryVariables = Exact<{
  event_id: Scalars['String'];
}>;


export type GetPaticipantsQuery = (
  { __typename?: 'Query' }
  & { getPaticipants: (
    { __typename?: 'GetPaticipantsResults' }
    & { paticipants: Array<(
      { __typename?: 'Paticipant' }
      & Pick<Paticipant, 'user_id' | 'user_name'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'errorMessage'>
    )> }
  ) }
);

export type GetPaticipantsAndResponseQueryVariables = Exact<{
  user_id: Scalars['String'];
  event_id: Scalars['String'];
}>;


export type GetPaticipantsAndResponseQuery = (
  { __typename?: 'Query' }
  & { getPaticipantsAndMyResponse?: Maybe<(
    { __typename?: 'PaticipantsAndMyResponse' }
    & { paticipants: Array<(
      { __typename?: 'Paticipant' }
      & Pick<Paticipant, 'user_name'>
    )>, response?: Maybe<(
      { __typename?: 'Response' }
      & Pick<Response, 'event_id' | 'is_attendance' | 'is_response' | 'message'>
    )> }
  )> }
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
      & Pick<User, 'user_id' | 'user_name'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'errorMessage'>
    )> }
  ) }
);

export type SendRequestSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SendRequestSubscription = (
  { __typename?: 'Subscription' }
  & { sendRequest: (
    { __typename?: 'Event' }
    & Pick<Event, 'purpose' | 'location'>
  ) }
);


export const CreateNewEventDocument = gql`
    mutation CreateNewEvent($location: String!, $end_date: String!, $describes: String!, $bring: String!, $start_date: String!, $organizer_id: ID!, $organizer_name: String!, $purpose: String!, $date: String!, $paticipantsIds: [ID!]!) {
  createNewEvent(
    input: {location: $location, end_date: $end_date, describes: $describes, bring: $bring, start_date: $start_date, organizer_name: $organizer_name, organizer_id: $organizer_id, purpose: $purpose, paticipantsIds: $paticipantsIds, date: $date}
  ) {
    error {
      errorMessage
    }
    newEvent {
      event_id
    }
  }
}
    `;
export type CreateNewEventMutationFn = Apollo.MutationFunction<CreateNewEventMutation, CreateNewEventMutationVariables>;

/**
 * __useCreateNewEventMutation__
 *
 * To run a mutation, you first call `useCreateNewEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewEventMutation, { data, loading, error }] = useCreateNewEventMutation({
 *   variables: {
 *      location: // value for 'location'
 *      end_date: // value for 'end_date'
 *      describes: // value for 'describes'
 *      bring: // value for 'bring'
 *      start_date: // value for 'start_date'
 *      organizer_id: // value for 'organizer_id'
 *      organizer_name: // value for 'organizer_name'
 *      purpose: // value for 'purpose'
 *      date: // value for 'date'
 *      paticipantsIds: // value for 'paticipantsIds'
 *   },
 * });
 */
export function useCreateNewEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewEventMutation, CreateNewEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewEventMutation, CreateNewEventMutationVariables>(CreateNewEventDocument, options);
      }
export type CreateNewEventMutationHookResult = ReturnType<typeof useCreateNewEventMutation>;
export type CreateNewEventMutationResult = Apollo.MutationResult<CreateNewEventMutation>;
export type CreateNewEventMutationOptions = Apollo.BaseMutationOptions<CreateNewEventMutation, CreateNewEventMutationVariables>;
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
export const GetHomeEventsDocument = gql`
    query GetHomeEvents($userId: ID!) {
  getHomeEvents(userId: $userId) {
    error {
      errorMessage
    }
    attendEvent {
      event_id
      purpose
      location
      date
      describes
      bring
      describes
      start_date
      end_date
      organizer_id
      organizer_name
    }
    notResEvent {
      event_id
      purpose
      location
      date
      describes
      bring
      describes
      start_date
      end_date
      organizer_id
      organizer_name
    }
    requestEvent {
      event_id
      purpose
      location
      date
      describes
      bring
      describes
      start_date
      end_date
      organizer_id
      organizer_name
    }
    resedEvent {
      event_id
      purpose
      location
      date
      describes
      bring
      describes
      start_date
      end_date
      organizer_id
      organizer_name
    }
    displayEvent {
      paticipants {
        user_id
        user_name
      }
      type
      event {
        event_id
        purpose
        location
        date
        describes
        bring
        describes
        start_date
        end_date
        organizer_id
        organizer_name
      }
    }
  }
}
    `;

/**
 * __useGetHomeEventsQuery__
 *
 * To run a query within a React component, call `useGetHomeEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetHomeEventsQuery(baseOptions: Apollo.QueryHookOptions<GetHomeEventsQuery, GetHomeEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHomeEventsQuery, GetHomeEventsQueryVariables>(GetHomeEventsDocument, options);
      }
export function useGetHomeEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHomeEventsQuery, GetHomeEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHomeEventsQuery, GetHomeEventsQueryVariables>(GetHomeEventsDocument, options);
        }
export type GetHomeEventsQueryHookResult = ReturnType<typeof useGetHomeEventsQuery>;
export type GetHomeEventsLazyQueryHookResult = ReturnType<typeof useGetHomeEventsLazyQuery>;
export type GetHomeEventsQueryResult = Apollo.QueryResult<GetHomeEventsQuery, GetHomeEventsQueryVariables>;
export const GetPaticipantsDocument = gql`
    query GetPaticipants($event_id: String!) {
  getPaticipants(event_id: $event_id) {
    paticipants {
      user_id
      user_name
    }
    error {
      errorMessage
    }
  }
}
    `;

/**
 * __useGetPaticipantsQuery__
 *
 * To run a query within a React component, call `useGetPaticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaticipantsQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGetPaticipantsQuery(baseOptions: Apollo.QueryHookOptions<GetPaticipantsQuery, GetPaticipantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaticipantsQuery, GetPaticipantsQueryVariables>(GetPaticipantsDocument, options);
      }
export function useGetPaticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaticipantsQuery, GetPaticipantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaticipantsQuery, GetPaticipantsQueryVariables>(GetPaticipantsDocument, options);
        }
export type GetPaticipantsQueryHookResult = ReturnType<typeof useGetPaticipantsQuery>;
export type GetPaticipantsLazyQueryHookResult = ReturnType<typeof useGetPaticipantsLazyQuery>;
export type GetPaticipantsQueryResult = Apollo.QueryResult<GetPaticipantsQuery, GetPaticipantsQueryVariables>;
export const GetPaticipantsAndResponseDocument = gql`
    query GetPaticipantsAndResponse($user_id: String!, $event_id: String!) {
  getPaticipantsAndMyResponse(user_id: $user_id, event_id: $event_id) {
    paticipants {
      user_name
    }
    response {
      event_id
      is_attendance
      is_response
      message
    }
  }
}
    `;

/**
 * __useGetPaticipantsAndResponseQuery__
 *
 * To run a query within a React component, call `useGetPaticipantsAndResponseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaticipantsAndResponseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaticipantsAndResponseQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGetPaticipantsAndResponseQuery(baseOptions: Apollo.QueryHookOptions<GetPaticipantsAndResponseQuery, GetPaticipantsAndResponseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaticipantsAndResponseQuery, GetPaticipantsAndResponseQueryVariables>(GetPaticipantsAndResponseDocument, options);
      }
export function useGetPaticipantsAndResponseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaticipantsAndResponseQuery, GetPaticipantsAndResponseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaticipantsAndResponseQuery, GetPaticipantsAndResponseQueryVariables>(GetPaticipantsAndResponseDocument, options);
        }
export type GetPaticipantsAndResponseQueryHookResult = ReturnType<typeof useGetPaticipantsAndResponseQuery>;
export type GetPaticipantsAndResponseLazyQueryHookResult = ReturnType<typeof useGetPaticipantsAndResponseLazyQuery>;
export type GetPaticipantsAndResponseQueryResult = Apollo.QueryResult<GetPaticipantsAndResponseQuery, GetPaticipantsAndResponseQueryVariables>;
export const LoginDocument = gql`
    query Login($userName: String!, $userPassword: String!) {
  login(userName: $userName, userPassword: $userPassword) {
    userInfo {
      user_id
      user_name
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
export const SendRequestDocument = gql`
    subscription SendRequest($id: ID!) {
  sendRequest(paticipantId: $id) {
    purpose
    location
  }
}
    `;

/**
 * __useSendRequestSubscription__
 *
 * To run a query within a React component, call `useSendRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSendRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendRequestSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSendRequestSubscription(baseOptions: Apollo.SubscriptionHookOptions<SendRequestSubscription, SendRequestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SendRequestSubscription, SendRequestSubscriptionVariables>(SendRequestDocument, options);
      }
export type SendRequestSubscriptionHookResult = ReturnType<typeof useSendRequestSubscription>;
export type SendRequestSubscriptionResult = Apollo.SubscriptionResult<SendRequestSubscription>;