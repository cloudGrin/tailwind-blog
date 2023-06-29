/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BlogPostViews = {
  __typename?: 'BlogPostViews';
  postName: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  views: Scalars['Int']['output'];
};


export type MutationViewsArgs = {
  postName: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  addViewCount: BlogPostViews;
};


export type QueryAddViewCountArgs = {
  postName: Scalars['String']['input'];
};

export type MutationMutationVariables = Exact<{
  postName: Scalars['String']['input'];
}>;


export type MutationMutation = { __typename?: 'Mutation', views: number };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"views"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postName"}}}]}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;