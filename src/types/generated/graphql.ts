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
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  userInfo: UserInfo;
};

export type ChangeResponseInput = {
  response: EventResponseInput;
};

export type ChangeResponseResult = {
  __typename?: 'ChangeResponseResult';
  event: Event;
  eventResponse: EventResponse;
};

export type CreateEventInput = {
  info: EventInput;
  userInfos: Array<UserInfoInput>;
};


export type EditEventInput = {
  eventId: Scalars['ID'];
  info: EventInput;
  userInfos: Array<UserInfoInput>;
};

export type Event = {
  __typename?: 'Event';
  eventId: Scalars['ID'];
  eventInfo: EventInfo;
  requestedUsers: Array<UserInfo>;
  paticipantUsers: Array<UserInfo>;
};

export type EventInfo = {
  __typename?: 'EventInfo';
  purpose: Scalars['String'];
  created: Scalars['DateTime'];
  location: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  organizerId: Scalars['ID'];
  organizerName: Scalars['String'];
  describes: Scalars['String'];
  bring: Scalars['String'];
};

export type EventInput = {
  purpose: Scalars['String'];
  created: Scalars['DateTime'];
  location: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  organizerId: Scalars['ID'];
  organizerName: Scalars['String'];
  describes: Scalars['String'];
  bring: Scalars['String'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  userId: Scalars['String'];
  eventId: Scalars['String'];
  isAttend: Scalars['Boolean'];
  isResponse: Scalars['Boolean'];
  message: Scalars['String'];
};

export type EventResponseInput = {
  userId: Scalars['String'];
  eventId: Scalars['String'];
  isAttend: Scalars['Boolean'];
  isResponse: Scalars['Boolean'];
  message: Scalars['String'];
};

export type LoginInput = {
  userId: Scalars['ID'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newRegistUser: UserInfo;
  changeResponse: ChangeResponseResult;
  createEvent: Event;
  editEvent: Event;
};


export type MutationNewRegistUserArgs = {
  input: RegistUserInput;
};


export type MutationChangeResponseArgs = {
  input: ChangeResponseInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationEditEventArgs = {
  input: EditEventInput;
};

export type Query = {
  __typename?: 'Query';
  login: AuthPayload;
  TestQ: Test;
  user: User;
  allUserInfos: Array<UserInfo>;
  userAttendEvents: Array<UserEvent>;
  userAbsentEvents: Array<UserEvent>;
  userNotResponseEvents: Array<UserEvent>;
  userResponsedEvents: Array<UserEvent>;
  userTodayEvents: Array<UserEvent>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryTestQArgs = {
  input: UserInfoInput;
};


export type QueryUserArgs = {
  input: UserInfoInput;
};


export type QueryUserAttendEventsArgs = {
  input: UserInfoInput;
};


export type QueryUserAbsentEventsArgs = {
  input: UserInfoInput;
};


export type QueryUserNotResponseEventsArgs = {
  input: UserInfoInput;
};


export type QueryUserResponsedEventsArgs = {
  input: UserInfoInput;
};


export type QueryUserTodayEventsArgs = {
  input: UserInfoInput;
};

export type RegistUserInput = {
  userName: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newEvent: Event;
  changeEvent: Event;
  sendResposne: EventResponse;
};


export type SubscriptionNewEventArgs = {
  input: UserInfoInput;
};

export type Test = {
  __typename?: 'Test';
  test: Scalars['String'];
  data: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  info: UserInfo;
  todayEvents: Array<Event>;
  createdEvents: Array<Event>;
  attendEvents: Array<Event>;
  absentEvents: Array<Event>;
  responsedEvents: Array<Event>;
  notResponseEvents: Array<Event>;
  eventResponses: Array<EventResponse>;
};

export type UserEvent = {
  __typename?: 'UserEvent';
  event: Event;
  response: EventResponse;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  userId: Scalars['ID'];
  userName: Scalars['String'];
};

export type UserInfoInput = {
  userId: Scalars['ID'];
  userName: Scalars['String'];
};

export type DisplayEventInfoFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'eventId'>
  & { eventInfo: (
    { __typename?: 'EventInfo' }
    & Pick<EventInfo, 'startDate' | 'endDate' | 'purpose' | 'describes' | 'bring' | 'location' | 'organizerId' | 'organizerName'>
  ), paticipantUsers: Array<(
    { __typename?: 'UserInfo' }
    & Pick<UserInfo, 'userName' | 'userId'>
  )> }
);

export type DisplayUserEventFragment = (
  { __typename?: 'UserEvent' }
  & { event: (
    { __typename?: 'Event' }
    & { requestedUsers: Array<(
      { __typename?: 'UserInfo' }
      & Pick<UserInfo, 'userName' | 'userId'>
    )> }
    & DisplayEventInfoFragment
  ), response: (
    { __typename?: 'EventResponse' }
    & Pick<EventResponse, 'userId' | 'isAttend' | 'isResponse' | 'message'>
  ) }
);

export type MailListInfoFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'eventId'>
  & { eventInfo: (
    { __typename?: 'EventInfo' }
    & Pick<EventInfo, 'startDate' | 'endDate' | 'purpose'>
  ) }
);

export type ChangeResponseMutationVariables = Exact<{
  input: ChangeResponseInput;
}>;


export type ChangeResponseMutation = (
  { __typename?: 'Mutation' }
  & { changeResponse: (
    { __typename?: 'ChangeResponseResult' }
    & { event: (
      { __typename?: 'Event' }
      & DisplayEventInfoFragment
    ), eventResponse: (
      { __typename?: 'EventResponse' }
      & Pick<EventResponse, 'isAttend'>
    ) }
  ) }
);

export type CreateNewEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateNewEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent: (
    { __typename: 'Event' }
    & DisplayEventInfoFragment
  ) }
);

export type EditEventMutationVariables = Exact<{
  input: EditEventInput;
}>;


export type EditEventMutation = (
  { __typename?: 'Mutation' }
  & { editEvent: (
    { __typename?: 'Event' }
    & DisplayEventInfoFragment
  ) }
);

export type NewUserRegistMutationVariables = Exact<{
  input: RegistUserInput;
}>;


export type NewUserRegistMutation = (
  { __typename?: 'Mutation' }
  & { newRegistUser: (
    { __typename?: 'UserInfo' }
    & Pick<UserInfo, 'userId' | 'userName'>
  ) }
);

export type FetchUserAttendEventsQueryVariables = Exact<{
  input: UserInfoInput;
}>;


export type FetchUserAttendEventsQuery = (
  { __typename?: 'Query' }
  & { userAttendEvents: Array<(
    { __typename?: 'UserEvent' }
    & DisplayUserEventFragment
  )> }
);

export type FetchUserTodayEventsQueryVariables = Exact<{
  input: UserInfoInput;
}>;


export type FetchUserTodayEventsQuery = (
  { __typename?: 'Query' }
  & { userTodayEvents: Array<(
    { __typename?: 'UserEvent' }
    & DisplayUserEventFragment
  )> }
);

export type FetchUserResponsedEventsQueryVariables = Exact<{
  input: UserInfoInput;
}>;


export type FetchUserResponsedEventsQuery = (
  { __typename?: 'Query' }
  & { userResponsedEvents: Array<(
    { __typename?: 'UserEvent' }
    & DisplayUserEventFragment
  )> }
);

export type FetchUserNotResponseEventsQueryVariables = Exact<{
  input: UserInfoInput;
}>;


export type FetchUserNotResponseEventsQuery = (
  { __typename?: 'Query' }
  & { userNotResponseEvents: Array<(
    { __typename?: 'UserEvent' }
    & DisplayUserEventFragment
  )> }
);

export type FetchHomeDataQueryVariables = Exact<{
  input: UserInfoInput;
}>;


export type FetchHomeDataQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & { info: (
      { __typename?: 'UserInfo' }
      & Pick<UserInfo, 'userName'>
    ), notResponseEvents: Array<(
      { __typename?: 'Event' }
      & DisplayEventInfoFragment
    )>, attendEvents: Array<(
      { __typename?: 'Event' }
      & DisplayEventInfoFragment
    )>, responsedEvents: Array<(
      { __typename?: 'Event' }
      & DisplayEventInfoFragment
    )>, todayEvents: Array<(
      { __typename?: 'Event' }
      & DisplayEventInfoFragment
    )>, createdEvents: Array<(
      { __typename?: 'Event' }
      & DisplayEventInfoFragment
    )> }
  ), allUserInfos: Array<(
    { __typename?: 'UserInfo' }
    & Pick<UserInfo, 'userId' | 'userName'>
  )> }
);

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { userInfo: (
      { __typename?: 'UserInfo' }
      & Pick<UserInfo, 'userId' | 'userName'>
    ) }
  ) }
);

export type CommingEventSubscriptionVariables = Exact<{
  input: UserInfoInput;
}>;


export type CommingEventSubscription = (
  { __typename?: 'Subscription' }
  & { newEvent: (
    { __typename?: 'Event' }
    & DisplayEventInfoFragment
  ) }
);

export const DisplayEventInfoFragmentDoc = gql`
    fragment displayEventInfo on Event {
  eventId
  eventInfo {
    startDate
    endDate
    purpose
    describes
    bring
    location
    organizerId
    organizerName
  }
  paticipantUsers {
    userName
    userId
  }
}
    `;
export const DisplayUserEventFragmentDoc = gql`
    fragment DisplayUserEvent on UserEvent {
  event {
    ...displayEventInfo
    requestedUsers {
      userName
      userId
    }
  }
  response {
    userId
    isAttend
    isResponse
    message
  }
}
    ${DisplayEventInfoFragmentDoc}`;
export const MailListInfoFragmentDoc = gql`
    fragment MailListInfo on Event {
  eventId
  eventInfo {
    startDate
    endDate
    purpose
  }
}
    `;
export const ChangeResponseDocument = gql`
    mutation ChangeResponse($input: ChangeResponseInput!) {
  changeResponse(input: $input) {
    event {
      ...displayEventInfo
    }
    eventResponse {
      isAttend
    }
  }
}
    ${DisplayEventInfoFragmentDoc}`;
export type ChangeResponseMutationFn = Apollo.MutationFunction<ChangeResponseMutation, ChangeResponseMutationVariables>;

/**
 * __useChangeResponseMutation__
 *
 * To run a mutation, you first call `useChangeResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeResponseMutation, { data, loading, error }] = useChangeResponseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeResponseMutation(baseOptions?: Apollo.MutationHookOptions<ChangeResponseMutation, ChangeResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeResponseMutation, ChangeResponseMutationVariables>(ChangeResponseDocument, options);
      }
export type ChangeResponseMutationHookResult = ReturnType<typeof useChangeResponseMutation>;
export type ChangeResponseMutationResult = Apollo.MutationResult<ChangeResponseMutation>;
export type ChangeResponseMutationOptions = Apollo.BaseMutationOptions<ChangeResponseMutation, ChangeResponseMutationVariables>;
export const CreateNewEventDocument = gql`
    mutation CreateNewEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    __typename
    ...displayEventInfo
  }
}
    ${DisplayEventInfoFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const EditEventDocument = gql`
    mutation EditEvent($input: EditEventInput!) {
  editEvent(input: $input) {
    ...displayEventInfo
  }
}
    ${DisplayEventInfoFragmentDoc}`;
export type EditEventMutationFn = Apollo.MutationFunction<EditEventMutation, EditEventMutationVariables>;

/**
 * __useEditEventMutation__
 *
 * To run a mutation, you first call `useEditEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEventMutation, { data, loading, error }] = useEditEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditEventMutation(baseOptions?: Apollo.MutationHookOptions<EditEventMutation, EditEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEventMutation, EditEventMutationVariables>(EditEventDocument, options);
      }
export type EditEventMutationHookResult = ReturnType<typeof useEditEventMutation>;
export type EditEventMutationResult = Apollo.MutationResult<EditEventMutation>;
export type EditEventMutationOptions = Apollo.BaseMutationOptions<EditEventMutation, EditEventMutationVariables>;
export const NewUserRegistDocument = gql`
    mutation NewUserRegist($input: RegistUserInput!) {
  newRegistUser(input: $input) {
    userId
    userName
  }
}
    `;
export type NewUserRegistMutationFn = Apollo.MutationFunction<NewUserRegistMutation, NewUserRegistMutationVariables>;

/**
 * __useNewUserRegistMutation__
 *
 * To run a mutation, you first call `useNewUserRegistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewUserRegistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newUserRegistMutation, { data, loading, error }] = useNewUserRegistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewUserRegistMutation(baseOptions?: Apollo.MutationHookOptions<NewUserRegistMutation, NewUserRegistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewUserRegistMutation, NewUserRegistMutationVariables>(NewUserRegistDocument, options);
      }
export type NewUserRegistMutationHookResult = ReturnType<typeof useNewUserRegistMutation>;
export type NewUserRegistMutationResult = Apollo.MutationResult<NewUserRegistMutation>;
export type NewUserRegistMutationOptions = Apollo.BaseMutationOptions<NewUserRegistMutation, NewUserRegistMutationVariables>;
export const FetchUserAttendEventsDocument = gql`
    query FetchUserAttendEvents($input: UserInfoInput!) {
  userAttendEvents(input: $input) {
    ...DisplayUserEvent
  }
}
    ${DisplayUserEventFragmentDoc}`;

/**
 * __useFetchUserAttendEventsQuery__
 *
 * To run a query within a React component, call `useFetchUserAttendEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserAttendEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserAttendEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchUserAttendEventsQuery(baseOptions: Apollo.QueryHookOptions<FetchUserAttendEventsQuery, FetchUserAttendEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserAttendEventsQuery, FetchUserAttendEventsQueryVariables>(FetchUserAttendEventsDocument, options);
      }
export function useFetchUserAttendEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserAttendEventsQuery, FetchUserAttendEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserAttendEventsQuery, FetchUserAttendEventsQueryVariables>(FetchUserAttendEventsDocument, options);
        }
export type FetchUserAttendEventsQueryHookResult = ReturnType<typeof useFetchUserAttendEventsQuery>;
export type FetchUserAttendEventsLazyQueryHookResult = ReturnType<typeof useFetchUserAttendEventsLazyQuery>;
export type FetchUserAttendEventsQueryResult = Apollo.QueryResult<FetchUserAttendEventsQuery, FetchUserAttendEventsQueryVariables>;
export const FetchUserTodayEventsDocument = gql`
    query FetchUserTodayEvents($input: UserInfoInput!) {
  userTodayEvents(input: $input) {
    ...DisplayUserEvent
  }
}
    ${DisplayUserEventFragmentDoc}`;

/**
 * __useFetchUserTodayEventsQuery__
 *
 * To run a query within a React component, call `useFetchUserTodayEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserTodayEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserTodayEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchUserTodayEventsQuery(baseOptions: Apollo.QueryHookOptions<FetchUserTodayEventsQuery, FetchUserTodayEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserTodayEventsQuery, FetchUserTodayEventsQueryVariables>(FetchUserTodayEventsDocument, options);
      }
export function useFetchUserTodayEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserTodayEventsQuery, FetchUserTodayEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserTodayEventsQuery, FetchUserTodayEventsQueryVariables>(FetchUserTodayEventsDocument, options);
        }
export type FetchUserTodayEventsQueryHookResult = ReturnType<typeof useFetchUserTodayEventsQuery>;
export type FetchUserTodayEventsLazyQueryHookResult = ReturnType<typeof useFetchUserTodayEventsLazyQuery>;
export type FetchUserTodayEventsQueryResult = Apollo.QueryResult<FetchUserTodayEventsQuery, FetchUserTodayEventsQueryVariables>;
export const FetchUserResponsedEventsDocument = gql`
    query FetchUserResponsedEvents($input: UserInfoInput!) {
  userResponsedEvents(input: $input) {
    ...DisplayUserEvent
  }
}
    ${DisplayUserEventFragmentDoc}`;

/**
 * __useFetchUserResponsedEventsQuery__
 *
 * To run a query within a React component, call `useFetchUserResponsedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserResponsedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserResponsedEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchUserResponsedEventsQuery(baseOptions: Apollo.QueryHookOptions<FetchUserResponsedEventsQuery, FetchUserResponsedEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserResponsedEventsQuery, FetchUserResponsedEventsQueryVariables>(FetchUserResponsedEventsDocument, options);
      }
export function useFetchUserResponsedEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserResponsedEventsQuery, FetchUserResponsedEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserResponsedEventsQuery, FetchUserResponsedEventsQueryVariables>(FetchUserResponsedEventsDocument, options);
        }
export type FetchUserResponsedEventsQueryHookResult = ReturnType<typeof useFetchUserResponsedEventsQuery>;
export type FetchUserResponsedEventsLazyQueryHookResult = ReturnType<typeof useFetchUserResponsedEventsLazyQuery>;
export type FetchUserResponsedEventsQueryResult = Apollo.QueryResult<FetchUserResponsedEventsQuery, FetchUserResponsedEventsQueryVariables>;
export const FetchUserNotResponseEventsDocument = gql`
    query FetchUserNotResponseEvents($input: UserInfoInput!) {
  userNotResponseEvents(input: $input) {
    ...DisplayUserEvent
  }
}
    ${DisplayUserEventFragmentDoc}`;

/**
 * __useFetchUserNotResponseEventsQuery__
 *
 * To run a query within a React component, call `useFetchUserNotResponseEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserNotResponseEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserNotResponseEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchUserNotResponseEventsQuery(baseOptions: Apollo.QueryHookOptions<FetchUserNotResponseEventsQuery, FetchUserNotResponseEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserNotResponseEventsQuery, FetchUserNotResponseEventsQueryVariables>(FetchUserNotResponseEventsDocument, options);
      }
export function useFetchUserNotResponseEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserNotResponseEventsQuery, FetchUserNotResponseEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserNotResponseEventsQuery, FetchUserNotResponseEventsQueryVariables>(FetchUserNotResponseEventsDocument, options);
        }
export type FetchUserNotResponseEventsQueryHookResult = ReturnType<typeof useFetchUserNotResponseEventsQuery>;
export type FetchUserNotResponseEventsLazyQueryHookResult = ReturnType<typeof useFetchUserNotResponseEventsLazyQuery>;
export type FetchUserNotResponseEventsQueryResult = Apollo.QueryResult<FetchUserNotResponseEventsQuery, FetchUserNotResponseEventsQueryVariables>;
export const FetchHomeDataDocument = gql`
    query FetchHomeData($input: UserInfoInput!) {
  user(input: $input) {
    info {
      userName
    }
    notResponseEvents {
      ...displayEventInfo
    }
    attendEvents {
      ...displayEventInfo
    }
    responsedEvents {
      ...displayEventInfo
    }
    todayEvents {
      ...displayEventInfo
    }
    createdEvents {
      ...displayEventInfo
    }
  }
  allUserInfos {
    userId
    userName
  }
}
    ${DisplayEventInfoFragmentDoc}`;

/**
 * __useFetchHomeDataQuery__
 *
 * To run a query within a React component, call `useFetchHomeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchHomeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchHomeDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchHomeDataQuery(baseOptions: Apollo.QueryHookOptions<FetchHomeDataQuery, FetchHomeDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchHomeDataQuery, FetchHomeDataQueryVariables>(FetchHomeDataDocument, options);
      }
export function useFetchHomeDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchHomeDataQuery, FetchHomeDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchHomeDataQuery, FetchHomeDataQueryVariables>(FetchHomeDataDocument, options);
        }
export type FetchHomeDataQueryHookResult = ReturnType<typeof useFetchHomeDataQuery>;
export type FetchHomeDataLazyQueryHookResult = ReturnType<typeof useFetchHomeDataLazyQuery>;
export type FetchHomeDataQueryResult = Apollo.QueryResult<FetchHomeDataQuery, FetchHomeDataQueryVariables>;
export const LoginDocument = gql`
    query Login($input: LoginInput!) {
  login(input: $input) {
    token
    userInfo {
      userId
      userName
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
 *      input: // value for 'input'
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
export const CommingEventDocument = gql`
    subscription CommingEvent($input: UserInfoInput!) {
  newEvent(input: $input) {
    ...displayEventInfo
  }
}
    ${DisplayEventInfoFragmentDoc}`;

/**
 * __useCommingEventSubscription__
 *
 * To run a query within a React component, call `useCommingEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommingEventSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommingEventSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommingEventSubscription(baseOptions: Apollo.SubscriptionHookOptions<CommingEventSubscription, CommingEventSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommingEventSubscription, CommingEventSubscriptionVariables>(CommingEventDocument, options);
      }
export type CommingEventSubscriptionHookResult = ReturnType<typeof useCommingEventSubscription>;
export type CommingEventSubscriptionResult = Apollo.SubscriptionResult<CommingEventSubscription>;