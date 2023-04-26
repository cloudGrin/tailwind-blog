/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BlogPostViews = {
  __typename?: 'BlogPostViews';
  postName: Scalars['String'];
  views: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  views: Scalars['Int'];
};


export type MutationViewsArgs = {
  postName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  addViewCount: BlogPostViews;
};


export type QueryAddViewCountArgs = {
  postName: Scalars['String'];
};

export type MutationMutationVariables = Exact<{
  postName: Scalars['String'];
}>;


export type MutationMutation = { __typename?: 'Mutation', views: number };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"views"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postName"}}}]}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;