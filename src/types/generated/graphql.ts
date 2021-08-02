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

export type Event = {
  __typename?: 'Event';
  eventId?: Maybe<Scalars['ID']>;
  eventName?: Maybe<Scalars['String']>;
  eventPurpose?: Maybe<Scalars['String']>;
  eventStartDate?: Maybe<Scalars['String']>;
  eventEndDate?: Maybe<Scalars['String']>;
  eventOrganizerName?: Maybe<Scalars['String']>;
  eventOrganizerId?: Maybe<Scalars['String']>;
  eventPartisipantsID?: Maybe<Array<Maybe<Scalars['ID']>>>;
  eventPatisipants?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EventTypes = {
  __typename?: 'EventTypes';
  getResponsed?: Maybe<Array<Maybe<Event>>>;
  getNotResponse?: Maybe<Array<Maybe<Event>>>;
  getAttendEvent?: Maybe<Array<Maybe<Event>>>;
};

export type Message = {
  __typename?: 'Message';
  success?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Event>;
  newRegistUser?: Maybe<Message>;
};


export type MutationCreateEventArgs = {
  userId?: Maybe<Scalars['ID']>;
};


export type MutationNewRegistUserArgs = {
  userName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type NewRegistUser = {
  userName?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getInitEventData?: Maybe<EventTypes>;
};


export type QueryGetInitEventDataArgs = {
  userId?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  userId?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type NewRegistUserMutationVariables = Exact<{
  userName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type NewRegistUserMutation = (
  { __typename?: 'Mutation' }
  & { newRegistUser?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'success' | 'error'>
  )> }
);


export const NewRegistUserDocument = gql`
    mutation newRegistUser($userName: String, $password: String) {
  newRegistUser(userName: $userName, password: $password) {
    success
    error
  }
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
 *      password: // value for 'password'
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