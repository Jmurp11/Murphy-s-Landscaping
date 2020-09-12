import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from 'apollo-client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};



export type Address = {
  __typename?: 'Address';
  id: Scalars['String'];
  user: User;
  street: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  initialName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Array<Address>>;
  role?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  tokenVersion?: Maybe<Scalars['Float']>;
  forgotPasswordLock?: Maybe<Scalars['Boolean']>;
  creationTime?: Maybe<Scalars['DateTime']>;
};


export type Job = {
  __typename?: 'Job';
  id: Scalars['String'];
  customer: User;
  employee?: Maybe<User>;
  isComplete: Scalars['Boolean'];
  isPaid: Scalars['Boolean'];
  dateRequested: Scalars['DateTime'];
  dateCompleted?: Maybe<Scalars['DateTime']>;
  cost: Scalars['Float'];
  datePaid?: Maybe<Scalars['DateTime']>;
  jobType: Scalars['String'];
  expenses?: Maybe<Array<Expense>>;
};

export type Expense = {
  __typename?: 'Expense';
  id: Scalars['String'];
  cost: Scalars['Float'];
  job?: Maybe<Job>;
  expenseType: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Result = {
  __typename?: 'Result';
  success?: Maybe<Array<Response>>;
  errors?: Maybe<Array<Response>>;
};

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  user?: Maybe<User>;
  accessToken: Scalars['String'];
  expiresIn: Scalars['Float'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  success?: Maybe<LoginSuccess>;
  errors?: Maybe<Array<Response>>;
};

export type AddressInput = {
  user: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['Float'];
};

export type ExpenseInput = {
  cost: Scalars['Float'];
  job: Scalars['String'];
  expenseType: Scalars['String'];
};

export type ExpenseQueryInput = {
  id: Scalars['String'];
};

export type JobInput = {
  customer: Scalars['String'];
  cost: Scalars['Float'];
  jobType: Scalars['String'];
};

export type JobQueryInput = {
  id: Scalars['String'];
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['String'];
};

export type UserInput = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  addresses: Array<Address>;
  address: Address;
  expenses: Array<Expense>;
  expense: Expense;
  jobs: Array<Job>;
  jobsByCustomer: Array<Job>;
  job: Job;
  me?: Maybe<User>;
  users: Array<User>;
  customers: Array<User>;
  employees: Array<User>;
  user: User;
};


export type QueryAddressArgs = {
  id: Scalars['String'];
};


export type QueryExpenseArgs = {
  input: ExpenseQueryInput;
};


export type QueryJobArgs = {
  input: JobQueryInput;
};


export type QueryUserArgs = {
  input: UserInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: Result;
  deleteAddress: Result;
  createExpense: Result;
  deleteExpense: Result;
  createJob: Result;
  deleteJob: Result;
  register: Result;
  login?: Maybe<LoginResult>;
  confirmUser: Result;
  forgotPassword: Result;
  changePassword: Result;
  logout: Scalars['Boolean'];
  deleteUser: Result;
};


export type MutationCreateAddressArgs = {
  input: AddressInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['String'];
};


export type MutationCreateExpenseArgs = {
  input: ExpenseInput;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['String'];
};


export type MutationCreateJobArgs = {
  input: JobInput;
};


export type MutationDeleteJobArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type CreateAddressMutationVariables = Exact<{
  data: AddressInput;
}>;


export type CreateAddressMutation = (
  { __typename?: 'Mutation' }
  & { createAddress: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type DeleteAddressMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type DeleteAddressMutation = (
  { __typename?: 'Mutation' }
  & { deleteAddress: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type CreateExpenseMutationVariables = Exact<{
  data: ExpenseInput;
}>;


export type CreateExpenseMutation = (
  { __typename?: 'Mutation' }
  & { createExpense: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type DeleteExpenseMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type DeleteExpenseMutation = (
  { __typename?: 'Mutation' }
  & { deleteExpense: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type CreateJobMutationVariables = Exact<{
  data: JobInput;
}>;


export type CreateJobMutation = (
  { __typename?: 'Mutation' }
  & { createJob: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type DeleteJobMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type DeleteJobMutation = (
  { __typename?: 'Mutation' }
  & { deleteJob: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResult' }
    & { success?: Maybe<(
      { __typename?: 'LoginSuccess' }
      & Pick<LoginSuccess, 'accessToken' | 'expiresIn'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'fullName' | 'role'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ConfirmUserMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & { confirmUser: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'path' | 'message'>
    )>> }
  ) }
);

export type AddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressesQuery = (
  { __typename?: 'Query' }
  & { addresses: Array<(
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'street' | 'city' | 'state' | 'zip'>
  )> }
);

export type AddressQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type AddressQuery = (
  { __typename?: 'Query' }
  & { address: (
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'street' | 'city' | 'state' | 'zip'>
  ) }
);

export type ExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpensesQuery = (
  { __typename?: 'Query' }
  & { expenses: Array<(
    { __typename?: 'Expense' }
    & Pick<Expense, 'id' | 'cost' | 'expenseType'>
    & { job?: Maybe<(
      { __typename?: 'Job' }
      & Pick<Job, 'id' | 'isComplete' | 'isPaid' | 'dateRequested' | 'dateCompleted' | 'cost' | 'datePaid' | 'jobType'>
      & { customer: (
        { __typename?: 'User' }
        & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone'>
        & { address?: Maybe<Array<(
          { __typename?: 'Address' }
          & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
        )>> }
      ), employee?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'role'>
      )> }
    )> }
  )> }
);

export type ExpenseQueryVariables = Exact<{
  data: ExpenseQueryInput;
}>;


export type ExpenseQuery = (
  { __typename?: 'Query' }
  & { expense: (
    { __typename?: 'Expense' }
    & Pick<Expense, 'id' | 'cost' | 'expenseType'>
    & { job?: Maybe<(
      { __typename?: 'Job' }
      & Pick<Job, 'id' | 'isComplete' | 'isPaid' | 'dateRequested' | 'dateCompleted' | 'cost' | 'datePaid' | 'jobType'>
      & { customer: (
        { __typename?: 'User' }
        & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone'>
        & { address?: Maybe<Array<(
          { __typename?: 'Address' }
          & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
        )>> }
      ), employee?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'role'>
      )> }
    )> }
  ) }
);

export type JobsQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsQuery = (
  { __typename?: 'Query' }
  & { jobs: Array<(
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'isComplete' | 'isPaid' | 'dateRequested' | 'dateCompleted' | 'cost' | 'datePaid' | 'jobType'>
    & { customer: (
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone'>
      & { address?: Maybe<Array<(
        { __typename?: 'Address' }
        & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
      )>> }
    ), employee?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'role'>
    )>, expenses?: Maybe<Array<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'cost' | 'expenseType'>
    )>> }
  )> }
);

export type JobQueryVariables = Exact<{
  data: JobQueryInput;
}>;


export type JobQuery = (
  { __typename?: 'Query' }
  & { job: (
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'isComplete' | 'isPaid' | 'dateRequested' | 'dateCompleted' | 'cost' | 'datePaid' | 'jobType'>
    & { customer: (
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone'>
      & { address?: Maybe<Array<(
        { __typename?: 'Address' }
        & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
      )>> }
    ), employee?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'role'>
    )>, expenses?: Maybe<Array<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'cost' | 'expenseType'>
    )>> }
  ) }
);

export type JobsByCustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsByCustomerQuery = (
  { __typename?: 'Query' }
  & { jobsByCustomer: Array<(
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'isComplete' | 'isPaid' | 'dateRequested' | 'dateCompleted' | 'cost' | 'datePaid' | 'jobType'>
    & { customer: (
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone'>
      & { address?: Maybe<Array<(
        { __typename?: 'Address' }
        & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
      )>> }
    ), employee?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'role'>
    )>, expenses?: Maybe<Array<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'cost' | 'expenseType'>
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'fullName' | 'role' | 'email' | 'phone' | 'creationTime'>
    & { address?: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
    )>> }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone' | 'role' | 'confirmed' | 'creationTime'>
    & { address?: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
    )>> }
  )> }
);

export type CustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { customers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone' | 'role' | 'confirmed' | 'creationTime'>
    & { address?: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
    )>> }
  )> }
);

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = (
  { __typename?: 'Query' }
  & { employees: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone' | 'role' | 'confirmed' | 'creationTime'>
    & { address?: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
    )>> }
  )> }
);

export type UserQueryVariables = Exact<{
  data: UserInput;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'initialName' | 'email' | 'phone' | 'role' | 'confirmed' | 'creationTime'>
    & { address?: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'state' | 'zip'>
    )>> }
  ) }
);

export const CreateAddressDocument = gql`
    mutation createAddress($data: AddressInput!) {
  createAddress(input: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAddressGQL extends Apollo.Mutation<CreateAddressMutation, CreateAddressMutationVariables> {
    document = CreateAddressDocument;
    
  }
export const DeleteAddressDocument = gql`
    mutation deleteAddress($data: String!) {
  deleteAddress(id: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAddressGQL extends Apollo.Mutation<DeleteAddressMutation, DeleteAddressMutationVariables> {
    document = DeleteAddressDocument;
    
  }
export const CreateExpenseDocument = gql`
    mutation createExpense($data: ExpenseInput!) {
  createExpense(input: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateExpenseGQL extends Apollo.Mutation<CreateExpenseMutation, CreateExpenseMutationVariables> {
    document = CreateExpenseDocument;
    
  }
export const DeleteExpenseDocument = gql`
    mutation deleteExpense($data: String!) {
  deleteExpense(id: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteExpenseGQL extends Apollo.Mutation<DeleteExpenseMutation, DeleteExpenseMutationVariables> {
    document = DeleteExpenseDocument;
    
  }
export const CreateJobDocument = gql`
    mutation createJob($data: JobInput!) {
  createJob(input: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateJobGQL extends Apollo.Mutation<CreateJobMutation, CreateJobMutationVariables> {
    document = CreateJobDocument;
    
  }
export const DeleteJobDocument = gql`
    mutation deleteJob($data: String!) {
  deleteJob(id: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteJobGQL extends Apollo.Mutation<DeleteJobMutation, DeleteJobMutationVariables> {
    document = DeleteJobDocument;
    
  }
export const RegisterDocument = gql`
    mutation register($data: RegisterInput!) {
  register(input: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    document = RegisterDocument;
    
  }
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(input: $data) {
    success {
      user {
        id
        fullName
        role
      }
      accessToken
      expiresIn
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
  }
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
  }
export const ConfirmUserDocument = gql`
    mutation confirmUser($data: String!) {
  confirmUser(token: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ConfirmUserGQL extends Apollo.Mutation<ConfirmUserMutation, ConfirmUserMutationVariables> {
    document = ConfirmUserDocument;
    
  }
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($data: String!) {
  forgotPassword(email: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ForgotPasswordGQL extends Apollo.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> {
    document = ForgotPasswordDocument;
    
  }
export const ChangePasswordDocument = gql`
    mutation changePassword($data: ChangePasswordInput!) {
  changePassword(input: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChangePasswordGQL extends Apollo.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> {
    document = ChangePasswordDocument;
    
  }
export const DeleteUserDocument = gql`
    mutation deleteUser($data: String!) {
  deleteUser(id: $data) {
    success {
      path
      message
    }
    errors {
      path
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    document = DeleteUserDocument;
    
  }
export const AddressesDocument = gql`
    query addresses {
  addresses {
    id
    street
    city
    state
    zip
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddressesGQL extends Apollo.Query<AddressesQuery, AddressesQueryVariables> {
    document = AddressesDocument;
    
  }
export const AddressDocument = gql`
    query address($data: String!) {
  address(id: $data) {
    id
    street
    city
    state
    zip
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddressGQL extends Apollo.Query<AddressQuery, AddressQueryVariables> {
    document = AddressDocument;
    
  }
export const ExpensesDocument = gql`
    query expenses {
  expenses {
    id
    cost
    job {
      id
      customer {
        firstName
        lastName
        fullName
        initialName
        email
        phone
        address {
          street
          city
          state
          zip
        }
      }
      employee {
        firstName
        lastName
        fullName
        initialName
        role
      }
      isComplete
      isPaid
      dateRequested
      dateCompleted
      cost
      datePaid
      jobType
    }
    expenseType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExpensesGQL extends Apollo.Query<ExpensesQuery, ExpensesQueryVariables> {
    document = ExpensesDocument;
    
  }
export const ExpenseDocument = gql`
    query expense($data: ExpenseQueryInput!) {
  expense(input: $data) {
    id
    cost
    job {
      id
      customer {
        firstName
        lastName
        fullName
        initialName
        email
        phone
        address {
          street
          city
          state
          zip
        }
      }
      employee {
        firstName
        lastName
        fullName
        initialName
        role
      }
      isComplete
      isPaid
      dateRequested
      dateCompleted
      cost
      datePaid
      jobType
    }
    expenseType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExpenseGQL extends Apollo.Query<ExpenseQuery, ExpenseQueryVariables> {
    document = ExpenseDocument;
    
  }
export const JobsDocument = gql`
    query jobs {
  jobs {
    id
    customer {
      firstName
      lastName
      fullName
      initialName
      email
      phone
      address {
        street
        city
        state
        zip
      }
    }
    employee {
      firstName
      lastName
      fullName
      initialName
      role
    }
    isComplete
    isPaid
    dateRequested
    dateCompleted
    cost
    datePaid
    jobType
    expenses {
      cost
      expenseType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobsGQL extends Apollo.Query<JobsQuery, JobsQueryVariables> {
    document = JobsDocument;
    
  }
export const JobDocument = gql`
    query job($data: JobQueryInput!) {
  job(input: $data) {
    id
    customer {
      firstName
      lastName
      fullName
      initialName
      email
      phone
      address {
        street
        city
        state
        zip
      }
    }
    employee {
      firstName
      lastName
      fullName
      initialName
      role
    }
    isComplete
    isPaid
    dateRequested
    dateCompleted
    cost
    datePaid
    jobType
    expenses {
      cost
      expenseType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobGQL extends Apollo.Query<JobQuery, JobQueryVariables> {
    document = JobDocument;
    
  }
export const JobsByCustomerDocument = gql`
    query jobsByCustomer {
  jobsByCustomer {
    id
    customer {
      firstName
      lastName
      fullName
      initialName
      email
      phone
      address {
        street
        city
        state
        zip
      }
    }
    employee {
      firstName
      lastName
      fullName
      initialName
      role
    }
    isComplete
    isPaid
    dateRequested
    dateCompleted
    cost
    datePaid
    jobType
    expenses {
      cost
      expenseType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobsByCustomerGQL extends Apollo.Query<JobsByCustomerQuery, JobsByCustomerQueryVariables> {
    document = JobsByCustomerDocument;
    
  }
export const MeDocument = gql`
    query me {
  me {
    id
    fullName
    role
    email
    phone
    address {
      street
      city
      state
      zip
    }
    creationTime
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document = MeDocument;
    
  }
export const UsersDocument = gql`
    query users {
  users {
    id
    firstName
    lastName
    fullName
    initialName
    email
    phone
    address {
      street
      city
      state
      zip
    }
    role
    confirmed
    creationTime
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
  }
export const CustomersDocument = gql`
    query customers {
  customers {
    id
    firstName
    lastName
    fullName
    initialName
    email
    phone
    address {
      street
      city
      state
      zip
    }
    role
    confirmed
    creationTime
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomersGQL extends Apollo.Query<CustomersQuery, CustomersQueryVariables> {
    document = CustomersDocument;
    
  }
export const EmployeesDocument = gql`
    query employees {
  employees {
    id
    firstName
    lastName
    fullName
    initialName
    email
    phone
    address {
      street
      city
      state
      zip
    }
    role
    confirmed
    creationTime
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EmployeesGQL extends Apollo.Query<EmployeesQuery, EmployeesQueryVariables> {
    document = EmployeesDocument;
    
  }
export const UserDocument = gql`
    query user($data: UserInput!) {
  user(input: $data) {
    id
    firstName
    lastName
    fullName
    initialName
    email
    phone
    address {
      street
      city
      state
      zip
    }
    role
    confirmed
    creationTime
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V>
    extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}
    
  interface QueryOptionsAlone<V>
    extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}
    
  interface MutationOptionsAlone<T, V>
    extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}
    
  interface SubscriptionOptionsAlone<V>
    extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class ApolloAngularSDK {
    constructor(
      private createAddressGql: CreateAddressGQL,
      private deleteAddressGql: DeleteAddressGQL,
      private createExpenseGql: CreateExpenseGQL,
      private deleteExpenseGql: DeleteExpenseGQL,
      private createJobGql: CreateJobGQL,
      private deleteJobGql: DeleteJobGQL,
      private registerGql: RegisterGQL,
      private loginGql: LoginGQL,
      private logoutGql: LogoutGQL,
      private confirmUserGql: ConfirmUserGQL,
      private forgotPasswordGql: ForgotPasswordGQL,
      private changePasswordGql: ChangePasswordGQL,
      private deleteUserGql: DeleteUserGQL,
      private addressesGql: AddressesGQL,
      private addressGql: AddressGQL,
      private expensesGql: ExpensesGQL,
      private expenseGql: ExpenseGQL,
      private jobsGql: JobsGQL,
      private jobGql: JobGQL,
      private jobsByCustomerGql: JobsByCustomerGQL,
      private meGql: MeGQL,
      private usersGql: UsersGQL,
      private customersGql: CustomersGQL,
      private employeesGql: EmployeesGQL,
      private userGql: UserGQL
    ) {}
      
    createAddress(variables: CreateAddressMutationVariables, options?: MutationOptionsAlone<CreateAddressMutation, CreateAddressMutationVariables>) {
      return this.createAddressGql.mutate(variables, options)
    }
    
    deleteAddress(variables: DeleteAddressMutationVariables, options?: MutationOptionsAlone<DeleteAddressMutation, DeleteAddressMutationVariables>) {
      return this.deleteAddressGql.mutate(variables, options)
    }
    
    createExpense(variables: CreateExpenseMutationVariables, options?: MutationOptionsAlone<CreateExpenseMutation, CreateExpenseMutationVariables>) {
      return this.createExpenseGql.mutate(variables, options)
    }
    
    deleteExpense(variables: DeleteExpenseMutationVariables, options?: MutationOptionsAlone<DeleteExpenseMutation, DeleteExpenseMutationVariables>) {
      return this.deleteExpenseGql.mutate(variables, options)
    }
    
    createJob(variables: CreateJobMutationVariables, options?: MutationOptionsAlone<CreateJobMutation, CreateJobMutationVariables>) {
      return this.createJobGql.mutate(variables, options)
    }
    
    deleteJob(variables: DeleteJobMutationVariables, options?: MutationOptionsAlone<DeleteJobMutation, DeleteJobMutationVariables>) {
      return this.deleteJobGql.mutate(variables, options)
    }
    
    register(variables: RegisterMutationVariables, options?: MutationOptionsAlone<RegisterMutation, RegisterMutationVariables>) {
      return this.registerGql.mutate(variables, options)
    }
    
    login(variables: LoginMutationVariables, options?: MutationOptionsAlone<LoginMutation, LoginMutationVariables>) {
      return this.loginGql.mutate(variables, options)
    }
    
    logout(variables?: LogoutMutationVariables, options?: MutationOptionsAlone<LogoutMutation, LogoutMutationVariables>) {
      return this.logoutGql.mutate(variables, options)
    }
    
    confirmUser(variables: ConfirmUserMutationVariables, options?: MutationOptionsAlone<ConfirmUserMutation, ConfirmUserMutationVariables>) {
      return this.confirmUserGql.mutate(variables, options)
    }
    
    forgotPassword(variables: ForgotPasswordMutationVariables, options?: MutationOptionsAlone<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
      return this.forgotPasswordGql.mutate(variables, options)
    }
    
    changePassword(variables: ChangePasswordMutationVariables, options?: MutationOptionsAlone<ChangePasswordMutation, ChangePasswordMutationVariables>) {
      return this.changePasswordGql.mutate(variables, options)
    }
    
    deleteUser(variables: DeleteUserMutationVariables, options?: MutationOptionsAlone<DeleteUserMutation, DeleteUserMutationVariables>) {
      return this.deleteUserGql.mutate(variables, options)
    }
    
    addresses(variables?: AddressesQueryVariables, options?: QueryOptionsAlone<AddressesQueryVariables>) {
      return this.addressesGql.fetch(variables, options)
    }
    
    addressesWatch(variables?: AddressesQueryVariables, options?: WatchQueryOptionsAlone<AddressesQueryVariables>) {
      return this.addressesGql.watch(variables, options)
    }
    
    address(variables: AddressQueryVariables, options?: QueryOptionsAlone<AddressQueryVariables>) {
      return this.addressGql.fetch(variables, options)
    }
    
    addressWatch(variables: AddressQueryVariables, options?: WatchQueryOptionsAlone<AddressQueryVariables>) {
      return this.addressGql.watch(variables, options)
    }
    
    expenses(variables?: ExpensesQueryVariables, options?: QueryOptionsAlone<ExpensesQueryVariables>) {
      return this.expensesGql.fetch(variables, options)
    }
    
    expensesWatch(variables?: ExpensesQueryVariables, options?: WatchQueryOptionsAlone<ExpensesQueryVariables>) {
      return this.expensesGql.watch(variables, options)
    }
    
    expense(variables: ExpenseQueryVariables, options?: QueryOptionsAlone<ExpenseQueryVariables>) {
      return this.expenseGql.fetch(variables, options)
    }
    
    expenseWatch(variables: ExpenseQueryVariables, options?: WatchQueryOptionsAlone<ExpenseQueryVariables>) {
      return this.expenseGql.watch(variables, options)
    }
    
    jobs(variables?: JobsQueryVariables, options?: QueryOptionsAlone<JobsQueryVariables>) {
      return this.jobsGql.fetch(variables, options)
    }
    
    jobsWatch(variables?: JobsQueryVariables, options?: WatchQueryOptionsAlone<JobsQueryVariables>) {
      return this.jobsGql.watch(variables, options)
    }
    
    job(variables: JobQueryVariables, options?: QueryOptionsAlone<JobQueryVariables>) {
      return this.jobGql.fetch(variables, options)
    }
    
    jobWatch(variables: JobQueryVariables, options?: WatchQueryOptionsAlone<JobQueryVariables>) {
      return this.jobGql.watch(variables, options)
    }
    
    jobsByCustomer(variables?: JobsByCustomerQueryVariables, options?: QueryOptionsAlone<JobsByCustomerQueryVariables>) {
      return this.jobsByCustomerGql.fetch(variables, options)
    }
    
    jobsByCustomerWatch(variables?: JobsByCustomerQueryVariables, options?: WatchQueryOptionsAlone<JobsByCustomerQueryVariables>) {
      return this.jobsByCustomerGql.watch(variables, options)
    }
    
    me(variables?: MeQueryVariables, options?: QueryOptionsAlone<MeQueryVariables>) {
      return this.meGql.fetch(variables, options)
    }
    
    meWatch(variables?: MeQueryVariables, options?: WatchQueryOptionsAlone<MeQueryVariables>) {
      return this.meGql.watch(variables, options)
    }
    
    users(variables?: UsersQueryVariables, options?: QueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.fetch(variables, options)
    }
    
    usersWatch(variables?: UsersQueryVariables, options?: WatchQueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.watch(variables, options)
    }
    
    customers(variables?: CustomersQueryVariables, options?: QueryOptionsAlone<CustomersQueryVariables>) {
      return this.customersGql.fetch(variables, options)
    }
    
    customersWatch(variables?: CustomersQueryVariables, options?: WatchQueryOptionsAlone<CustomersQueryVariables>) {
      return this.customersGql.watch(variables, options)
    }
    
    employees(variables?: EmployeesQueryVariables, options?: QueryOptionsAlone<EmployeesQueryVariables>) {
      return this.employeesGql.fetch(variables, options)
    }
    
    employeesWatch(variables?: EmployeesQueryVariables, options?: WatchQueryOptionsAlone<EmployeesQueryVariables>) {
      return this.employeesGql.watch(variables, options)
    }
    
    user(variables: UserQueryVariables, options?: QueryOptionsAlone<UserQueryVariables>) {
      return this.userGql.fetch(variables, options)
    }
    
    userWatch(variables: UserQueryVariables, options?: WatchQueryOptionsAlone<UserQueryVariables>) {
      return this.userGql.watch(variables, options)
    }
  }