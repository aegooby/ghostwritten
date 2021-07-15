export type Maybe<T> = T | null;
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

export type Email = {
  from: Scalars['String'];
  to: Array<Scalars['String']>;
  replyTo?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
};

export type EmailResult = {
  __typename?: 'EmailResult';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  sendEmail?: Maybe<EmailResult>;
};


export type MutationSendEmailArgs = {
  email: Email;
};

export type Query = {
  __typename?: 'Query';
  request?: Maybe<Scalars['String']>;
};
